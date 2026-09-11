(() => {
  const data = window.MANUAL_INDEX || [];
  const $ = id => document.getElementById(id);
  const q = $('q'), model = $('model'), year = $('year'), type = $('type'), section = $('section');
  const count = $('count'), summary = $('editionSummary'), results = $('results'), pager = $('pager');
  const pageSize = 40; let page = 1;
  const params = new URLSearchParams(location.search);

  function fill(select, values, label) {
    values.forEach(v => { const o = document.createElement('option'); o.value = v; o.textContent = label ? label(v) : v; select.appendChild(o); });
  }
  fill(model, [...new Set(data.map(x=>x.model))]);
  fill(year, [...new Set(data.map(x=>x.year))].sort((a,b)=>a-b));
  fill(type, [...new Set(data.map(x=>x.type))], v => v === 'SML' ? 'Shop manual' : 'Body repair manual');
  fill(section, [...new Set(data.map(x=>x.section))].sort(), v => `Section ${v}`);

  q.value=params.get('q')||''; model.value=params.get('model')||''; year.value=params.get('year')||''; type.value=params.get('type')||''; section.value=params.get('section')||'';

  const esc = s => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const words = text => text.toLowerCase().split(/\s+/).filter(Boolean);
  function score(item, terms) {
    if (!terms.length) return 0;
    const title=item.title.toLowerCase(), hay=(item.title+' '+item.model+' '+item.year+' '+item.type+' '+item.section).toLowerCase();
    let s=0; for(const term of terms){ if(title.includes(term)) s+=8; else if(hay.includes(term)) s+=3; } return s;
  }
  function getFiltered(){
    const terms=words(q.value.trim());
    let out=data.filter(x=> (!model.value||x.model===model.value) && (!year.value||String(x.year)===year.value) && (!type.value||x.type===type.value) && (!section.value||x.section===section.value));
    if(terms.length) out=out.filter(x=>terms.every(t=>(x.title+' '+x.model+' '+x.year+' '+x.type+' '+x.section).toLowerCase().includes(t)));
    return out.sort((a,b)=>score(b,terms)-score(a,terms) || a.title.localeCompare(b.title));
  }
  function highlight(text){ const terms=words(q.value.trim()); if(!terms.length) return esc(text); const re=new RegExp('('+terms.map(t=>t.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|')+')','gi'); return esc(text).replace(re,'<mark>$1</mark>'); }
  function render(){
    const list=getFiltered(); count.textContent=list.length.toLocaleString();
    const editions=new Set(list.map(x=>`${x.model} ${x.year}`)); summary.textContent=editions.size? [...editions].slice(0,5).join(' · ')+(editions.size>5?' · …':''):'';
    const pages=Math.max(1,Math.ceil(list.length/pageSize)); if(page>pages) page=pages;
    const start=(page-1)*pageSize; const view=list.slice(start,start+pageSize);
    results.innerHTML=view.map(x=>{const href=`viewer.html?page=${encodeURIComponent(x.page)}&edition=${encodeURIComponent(x.edition)}`; return `<article class="result"><div class="badge">${x.type==='SML'?'SHOP':'BODY'} · ${x.model} · ${x.year}</div><a class="result-title" href="${href}">${highlight(x.title)}</a><div class="meta">Section ${esc(x.section)} <span>•</span> ${esc(x.content)}</div></article>`}).join('') || '<div class="empty">No procedures matched. Try a broader search.</div>';
    pager.innerHTML=''; if(pages>1){ const make=(n,text,disabled)=>{const b=document.createElement('button');b.textContent=text;b.disabled=disabled;b.onclick=()=>{page=n;render();scrollTo({top:0,behavior:'smooth'});};return b;}; pager.append(make(page-1,'←',page===1)); const lo=Math.max(1,page-2), hi=Math.min(pages,page+2); for(let n=lo;n<=hi;n++) pager.append(make(n,String(n),n===page)); pager.append(make(page+1,'→',page===pages)); }
    const url=new URL(location); for(const [k,v] of [['q',q.value],['model',model.value],['year',year.value],['type',type.value],['section',section.value]]){ if(v) url.searchParams.set(k,v); else url.searchParams.delete(k); } history.replaceState(null,'',url);
  }
  [q,model,year,type,section].forEach(el=>el.addEventListener(el===q?'input':'change',()=>{page=1;render();}));
  $('clear').onclick=()=>{q.value='';model.value='';year.value='';type.value='';section.value='';page=1;render();q.focus();};
  document.querySelectorAll('[data-quick]').forEach(b=>b.onclick=()=>{q.value=b.dataset.quick;page=1;render();q.focus();});
  render();
})();
