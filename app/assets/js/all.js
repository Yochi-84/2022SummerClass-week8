function toggleMenu() {
  let menu = document.querySelector('#menu');
  if (menu.getAttribute("data-menu-status") === "close") {
    menu.setAttribute("data-menu-status", "open");
  } else {
    menu.setAttribute("data-menu-status", "close");
  }
  document.querySelector('#open').classList.toggle('invisible');
  document.querySelector('#close').classList.toggle('invisible');
  document.querySelector('#mask').classList.toggle('show-mask');
  menu.classList.toggle('nav-open');
}

function toggleSearch() {
  document.querySelector('#search-bar').classList.toggle('search-show');
}

function toggleWallet() {
  if (document.querySelector('#menu').getAttribute("data-menu-status") === "open") {
    toggleMenu();
  }
  document.querySelector('#higherMask').classList.toggle('show-mask');
  document.querySelector('#wallet').classList.toggle('hidden');
}

function toggleFilter() {
  document.querySelector('#filter').classList.toggle('hidden');
}

function doFilter() {
  document.querySelector('#filterRule').innerText = document.querySelectorAll('#filter li :checked').length;
  toggleFilter();
}

let io_mask = new IntersectionObserver((entries) => {
  if (entries.some(item => item.isIntersecting)) {
    document.querySelector('body').classList.add("overflow-y-hidden", "max-h-screen");
  } else {
    document.querySelector('body').classList.remove("overflow-y-hidden", "max-h-screen");
  }
});

io_mask.observe(document.querySelector("#mask"));
io_mask.observe(document.querySelector("#higherMask"));


// 監聽篩選確認按鈕是否存在於畫面中，是則鎖定 body 高度避免出現 2 條y軸
if (document.querySelector('#filterSubmit')) {
  let io = new IntersectionObserver(() => {
    let filter = document.querySelector('#filter');
    if (filter.getAttribute("data-status") === "show") {
      document.querySelector('body').classList.remove("overflow-y-hidden", "max-h-screen");
      filter.setAttribute("data-status", "hide");
    } else {
      document.querySelector('body').classList.add("overflow-y-hidden", "max-h-screen");
      filter.setAttribute("data-status", "show");
    }
  });

  io.observe(document.querySelector('#filterSubmit'));
}

let indexSwiper = new Swiper(".indexSwiper", {
  speed: 800,
  loop: true,
  grabCursor: true,
  centeredSlides: true,
  breakpoints: {
    320: {
      slidesPerView: 1,
      loopedSlides: 3
    },
    1026: {
      slidesPerView: 3,
      loopedSlides: 5
    }
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  }
});

let introSwiper = new Swiper(".introSwiper", {
  spaceBetween: 24,
  loop: true,
  loopFillGroupWithBlank: true,
  breakpoints: {
    320: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
    520: {
      slidesPerView: 3,
      slidesPerGroup: 3,
    },
    1026: {
      slidesPerView: 4,
      slidesPerGroup: 4,
    }
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
    horizontalOrder: true
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
          horizontalOrder: true
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
    horizontalOrder: true
  });
};


let iMasonry = null;
let introMasonry = document.querySelector('#introMasonry');
if (introMasonry) {
  iMasonry = new Masonry(introMasonry, {
    itemSelector: 'li[data-role="information"]',
    horizontalOrder: true
  });
};

let exploreMasonry = document.querySelector('#exploreMasonry');
if (exploreMasonry) {
  let eMasonry = new Masonry(exploreMasonry, {
    itemSelector: 'li',
    horizontalOrder: true
  });
};


// 監聽 introduce 資訊欄開合進行 border-bottom 顯示/隱藏
const url = new URL(location.href);
if (url.pathname.endsWith('introduce.html')) {
  let observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.oldValue === "true") {
        mutation.target.parentNode.classList.remove("border-b");
      } else {
        mutation.target.parentNode.classList.add("border-b");
      }

      // 收合後瀑布流重繪
      setTimeout(function () {
        iMasonry.destroy();
        iMasonry = new Masonry(document.querySelector('#introMasonry'), {
          itemSelector: 'li[data-role="information"]',
          horizontalOrder: true
        });
      },400)

    });
  });

  let dom = Array.from(document.querySelectorAll('#introMasonry label'));
  dom.forEach(item => {
    observer.observe(item, {
      attributes: true,
      attributeFilter: ["aria-expanded"],
      attributeOldValue: true
    });
  })

}