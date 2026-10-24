const search=document.querySelector('#paper-search');
if(search) {
  const topic=document.querySelector('#paper-topic'),year=document.querySelector('#paper-year');
  const papers=[...document.querySelectorAll('.publication')];
  function filterPapers() {
    const query=search.value.trim().toLowerCase();let count=0;
    for(const p of papers) {
      const visible=(!query||p.dataset.search.includes(query))&&(topic.value==='all'||p.dataset.topic===topic.value)&&(year.value==='all'||p.dataset.year===year.value);
      p.hidden=!visible;if(visible)count++;
    }
    document.querySelector('#paper-count').textContent=`${count} ${count===1?'paper':'papers'}`;
    document.querySelector('#no-papers').hidden=count!==0;
  }
  search.addEventListener('input',filterPapers);topic.addEventListener('change',filterPapers);year.addEventListener('change',filterPapers);
}

// Open the Results section when a tool link points to a study inside it.
function revealResearchTarget(hash) {
  if(!hash)return;
  const target=document.getElementById(decodeURIComponent(hash.slice(1)));
  if(!target)return;
  for(let parent=target.parentElement;parent;parent=parent.parentElement)if(parent.tagName==='DETAILS')parent.open=true;
  target.scrollIntoView({block:'start'});
}
document.addEventListener('click',event=>{
  const link=event.target.closest('a[href^="#"]');
  if(link&&link.hash&&document.getElementById(link.hash.slice(1))){event.preventDefault();history.pushState(null,'',link.hash);revealResearchTarget(link.hash);}
});
window.addEventListener('hashchange',()=>revealResearchTarget(location.hash));
if(location.hash)revealResearchTarget(location.hash);
