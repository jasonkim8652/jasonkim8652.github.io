import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';

export async function checkDiscovery(directory,base='',origin='https://jasonkim8652.github.io'){
  const get=name=>readFile(path.join(directory,name),'utf8');
  const index=JSON.parse(await get('research.json'));
  const llms=await get('llms.txt'),full=await get('llms-full.txt');
  assert.equal(index.profile.name,'Jeonghyeon Kim');
  assert(index.profile.same_as.includes('https://github.com/jasonkim8652'));
  assert.equal(index.research.length,3);
  assert.equal(new Set(index.research.map(p=>p.summary)).size,3,'Each aim needs its own summary');
  const designText=await get('research/design-agents/index.md');
  assert(designText.includes(origin+base+'/research/design-agents/#alphafast-results'),'Local figure links must keep their page context');
  assert.equal(index.publications.find(p=>p.id==='codirect').kind,'Manuscript');
  assert.equal(index.publications.find(p=>p.id==='biodesignbench').kind,'Preprint');
  for(const paper of index.publications)assert.match(paper.code,/^https:\/\/github.com\//);
  for(const note of index.notes)assert(!note.draft,'Draft leaked into machine index');
  assert(llms.startsWith('# Jeonghyeon Kim'));
  assert(llms.includes('future')&&llms.includes('preprint'));
  assert(full.includes('BioDesignBench')&&full.includes('PEARL'));
  assert(!/<(?:svg|path|script)\b/i.test(full),'SVG/script markup leaked into text export');
  for(const item of [...index.research,...index.notes]){
    const markdown=await get(new URL(item.markdown).pathname.slice(base.length).replace(/^\//,''));
    assert(markdown.includes('Canonical: '+item.url));
    assert(markdown.length>200);
  }
  for(const match of llms.matchAll(/\]\((https?:\/\/[^)]+)\)/g)){
    const target=new URL(match[1]);if(target.origin!==origin)continue;
    assert(target.pathname.startsWith(base+'/'),'Machine link escaped base path');
    const relative=decodeURIComponent(target.pathname.slice(base.length)).replace(/^\//,'');
    assert((await stat(path.join(directory,relative.endsWith('/')?relative+'index.html':relative))).isFile());
  }
  const jsonld=html=>{
    const matches=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    assert.equal(matches.length,1);return JSON.parse(matches[0][1])['@graph'];
  };
  const about=await get('about/index.html'),graph=jsonld(about);
  assert(graph.some(n=>n['@type']==='ProfilePage'));
  const person=graph.find(n=>n['@type']==='Person');assert.equal(person.name,index.profile.name);
  assert(person.sameAs.includes('https://github.com/jasonkim8652'));
  assert(about.includes('rel="alternate" type="text/markdown"'));
  const papers=jsonld(await get('publications/index.html')).filter(n=>n['@type']==='ScholarlyArticle');
  assert.equal(papers.length,index.publications.length);
  for(const paper of index.publications)assert(papers.some(n=>n.name===paper.title&&n.creativeWorkStatus===paper.kind));
  const note=jsonld(await get('writing/benchmarks-that-improve-agents/index.html')).find(n=>n['@type']==='BlogPosting');
  assert(note&&!('datePublished' in note),'Do not invent a note publication date');
  console.log('Agent discovery checks:',{aims:index.research.length,papers:index.publications.length,notes:index.notes.length,base});
}
