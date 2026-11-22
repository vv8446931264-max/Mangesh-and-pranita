/* ---- compatibility for older phone browsers ---- */
if (!('IntersectionObserver' in window)){ window.IntersectionObserver = function(cb){ this.observe = function(el){ setTimeout(function(){ cb([{isIntersecting:true, target:el}]); }, 0); }; this.unobserve = this.disconnect = function(){}; }; }
if (!Element.prototype.animate){ Element.prototype.animate = function(){ var a = {cancel:function(){}}; setTimeout(function(){ if (a.onfinish) a.onfinish(); }, 0); return a; }; }
if (!window.matchMedia){ window.matchMedia = function(){ return {matches:false, addListener:function(){}, removeListener:function(){}}; }; }
/* ===== EDIT YOUR DETAILS HERE ===== */
const C = {
  groom: "Mangesh", bride: "Pranita",                       // shown big on the cover
  groomFull: "Mangesh Mohan Nikam", brideFull: "Pranita Maruti Abhang",
  groomFamily: "B.E. (Computer)<br>कै. दत्तात्रय बाळू निकम यांचे नातू व<br>गं.भा. मंगल मोहन दत्तात्रय निकम यांचे चिरंजीव<br>रा. दुधंडी, ता. पलूस, जि. सांगली",
  brideFamily: "B.E. (Computer)<br>कै. शामराव नाना अभंग यांची नात व<br>श्री. मारुती शामराव अभंग यांची सुकन्या<br>रा. येडे (उपाळे), ता. कडेगाव, जि. सांगली",
  deities: ["श्री खंडोबा प्रसन्न", "श्री गजानन प्रसन्न", "श्री तुळजाभवानी प्रसन्न"],
  inviteMr: "या मराठमोळ्या विवाह सोहळ्यास उपस्थित राहून वधू-वरास शुभाशीर्वाद द्यावेत, हीच आमची इच्छा. म्हणून आपणांस हे आग्रहाचे आमंत्रण.",
  city: "Kadegaon, Sangli",
  venueName: "Shree Datta Mangal Lawns",
  venueAddr: "Hingangaon Budruk, Kadepur-Pusesawli Road, Tal. Kadegaon, Dist. Sangli, Maharashtra",
  mapsUrl: "https://share.google/Tv4ph9Ms2UPlllH7M",        // Get Directions opens this
  mapsQuery: "Shree Datta Mangal Lawns, Hingangaon Budruk, Kadegaon, Sangli",
  whatsapp: "919768313578",                                  // country code + number, no + or spaces
  blessings: "आपले स्नेहांकित<br>निकम व अभंग परिवार",
  /* Music for each part of the page: mp3 files in the "audio" folder. A missing file falls back to the built-in music. */
  audio: { main:"audio/main.mp3", sakharpuda:"audio/sakharpuda.mp3", haldi:"audio/haldi.mp3", lagna:"audio/lagna.mp3", saptapadi:"audio/saptapadi.mp3" },
  trackNames: { main:"Indian Flute \u2022 Antti Luode", sakharpuda:"Happy Sitar \u2022 Antti Luode", haldi:"Maharashtrian dhol", lagna:"Nadaswaram & thavil \u2022 mangal vadya", saptapadi:"Veena \u2022 Shri Nilotpala Nayike" },  // shown briefly when the music changes
  credits: [                                               // attribution for the music (Wikimedia Commons), shown small in the footer
    `<a href="https://commons.wikimedia.org/wiki/File:Indian_Flute_(Antti_Luode).mp3">Indian Flute</a> &amp; <a href="https://commons.wikimedia.org/wiki/File:Happy_sitar_(Antti_Luode).mp3">Happy Sitar</a> by Antti Luode, <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>`,
    `<a href="https://commons.wikimedia.org/wiki/File:Maharashtian_Dhol_Perform_002.ogg">Maharashtrian Dhol Perform 002</a> by Satyam Vishwakarma, <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a> (converted to MP3)`,
    `<a href="https://commons.wikimedia.org/wiki/File:Thakil_%26_Nadaswaram_during_temple_Deeparadhana.ogg">Thakil &amp; Nadaswaram during temple Deeparadhana</a> by Vis M, <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a> (excerpt, volume adjusted)`,
    `<a href="https://commons.wikimedia.org/wiki/File:Shri_Nilotpala_Nayike,_rendered_on_the_Veena_by_L_Ramakishnan.ogg">Shri Nilotpala Nayike</a> on veena by L Ramakrishnan, CC0`
  ],
  events: [   /* keep the ids: sakharpuda, haldi, lagna, saptapadi. Times are 24-hour. */
    { id:"sakharpuda", mr:"साखरपुडा",   en:"Engagement",       date:"2026-12-12", time:"12:21", dur:2,
      text:"Two families come together. Rings are exchanged, sweets are shared and the celebrations begin with blessings." },
    { id:"haldi",      mr:"हळद",        en:"Haldi",            date:"2026-12-13", time:"08:21", dur:2,
      text:"Turmeric, music and laughter. A golden blessing for good fortune before the vows." },
    { id:"saptapadi",  mr:"सप्तपदी",    en:"Saat Phere",       date:"2026-12-13", label:"Wedding day", cal:false,
      text:"Seven rounds around the sacred fire. Seven vows. A bond for seven lifetimes." },
    { id:"lagna",      mr:"लग्न सोहळा", en:"Wedding Ceremony", date:"2026-12-13", time:"14:41", dur:3,
      text:"At the auspicious muhurat, the Antarpat is lifted, mangalashtak is chanted, and the couple exchange varmala and rings." }
  ]
};
/* ================================== */

