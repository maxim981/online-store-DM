// BANNER SLIDER
$(function() {
	$('.banner-slider').slick({
		dots: true,
		prevArrow: '<button class="banner-slider__btn banner-slider__btnPrev"><img src="img/arrow-left.svg" alt=""></button>',
		nextArrow: '<button class="banner-slider__btn banner-slider__btnNext"><img src="img/arrow-right.svg" alt=""></button>',

	});
});



// PRODUCT SLIDER
$(function() {
	$('.product-slider').slick({
		infinite: true,
		slidesToShow: 4,
		prevArrow: '<button class="product-slider__btn product-slider__btnPrev"><img src="img/black-arrow-left.svg" alt=""></button>',
		nextArrow: '<button class="product-slider__btn product-slider__btnNext"><img src="img/black-arrow-right.svg" alt=""></button>',
		arrows: true,
		dots: false,
		responsive: [
			{
				breakpoint: 1301,
				settings: {
					dots: true,
					arrows: false,
				}
			},
			{
				breakpoint: 1201,
				settings: {
					dots: true,
					slidesToShow: 3,
					arrows: false,

				}
			},
			{
				breakpoint: 900,
				settings: {
					dots: true,
					slidesToShow: 2,
					arrows: false,

				}
			},
			{
				breakpoint: 650,
				settings: {
					dots: true,
					slidesToShow: 1,
					arrows: false,
				}
			},
		]

	});
});
//

// FAVORITE PRODUCTS 
$('.favorite').on('click', function(event) {
	event.preventDefault();
	let favorite = this.querySelector('img');
	if(favorite.src.indexOf('img/favorite.svg') != -1) {
		favorite.src = 'img/favorite--active.svg';
	}
	else favorite.src = 'img/favorite.svg';
});
//



// TABS
let tabs = document.querySelectorAll('.tabs');
tabs.forEach(item=> {
	item.addEventListener('click', (event)=> {
		// tabs
		let target = event.target.closest('.tab');
		if(!target) return;

		let tabSibling = target.parentNode.children;
		Array.from(tabSibling).forEach(item=> {
			item.classList.remove('tab--active');
		});
		target.classList.add('tab--active');

		// toggle search
		
		if(target.hasAttribute('data-tab')) {
			let attr = target.getAttribute('data-tab');
			let tabsContentItem = item.querySelector(`#${attr}`);
			let tabsContentAll = tabsContentItem.parentNode.children;
			Array.from(tabsContentAll).forEach(item=> {
				item.classList.remove('tabs-content--active');
			});
			tabsContentItem.classList.add('tabs-content--active');
			$('.slick-slider').slick('setPosition');
		}
	});
});
//



// BASKET
let basket = document.querySelectorAll('.product-item__basket');
basket.forEach(item=> {
	item.onclick = function(event) {
		event.preventDefault();
	}
})


//RATINGS
const ratings = document.querySelectorAll('.rating');
if(ratings.length > 0) {
	initRatings();
}
function initRatings() {
	ratings.forEach(item=> {
		let ratingActive = item.querySelector('.rating__active');
		let sumStars = item.querySelector('.rating__items').children;
		let val = item.querySelector('.rating__value');
		let onePercent = sumStars.length / 100;

		reatingActiveWidth();
		function reatingActiveWidth() {
			ratingActive.style.width = val.innerHTML / onePercent + '%';
		}

		Array.from(sumStars).forEach(item=> {
			item.onmouseenter = function(event) {
				ratingActive.style.width = item.value / onePercent + '%';
			}
			item.onmouseleave = function(event) {
				reatingActiveWidth();
			}
			item.onclick = function(event) {
				val.innerHTML = item.value;
				reatingActiveWidth();
			}
		});
	});
}






// BURGER AND MOBILE MENU
let burger = document.querySelector('.burger');
let mobileMenu = document.querySelector('.header__mobile-menu');
let mobileMenuLink = document.querySelectorAll('.mobile-menu__link');

burger.onclick = function(event) {
	let target = event.target.closest('.burger');

	this.classList.toggle('burger--active');
	mobileMenu.classList.toggle('header__mobile-menu--active');
	mobileMenuLink.forEach(item=> {
		item.onclick = function(event) {
			mobileMenu.classList.remove('header__mobile-menu--active');
			burger.classList.remove('burger--active');
		}
	})
	window.onresize = function() {
		let width = document.documentElement.clientWidth;
		if(width > 968) {
			mobileMenu.classList.remove('header__mobile-menu--active');
			burger.classList.remove('burger--active');
		}
	}
}

document.addEventListener('click', (event)=> {
	let target = event.target;
	let targetbBurger = target.closest('.burger');

	if(target != burger && target != mobileMenu) {
		mobileMenu.classList.remove('header__mobile-menu--active');
		burger.classList.remove('burger--active');
	}
})


//MOBILE MENU ADAPTIVE

let topMenuHeight = document.querySelector('.menu').offsetHeight;
let height_mobile_menu = window.innerHeight;
height_mobile_menu -= topMenuHeight;
mobileMenu.style.setProperty('--height-mobile-menu', `${height_mobile_menu}px`);
//




// FILTER ITEM DROP
$('.filter-form__item-drop, .footer__item-drop').on('click', function() {
	console.log('ok');
	$target = event.target.closest('.filter-form__title, .filter-form__extra, .footer__title-drop');
	if(!$target) return;
	$($target).toggleClass('drop-active');
	$($target).next().slideToggle(200);
})
//


//FOOTER TITLE DROP
document.addEventListener('DOMContentLoaded', function() {
	let footerDrop = document.querySelectorAll('.footer__item-drop > .footer__title');

	function checkWidth () {
		let windowWidth = window.innerWidth;

		footerDrop.forEach(item=> {
			if(windowWidth < 480) {
				item.classList.add('footer__title-drop');
			}
			else {
				item.classList.remove('footer__title-drop');
			}
		})
	}

	checkWidth();


	window.onresize = function() {
		checkWidth();
	}
});



//HEADER-GAP
document.addEventListener('DOMContentLoaded', function() {
	function checkWidth () {
		let width = window.innerWidth;
		let headerTop = document.querySelector('.header__top');
		let headerMenuLine = document.querySelector('.header__mobile-menu-line');
		let headerGapBlock = document.querySelector('.header__gap-block');

		if(width <= 968) {
			headerGapBlock.style.height = headerTop.offsetHeight + headerMenuLine.offsetHeight + 'px';
		}
		if(width > 968) {
			headerGapBlock.style.height = 0 + 'px';
		}
	}
	checkWidth();
	window.addEventListener('resize', ()=> {
		checkWidth();
	})
});
