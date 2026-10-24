import {readFile,readdir,stat,rm} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import {checkDiscovery} from './check-discovery.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const walk=async p=>(await Promise.all((await readdir(p)).map(async n=>{const f=path.join(p,n);return(await stat(f)).isDirectory()?walk(f):[f];}))).flat();
const forbidden=['drive.google.com','Application_Drafts','Curricular Practical Training'];
async function check(directory,base='',publicRelease=false){
  const files=await walk(directory),htmlFiles=files.filter(f=>f.endsWith('.html'));let links=0;
  for(const file of htmlFiles){
    const content=await readFile(file,'utf8');
    if((content.match(/<h1(?:\s|>)/g)||[]).length!==1)throw new Error(`Expected one h1 in ${file}`);
    if(!content.includes('<html lang="en">')||!content.includes('name="viewport"'))throw new Error(`Missing language or viewport: ${file}`);
    if(!content.includes('class="skip-link"'))throw new Error(`Missing skip link: ${file}`);
    for(const term of forbidden)if(content.includes(term))throw new Error(`Private application content found: ${term}`);
    if(publicRelease&&(/Draft for review|draft-label/.test(content)))throw new Error('Draft shown in public release');
    const ids=new Set([...content.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]));
    for(const match of content.matchAll(/(?:href|src)="([^"]+)"/g)){
      const value=match[1];if(/^(https?:|mailto:|data:)/.test(value))continue;
      if(value.startsWith('#')){if(!ids.has(value.slice(1)))throw new Error(`Broken fragment ${value}`);continue;}
      const parsed=new URL(value,'https://example.test'+base+'/'+path.relative(directory,file));
      if(base&&!parsed.pathname.startsWith(base+'/'))throw new Error(`URL escaped repository base: ${value}`);
      const relative=decodeURIComponent(parsed.pathname.slice(base.length)).replace(/^\//,'');
      const target=path.join(directory,!relative||relative.endsWith('/')?relative+'index.html':relative);
      try{if(!(await stat(target)).isFile())throw new Error();}catch{throw new Error(`Broken local link ${value} in ${file}`);}
      if(parsed.hash){const t=await readFile(target,'utf8');if(!t.includes(`id="${parsed.hash.slice(1)}"`))throw new Error(`Missing destination fragment: ${value}`);}
      links++;
    }
  }

  return{pages:htmlFiles.length,localLinks:links,publicRelease,base};
}
console.log('Preview checks:',await check(path.join(root,'dist')));
const checkDir=path.join(root,'.build-check/public');
const result=spawnSync(process.execPath,['scripts/build.mjs'],{cwd:root,env:{...process.env,BASE_PATH:'/example-repo',PUBLIC_RELEASE:'true',SITE_URL:'https://example.test',OUTPUT_DIR:checkDir},encoding:'utf8'});
if(result.status!==0)throw new Error(result.stderr||result.stdout);
console.log('GitHub subpath and public draft checks:',await check(checkDir,'/example-repo',true));
const publicText=(await Promise.all((await walk(checkDir)).filter(f=>f.endsWith('.html')).map(f=>readFile(f,'utf8')))).join('');
const pubs=JSON.parse(await readFile(path.join(root,'content/publications.json'),'utf8'));
if(!pubs.length||pubs.some(p=>!/^https:\/\/github.com\/[^/]+\/[^/]+$/.test(p.code)))throw new Error('Every study needs a verified code link');
for(const p of pubs)if(!publicText.includes('/writing/'+p.note+'/'))throw new Error('Missing paper note: '+p.id);
for(const slug of ['why-benchmarks-should-improve-agents','experimental-feedback-and-agent-learning'])if(!publicText.includes('/writing/'+slug+'/'))throw new Error('Missing restored Idea note');
if(/Conceptual research direction|Author-created schematic|The foundation I bring/.test(publicText))throw new Error('Removed boilerplate returned');
await checkDiscovery(path.join(root,'dist'));
await checkDiscovery(checkDir,'/example-repo','https://example.test');
await rm(path.join(root,'.build-check'),{recursive:true,force:true});
console.log('All checks passed.');
