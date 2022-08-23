function toggleMenu() {
  document.querySelector('#open').classList.toggle('invisible');
  document.querySelector('#close').classList.toggle('invisible');
  document.querySelector('#mask').classList.toggle('show-mask');
  document.querySelector('#menu').classList.toggle('open');
}

function toggleSearch() {
  document.querySelector('#search-bar').classList.toggle('show');
}

Array.from(document.querySelectorAll('#masonry li')).forEach( ele => {
  let h = Array.from(ele.children).reduce((a,b) => a.offsetHeight + b.offsetHeight);
  console.log(h)
  ele.style.gridRowStart = `span ${Math.ceil(h / 3)}`;
});

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