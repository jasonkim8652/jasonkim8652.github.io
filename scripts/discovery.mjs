import TurndownService from 'turndown';
import {markdownRoute} from './structured-data.mjs';
import {noteContext} from './note-context.mjs';

const decode=text=>text.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>');

export async function writeDiscovery({site,pubs,posts,pages,options,write}){
  const origin=options.origin||'https://jasonkim8652.github.io',absolute=p=>origin+options.base+p;
  let currentPageUrl=absolute('/');
  const converter=new TurndownService({headingStyle:'atx',codeBlockStyle:'fenced',bulletListMarker:'-'});
  converter.remove(['script','style','nav','button','input','select','label']);
  converter.addRule('diagram',{filter:'svg',replacement:(_content,node)=>{
    const description=node.getAttribute('aria-label')||node.querySelector('desc')?.textContent||node.querySelector('title')?.textContent;
    return description?'\n\nDiagram: '+description+'\n\n':'';
  }});
  converter.addRule('image',{filter:'img',replacement:(_content,node)=>{
    const src=node.getAttribute('src');if(!src)return '';
    return `![${node.getAttribute('alt')||''}](${new URL(src,currentPageUrl).href})`;
  }});
  converter.addRule('link',{filter:node=>node.nodeName==='A'&&node.getAttribute('href'),replacement:(content,node)=>{
    const href=node.getAttribute('href');return `[${content.trim()||href}](${new URL(href,currentPageUrl).href})`;
  }});
  converter.addRule('details',{filter:'summary',replacement:content=>'\n\n### '+content+'\n\n'});
  const docs=[];
  for(const page of pages){
    if(page.route==='/404.html')continue;
    currentPageUrl=absolute(page.route);
    const title=decode(page.html.match(/<title>([\s\S]*?)<\/title>/)?.[1]||site.name);
    const description=decode(page.html.match(/<meta name="description" content="([^"]*)"/)?.[1]||'');
    const main=page.html.match(/<main id="main">([\s\S]*?)<\/main>/)?.[1];
    if(!main)throw new Error('Missing readable body: '+page.route);
    const body=converter.turndown(main);
    const markdown=`Canonical: ${absolute(page.route)}\nAuthor: ${site.name}\n\n${body}\n`;
    await write(markdownRoute(page.route).slice(1),markdown);
    docs.push({title,description,url:absolute(page.route),markdown:absolute(markdownRoute(page.route)),body:markdown,route:page.route});
  }
  const publicPosts=posts.filter(p=>!p.draft),doc=route=>docs.find(p=>p.route===route);
  const research=['design-agents','experimental-agents','learning-agents'].map((slug,i)=>{
    const page=doc('/research/'+slug+'/');
    return {aim:i+1,slug,title:page.title.replace(' · '+site.name,''),summary:page.description,url:page.url,markdown:page.markdown};
  });
  const papers=pubs.map(p=>({...p,note_url:absolute('/writing/'+p.note+'/'),markdown:absolute('/writing/'+p.note+'/index.md')}));
  const notes=publicPosts.map(p=>({title:p.title,slug:p.slug,category:p.category,summary:p.summary,...(p.paper?{paper:p.paper}:{}),aims:p.aims||noteContext[p.slug]?.aims||[],url:absolute('/writing/'+p.slug+'/'),markdown:absolute('/writing/'+p.slug+'/index.md')}));
  const index={schema_version:1,updated:site.updated,profile:{name:site.name,role:'PhD Candidate',institution:site.institution,lab:site.lab,description:site.description,url:absolute('/'),same_as:[site.scholar,site.github,site.linkedin]},research,publications:papers,notes};
  await write('research.json',JSON.stringify(index,null,2)+'\n');
  const llms=`# ${site.name} · Research & Writing\n\n> ${site.description}\n\nThis is the personal research website of ${site.name} (pronounced Jung-hyun), a PhD Candidate in Biomedical Engineering at ${site.institution}, ${site.lab}. The research connects computational protein design agents, robotic experimental reasoning, and agent learning from verifier and experimental feedback.\n\nThe pages distinguish completed contributions from future research directions. Sections titled “What I want to build next” describe goals. Publication records distinguish peer-reviewed papers, preprints, and manuscripts. Molecular docking and SHARP are earlier methodological foundations; they are not presented as protein experiments.\n\n## Start here\n\n- [Research overview](${doc('/research/').markdown}): How the three aims form an end-to-end protein engineering research program.\n- [About ${site.name}](${doc('/about/').markdown}): Biography, affiliation, model development within agent research, and contact links.\n- [Publications](${doc('/publications/').markdown}): Paper titles, authors, publication status, code repositories, and research notes.\n- [Structured research index](${absolute('/research.json')}): JSON profile, research aims, publications, and notes.\n- [Complete research text](${absolute('/llms-full.txt')}): Current research pages and notes in one text file.\n\n## Research aims\n\n${research.map(p=>`- [Aim ${p.aim}: ${p.title}](${p.markdown}): ${p.summary}`).join('\n')}\n\n## Research notes\n\n${notes.map(p=>`- [${p.title}](${p.markdown}): ${p.summary}`).join('\n')}\n\n## Profiles and code\n\n- [Google Scholar](${site.scholar}): Researcher identity and publication profile.\n- [GitHub](${site.github}): Public software repositories.\n- [LinkedIn](${site.linkedin}): Professional profile.\n\n## Optional\n\n- [Earlier reading notes](${doc('/archive/').markdown}): Archived reading notes from the previous blog, separate from the current research program.\n- [Sitemap](${absolute('/sitemap.xml')}): All canonical HTML pages.\n- [Writing feed](${absolute('/feed.xml')}): Current research and idea notes.\n`;
  await write('llms.txt',llms);
  const routes=['/','/research/',...research.map(p=>'/research/'+p.slug+'/'),'/about/','/publications/',...publicPosts.map(p=>'/writing/'+p.slug+'/')];
  await write('llms-full.txt',`# ${site.name} · Complete research text\n\nGenerated from the same public HTML pages as the website. Current notes are undated; future research is identified in the page text.\n\n`+routes.map(route=>doc(route).body).join('\n\n---\n\n'));
  return {markdownPages:docs.length,researchAims:research.length};
}
