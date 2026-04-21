/* ══ CURSOR ══ */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
}
animateRing();

document.addEventListener('mousedown', () => cursor.style.transform = 'translate(-50%,-50%) scale(0.7)');
document.addEventListener('mouseup', () => cursor.style.transform = 'translate(-50%,-50%) scale(1)');

/* ══ NAV SCROLL ══ */
window.addEventListener('scroll', () => {
    document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 60);
});

/* ══ REVEAL ON SCROLL ══ */
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            // Trigger skill bars
            e.target.querySelectorAll('.skill-bar').forEach(bar => {
                bar.style.width = bar.dataset.width + '%';
            });
            // Trigger counters
            e.target.querySelectorAll('.counter').forEach(animateCounter);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
document.querySelectorAll('.stats-bar').forEach(el => observer.observe(el));

/* ══ COUNTER ANIMATION ══ */
function animateCounter(el) {
    if (el.dataset.animated) return;
    el.dataset.animated = 'true';
    const target = parseInt(el.dataset.target);
    const duration = 1400;
    const start = performance.now();
    function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
    }
    requestAnimationFrame(step);
}


/* ══ CASE STUDY TOGGLE ══ */
function toggleCS(trigger) {
    const item = trigger.parentElement;
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.case-study-item.open').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
}

/* ══ FORM ══ */
function handleForm(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type=submit]');
    btn.textContent = 'Message Sent ✓';
    btn.style.background = '#22c55e';
    setTimeout(() => { btn.textContent = 'Send Message'; btn.style.background = ''; e.target.reset(); }, 3000);
}
/* PROJECT DATA */
const PROJECTS = [
    { name: 'IMAGESYNC', desc: 'High-performance image similarity matcher and batch file renamer. Perceptual hashing runs entirely in the browser — privacy-first, zero server.', tags: ['JavaScript', 'Canvas API', 'DCT Hashing'], special: [], href: 'https://madushansivam.github.io/imagesync/', accent: '#FF1E1E', svgScene: 'wave', img: 'assets/IMAGESYNC.png' },
    { name: 'THE QUIET PROTOCOL', desc: 'A psychological document-processing simulator. You are the operator. Every decision is logical. By Turn 12, the world is silent.', tags: ['Vanilla JS', 'HTML', 'Narrative Design'], special: ['EXPERIMENTAL'], href: 'https://madushansivam.github.io/The-Quiet-Protocol/', accent: '#C0C0C0', svgScene: 'noise', img: 'assets/THE QUIET PROTOCOL.png' },
    { name: 'PROG. MASTERY', desc: 'Interactive learning platform for HNDIT students at ATI Badulla. Self-paced tutorials, coding exercises, real-time feedback across HTML, CSS, JS, Java & C#.', tags: ['HTML5', 'CSS3', 'JavaScript'], special: [], href: 'https://madushansivam.github.io/Programming-Mastery-Learning-Tool/', accent: '#B8926A', svgScene: 'blocks', img: 'assets/PROG.MASTERY.png' },
    { name: 'GUARDIANS OF THE WILD', desc: 'Wildlife conservation landing page with GSAP-animated species slider, editorial scroll effects, and immersive editorial design.', tags: ['GSAP', 'HTML', 'CSS', 'Editorial Design'], special: [], href: 'https://madushansivam.github.io/guardians-of-the-wild/', accent: '#4CAF50', svgScene: 'organic', img: 'assets/GUARDIANS OF THE WILD.png' },
    { name: 'HELAPIDI', desc: 'A 2D browser-based local multiplayer shooter inspired by Sri Lankan culture. Vanilla JS. No install. Just open and play.', tags: ['Vanilla JS', 'Canvas API', 'Game Dev'], special: ['FEATURED'], href: 'https://madushansivam.github.io/helapidi/', accent: '#c8ff47', svgScene: 'grid', img: 'assets/HELAPIDI.png' }
];

