'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const navLink = document.querySelector('.nav__links');
const h1 = document.querySelector('h1');
const nav = document.querySelector('.nav');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});

// links
navLink.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// children
h1.firstElementChild.style.color = 'white';

const tab = document.querySelectorAll('.operations__tab');

//选项卡
const operationsTab = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const operationsContent = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', function (e) {
  const click = e.target.closest('.operations__tab');
  if (!click) return;

  // 清除active
  operationsTab.forEach(t => t.classList.remove('operations__tab--active'));
  operationsContent.forEach(c =>
    c.classList.remove('operations__content--active')
  );

  // 添加 active
  click.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${click.dataset.tab}`)
    .classList.add('operations__content--active');
});

// nav半透明效果
const handleHover = function (o) {
  return function (e) {
    if (e.target.classList.contains('nav__link')) {
      const checked = e.target;
      const siblings = checked.closest('.nav').querySelectorAll('.nav__link');
      const logo = checked.closest('.nav').querySelector('img');
      siblings.forEach(el => {
        if (el !== checked) el.style.opacity = o;
      });
      logo.style.opacity = o;
    }
  };
};
navLink.addEventListener('mouseover', handleHover(0.5));
navLink.addEventListener('mouseout', handleHover(1));

// Sticky navigation: Intersection Observer API

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);

  if (entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(nav);
