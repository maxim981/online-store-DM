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



// BASKET
let basket = document.querySelectorAll('.product-item__basket');
basket.forEach(item=> {
	item.onclick = function(event) {
		event.preventDefault();
	}
})



//FILTER SELECT 

let selectAll = document.querySelectorAll('.select');
let selectButtonAll = document.querySelectorAll('.select__button');
let selectListAll = document.querySelectorAll('.select__list');
let asideFilter = document.querySelector('.aside-filter');


selectAll.forEach((item)=> {
	item.onclick = function(event) {
		event.stopPropagation();
		event.preventDefault();
		let target = event.target.closest('.select__button');
		let selectList = this.querySelector('.select__list');
		let selectListAll = this.querySelectorAll('.select__list');
		let selectButton = this.querySelector('.select__button');
		let selectItemAll = this.querySelectorAll('.select__item');

		let _this = this;
		if(!target) {
			selectList.classList.remove('select__list--active');
			selectButton.classList.remove('select__button--active');
			return;
		}

		// hide sibling
		if(this.parentNode.classList.contains('param-list')) {
			let hideSibling = Array.from(this.parentNode.children).filter(i=>i != _this);
			hideSibling.forEach(item=> {
				let btn = item.querySelector('.select__button');
				let list = item.querySelector('.select__list');
				btn.classList.remove('select__button--active');
				list.classList.remove('select__list--active');
			})
		}
		target.classList.toggle('select__button--active');
		selectList.classList.toggle('select__list--active');

		// select option
		selectList.onclick = function(event) {
			let target = event.target.closest('.select__item');
			selectButton.innerText = target.innerText;
			selectList.classList.remove('select__list--active');
			selectButton.classList.remove('select__button--active');
			Array.from(selectItemAll).forEach(item=> {
				item.classList.remove('select__item--active');
			})
			target.classList.add('select__item--active');
		}
		// dropdown hide
		document.onclick = function(event, target) {
			Array.from(selectListAll).forEach(item=> {
				item.classList.remove('select__list--active');
			})
			selectList.classList.remove('select__list--active');
			selectButton.classList.remove('select__button--active');
		}
	}
})

//FILTER SELECT MOBILE

let filter = document.querySelector('.filter');

document.addEventListener('DOMContentLoaded', ()=> {
	if(window.innerWidth <= 620) {
		filter.classList.add('filter--mobile');
	}
	else {
		filter.classList.remove('filter--mobile');
	}
})
window.addEventListener('resize', ()=> {
	if(window.innerWidth <= 620) {
		filter.classList.add('filter--mobile');
	}
	else {
		filter.classList.remove('filter--mobile');
	}
})
window.addEventListener('resize', ()=> {
	function showFilter() {
		if(window.innerWidth >= 700) {
			asideFilter.style.setProperty('display', 'block');
		}
	}
	window.onresize = function() {
		showFilter();
	}
})

//





// FILTER GRIDS BUTTON
let grids = document.querySelector('.filter__grids');
let catalogContent = document.querySelector('.catalog-products__content');
grids.onclick = function(event) {
	let target = event.target.closest('button');
	if(!target) return;
	let buttons = grids.children;
	Array.from(buttons).forEach(item=> {
		item.classList.remove('grids--active');
	});
	target.classList.add('grids--active');
	if(target.classList.contains('grids__list')) {
		catalogContent.classList.add('catalog-products__content--line');
	}
	else if (catalogContent.classList.remove('catalog-products__content--line'));
}




// FILTER ITEM DROP
$('.filter-form__item-drop, .footer__item-drop, .catalog__filter-btn').on('click', function() {
	$target = event.target.closest('.filter-form__title, .filter-form__extra, .footer__title-drop, .catalog__filter-btn');
	if(!$target) return;
	$($target).toggleClass('drop-active');
	$($target).next().slideToggle(200);
})
//



// PRICE RANGE SLIDER
let inputLeft = document.querySelector('.price-range__input-left');
let inputRight = document.querySelector('.price-range__input-right');
let range = document.querySelector('.price-range__range');

//PRICE VALUE 
let priceMinVal = document.querySelector('.price-range__min .price-range__input');
let priceMaxVal = document.querySelector('.price-range__max .price-range__input');

