(() => {
  const body = document.body;
  const header = document.getElementById('site-header');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.getElementById('main-nav');
  const navLinks = [...document.querySelectorAll('.main-nav a')];

  const setHeader = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  };
  setHeader();
  window.addEventListener('scroll', setHeader, { passive: true });

  const closeMenu = () => {
    menuButton.setAttribute('aria-expanded', 'false');
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

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('open')) closeMenu();
  });

  const sections = navLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = '#' + entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === id);
        });
      });
    }, { rootMargin: '-30% 0px -58% 0px', threshold: 0 });

    sections.forEach(section => sectionObserver.observe(section));

    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    document.querySelectorAll('.reveal').forEach((element, index) => {
      element.style.transitionDelay = Math.min((index % 4) * 55, 165) + 'ms';
      revealObserver.observe(element);
    });
  } else {
    document.querySelectorAll('.reveal').forEach(element => element.classList.add('visible'));
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const galleryImages = [
    ['images/items/item-1.jpg', 'InkFlater · 01'],
    ['images/items/item-2.jpg', 'InkFlater · 02'],
    ['images/items/item-3.jpg', 'InkFlater · 03'],
    ['images/items/item-4.jpg', 'InkFlater · 04'],
    ['images/items/item-5.jpg', 'InkFlater · 05'],
    ['images/items/item-6.jpg', 'InkFlater · 06'],
    ['images/items/item-7.jpg', 'InkFlater · 07'],
    ['images/items/item-8.jpg', 'InkFlater · 08']
  ];

  const dialog = document.getElementById('lightbox');
  const dialogImage = document.getElementById('lightbox-image');
  const dialogCaption = document.getElementById('lightbox-caption');
  const closeButton = document.querySelector('.lightbox-close');
  const prevButton = document.querySelector('.lightbox-prev');
  const nextButton = document.querySelector('.lightbox-next');
  let currentIndex = 0;

  const renderLightbox = index => {
    currentIndex = (index + galleryImages.length) % galleryImages.length;
    const item = galleryImages[currentIndex];
    dialogImage.src = item[0];
    dialogImage.alt = 'Tetovanie InkFlater – fotografia ' + (currentIndex + 1);
    dialogCaption.textContent = item[1] + ' · ' + (currentIndex + 1) + '/' + galleryImages.length;
  };

  const openLightbox = index => {
    renderLightbox(index);
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
  prevButton.addEventListener('click', () => renderLightbox(currentIndex - 1));
  nextButton.addEventListener('click', () => renderLightbox(currentIndex + 1));

  dialog.addEventListener('click', event => {
    if (event.target === dialog) closeLightbox();
  });

  dialog.addEventListener('close', () => body.classList.remove('lightbox-open'));

  document.addEventListener('keydown', event => {
    if (!dialog.open) return;
    if (event.key === 'ArrowLeft') renderLightbox(currentIndex - 1);
    if (event.key === 'ArrowRight') renderLightbox(currentIndex + 1);
  });
})();