function buildThumbSVG(project, idx) {
    // If project has a real image, render it as <img> with a dark overlay for the caption
    if (project.img) {
        return `<div class="slide-img-wrap"><img src="${project.img}" alt="${project.name}" loading="lazy" class="slide-img"/><div class="slide-img-overlay" style="--accent:${project.accent}"></div></div>`;
    }
    const a = project.accent;
    const hex2rgba = (hex, alpha) => { const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16); return `rgba(${r},${g},${b},${alpha})`; };
    const scenes = {
        grid: `<rect width="600" height="450" fill="#0a0a0a"/>${Array.from({ length: 8 }, (_, i) => `<line x1="${i * 80}" y1="0" x2="${i * 80}" y2="450" stroke="${hex2rgba(a, 0.08)}" stroke-width="0.5"/>`).join('')}${Array.from({ length: 6 }, (_, i) => `<line x1="0" y1="${i * 75}" x2="600" y2="${i * 75}" stroke="${hex2rgba(a, 0.08)}" stroke-width="0.5"/>`).join('')}<circle cx="300" cy="225" r="100" fill="none" stroke="${hex2rgba(a, 0.3)}" stroke-width="0.8"/><circle cx="300" cy="225" r="60" fill="none" stroke="${hex2rgba(a, 0.15)}" stroke-width="0.5"/><text x="300" y="235" font-family="'Bebas Neue',sans-serif" font-size="55" fill="${hex2rgba(a, 0.12)}" text-anchor="middle">${project.name.split(' ')[0]}</text>`,
        wave: `<rect width="600" height="450" fill="#0a0a0a"/>${Array.from({ length: 12 }, (_, i) => `<path d="M0,${160 + i * 12} Q150,${130 + i * 12} 300,${160 + i * 12} Q450,${190 + i * 12} 600,${160 + i * 12}" fill="none" stroke="${hex2rgba(a, 0.1 - (i * 0.006))}" stroke-width="1"/>`).join('')}<text x="300" y="240" font-family="'Bebas Neue',sans-serif" font-size="70" fill="${hex2rgba(a, 0.1)}" text-anchor="middle">${project.name.split(' ')[0]}</text>`,
        blocks: `<rect width="600" height="450" fill="#0a0a0a"/>${Array.from({ length: 6 }, (_, i) => `<rect x="${40 + i * 88}" y="${150 + Math.sin(i) * 40}" width="60" height="${80 + i * 15}" fill="${hex2rgba(a, 0.1 + (i * 0.03))}" rx="2"/>`).join('')}<text x="300" y="380" font-family="'Bebas Neue',sans-serif" font-size="50" fill="${hex2rgba(a, 0.1)}" text-anchor="middle">${project.name.split(' ')[0]}</text>`,
        noise: `<rect width="600" height="450" fill="#060606"/><filter id="fn${idx}"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope="0.15"/></feComponentTransfer></filter><rect width="600" height="450" filter="url(#fn${idx})" fill="${a}"/><line x1="0" y1="225" x2="600" y2="225" stroke="${hex2rgba(a, 0.2)}" stroke-width="0.5"/><text x="300" y="235" font-family="'Bebas Neue',sans-serif" font-size="55" fill="${hex2rgba(a, 0.18)}" text-anchor="middle">SILENCE</text>`,
        organic: `<rect width="600" height="450" fill="#040a04"/><ellipse cx="300" cy="225" rx="160" ry="120" fill="none" stroke="${hex2rgba(a, 0.2)}" stroke-width="0.8"/><ellipse cx="300" cy="225" rx="100" ry="75" fill="none" stroke="${hex2rgba(a, 0.12)}" stroke-width="0.5"/><ellipse cx="300" cy="225" rx="200" ry="160" fill="none" stroke="${hex2rgba(a, 0.08)}" stroke-width="0.5"/><text x="300" y="235" font-family="'Bebas Neue',sans-serif" font-size="55" fill="${hex2rgba(a, 0.12)}" text-anchor="middle">WILD</text>`
    };
    return `<svg viewBox="0 0 600 450" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">${scenes[project.svgScene] || scenes.grid}</svg>`;
}

