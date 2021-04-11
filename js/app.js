function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
	if (support === true) {
		document.querySelector('html').classList.add('_webp');
	} else {
		document.querySelector('html').classList.add('_no-webp');
	}
});


//========================================================================================================================================================
//движение bg
//========================================================================================================================================================

let bg = document.querySelector(".bg-page");
window.addEventListener("mousemove", function (e) {
  let x = e.clientX / window.innerWidth;
  let y = e.clientY / window.innerHeight;
  bg.style.transform = "translate(-" + x * 150 + "px, -" + y * 150 + "px) ";
});

//========================================================================================================================================================
// присвоение классов (бургер)
// убирание классов при клике на линк в меню(linksArticles...linksSignIn)
// блокировка скрола за приделами бургера (bodyLock)
// Меню бургер
//========================================================================================================================================================
const burger = document.querySelector(".burger");
const menuBody = document.querySelector(".menu__body");
if (burger) {
  burger.addEventListener("click", function (e) {
    document.body.classList.toggle("_lock");
    burger.classList.toggle("_active");
    menuBody.classList.toggle("_active");
  });
}
//========================================================================================================================================================
//========================================================================================================================================================
var element = document.getElementById("selector");
if (element) {
  var maskOptions = {
    mask: "+{7}(00)000-00-00",
  };
  var mask = IMask(element, maskOptions);
}

//========================================================================================================================================================

const servicesTitle = document.querySelector(".services-footer__title");
const menuTitle = document.querySelector(".menu-footer__title");
const menuList = document.querySelector(".menu-footer__list");
const feedbackList = document.querySelector(".services-footer__list");
if (servicesTitle) {
  servicesTitle.addEventListener("click", function (e) {
    feedbackList.classList.toggle("_active");
    servicesTitle.classList.toggle("_active");
  });
}
if (menuTitle) {
  menuTitle.addEventListener("click", function (e) {
    menuList.classList.toggle("_active");
    menuTitle.classList.toggle("_active");
  });
}
//========================================================================================================================================================
//Навешивание класа при клике на блок
//========================================================================================================================================================
/*
//Навешивание класа при клике на блок
let userIcon = document.querySelector('.user-act-header');
let userMenu = document.querySelector('.user-act-header__list');
userIcon.addEventListener("click", function (e) {
	userMenu.classList.toggle('_active');
});
//уберает класс при клике в любом другом месте, кроме этого болка и дочерних элеменов
document.documentElement.addEventListener("click", function (e) {
	if (!e.target.closest('.user-act-header')) {
		userMenu.classList.remove('_active');
	}
});
*/
//========================================================================================================================================================
//========================================================================================================================================================

//========================================================================================================================================================
//присвоение класса при скроле
// для навешивания BG+ что бы меню стало видно
//========================================================================================================================================================

(function () {
  const header = document.querySelector(".header");
  window.onscroll = () => {
    if (window.pageYOffset > 50) {
      header.classList.add("_active");
    } else {
      header.classList.remove("_active");
    }
  };
})();

//========================================================================================================================================================
//========================================================================================================================================================

//========================================================================================================================================================
//прокрутка при клике  start=======
//========================================================================================================================================================

// Scroll to anchors (плавный скрол по странице)
// нажимая на навигационное меню идет плавный скрол этой часте на странице
// нужно указать класс главнего блока (.header)+ в html в навигацию каждему
// элементу добавить класс (js-scroll), и привязать все по ID
//

