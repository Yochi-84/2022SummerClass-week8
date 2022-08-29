"use strict";

function toggleMenu() {
  var menu = document.querySelector('#menu');

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
} // 監聽 mask 是否存在於畫面，是則隱藏捲軸


var maskStatus = {
  mask: false,
  higherMask: false
};
var io_mask = new IntersectionObserver(function (entries) {
  maskStatus[entries[0].target.id] = entries[0].isIntersecting;

  if (Object.values(maskStatus).some(function (item) {
    return item;
  })) {
    document.querySelector('body').classList.add("overflow-y-hidden", "max-h-screen");
  } else {
    document.querySelector('body').classList.remove("overflow-y-hidden", "max-h-screen");
  }
});
io_mask.observe(document.querySelector("#mask"));
io_mask.observe(document.querySelector("#higherMask")); // 監聽篩選確認按鈕是否存在於畫面中，是則鎖定 body 高度避免出現 2 條y軸

if (document.querySelector('#filterSubmit')) {
  var io = new IntersectionObserver(function () {
    var filter = document.querySelector('#filter');

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

var indexSwiper = new Swiper(".indexSwiper", {
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
    clickable: true
  }
});
var introSwiper = new Swiper(".introSwiper", {
  speed: 800,
  spaceBetween: 24,
  loop: true,
  loopFillGroupWithBlank: true,
  breakpoints: {
    320: {
      slidesPerView: 2,
      slidesPerGroup: 2
    },
    520: {
      slidesPerView: 3,
      slidesPerGroup: 3
    },
    1026: {
      slidesPerView: 4,
      slidesPerGroup: 4
    }
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  }
});
var indexMasonry = document.querySelector('#indexMasonry');

if (indexMasonry) {
  var _iMasonry = new Masonry(indexMasonry, {
    itemSelector: 'li',
    horizontalOrder: true
  });

  imagesLoaded("#indexMasonry").on("progress", function () {
    _iMasonry.layout();
  });
}

;
var tabCollection = document.querySelector('#tabs-collection-tab');

if (tabCollection) {
  tabCollection.addEventListener('show.bs.tab', function (event) {
    var collectionMasonry = document.querySelector('#collectionMasonry');
    var loading = setInterval(function () {
      if (collectionMasonry.querySelector('li')) {
        var cMasonry = new Masonry(collectionMasonry, {
          itemSelector: 'li',
          horizontalOrder: true
        });
        imagesLoaded("#collectionMasonry").on("progress", function () {
          cMasonry.layout();
        });
        clearInterval(loading);
      }
    }, 200);
  });
}

;
var artworkMasonry = document.querySelector('#artworkMasonry');

if (artworkMasonry) {
  var aMasonry = new Masonry(artworkMasonry, {
    itemSelector: 'li',
    horizontalOrder: true
  });
  imagesLoaded("#artworkMasonry").on("progress", function () {
    aMasonry.layout();
  });
}

;
var iMasonry = null;
var introMasonry = document.querySelector('#introMasonry');

if (introMasonry) {
  iMasonry = new Masonry(introMasonry, {
    itemSelector: 'li[data-role="information"]',
    horizontalOrder: true
  });
}

;
var exploreMasonry = document.querySelector('#exploreMasonry');

if (exploreMasonry) {
  var eMasonry = new Masonry(exploreMasonry, {
    itemSelector: 'li',
    horizontalOrder: true
  });
  imagesLoaded("#exploreMasonry").on("progress", function () {
    eMasonry.layout();
  });
}

; // 監聽 introduce 資訊欄開合進行 border-bottom 顯示/隱藏

var url = new URL(location.href);

if (url.pathname.endsWith('introduce.html')) {
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.oldValue === "true") {
        mutation.target.parentNode.classList.add("border-b-transparent");
      } else {
        mutation.target.parentNode.classList.remove("border-b-transparent");
      } // 收合後瀑布流重繪


      setTimeout(function () {
        iMasonry.destroy();
        iMasonry = new Masonry(document.querySelector('#introMasonry'), {
          itemSelector: 'li[data-role="information"]',
          horizontalOrder: true
        });
      }, 400);
    });
  });
  var dom = Array.from(document.querySelectorAll('#introMasonry label'));
  dom.forEach(function (item) {
    observer.observe(item, {
      attributes: true,
      attributeFilter: ["aria-expanded"],
      attributeOldValue: true
    });
  });
}