/* BUILD SLIDER DOM */
(function buildSlider() {
    const list = document.getElementById('slider-list'), stepCol = document.getElementById('step-col');
    PROJECTS.forEach((proj, i) => {
        const slide = document.createElement('div');
        slide.setAttribute('data-slider', 'slide');
        slide.className = 'slider-slide' + (i === 1 ? ' active' : '');
        slide.innerHTML = `<div class="slide-inner">${buildThumbSVG(proj, i)}<div class="slide-caption"><div class="caption-dot"></div><p class="caption-text">${String(i + 1).padStart(2, '0')} / ${proj.name}</p></div></div>`;
        list.appendChild(slide);
        const h = document.createElement('h2');
        h.setAttribute('data-slide-count', 'step');
        h.className = 'slider-count-h';
        h.textContent = String(i + 1).padStart(2, '0');
        stepCol.appendChild(h);
    });
    document.querySelector('[data-slide-count="total"]').textContent = String(PROJECTS.length).padStart(2, '0');
    document.getElementById('proj-total-display').textContent = String(PROJECTS.length).padStart(2, '0');
    renderProjInfo(1);
})();

function renderProjInfo(idx) {
    const p = PROJECTS[idx], box = document.getElementById('slider-proj-info');
    const specialTags = p.special.map(s => `<span class="slider-tag ${s === 'ONGOING' ? 'ongoing' : s === 'EXPERIMENTAL' ? 'featured' : 'ongoing'}">${s}</span>`).join('');
    const techTags = p.tags.map(t => `<span class="slider-tag">${t}</span>`).join('');
    box.innerHTML = `<p class="slider-proj-name">${p.name}</p><p class="slider-proj-desc">${p.desc}</p>${p.href && p.href !== '#' ? `<a href="${p.href}" target="_blank" rel="noopener" class="slider-proj-link">View Live ↗</a>` : ''}<div class="slider-proj-tags">${specialTags}${techTags}</div>`;
}

