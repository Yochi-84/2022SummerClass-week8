function toggleMenu() {
  document.querySelector('#open').classList.toggle('invisible');
  document.querySelector('#close').classList.toggle('invisible');
  document.querySelector('#mask').classList.toggle('show-mask');
  document.querySelector('#menu').classList.toggle('nav-open');
}

function toggleSearch() {
  document.querySelector('#search-bar').classList.toggle('search-show');
}


let swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  // spaceBetween: 30,
  loop: true,
  grabCursor: true,
  // loopFillGroupWithBlank: true,
  centeredSlides: true,
  slideActiveClass: 'active',
  navigation: {
    nextEl: "#swiper-next",
    prevEl: "#swiper-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  }
});


let indexMasonry = document.querySelector('#indexMasonry');
if (indexMasonry) {
  let iMasonry = new Masonry(indexMasonry, {
    itemSelector: 'li',
  });
};

const tabCollection = document.querySelector('#tabs-collection-tab');
if (tabCollection) {
  tabCollection.addEventListener('show.bs.tab', (event) => {
    let collectionMasonry = document.querySelector('#collectionMasonry');

    let loading = setInterval(() => {
      if (collectionMasonry.querySelector('li')) {
        let cMasonry = new Masonry(collectionMasonry, {
          itemSelector: 'li',
        });
        clearInterval(loading);
      }
    }, 200);
  });
};

let artworkMasonry = document.querySelector('#artworkMasonry');
if (artworkMasonry) {
  let aMasonry = new Masonry(artworkMasonry, {
    itemSelector: 'li',
  });
};