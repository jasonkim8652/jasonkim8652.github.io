export const markdownRoute = route => route.endsWith('/') ? route+'index.md' : route+'.md';
const json = value => JSON.stringify(value).replace(/</g,'\\u003c');

export function structuredData({site,pubs,posts,options,title,route,description,article}){
  const origin=options.origin||'https://jasonkim8652.github.io';
  const absolute=p=>origin+options.base+p;
  const personId=absolute('/#person'),websiteId=absolute('/#website');
  const pageUrl=absolute(route),pageId=pageUrl+'#webpage';
  const person={'@type':'Person','@id':personId,name:site.name,url:absolute('/about/'),jobTitle:'PhD Candidate',description:site.description,affiliation:{'@type':'Organization',name:site.institution},image:absolute('/assets/profile.jpg'),sameAs:[site.scholar,site.github,site.linkedin]};
  const website={'@type':'WebSite','@id':websiteId,url:absolute('/'),name:site.name+' · Research & Writing',inLanguage:'en',creator:{'@id':personId}};
  const page={'@type':route==='/about/'?'ProfilePage':['/publications/','/writing/','/archive/'].includes(route)?'CollectionPage':'WebPage','@id':pageId,url:pageUrl,name:title||site.name,description,inLanguage:'en',isPartOf:{'@id':websiteId}};
  if(route==='/'||route==='/about/')page.mainEntity={'@id':personId};
  const graph=[person,website,page];
  const paperNode=p=>({'@type':'ScholarlyArticle','@id':absolute('/publications/#'+p.id),name:p.title,description:p.description,creditText:p.authors,creativeWorkStatus:p.kind,genre:p.kind,...(p.url?{url:p.url}:{}),...(p.venue!=='Manuscript'?{isPartOf:{'@type':'CreativeWork',name:p.venue}}:{}),subjectOf:{'@id':p.code}});
  if(route==='/publications/'){
    page.mainEntity={'@type':'ItemList',itemListElement:pubs.map((p,i)=>({'@type':'ListItem',position:i+1,item:{'@id':absolute('/publications/#'+p.id)}}))};
    graph.push(...pubs.map(paperNode),...pubs.map(p=>({'@type':'SoftwareSourceCode','@id':p.code,name:p.short+' code',url:p.code,codeRepository:p.code,about:{'@id':absolute('/publications/#'+p.id)}})));
  }
  const post=posts.find(p=>route===`/writing/${p.slug}/`);
  if(post){
    const note={'@type':'BlogPosting','@id':pageUrl+'#article',headline:post.title,description:post.summary,author:{'@id':personId},url:pageUrl,inLanguage:'en',mainEntityOfPage:{'@id':pageId},articleSection:post.category};
    if(post.paper){const paper=pubs.find(p=>p.id===post.paper);if(paper){note.citation={'@id':absolute('/publications/#'+paper.id)};graph.push(paperNode(paper));}}
    page.mainEntity={'@id':note['@id']};graph.push(note);
  }else if(article){page.author={'@id':personId};}
  return `<script type="application/ld+json">${json({'@context':'https://schema.org','@graph':graph})}</script>`;
}