/* GSAP SLIDER LOOP */
(function initSlider() {
    const slides = gsap.utils.toArray('[data-slider="slide"]'), nextBtn = document.querySelector('[data-slider="button-next"]'), prevBtn = document.querySelector('[data-slider="button-prev"]'), stepCol = document.getElementById('step-col'), totalSlides = PROJECTS.length;
    const loop = horizontalLoop(slides, {
        center: false, draggable: true, repeat: -1, onChange: (element, index) => {
            slides.forEach(s => s.classList.remove('active'));
            // Offset design: the visually highlighted slide is the NEXT sibling of GSAP's current element
            const next = element.nextElementSibling || slides[0];
            next.classList.add('active');
            const steps = stepCol.querySelectorAll('[data-slide-count="step"]');
            const offset = steps[0] ? steps[0].offsetHeight : 0;
            const activeIdx = slides.indexOf(next);
            gsap.to(steps, { y: -activeIdx * offset, duration: 0.6, ease: 'power3.out' });
            renderProjInfo(activeIdx % totalSlides);
        }
    });
    slides.forEach((slide, i) => slide.addEventListener('click', () => loop.toIndex(i - 1, { ease: 'power3', duration: 0.725 })));
    nextBtn.addEventListener('click', () => loop.next({ ease: 'power3', duration: 0.725 }));
    prevBtn.addEventListener('click', () => loop.previous({ ease: 'power3', duration: 0.725 }));

    function horizontalLoop(items, config) {
        let timeline; items = gsap.utils.toArray(items); config = config || {};
        gsap.context(() => {
            let onChange = config.onChange, lastIndex = 0,
                tl = gsap.timeline({ repeat: config.repeat, onUpdate: onChange && function () { let i = tl.closestIndex(); if (lastIndex !== i) { lastIndex = i; onChange(items[i], i); } }, paused: config.paused, defaults: { ease: 'none' }, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100) }),
                length = items.length, startX = items[0].offsetLeft,
                times = [], widths = [], spaceBefore = [], xPercents = [], curIndex = 0, indexIsDirty = false,
                center = config.center, pixelsPerSecond = (config.speed || 1) * 100,
                snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1), timeOffset = 0,
                container = center === true ? items[0].parentNode : gsap.utils.toArray(center)[0] || items[0].parentNode, totalWidth,
                getTotalWidth = () => items[length - 1].offsetLeft + xPercents[length - 1] / 100 * widths[length - 1] - startX + spaceBefore[0] + items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], 'scaleX') + (parseFloat(config.paddingRight) || 0),
                populateWidths = () => { let b1 = container.getBoundingClientRect(), b2; items.forEach((el, i) => { widths[i] = parseFloat(gsap.getProperty(el, 'width', 'px')); xPercents[i] = snap(parseFloat(gsap.getProperty(el, 'x', 'px')) / widths[i] * 100 + gsap.getProperty(el, 'xPercent')); b2 = el.getBoundingClientRect(); spaceBefore[i] = b2.left - (i ? b1.right : b1.left); b1 = b2; }); gsap.set(items, { xPercent: i => xPercents[i] }); totalWidth = getTotalWidth(); },
                timeWrap,
                populateOffsets = () => { timeOffset = center ? tl.duration() * (container.offsetWidth / 2) / totalWidth : 0; center && times.forEach((t, i) => { times[i] = timeWrap(tl.labels['label' + i] + tl.duration() * widths[i] / 2 / totalWidth - timeOffset); }); },
                getClosest = (values, value, wrap) => { let i = values.length, closest = 1e10, index = 0, d; while (i--) { d = Math.abs(values[i] - value); if (d > wrap / 2) d = wrap - d; if (d < closest) { closest = d; index = i; } } return index; },
                populateTimeline = () => { let i, item, curX, distanceToStart, distanceToLoop; tl.clear(); for (i = 0; i < length; i++) { item = items[i]; curX = xPercents[i] / 100 * widths[i]; distanceToStart = item.offsetLeft + curX - startX + spaceBefore[0]; distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, 'scaleX'); tl.to(item, { xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond }, 0).fromTo(item, { xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100) }, { xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false }, distanceToLoop / pixelsPerSecond).add('label' + i, distanceToStart / pixelsPerSecond); times[i] = distanceToStart / pixelsPerSecond; } timeWrap = gsap.utils.wrap(0, tl.duration()); },
                refresh = deep => { let progress = tl.progress(); tl.progress(0, true); populateWidths(); deep && populateTimeline(); populateOffsets(); deep && tl.draggable ? tl.time(times[curIndex], true) : tl.progress(progress, true); }, proxy;
            gsap.set(items, { x: 0 }); populateWidths(); populateTimeline(); populateOffsets();
            window.addEventListener('resize', () => refresh(true));
            function toIndex(index, vars) { vars = vars || {}; (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); let newIndex = gsap.utils.wrap(0, length, index), time = times[newIndex]; if (time > tl.time() !== index > curIndex && index !== curIndex) time += tl.duration() * (index > curIndex ? 1 : -1); if (time < 0 || time > tl.duration()) vars.modifiers = { time: timeWrap }; curIndex = newIndex; vars.overwrite = true; gsap.killTweensOf(proxy); return vars.duration === 0 ? tl.time(timeWrap(time)) : tl.tweenTo(time, vars); }
            tl.toIndex = (index, vars) => toIndex(index, vars);
            tl.closestIndex = setCurrent => { let index = getClosest(times, tl.time(), tl.duration()); if (setCurrent) { curIndex = index; indexIsDirty = false; } return index; };
            tl.current = () => indexIsDirty ? tl.closestIndex(true) : curIndex;
            tl.next = vars => toIndex(tl.current() + 1, vars);
            tl.previous = vars => toIndex(tl.current() - 1, vars);
            tl.times = times; tl.progress(1, true).progress(0, true);
            if (config.reversed) { tl.vars.onReverseComplete(); tl.reverse(); }
            if (config.draggable && typeof Draggable === 'function') {
                proxy = document.createElement('div');
                let wrap = gsap.utils.wrap(0, 1), ratio, startProgress, draggable, lastSnap, initChangeX, wasPlaying,
                    align = () => tl.progress(wrap(startProgress + (draggable.startX - draggable.x) * ratio)), syncIndex = () => tl.closestIndex(true);
                draggable = Draggable.create(proxy, {
                    trigger: items[0].parentNode, type: 'x',
                    onPressInit() { let x = this.x; gsap.killTweensOf(tl); wasPlaying = !tl.paused(); tl.pause(); startProgress = tl.progress(); refresh(); ratio = 1 / totalWidth; initChangeX = (startProgress / -ratio) - x; gsap.set(proxy, { x: startProgress / -ratio }); },
                    onDrag: align, onThrowUpdate: align, overshootTolerance: 0, inertia: true,
                    snap(value) { if (Math.abs(startProgress / -ratio - this.x) < 10) return lastSnap + initChangeX; let time = -(value * ratio) * tl.duration(), wrappedTime = timeWrap(time), snapTime = times[getClosest(times, wrappedTime, tl.duration())], dif = snapTime - wrappedTime; Math.abs(dif) > tl.duration() / 2 && (dif += dif < 0 ? tl.duration() : -tl.duration()); lastSnap = (time + dif) / tl.duration() / -ratio; return lastSnap; },
                    onRelease() { syncIndex(); draggable.isThrowing && (indexIsDirty = true); },
                    onThrowComplete: () => { syncIndex(); wasPlaying && tl.play(); }
                })[0]; tl.draggable = draggable;
            }
            tl.closestIndex(true); lastIndex = curIndex; onChange && onChange(items[curIndex], curIndex); timeline = tl;
        }); return timeline;
    }
})();

