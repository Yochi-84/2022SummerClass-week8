function toggleMenu() {
  document.querySelector('#open').classList.toggle('invisible');
  document.querySelector('#close').classList.toggle('invisible');
  document.querySelector('#mask').classList.toggle('show-mask');
  document.querySelector('#menu').classList.toggle('open');
}

function toggleSearch() {
  document.querySelector('#search-bar').classList.toggle('show');
}


let swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  // spaceBetween: 30,
  loop: true,
  grabCursor : true,
  // loopFillGroupWithBlank: true,
  centeredSlides: true,
  slideActiveClass : 'active',
  navigation: {
    nextEl: "#swiper-next",
    prevEl: "#swiper-prev",
  },
  pagination : {
    el: ".swiper-pagination",
    clickable: true,
  }
});

let grid = document.querySelector('#masonry');
let masonry = new Masonry( grid, {
  itemSelector: 'li',
});
