'use strict';
const dialog = document.querySelector('#details');
const panel = document.querySelector('#panel-body');
let content = {about:'To be announced.', weeks:[], meeting:{day:'Thursday',time:'6:30–8:00 PM',timezone:'Eastern Time',location:'Philosophy Department',room:'Room 302'}};
let failed = false;
const ready = fetch('content.json').then(r=>{if(!r.ok)throw Error('content');return r.json()}).then(data=>{content=data;syncMeeting()}).catch(()=>{failed=true});
const escapeHTML = value => String(value).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function meetingMarkup(){const m=content.meeting;return `<dl class="meeting-details"><dt>When</dt><dd>Every ${escapeHTML(m.day)}<br>${escapeHTML(m.time)}<br>${escapeHTML(m.timezone)}</dd><dt>Where</dt><dd>${escapeHTML(m.location)}<br>${escapeHTML(m.room)}</dd></dl>`}
function syncMeeting(){const m=content.meeting;document.querySelector('.tiny-label').textContent=`${m.day.toUpperCase()}S`;document.querySelector('.meeting-time').innerHTML=`${escapeHTML(m.time.replace(/\s*PM$/,''))} <span>PM · ${escapeHTML(m.timezone)}</span>`;document.querySelector('.meeting-place').textContent=`${m.location} / ${m.room}`}
function weeklyMarkup(kind) {
  if (failed) return '<p>Unable to load. Please refresh.</p>';
  if (!content.weeks.length) return '<p>To be announced.</p>';
  return content.weeks.map(week => {
    const date = week.date ? new Date(week.date + 'T12:00:00') : null;
    const label = date && !Number.isNaN(date.getTime())
      ? date.toLocaleDateString('en-US', {month:'long', day:'numeric', year:'numeric'})
      : 'Date to be announced';
    let body;
    if (kind === 'topics') {
      body = `<h3>${escapeHTML(week.topic || 'To be announced.')}</h3>`;
    } else {
      body = (week.readings || []).map(reading => {
        let url;
        try { url = new URL(reading.url); } catch { return `<p>${escapeHTML(reading.title)} · Link pending</p>`; }
        if (!['https:', 'http:'].includes(url.protocol)) return '';
        return `<a href="${escapeHTML(url.href)}" target="_blank" rel="noopener noreferrer">${escapeHTML(reading.title)}</a>`;
      }).join('') || '<p>To be announced.</p>';
    }
    return `<article class="week"><time>${label}</time>${body}</article>`;
  }).join('');
}
let opener;
document.querySelectorAll('[data-panel]').forEach(button => button.addEventListener('click', async () => {
  await ready;
  opener = button;
  const name = button.dataset.panel;
  const titles = {about:'About', topics:'Weekly topics', readings:'Weekly readings', meeting:'Schedule'};
  const body = name === 'about' ? `<p>${escapeHTML(content.about)}</p>`
    : name === 'meeting' ? meetingMarkup() : weeklyMarkup(name);
  panel.innerHTML = `<h2 id="panel-title">${titles[name]}</h2>${body}`;
  if (!dialog.open) dialog.showModal();
  dialog.scrollTop = 0;
}));
document.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click',event=>{const r=dialog.getBoundingClientRect();if(event.target===dialog&&(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom))dialog.close()});dialog.addEventListener('close',()=>opener?.focus());
const reduced = matchMedia('(prefers-reduced-motion: reduce)');let paused=reduced.matches;const motion=document.querySelector('#motion');function reflectMotion(){document.body.classList.toggle('paused',paused);motion.setAttribute('aria-pressed',String(paused));motion.innerHTML=paused?'<span aria-hidden="true">▷</span> Resume motion':'<span aria-hidden="true">Ⅱ</span> Pause motion'}motion.addEventListener('click',()=>{paused=!paused;reflectMotion()});reduced.addEventListener('change',event=>{paused=event.matches;reflectMotion()});reflectMotion();
const swimmers=[...document.querySelectorAll('.swimmer')].map(el=>({el,phase:Number(el.dataset.phase)+Math.random()*.7,speed:.7+Math.random()*.4}));let elapsed=0,last=0;function animate(now){const dt=last?Math.min(now-last,60):0;last=now;if(!paused&&!dialog.open&&!document.hidden){elapsed+=dt/1000;const small=innerWidth<600;for(const s of swimmers){if(s.el.matches(':hover')||s.el.contains(document.activeElement))continue;const t=elapsed*s.speed;const x=Math.sin(t*.18+s.phase)*(small?8:22);const y=Math.cos(t*.24+s.phase)*(small?11:18);const a=Math.sin(t*.17+s.phase)*3;s.el.style.transform=`translate(${x}px,${y}px) rotate(${a}deg)`}}requestAnimationFrame(animate)}requestAnimationFrame(animate);
for(let i=0;i<32;i++){const dot=document.createElement('i');dot.className='particle';dot.style.cssText=`left:${Math.random()*100}%;top:${Math.random()*100}%;animation-delay:-${Math.random()*15}s;animation-duration:${10+Math.random()*15}s`;document.querySelector('#particles').appendChild(dot)}