/* THREE.JS HERO */
(function initHero() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas || typeof THREE === 'undefined') return;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight); renderer.setClearColor(0x000000, 0);
    const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 3.5;
    const icoGeo = new THREE.IcosahedronGeometry(1.1, 1), icoMat = new THREE.MeshBasicMaterial({ color: 0xFF1E1E, wireframe: true, opacity: 0.55, transparent: true }), ico = new THREE.Mesh(icoGeo, icoMat);
    ico.position.set(1.8, 0, 0); scene.add(ico);
    const ringGeo = new THREE.TorusGeometry(1.6, 0.002, 2, 80), ringMat = new THREE.MeshBasicMaterial({ color: 0xFF1E1E, opacity: 0.18, transparent: true }), torus = new THREE.Mesh(ringGeo, ringMat);
    torus.position.set(1.8, 0, 0); torus.rotation.x = Math.PI / 2.2; scene.add(torus);
    const pCount = 280, pPos = new Float32Array(pCount * 3); for (let i = 0; i < pCount * 3; i++)pPos[i] = (Math.random() - 0.5) * 9;
    const pGeo = new THREE.BufferGeometry(); pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ color: 0xc8ff47, size: 0.018, sizeAttenuation: true, opacity: 0.7, transparent: true }), pts = new THREE.Points(pGeo, pMat); scene.add(pts);
    let tX = 0, tY = 0, cX = 0, cY = 0;
    document.addEventListener('mousemove', e => { tY = (e.clientX / window.innerWidth - 0.5) * 0.6; tX = (e.clientY / window.innerHeight - 0.5) * 0.4; });
    window.addEventListener('resize', () => { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); });
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; let f = 0;
    (function anim() { requestAnimationFrame(anim); f += 0.004; if (!reduced) { cX += (tX - cX) * 0.04; cY += (tY - cY) * 0.04; ico.rotation.x = f * 0.3 + cX; ico.rotation.y = f * 0.5 + cY; torus.rotation.z = f * 0.2; pts.rotation.y = f * 0.05 + cY * 0.3; pts.rotation.x = cX * 0.2; } renderer.render(scene, camera); })();
})();