//CUSTOM FADE
let thumbLeft = document.querySelector('.price-range__thumb-left');
let thumbRight = document.querySelector('.price-range__thumb-right');


//events
inputLeft.addEventListener('input', priceMin);
inputRight.addEventListener('input', priceMax);



//FADE SHADOW
inputLeft.addEventListener('mouseover', shadowLeftOn);
inputLeft.addEventListener('mouseout', shadowLeftOff);
inputRight.addEventListener('mouseover', shadowRightOn);
inputRight.addEventListener('mouseout', shadowLRightOff);

function shadowLeftOn() {
	thumbLeft.classList.add('price-range__thumb-left--shadow');
}
function shadowLeftOff() {
	thumbLeft.classList.remove('price-range__thumb-left--shadow');
}
function shadowRightOn() {
	thumbRight.classList.add('price-range__thumb-right--shadow');
}
function shadowLRightOff() {
	thumbRight.classList.remove('price-range__thumb-right--shadow');
}



//FADE LEFT POSITION
function priceMin() {
	let _this = inputLeft;
	_this.value;
	let gapValue = Math.min(parseInt(_this.value), parseInt(inputRight.value) - 100000);
	_this.value = gapValue;
	let percent = _this.value / _this.max * 100;
	range.style.left = percent + '%';
	let valGap = _this.value.split(' ').join('');
	valGap = valGap.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
	priceMinVal.value = valGap;
	thumbLeft.style.left = percent + '%';
}
//FADE RIGHT POSITION
function priceMax() {
	let _this = inputRight;
	let gapValue = Math.max(parseInt(_this.value), parseInt(inputLeft.value) + 100000);
	_this.value = gapValue;
	let percent = _this.value / _this.max * 100;
	range.style.right = 100 - percent + '%';
	let valGap = _this.value.split(' ').join('');
	valGap = valGap.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
	priceMaxVal.value = valGap;
	thumbRight.style.right = 100 - percent + '%';
}
priceMin();
priceMax();


//PRICE VALUE MIN
priceMinVal.onfocus = function() {
	this.oninput = function() {
		let gap = this.value.replace(/[\D\s]/g, '');
		this.value = gap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

	}
	this.onkeydown = function(event) {
		if(event.keyCode === 13) {
			event.target.blur();
		}
	}
	this.onblur = function() {
		let _this = this.value.replace(/\s/g, '');
		let minVal = parseInt(inputLeft.min);
		let maxVal = parseInt(priceMaxVal.value.replace(/\s/g, ''));
		if(_this <= minVal) {
			_this = minVal;
		}
		else if(_this >= maxVal) {
			_this = maxVal - 100000;
		}
		this.value = _this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
		inputLeft.value = _this;
		let percent = _this / inputRight.max * 100;
		range.style.left = percent + '%';
		thumbLeft.style.left = percent + '%';

	}
}

//PRICE VALUE MAX
priceMaxVal.onfocus = function() {
	this.oninput = function() {
		let gap = this.value.replace(/[\D\s]/g, '');
		this.value = gap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
	}
	this.onkeydown = function(event) {
		if(event.keyCode === 13) {
			event.target.blur();
		}
	}
	this.onblur = function() {
		let _this = this.value.replace(/\s/g, '');
		let minVal = parseInt(priceMinVal.value.replace(/\s/g, ''));
		let maxVal = parseInt(inputRight.max);
		if(_this <= minVal) {
			_this = minVal + 100000;
		}
		else if(_this >= maxVal) {
			_this = maxVal;
		}
		this.value = _this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
		inputRight.value = _this;
		let percent = _this / inputRight.max * 100;
		range.style.right = 100 - percent + '%';
		thumbRight.style.right = 100 - percent + '%';
	}
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






//FOOTER TITLE DROP
document.addEventListener('DOMContentLoaded', function() {
	let footerDrop = document.querySelectorAll('.footer__item-drop > .footer__title');
	function checkWidth() {
		if(window.innerWidth > 480) {
			footerDrop.forEach(item=> {
				item.classList.remove('footer__title-drop');
			})
		}
		else {
			footerDrop.forEach(item=> {
				item.classList.add('footer__title-drop');
			})
		}
	}
	checkWidth();
	window.addEventListener('resize', ()=> {
		checkWidth();
	})
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


