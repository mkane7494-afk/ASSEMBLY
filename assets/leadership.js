(function () {
  var root = document.getElementById('dcroot');
  var one = function (s) { return root.querySelector(s); };
  var q = function (s) { return Array.prototype.slice.call(root.querySelectorAll(s)); };

  // ---- Mobile menu
  var menu = one('[data-a="menu"]');
  var closeMenu = function () { if (menu) menu.style.display = 'none'; };
  var openMenu = function () {
    if (!menu) return; menu.style.display = 'flex';
    if (window.gsap) { gsap.fromTo(menu, { opacity: 0 }, { opacity: 1, duration: 0.4 }); gsap.from(q('[data-a="menu-links"] > a'), { y: 24, opacity: 0, duration: 0.7, stagger: 0.06, ease: 'expo.out' }); }
    var c = one('[data-a="menu-close"]'); if (c) c.focus();
  };
  var mo = one('[data-a="menu-open"]'), mc = one('[data-a="menu-close"]');
  if (mo) mo.addEventListener('click', openMenu);
  if (mc) mc.addEventListener('click', closeMenu);
  q('[data-a="menu-links"] > a').forEach(function (a) { a.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  var g = window.gsap, ST = window.ScrollTrigger;
  if (!g) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (ST) g.registerPlugin(ST);

  var start = function () {
    // ---- Intro
    var tl = g.timeline({ defaults: { ease: 'expo.out' } });
    tl.from(one('[data-a="nav"]'), { y: -20, opacity: 0, duration: 1.2 }, 0)
      .fromTo(one('[data-a="portrait"] > div'), { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'expo.inOut' }, 0.05)
      .from(one('[data-a="portrait-img"]'), { scale: 1.18, duration: 2.4 }, 0.05)
      .from(one('[data-a="portrait"] figcaption'), { opacity: 0, y: 12, duration: 1 }, 1.1)
      .from(q('.w > span'), { yPercent: 118, duration: 1.5, stagger: 0.08 }, 0.35)
      .from(q('[data-a="hero-fade"]'), { y: 24, opacity: 0, duration: 1.3, stagger: 0.12 }, 0.7)
      .from(one('[data-a="hero-rule"]'), { scaleX: 0, transformOrigin: 'left center', duration: 1.8, ease: 'expo.inOut' }, 0.8)
      .from(q('[data-a="index"] > *'), { y: 26, opacity: 0, duration: 1.2, stagger: 0.1 }, 1.1)
      .fromTo(one('[data-a="glint"]'), { xPercent: 0, opacity: 1 }, { xPercent: 640, duration: 2.6, ease: 'power2.inOut' }, 1.0)
      .set(one('[data-a="glint"]'), { opacity: 0 });

    if (!ST) return;
    // ---- Smooth scrolling (desktop pointers only)
    if (window.Lenis && !(window.matchMedia && window.matchMedia('(pointer: coarse)').matches)) {
      var lenis = new window.Lenis({ duration: 1.15, easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); }, smoothWheel: true });
      lenis.on('scroll', ST.update);
      g.ticker.add(function (time) { lenis.raf(time * 1000); });
      g.ticker.lagSmoothing(0);
      root.addEventListener('click', function (e) {
        var a = e.target.closest ? e.target.closest('a[href^="#"]') : null; if (!a) return;
        var dest = root.querySelector(a.getAttribute('href')); if (!dest) return;
        e.preventDefault(); closeMenu(); lenis.scrollTo(dest, { duration: 1.4 });
      });
    }
    var content = one('[data-a="content"]');
    // ---- Nav: solid once scrolling, hides going down
    var nav = one('[data-a="nav"]'), shown = true, solid = false;
    ST.create({ trigger: content, start: 'top top', end: 'bottom bottom', onUpdate: function (s) {
      var y = s.scroll();
      if ((y > 60) !== solid) { solid = y > 60; g.to(nav, { backgroundColor: solid ? 'rgba(10,10,11,0.94)' : 'rgba(10,10,11,0)', borderBottomColor: solid ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0)', duration: 0.5 }); }
      var want = !(s.direction === 1 && y > 500);
      if (want !== shown) { shown = want; g.to(nav, { yPercent: want ? 0 : -100, duration: 0.6, ease: 'power3.out' }); }
    } });
    g.to(one('[data-a="scrollbar"]'), { scaleX: 1, ease: 'none', scrollTrigger: { trigger: content, start: 'top top', end: 'bottom bottom', scrub: 0.3 } });
    // ---- Portrait drifts as the hero leaves
    g.to(one('[data-a="portrait-img"]'), { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '#top', start: 'top top', end: 'bottom top', scrub: 0.6 } });
    // ---- Reveals
    q('[data-a="reveal"]').forEach(function (el) { g.from(el, { y: 60, opacity: 0, duration: 1.5, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } }); });
    q('[data-a="stagger"]').forEach(function (el) { g.from(el.children, { y: 40, opacity: 0, duration: 1.3, ease: 'expo.out', stagger: 0.12, scrollTrigger: { trigger: el, start: 'top 85%', once: true } }); });
    q('[data-a="caps"] > div').forEach(function (row, i) { g.from(row, { clipPath: 'inset(0 100% 0 0)', duration: 1.5, ease: 'expo.inOut', delay: i * 0.04, scrollTrigger: { trigger: row, start: 'top 90%', once: true } }); });
    var st = one('[data-a="statement"]');
    if (st) g.fromTo(st.querySelectorAll('.sw'), { opacity: 0.12 }, { opacity: 1, stagger: 0.05, ease: 'none', scrollTrigger: { trigger: st, start: 'top 80%', end: 'bottom 50%', scrub: 0.6 } });
    var line = one('[data-a="line"]');
    if (line) g.from(line, { scaleX: 0, transformOrigin: 'left center', ease: 'none', scrollTrigger: { trigger: line, start: 'top 90%', end: 'top 55%', scrub: 0.6 } });
    var wm = one('[data-a="wordmark"]');
    if (wm) g.from(wm, { yPercent: 40, opacity: 0, duration: 1.8, ease: 'expo.out', scrollTrigger: { trigger: wm, start: 'top 98%', once: true } });
    ST.refresh();
  };
  var started = false, go = function () { if (started) return; started = true; start(); };
  if (document.fonts && document.fonts.ready) { document.fonts.ready.then(go); setTimeout(go, 1500); } else go();
})();