/* HERO PARALLAX TITLE */
const nameFirst = document.getElementById('name-first'), nameLast = document.getElementById('name-last');
if (nameFirst && nameLast) { document.addEventListener('mousemove', e => { const x = (e.clientX / window.innerWidth - 0.5); nameFirst.style.transform = `translateX(${x * 40}px)`; nameLast.style.transform = `translateX(${x * -40}px)`; }); }

/* MARQUEE BUILD */
const mWords = [{ t: 'FRONTEND DEVELOPER', c: 'cream' }, { t: '·', c: 'sep' }, { t: 'UI/UX DESIGNER', c: 'crimson' }, { t: '·', c: 'sep' }, { t: 'VANILLA JS', c: 'cream' }, { t: '·', c: 'sep' }, { t: 'THREE.JS', c: 'crimson' }, { t: '·', c: 'sep' }, { t: 'GSAP', c: 'cream' }, { t: '·', c: 'sep' }, { t: 'IMAGESYNC', c: 'crimson' }, { t: '·', c: 'sep' }, { t: 'HELAPIDI', c: 'cream' }, { t: '·', c: 'sep' }, { t: 'SRI LANKA', c: 'crimson' }, { t: '·', c: 'sep' }, { t: 'HNDIT · SLIATE', c: 'cream' }, { t: '·', c: 'sep' }];
const mTrack = document.getElementById('marquee-track');
if (mTrack) { [...mWords, ...mWords, ...mWords, ...mWords].forEach(w => { const span = document.createElement('span'); span.className = 'marquee-item ' + w.c; span.textContent = w.t; mTrack.appendChild(span); }); }