const $ = id => document.getElementById(id);
const dOf = e => new Date(`${e.date}T${e.time || '00:00'}`);
const fmtD = (e,o) => dOf(e).toLocaleDateString('en-GB', o);
const t12 = t => { const [h,m]=t.split(':').map(Number); return `${((h+11)%12)+1}:${String(m).padStart(2,'0')} ${h<12?'AM':'PM'}`; };
const whenOf = e => e.time ? t12(e.time) : e.label;
const full = {weekday:'long',day:'numeric',month:'long',year:'numeric'};
const DPR = Math.min(devicePixelRatio||1, 2), SMALL = innerWidth < 600;
const NS = 'http://www.w3.org/2000/svg';
const first = C.events[0], last = C.events[C.events.length-1];
const lag = C.events.find(e => e.id === 'lagna') || last;

/* ---------- Static text ---------- */
document.title = `${C.groomFull} weds ${C.brideFull} - Wedding Invitation`;
$('gName').textContent = C.groom; $('bName').textContent = C.bride;
$('groom').textContent = C.groomFull; $('bride').textContent = C.brideFull;
$('groomFam').innerHTML = C.groomFamily; $('brideFam').innerHTML = C.brideFamily;
$('deities').innerHTML = '<span>\u0965 ' + C.deities[1] + ' \u0965</span>';
$('inviteMr').textContent = C.inviteMr;
$('heroWhen').innerHTML = '<span class="wd">' + (first.date !== last.date
  ? `${dOf(first).getDate()} \u2013 ${fmtD(last,{day:'numeric',month:'long',year:'numeric'})}`
  : fmtD(last,{day:'numeric',month:'long',year:'numeric'})) + '</span><span class="wdot"> \u2022 </span><span class="wp">' + C.city + '</span>';
$('venueName').textContent = C.venueName; $('venueAddr').textContent = C.venueAddr; $('mapName').textContent = C.venueName;
$('signoff').textContent = `${C.groom} & ${C.bride}`; $('blessings').innerHTML = C.blessings;
$('cdText').textContent = `to the wedding, ${fmtD(lag,full)}, ${t12(lag.time)}`;
$('dir').href = C.mapsUrl || ('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(C.mapsQuery));
/* the two contact cards open WhatsApp with a ready message (the guest's name is added when the link has ?to=Name) */
const waMsg = () => `Namaskar! We will be happy to join ${C.groom} & ${C.bride}'s wedding.`;
document.querySelectorAll('.contact[data-wa]').forEach(a => { a.href = `https://wa.me/${a.dataset.wa}?text=` + encodeURIComponent(waMsg()); });

/* ---------- Map card details ---------- */
$('mapLawn').innerHTML = [0,1,2,3,4,5].map(i => `<circle cx="${176+i*10}" cy="${64+(i%2)*3}" r="3" fill="#6fae6a"/>`).join('');
$('mapBld').innerHTML = [[250,150],[268,152],[286,148],[110,96],[126,92],[92,104],[300,60],[318,64]].map(([x,y]) => `<rect x="${x}" y="${y}" width="12" height="9" rx="1.5" fill="#d9c9ae" stroke="#bfae92" stroke-width=".7"/>`).join('');
$('mapTrees').innerHTML = [[40,30],[56,44],[30,60],[352,40],[372,60],[40,200],[364,214],[240,30],[300,220]].map(([x,y]) => `<circle cx="${x}" cy="${y}" r="5.5" fill="#8fc27f"/>`).join('');
/* ---------- Calendar ---------- */
const pad = n => String(n).padStart(2,'0');
const stampD = d => `${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
const calEvents = C.events.filter(e => e.time && e.cal !== false);
const loc = `${C.venueName}, ${C.venueAddr}`;
const evTitle = e => `${e.en} - ${C.groomFull} weds ${C.brideFull}`;
const endOf = e => new Date(dOf(e).getTime() + (e.dur||2)*36e5);
const gcal = e => 'https://calendar.google.com/calendar/render?action=TEMPLATE'
  + `&text=${encodeURIComponent(evTitle(e))}&dates=${stampD(dOf(e))}/${stampD(endOf(e))}&ctz=Asia/Kolkata`
  + `&location=${encodeURIComponent(loc)}`;
$('cal').innerHTML = calEvents.map(e => `
  <div class="calrow"><div><b class="mr">${e.mr}</b><span>${fmtD(e,{weekday:'long',day:'numeric',month:'long'})} &bull; ${t12(e.time)}</span></div>
  <a class="btn" href="${gcal(e)}" target="_blank" rel="noopener">Add</a></div>`).join('');
const ics = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Wedding Invitation//EN'];
calEvents.forEach(e => ics.push('BEGIN:VEVENT', `UID:${e.id}-${e.date}@wedding-invite`, `DTSTAMP:${stampD(new Date())}`,
  `DTSTART:${stampD(dOf(e))}`, `DTEND:${stampD(endOf(e))}`, `SUMMARY:${evTitle(e)}`,
  `LOCATION:${loc.replace(/,/g,'\\,')}`, 'END:VEVENT'));
ics.push('END:VCALENDAR');
$('ics').href = URL.createObjectURL(new Blob([ics.join('\r\n')], {type:'text/calendar;charset=utf-8'}));
