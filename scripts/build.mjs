import {readFile,writeFile,mkdir,readdir,rm,cp} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {marked} from 'marked';
import {createTemplates,esc} from './templates.mjs';
import {writeDiscovery} from './discovery.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const output=process.env.OUTPUT_DIR?path.resolve(process.env.OUTPUT_DIR):path.join(root,'dist');
if(output===root || !output.startsWith(root+path.sep)) throw new Error('Output must be a dedicated directory inside this project.');
const base='/'+(process.env.BASE_PATH||'').replace(/^\/+|\/+$/g,'');
const options={base:base==='/'?'':base,origin:(process.env.SITE_URL||'').replace(/\/$/,''),publicRelease:process.env.PUBLIC_RELEASE==='true'};
options.imageDimensions=JSON.parse(await readFile(path.join(root,'scripts/image-dimensions.json'),'utf8'));
const site=JSON.parse(await readFile(path.join(root,'content/site.json'),'utf8'));
const pubs=JSON.parse(await readFile(path.join(root,'content/publications.json'),'utf8'));
const posts=[];
for(const file of (await readdir(path.join(root,'content/posts'))).filter(f=>f.endsWith('.md')).sort()) {
  const text=await readFile(path.join(root,'content/posts',file),'utf8');
  const match=text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if(!match)throw new Error(`Missing JSON metadata in ${file}`);
  const metadata=JSON.parse(match[1]);
  if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(metadata.slug))throw new Error(`Invalid article slug: ${file}`);
  if(posts.some(p=>p.slug===metadata.slug))throw new Error('Duplicate article slug');
  if(!metadata.title||!metadata.summary)throw new Error(`Missing article metadata: ${file}`);
  if(metadata.category && !['Idea notes','Paper notes'].includes(metadata.category))throw new Error(`Invalid category: ${file}`);
  const validAims=['design-agents','experimental-agents','learning-agents'];
  if(metadata.aims && (!Array.isArray(metadata.aims)||metadata.aims.some(a=>!validAims.includes(a))))throw new Error(`Invalid related aim: ${file}`);
  if(metadata.draft && options.publicRelease)continue;
  const words=match[2].split(/\s+/).filter(Boolean).length;
  posts.push({...metadata,minutes:Math.max(1,Math.ceil(words/220)),html:marked.parse(match[2],{gfm:true}).replace(/(href|src)="\/(?!\/)/g,`$1="${options.base}/`)});
}
// Undated notes follow the research/publication order, rather than an invented chronology.
posts.sort((a,b)=>pubs.findIndex(p=>p.id===a.paper)-pubs.findIndex(p=>p.id===b.paper)||a.title.localeCompare(b.title));
for(const post of posts)if(post.related&&!posts.some(p=>p.slug===post.related))throw new Error(`Unknown related note: ${post.related}`);
const templates=createTemplates(site,pubs,posts,options);
await rm(output,{recursive:true,force:true});await mkdir(output,{recursive:true});
const pages=[];
const write=async (name,text)=>{if(name.endsWith('.html'))pages.push({route:name==='index.html'?'/':name==='404.html'?'/404.html':'/'+name.replace(/index\.html$/,''),html:text});const p=path.join(output,name);await mkdir(path.dirname(p),{recursive:true});await writeFile(p,text);};
for(const [name,fn] of [['index.html','home'],['research/index.html','research'],['research/design-agents/index.html','design'],['research/experimental-agents/index.html','experiment'],['research/learning-agents/index.html','learn'],['publications/index.html','publications'],['writing/index.html','writing'],['about/index.html','about'],['404.html','notFound']])await write(name,templates[fn]());
for(const p of posts)await write(`writing/${p.slug}/index.html`,templates.article(p));
const archive=JSON.parse(await readFile(path.join(root,'content/archive.json'),'utf8'));
await write('archive/index.html',templates.archive(archive));
for(const entry of archive){
  const source=await readFile(path.join(root,'_posts',entry.file),'utf8');
  let markdown=source.replace(/^---[\s\S]*?\r?\n---\r?\n/,'').replace(/\{:\s*[^}]*\}/g,'');
  // Keep the original content; adapt old site links to this build's base path.
  let html=marked.parse(markdown,{gfm:true}).replace(/<h1(\s|>)/g,'<h2$1').replace(/<\/h1>/g,'</h2>');
  html=html.replace(/https:\/\/jasonkim8652\.github\.io(?=\/)/g,options.base);
  await write(entry.route.replace(/^\//,'')+'index.html',templates.legacyArticle({...entry,html}));
}
await cp(path.join(root,'assets'),path.join(output,'assets'),{recursive:true});
await write('.nojekyll','');
const origin=options.origin||'https://jasonkim8652.github.io';
const feedPosts=posts.filter(p=>!p.draft);
// Atom requires an update timestamp. This is the site's review/publication update,
// not a claimed date of authorship for each note.
const feedUpdated=new Date(site.updated).toISOString();
await write('feed.xml',`<?xml version="1.0" encoding="utf-8"?><feed xmlns="http://www.w3.org/2005/Atom"><title>${site.name} · Writing</title><id>${origin}${options.base}/writing/</id><updated>${feedUpdated}</updated><link href="${origin}${options.base}/feed.xml" rel="self"/><link href="${origin}${options.base}/writing/"/>${feedPosts.map(p=>`<entry><title>${esc(p.title)}</title><id>${origin}${options.base}/writing/${p.slug}/</id><link href="${origin}${options.base}/writing/${p.slug}/"/><updated>${feedUpdated}</updated><author><name>${site.name}</name></author><summary>${esc(p.summary)}</summary></entry>`).join('')}</feed>`);
await write('robots.txt',options.publicRelease?`User-agent: *\nAllow: /\n${options.origin?'Sitemap: '+options.origin+options.base+'/sitemap.xml\n':''}`:'User-agent: *\nDisallow: /\n');
const routes=['/','/research/','/research/design-agents/','/research/experimental-agents/','/research/learning-agents/','/publications/','/writing/','/about/',...posts.filter(p=>!p.draft).map(p=>`/writing/${p.slug}/`),'/archive/',...archive.map(p=>p.route)];
await write('sitemap.xml',`<?xml version="1.0" encoding="utf-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(p=>`<url><loc>${origin}${options.base}${p}</loc><lastmod>${site.updated}</lastmod></url>`).join('')}</urlset>`);
const discovery=await writeDiscovery({site,pubs,posts,pages,options,write});
console.log(JSON.stringify({output,...discovery,pages:10+posts.length+archive.length,archivedNotes:archive.length,papers:pubs.length,posts:posts.length,publicRelease:options.publicRelease,base:options.base}));