/* MAGNETIC BUTTON */
const mbtn = document.getElementById('magnetic-btn');
if (mbtn) { mbtn.addEventListener('mousemove', e => { const r = mbtn.getBoundingClientRect(); mbtn.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.3}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)`; }); mbtn.addEventListener('mouseleave', () => { mbtn.style.transition = 'transform 0.6s cubic-bezier(0.23,1,0.32,1)'; mbtn.style.transform = 'translate(0,0)'; setTimeout(() => mbtn.style.transition = '', 600); }); }

/* AMBIENT MUSIC — WEB AUDIO SYNTHESIZER */
(function initAmbientMusic() {
    const btn = document.getElementById('music-btn'), icon = document.getElementById('music-icon');
    if (!btn) return;
    let ctx = null, playing = false, masterGain = null, oscillators = [], lfoNodes = [];
    const pads = [{ freq: 55, gain: .06, detune: 0 }, { freq: 82.4, gain: .04, detune: 5 }, { freq: 110, gain: .03, detune: -8 }, { freq: 164.8, gain: .025, detune: 3 }, { freq: 220, gain: .018, detune: 7 }, { freq: 246.9, gain: .012, detune: -4 }];
    function buildSynth(c) {
        masterGain = c.createGain(); masterGain.gain.setValueAtTime(0, c.currentTime); masterGain.connect(c.destination);
        const bufLen = c.sampleRate * 3.5, irBuf = c.createBuffer(2, bufLen, c.sampleRate);
        for (let ch = 0; ch < 2; ch++) { const data = irBuf.getChannelData(ch); for (let i = 0; i < bufLen; i++)data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufLen, 2.4); }
        const reverb = c.createConvolver(); reverb.buffer = irBuf; const reverbGain = c.createGain(); reverbGain.gain.value = 0.55;
        masterGain.connect(reverb); reverb.connect(reverbGain); reverbGain.connect(c.destination);
        pads.forEach(pad => {
            const osc = c.createOscillator(); osc.type = 'sine'; osc.frequency.value = pad.freq; osc.detune.value = pad.detune;
            const lfo = c.createOscillator(); lfo.type = 'sine'; lfo.frequency.value = 0.05 + Math.random() * 0.1;
            const lfoGain = c.createGain(); lfoGain.gain.value = 1.5 + Math.random() * 2; lfo.connect(lfoGain); lfoGain.connect(osc.detune);
            const gain = c.createGain(); gain.gain.value = pad.gain; osc.connect(gain); gain.connect(masterGain); osc.start(); lfo.start(); oscillators.push(osc); lfoNodes.push(lfo);
        });
    }
    function fadeIn() { masterGain.gain.cancelScheduledValues(ctx.currentTime); masterGain.gain.setValueAtTime(masterGain.gain.value, ctx.currentTime); masterGain.gain.linearRampToValueAtTime(1, ctx.currentTime + 3); }
    function fadeOut(cb) { masterGain.gain.cancelScheduledValues(ctx.currentTime); masterGain.gain.setValueAtTime(masterGain.gain.value, ctx.currentTime); masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 2); setTimeout(cb, 2200); }
    btn.addEventListener('click', () => {
        if (!ctx) { ctx = new (window.AudioContext || window.webkitAudioContext)(); buildSynth(ctx); }
        if (ctx.state === 'suspended') ctx.resume();
        if (!playing) { playing = true; btn.classList.add('playing'); icon.textContent = '⏸'; fadeIn(); }
        else { playing = false; btn.classList.remove('playing'); icon.textContent = '♫'; fadeOut(() => { if (!playing && ctx) { oscillators.forEach(o => { try { o.stop(); } catch (e) { } }); lfoNodes.forEach(l => { try { l.stop(); } catch (e) { } }); ctx.close(); ctx = null; oscillators = []; lfoNodes = []; masterGain = null; } }); }
    });
})();

/* REVEAL OBSERVER for v1 sections */
const v1RevealIO = new IntersectionObserver(entries => { entries.forEach(e => { if (!e.isIntersecting) return; const el = e.target; const delay = parseFloat(el.style.transitionDelay || '0'); setTimeout(() => el.classList.add('visible'), delay * 1000); v1RevealIO.unobserve(el); }); }, { threshold: 0.12 });
document.querySelectorAll('#experience .reveal, #projects .reveal').forEach(el => v1RevealIO.observe(el));

/* ══ ABOUT PHOTO SLIDESHOW ══ */
(function initAboutSlideshow() {
    const photos = ['assets/madu_1.jpg', 'assets/madu_2.jpeg', 'assets/madu_3.jpeg'];
    const frame = document.querySelector('.about-photo-frame');
    if (!frame) return;

    // Build slideshow structure
    frame.innerHTML = '';
    frame.style.overflow = 'hidden';
    frame.style.position = 'relative';

    const slides = photos.map((src, i) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = 'Madushan Samayasivam';
        img.loading = i === 0 ? 'eager' : 'lazy';
        img.className = 'about-slideshow-img';
        img.style.cssText = `
            position: absolute; inset: 0;
            width: 100%; height: 100%;
            object-fit: cover;
            opacity: ${i === 0 ? 1 : 0};
            transition: opacity 1.1s cubic-bezier(0.4, 0, 0.2, 1);
            will-change: opacity;
        `;
        frame.appendChild(img);
        return img;
    });

    // Dot indicators
    const dotsWrap = document.createElement('div');
    dotsWrap.style.cssText = 'position:absolute;bottom:10px;left:50%;transform:translateX(-50%);display:flex;gap:5px;z-index:3;';
    const dots = photos.map((_, i) => {
        const d = document.createElement('div');
        d.style.cssText = `width:5px;height:5px;border-radius:50%;background:${i === 0 ? 'var(--accent)' : 'rgba(255,255,255,0.35)'};transition:background 0.4s,transform 0.4s;${i === 0 ? 'transform:scale(1.3)' : ''}`;
        dotsWrap.appendChild(d);
        return d;
    });
    frame.appendChild(dotsWrap);

    let current = 0;
    function goTo(next) {
        slides[current].style.opacity = '0';
        dots[current].style.background = 'rgba(255,255,255,0.35)';
        dots[current].style.transform = 'scale(1)';
        current = next;
        slides[current].style.opacity = '1';
        dots[current].style.background = 'var(--accent)';
        dots[current].style.transform = 'scale(1.3)';
    }

    setInterval(() => goTo((current + 1) % photos.length), 3500);
})();
