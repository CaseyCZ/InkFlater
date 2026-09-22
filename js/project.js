(() => {
  const body = document.body;
  const topbar = document.getElementById('topbar');
  const menuButton = document.querySelector('.menu-button');
  const nav = document.getElementById('nav');
  const navLinks = [...document.querySelectorAll('.nav a')];
  const dialog = document.getElementById('lightbox');
  const dialogImage = document.getElementById('lightbox-image');
  const dialogCaption = document.getElementById('lightbox-caption');
  const closeButton = document.querySelector('.lightbox-close');
  const prevButton = document.querySelector('.lightbox-prev');
  const nextButton = document.querySelector('.lightbox-next');
  let currentIndex = 0;

  const gallery = [
    ['images/items/item-1.jpg','WORK / 001'],
    ['images/items/item-2.jpg','WORK / 002'],
    ['images/items/item-3.jpg','WORK / 003'],
    ['images/items/item-4.jpg','WORK / 004'],
    ['images/items/item-5.jpg','WORK / 005'],
    ['images/items/item-6.jpg','WORK / 006'],
    ['images/items/item-7.jpg','WORK / 007'],
    ['images/items/item-8.jpg','WORK / 008']
  ];

  const setHeader = () => topbar.classList.toggle('scrolled', window.scrollY > 18);
  setHeader();
  window.addEventListener('scroll', setHeader, {passive:true});

  const closeMenu = () => {
    menuButton.setAttribute('aria-expanded','false');
    nav.classList.remove('open');
    body.classList.remove('menu-open');
  };

  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('open', open);
    body.classList.toggle('menu-open', open);
  });

  navLinks.forEach(link => link.addEventListener('click', closeMenu));

  const sections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  const heroType = document.querySelector('.hero-type');

  if (heroType && window.matchMedia('(min-width: 801px) and (prefers-reduced-motion: no-preference)').matches) {
    let ticking = false;
    const moveHeroType = () => {
      const shift = Math.min(window.scrollY * 0.045, 24);
      heroType.style.translate = '0 ' + shift + 'px';
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(moveHeroType);
        ticking = true;
      }
    }, {passive:true});
  }

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      });
    }, {threshold:.08, rootMargin:'0px 0px -7% 0px'});

    document.querySelectorAll('.reveal').forEach((el, i) => {
      el.style.transitionDelay = Math.min((i % 4) * 45, 135) + 'ms';
      revealObserver.observe(el);
    });

    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const hash = '#' + entry.target.id;
        navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === hash));
      });
    }, {rootMargin:'-35% 0px -55% 0px'});

    sections.forEach(section => navObserver.observe(section));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

  document.getElementById('year').textContent = new Date().getFullYear();

  const render = index => {
    currentIndex = (index + gallery.length) % gallery.length;
    dialogImage.src = gallery[currentIndex][0];
    dialogImage.alt = 'Tetovanie InkFlater – ' + (currentIndex + 1);
    dialogCaption.textContent = gallery[currentIndex][1] + ' / ' + (currentIndex + 1) + ' OF ' + gallery.length;
  };

  const openLightbox = index => {
    render(index);
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
      body.classList.add('lightbox-open');
    }
  };

  const closeLightbox = () => {
    if (dialog.open) dialog.close();
    body.classList.remove('lightbox-open');
  };

  document.querySelectorAll('[data-gallery-index]').forEach(card => {
    card.addEventListener('click', () => openLightbox(Number(card.dataset.galleryIndex)));
  });

  closeButton.addEventListener('click', closeLightbox);
  prevButton.addEventListener('click', () => render(currentIndex - 1));
  nextButton.addEventListener('click', () => render(currentIndex + 1));
  dialog.addEventListener('click', e => { if (e.target === dialog) closeLightbox(); });
  dialog.addEventListener('close', () => body.classList.remove('lightbox-open'));

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('open')) closeMenu();
    if (!dialog.open) return;
    if (e.key === 'ArrowLeft') render(currentIndex - 1);
    if (e.key === 'ArrowRight') render(currentIndex + 1);
  });
})();