(function () {
  const smoothScroll = function (targetEl, duration) {
    const headerElHeight = document.querySelector(".header").clientHeight;
    let target = document.querySelector(targetEl);
    let targetPosition =
      target.getBoundingClientRect().top - 1.8 * headerElHeight;
    let startPosition = window.pageYOffset;
    let startTime = null;

    const ease = function (t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    const animation = function (currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, targetPosition, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };
    requestAnimationFrame(animation);
    if (burger.classList.contains("_active")) {
      document.body.classList.remove("_lock");
      burger.classList.remove("_active");
      menuBody.classList.remove("_active");
    }
  };

  const scrollTo = function () {
    const links = document.querySelectorAll(".js-scroll");
    links.forEach((each) => {
      each.addEventListener("click", function () {
        const currentTarget = this.getAttribute("href");
        smoothScroll(currentTarget, 1000);
      });
    });
  };
  scrollTo();
})();

//========================================================================================================================================================
//прокрутка при клике  end=======
//========================================================================================================================================================

//========================================================================================================================================================
// Прокрутка при клике
//========================================================================================================================================================
//Добавляем в html к пунктам навигации дата атрибут "data-goto= ".class к обьекту или модификатор класса" "(с тойчкой),
//также добавляем теже класс или модификатор обьекту к которому хоти докрутить
//
//const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
//(поиски всех обьектов с классом ".menu__link" у которых есть [data-goto]
/*
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
		const menuLink = e.target;
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;
			//прокрутка с бургер меню с закрытием его	
			if (burger.classList.contains('_active')) {
				document.body.classList.remove('_lock');
				burger.classList.remove('_active');
				menuBody.classList.remove('_active');
			}

			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});
			//отключение работы ссылки
			e.preventDefault();
		}
	}
}
//========================================================================================================================================================
//навигация в футере
const footerLinks = document.querySelectorAll('.footer__link[data-goto]');
if (footerLinks.length > 0) {
	footerLinks.forEach(footerLink => {
		footerLink.addEventListener("click", onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
		const footerLink = e.target;
		if (footerLink.dataset.goto && document.querySelector(footerLink.dataset.goto)) {
			const gotoBlock = document.querySelector(footerLink.dataset.goto);
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;
			//прокрутка с бургер меню с закрытием его	


			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});
			//отключение работы ссылки
			e.preventDefault();
		}
	}
}
*/
//========================================================================================================================================================
//========================================================================================================================================================

const swiperPrograms = new Swiper(".programs__slider", {
  pagination: {
    el: ".swiper-pagination",

    // Буллеты
    type: "bullets",
    clickable: true,
  },
  // Количество слайдов для показа
  slidesPerView: 4,
  // Отступ между слайдами
  spaceBetween: 26,
  // Бесконечный слайдер
  loop: true,
  breakpoints: {
    320: {
      slidesPerView: 1.1,
    },
    600: {
      slidesPerView: 2,
    },
    800: {
      slidesPerView: 3,
    },
    1190: {
      slidesPerView: 4,
    },
  },
  //
});
const swiperCertificate = new Swiper(".certificates__slider", {
  navigation: {
    nextEl: ".navigation-certificates__prev",
    prevEl: ".navigation-certificates__next",
  },
  // Количество слайдов для показа
  slidesPerView: 4,
  // Отступ между слайдами
  spaceBetween: 35,
  // Бесконечный слайдер
  loop: true,
  breakpoints: {
    320: {
      slidesPerView: 1.1,
      spaceBetween: 20,
    },
    600: {
      slidesPerView: 2,
      spaceBetween: 35,
    },
    900: {
      slidesPerView: 3,
    },
    1100: {
      slidesPerView: 4,
    },
  },
  //
});

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["module", "exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {},
    };
    factory(mod, mod.exports);
    global.WOW = mod.exports;
  }
})(this, function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true,
  });

  var _class, _temp;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = (function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();

  function isIn(needle, haystack) {
    return haystack.indexOf(needle) >= 0;
  }

  function extend(custom, defaults) {
    for (var key in defaults) {
      if (custom[key] == null) {
        var value = defaults[key];
        custom[key] = value;
      }
    }
    return custom;
  }

  function isMobile(agent) {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      agent
    );
  }

  function createEvent(event) {
    var bubble =
      arguments.length <= 1 || arguments[1] === undefined
        ? false
        : arguments[1];
    var cancel =
      arguments.length <= 2 || arguments[2] === undefined
        ? false
        : arguments[2];
    var detail =
      arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

    var customEvent = void 0;
    if (document.createEvent != null) {
      // W3C DOM
      customEvent = document.createEvent("CustomEvent");
      customEvent.initCustomEvent(event, bubble, cancel, detail);
    } else if (document.createEventObject != null) {
      // IE DOM < 9
      customEvent = document.createEventObject();
      customEvent.eventType = event;
    } else {
      customEvent.eventName = event;
    }

    return customEvent;
  }

  function emitEvent(elem, event) {
    if (elem.dispatchEvent != null) {
      // W3C DOM
      elem.dispatchEvent(event);
    } else if (event in (elem != null)) {
      elem[event]();
    } else if ("on" + event in (elem != null)) {
      elem["on" + event]();
    }
  }

  function addEvent(elem, event, fn) {
    if (elem.addEventListener != null) {
      // W3C DOM
      elem.addEventListener(event, fn, false);
    } else if (elem.attachEvent != null) {
      // IE DOM
      elem.attachEvent("on" + event, fn);
    } else {
      // fallback
      elem[event] = fn;
    }
  }

  function removeEvent(elem, event, fn) {
    if (elem.removeEventListener != null) {
      // W3C DOM
      elem.removeEventListener(event, fn, false);
    } else if (elem.detachEvent != null) {
      // IE DOM
      elem.detachEvent("on" + event, fn);
    } else {
      // fallback
      delete elem[event];
    }
  }

  function getInnerHeight() {
    if ("innerHeight" in window) {
      return window.innerHeight;
    }

    return document.documentElement.clientHeight;
  }

  // Minimalistic WeakMap shim, just in case.
  var WeakMap =
    window.WeakMap ||
    window.MozWeakMap ||
    (function () {
      function WeakMap() {
        _classCallCheck(this, WeakMap);

        this.keys = [];
        this.values = [];
      }

      _createClass(WeakMap, [
        {
          key: "get",
          value: function get(key) {
            for (var i = 0; i < this.keys.length; i++) {
              var item = this.keys[i];
              if (item === key) {
                return this.values[i];
              }
            }
            return undefined;
          },
        },
        {
          key: "set",
          value: function set(key, value) {
            for (var i = 0; i < this.keys.length; i++) {
              var item = this.keys[i];
              if (item === key) {
                this.values[i] = value;
                return this;
              }
            }
            this.keys.push(key);
            this.values.push(value);
            return this;
          },
        },
      ]);

      return WeakMap;
    })();

  // Dummy MutationObserver, to avoid raising exceptions.
  var MutationObserver =
    window.MutationObserver ||
    window.WebkitMutationObserver ||
    window.MozMutationObserver ||
    ((_temp = _class = (function () {
      function MutationObserver() {
        _classCallCheck(this, MutationObserver);

        if (typeof console !== "undefined" && console !== null) {
          console.warn("MutationObserver is not supported by your browser.");
          console.warn(
            "WOW.js cannot detect dom mutations, please call .sync() after loading new content."
          );
        }
      }

      _createClass(MutationObserver, [
        {
          key: "observe",
          value: function observe() {},
        },
      ]);

      return MutationObserver;
    })()),
    (_class.notSupported = true),
    _temp);

  // getComputedStyle shim, from http://stackoverflow.com/a/21797294
  var getComputedStyle =
    window.getComputedStyle ||
    function getComputedStyle(el) {
      var getComputedStyleRX = /(\-([a-z]){1})/g;
      return {
        getPropertyValue: function getPropertyValue(prop) {
          if (prop === "float") {
            prop = "styleFloat";
          }
          if (getComputedStyleRX.test(prop)) {
            prop.replace(getComputedStyleRX, function (_, _char) {
              return _char.toUpperCase();
            });
          }
          var currentStyle = el.currentStyle;

          return (currentStyle != null ? currentStyle[prop] : void 0) || null;
        },
      };
    };

  var WOW = (function () {
    function WOW() {
      var options =
        arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      _classCallCheck(this, WOW);

      this.defaults = {
        boxClass: "wow",
        animateClass: "animated",
        offset: 50,
        mobile: false,
        live: true,
        callback: null,
        scrollContainer: null,
        resetAnimation: true,
      };

      this.animate = (function animateFactory() {
        if ("requestAnimationFrame" in window) {
          return function (callback) {
            return window.requestAnimationFrame(callback);
          };
        }
        return function (callback) {
          return callback();
        };
      })();

      this.vendors = ["moz", "webkit"];

      this.start = this.start.bind(this);
      this.resetAnimation = this.resetAnimation.bind(this);
      this.scrollHandler = this.scrollHandler.bind(this);
      this.scrollCallback = this.scrollCallback.bind(this);
      this.scrolled = true;
      this.config = extend(options, this.defaults);
      if (options.scrollContainer != null) {
        this.config.scrollContainer = document.querySelector(
          options.scrollContainer
        );
      }
      // Map of elements to animation names:
      this.animationNameCache = new WeakMap();
      this.wowEvent = createEvent(this.config.boxClass);
    }

    _createClass(WOW, [
      {
        key: "init",
        value: function init() {
          this.element = window.document.documentElement;
          if (isIn(document.readyState, ["interactive", "complete"])) {
            this.start();
          } else {
            addEvent(document, "DOMContentLoaded", this.start);
          }
          this.finished = [];
        },
      },
      {
        key: "start",
        value: function start() {
          var _this = this;

          this.stopped = false;
          this.boxes = [].slice.call(
            this.element.querySelectorAll("." + this.config.boxClass)
          );
          this.all = this.boxes.slice(0);
          if (this.boxes.length) {
            if (this.disabled()) {
              this.resetStyle();
            } else {
              for (var i = 0; i < this.boxes.length; i++) {
                var box = this.boxes[i];
                this.applyStyle(box, true);
              }
            }
          }
          if (!this.disabled()) {
            addEvent(
              this.config.scrollContainer || window,
              "scroll",
              this.scrollHandler
            );
            addEvent(window, "resize", this.scrollHandler);
            this.interval = setInterval(this.scrollCallback, 50);
          }
          if (this.config.live) {
            var mut = new MutationObserver(function (records) {
              for (var j = 0; j < records.length; j++) {
                var record = records[j];
                for (var k = 0; k < record.addedNodes.length; k++) {
                  var node = record.addedNodes[k];
                  _this.doSync(node);
                }
              }
              return undefined;
            });
            mut.observe(document.body, {
              childList: true,
              subtree: true,
            });
          }
        },
      },
      {
        key: "stop",
        value: function stop() {
          this.stopped = true;
          removeEvent(
            this.config.scrollContainer || window,
            "scroll",
            this.scrollHandler
          );
          removeEvent(window, "resize", this.scrollHandler);
          if (this.interval != null) {
            clearInterval(this.interval);
          }
        },
      },
      {
        key: "sync",
        value: function sync() {
          if (MutationObserver.notSupported) {
            this.doSync(this.element);
          }
        },
      },
      {
        key: "doSync",
        value: function doSync(element) {
          if (typeof element === "undefined" || element === null) {
            element = this.element;
          }
          if (element.nodeType !== 1) {
            return;
          }
          element = element.parentNode || element;
          var iterable = element.querySelectorAll("." + this.config.boxClass);
          for (var i = 0; i < iterable.length; i++) {
            var box = iterable[i];
            if (!isIn(box, this.all)) {
              this.boxes.push(box);
              this.all.push(box);
              if (this.stopped || this.disabled()) {
                this.resetStyle();
              } else {
                this.applyStyle(box, true);
              }
              this.scrolled = true;
            }
          }
        },
      },
      {
        key: "show",
        value: function show(box) {
          this.applyStyle(box);
          box.className = box.className + " " + this.config.animateClass;
          if (this.config.callback != null) {
            this.config.callback(box);
          }
          emitEvent(box, this.wowEvent);

          if (this.config.resetAnimation) {
            addEvent(box, "animationend", this.resetAnimation);
            addEvent(box, "oanimationend", this.resetAnimation);
            addEvent(box, "webkitAnimationEnd", this.resetAnimation);
            addEvent(box, "MSAnimationEnd", this.resetAnimation);
          }

          return box;
        },
      },
      {
        key: "applyStyle",
        value: function applyStyle(box, hidden) {
          var _this2 = this;

          var duration = box.getAttribute("data-wow-duration");
          var delay = box.getAttribute("data-wow-delay");
          var iteration = box.getAttribute("data-wow-iteration");

          return this.animate(function () {
            return _this2.customStyle(box, hidden, duration, delay, iteration);
          });
        },
      },
      {
        key: "resetStyle",
        value: function resetStyle() {
          for (var i = 0; i < this.boxes.length; i++) {
            var box = this.boxes[i];
            box.style.visibility = "visible";
          }
          return undefined;
        },
      },
      {
        key: "resetAnimation",
        value: function resetAnimation(event) {
          if (event.type.toLowerCase().indexOf("animationend") >= 0) {
            var target = event.target || event.srcElement;
            target.className = target.className
              .replace(this.config.animateClass, "")
              .trim();
          }
        },
      },
      {
        key: "customStyle",
        value: function customStyle(box, hidden, duration, delay, iteration) {
          if (hidden) {
            this.cacheAnimationName(box);
          }
          box.style.visibility = hidden ? "hidden" : "visible";

          if (duration) {
            this.vendorSet(box.style, { animationDuration: duration });
          }
          if (delay) {
            this.vendorSet(box.style, { animationDelay: delay });
          }
          if (iteration) {
            this.vendorSet(box.style, { animationIterationCount: iteration });
          }
          this.vendorSet(box.style, {
            animationName: hidden ? "none" : this.cachedAnimationName(box),
          });

          return box;
        },
      },
      {
        key: "vendorSet",
        value: function vendorSet(elem, properties) {
          for (var name in properties) {
            if (properties.hasOwnProperty(name)) {
              var value = properties[name];
              elem["" + name] = value;
              for (var i = 0; i < this.vendors.length; i++) {
                var vendor = this.vendors[i];
                elem[
                  "" + vendor + name.charAt(0).toUpperCase() + name.substr(1)
                ] = value;
              }
            }
          }
        },
      },
      {
        key: "vendorCSS",
        value: function vendorCSS(elem, property) {
          var style = getComputedStyle(elem);
          var result = style.getPropertyCSSValue(property);
          for (var i = 0; i < this.vendors.length; i++) {
            var vendor = this.vendors[i];
            result =
              result ||
              style.getPropertyCSSValue("-" + vendor + "-" + property);
          }
          return result;
        },
      },
      {
        key: "animationName",
        value: function animationName(box) {
          var aName = void 0;
          try {
            aName = this.vendorCSS(box, "animation-name").cssText;
          } catch (error) {
            // Opera, fall back to plain property value
            aName = getComputedStyle(box).getPropertyValue("animation-name");
          }

          if (aName === "none") {
            return ""; // SVG/Firefox, unable to get animation name?
          }

          return aName;
        },
      },
      {
        key: "cacheAnimationName",
        value: function cacheAnimationName(box) {
          // https://bugzilla.mozilla.org/show_bug.cgi?id=921834
          // box.dataset is not supported for SVG elements in Firefox
          return this.animationNameCache.set(box, this.animationName(box));
        },
      },
      {
        key: "cachedAnimationName",
        value: function cachedAnimationName(box) {
          return this.animationNameCache.get(box);
        },
      },
      {
        key: "scrollHandler",
        value: function scrollHandler() {
          this.scrolled = true;
        },
      },
      {
        key: "scrollCallback",
        value: function scrollCallback() {
          if (this.scrolled) {
            this.scrolled = false;
            var results = [];
            for (var i = 0; i < this.boxes.length; i++) {
              var box = this.boxes[i];
              if (box) {
                if (this.isVisible(box)) {
                  this.show(box);
                  continue;
                }
                results.push(box);
              }
            }
            this.boxes = results;
            if (!this.boxes.length && !this.config.live) {
              this.stop();
            }
          }
        },
      },
      {
        key: "offsetTop",
        value: function offsetTop(element) {
          // SVG elements don't have an offsetTop in Firefox.
          // This will use their nearest parent that has an offsetTop.
          // Also, using ('offsetTop' of element) causes an exception in Firefox.
          while (element.offsetTop === undefined) {
            element = element.parentNode;
          }
          var top = element.offsetTop;
          while (element.offsetParent) {
            element = element.offsetParent;
            top += element.offsetTop;
          }
          return top;
        },
      },
      {
        key: "isVisible",
        value: function isVisible(box) {
          var offset =
            box.getAttribute("data-wow-offset") || this.config.offset;
          var viewTop =
            (this.config.scrollContainer &&
              this.config.scrollContainer.scrollTop) ||
            window.pageYOffset;
          var viewBottom =
            viewTop +
            Math.min(this.element.clientHeight, getInnerHeight()) -
            offset;
          var top = this.offsetTop(box);
          var bottom = top + box.clientHeight;

          return top <= viewBottom && bottom >= viewTop;
        },
      },
      {
        key: "disabled",
        value: function disabled() {
          return !this.config.mobile && isMobile(navigator.userAgent);
        },
      },
    ]);

    return WOW;
  })();

  exports.default = WOW;
  module.exports = exports["default"];
});
 new WOW().init();;