; // Ranking List 寫入

if (url.pathname.endsWith("ranking.html")) {
  var list = [{
    name: "追求者送我的花",
    image: "29.jpg",
    price: 1774.19,
    day: 220.49,
    week: -2.43,
    lowerPrice: 2.9,
    owner: 32.1,
    number: 1000
  }, {
    name: "夏天的時候",
    image: "06.jpg",
    price: 1524.89,
    day: 80.49,
    week: -2.43,
    lowerPrice: 3.3,
    owner: 31.8,
    number: 800
  }, {
    name: "海洋波度",
    image: "02.jpg",
    price: 1400.59,
    day: -3.92,
    week: -13.43,
    lowerPrice: 2.8,
    owner: 31.6,
    number: 1100
  }, {
    name: "賴床真的很不好",
    image: "03.jpg",
    price: 1224.88,
    day: -9.23,
    week: -20.43,
    lowerPrice: 3.8,
    owner: 29.5,
    number: 900
  }, {
    name: "瞳孔:流動的脈絡",
    image: "01.jpg",
    price: 1021.09,
    day: 83.49,
    week: -1.43,
    lowerPrice: 3.2,
    owner: 28.9,
    number: 1200
  }, {
    name: "哭泣的時候",
    image: "12.jpg",
    price: 921.42,
    day: -9.43,
    week: 183.49,
    lowerPrice: 2.95,
    owner: 26.3,
    number: 1100
  }, {
    name: "破碎的菠蘿麵包",
    image: "14.jpg",
    price: 888.88,
    day: 20.49,
    week: 0.43,
    lowerPrice: 3.05,
    owner: 22.2,
    number: 1400
  }, {
    name: "人生中的貓咪們",
    image: "08.jpg",
    price: 770.23,
    day: 32.49,
    week: 30.23,
    lowerPrice: 2.80,
    owner: 20.2,
    number: 1500
  }, {
    name: "髒兮兮的家",
    image: "28.jpg",
    price: 502.31,
    day: 13.49,
    week: 50.23,
    lowerPrice: 2.75,
    owner: 18.3,
    number: 1200
  }, {
    name: "細胞小將",
    image: "16.jpg",
    price: 502.31,
    day: 54.49,
    week: 12.43,
    lowerPrice: 2.80,
    owner: 17.2,
    number: 1350
  }];
  var template = "";
  list.forEach(function (item, index) {
    template += "\n    <li\n      class=\"relative flex flex-wrap items-center justify-around border border-black ".concat(index === 0 ? "" : "border-t-transparent", " lg:flex-nowrap select-none\"\n      data-role=\"list\"\n    >\n      <div class=\"basis-[38px] font-paytone\">").concat(index + 1, "</div>\n      <div\n        class=\"flex flex-grow-[2] items-center gap-x-2 border-l border-l-black py-4 pl-2 font-sans lg:gap-x-4 lg:pl-4 lg:basis-1/5\"\n      >\n        <img\n          src=\"./assets/images/art").concat(item.image, "\"\n          alt=\"").concat(item.name, "\"\n          class=\"h-12 w-12 rounded-full object-cover object-top\"\n        />\n        <span\n          class=\"block max-w-[140px] overflow-hidden text-ellipsis whitespace-nowrap text-sm font-bold leading-5 sm:max-w-max md:text-base md:leading-normal\"\n          >").concat(item.name, "</span\n        >\n      </div>\n      <div class=\"py-4 pr-4 text-right lg:pr-0 flex-grow\">\n        <!-- \u96B1\u85CF checkbox + label \u507D\u5143\u7D20\u5224\u5B9A\u6536\u5408  -->\n        <input type=\"checkbox\" class=\"peer hidden\" id=\"list").concat(index + 1, "\" />\n        <label\n          for=\"list").concat(index + 1, "\"\n          class=\"text-white before:z-1 before:absolute before:top-0 before:right-0 before:left-0 before:h-20 before:border-b-0 before:border-black before:duration-300 before:content-[''] after:absolute after:right-0 after:top-12 after:border-b-[32px] after:border-l-[32px] after:border-b-black after:border-l-transparent after:duration-300 after:content-[''] peer-checked:before:border-b peer-checked:after:border-b-crimson peer-checked:text-crimson lg:hidden\"\n          data-bs-toggle=\"collapse\"\n          data-bs-target=\"#collapse").concat(index + 1, "\"\n          aria-expanded=\"false\"\n          aria-controls=\"collapse").concat(index + 1, "\"\n        >\n        <!-- \u52A0\u865F\u8C4E\u7DDA currentColor \u642D\u914D label \u984F\u8272\u8ABF\u6574\u63A7\u5236\u96B1\u85CF -->\n          <span\n            class=\"before:absolute before:right-[5px] before:top-[70px] before:h-0.5 before:w-2.5 before:bg-white before:content-[''] after:absolute after:top-[66px] after:right-[9px] after:h-2.5 after:w-0.5 after:bg-current after:duration-300 after:content-[''] before:z-10 after:z-2\"\n          ></span>\n        </label>\n        <span\n          ><i class=\"fa-brands fa-ethereum mr-2 text-base\"></i>").concat(item.price.toLocaleString('en-US'), "</span\n        >\n      </div>\n      <!-- \u8981\u4FDD\u6301\u53EA\u6709\u4E00\u500B\u958B\u555F \u52A0\u4E0Adata-bs-parent=\"#rankingList\" -->\n      <div\n        class=\"collapse flex w-full flex-wrap items-center justify-around gap-y-4 p-4 lg:w-auto lg:p-0 basis-3/5 flex-grow lg:flex-grow-0\"\n        aria-labelledby=\"heading").concat(index + 1, "\"\n        id=\"collapse").concat(index + 1, "\"\n      >\n        <div\n          class=\"w-1/3 text-center lg:w-auto lg:basis-1/5 lg:py-4 lg:text-right\"\n        >\n          <h6 class=\"font-sans text-sm leading-5 lg:hidden\">24h%</h6>\n          <span class=\"mt-2 block lg:mt-0 ").concat(item.day > 0 ? "text-lemon" : "text-crimson", "\">").concat(item.day > 0 ? "+" : "").concat(item.day, "%</span>\n        </div>\n        <div\n          class=\"w-1/3 text-center lg:w-auto lg:basis-1/5 lg:py-4 lg:text-right\"\n        >\n          <h6 class=\"font-sans text-sm leading-5 lg:hidden\">7d%</h6>\n          <span class=\"mt-2 block lg:mt-0 ").concat(item.week > 0 ? "text-lemon" : "text-crimson", "\">").concat(item.week > 0 ? "+" : "").concat(item.week, "%</span>\n        </div>\n        <div\n          class=\"w-1/3 text-center lg:w-auto lg:basis-1/5 lg:py-4 lg:text-right\"\n        >\n          <h6 class=\"font-sans text-sm leading-5 lg:hidden\">\u5730\u677F\u50F9</h6>\n          <span class=\"mt-2 block lg:mt-0\"\n            ><i class=\"fa-brands fa-ethereum mr-2 text-base\"></i>").concat(item.lowerPrice.toFixed(2), "</span\n          >\n          <span></span>\n        </div>\n        <div\n          class=\"w-1/2 text-center lg:w-auto lg:basis-1/5 lg:py-4 lg:text-right\"\n        >\n          <h6 class=\"font-sans text-sm leading-5 lg:hidden\">\u64C1\u6709\u8005</h6>\n          <span class=\"mt-2 block lg:mt-0\">").concat(item.owner, "k</span>\n        </div>\n        <div\n          class=\"w-1/2 pr-6 text-center lg:w-auto lg:basis-1/5 lg:py-4 lg:text-right\"\n        >\n          <h6 class=\"font-sans text-sm leading-5 lg:hidden\">\u4F5C\u54C1\u6578\u91CF</h6>\n          <span class=\"mt-2 block lg:mt-0\">").concat(item.number, "</span>\n        </div>\n      </div>\n    </li>\n    ");
  });
  document.querySelector('#rankingList').innerHTML = template; // introduce list 節流，避免連續點擊開合

  Array.from(document.querySelectorAll('#rankingList label[for^="list"]')).forEach(function (ele) {
    ele.addEventListener('click', function () {
      var _this = this;

      this.classList.add('pointer-events-none');
      setTimeout(function () {
        _this.classList.remove('pointer-events-none');
      }, 500);
    });
  });
}

;
//# sourceMappingURL=all.js.map
