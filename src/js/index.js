var $ = require('jquery');
var tempUri = window.location.hash;
import { TweenLite ,TweenMax, TimelineLite, Power4, Power3, Linear, Elastic, CSSPlugin, TimelineMax} from 'gsap';
import 'gsap/src/uncompressed/plugins/ScrollToPlugin';

// Import lodash.
import _ from 'lodash';
import 'lodash/throttle';
import { start } from 'repl';
import { read } from 'fs';

// Loading screen.
let loadingTween = TweenMax.to($('#loading-section .content img'), 0.5, {opacity:0.5, repeat: -1, yoyo: true});

// Update Work carousel position.
var updateWorkCarousel = initLandingWorkSlider();

window.onload = () => {
	renderContent(tempUri);
};

$(document).ready(()=>{
	tempUri = window.location.hash;
	//createProjects();
	menuControl();
	selectWork();
	nav();
	checkURL();
	//renderContent(tempUri);
	validateForm();
	scrollDirection();
	removeAutoComplete();
	initWebSectionAnimations(); // Web Section scroll animations.
	initImageCarousels(); // Web Section carousel.
	initLandingWhySlider(); // Landing automatic slider from "We start with why?".
	//initLandingWorkSlider(); // Landing slider.
	initLandingTestimonials(); // Landing testimonials.
	initPressPosts(); // Press Section posts.
	initLazyLoad();
})

function menuControl(){
	$('.openMenuBtn').click(()=>{
		openMenu();
	})
	$('.closeMenuBtn').click(()=>{
		closeMenu();
	})
}
function closeMenu(){
	$('.menu').removeClass('show');
	$('.menu').addClass('hidden');
	$('.fixed-ui .button-container').removeClass('close');
	$('.openMenuBtn').removeClass('hidden');
	$('.closeMenuBtn').addClass('hidden');
	$('.isotipo').removeClass('show');
	
	setTimeout(()=>{
		$('.menu').removeClass('transition');
		TweenLite.killTweensOf('.menu .opt');
		TweenLite.set('.menu .opt', {clearProps:"all"});
	},300)
}

function openMenu(){
	$('.menu').addClass('transition');
	$('.isotipo').addClass('show');
	setTimeout(()=>{
		$('.menu').removeClass('hidden');
		$('.menu').addClass('show');
		$('.fixed-ui .button-container').addClass('close');
		$('.openMenuBtn').addClass('hidden');
		$('.closeMenuBtn').removeClass('hidden');
	},10)
	setTimeout(()=>{
		UIAnimations();
	},10)
}
function selectWork(){
	$('.project').hover(()=>{
		$('.project').removeClass('selected');
		$('.bg-container .bg').removeClass('selected');
	})

	$('.project.one').hover(()=>{
		$('.one').addClass('selected');
	})
	$('.project.two').hover(()=>{
		$('.two').addClass('selected');
	})
	$('.project.three').hover(()=>{
		$('.three').addClass('selected');
	})
	$('.project.four').hover(()=>{
		$('.four').addClass('selected');
	})
	$('.project.five').hover(()=>{
		$('.five').addClass('selected');
	})
	$('.project.six').hover(()=>{
		$('.six').addClass('selected');
	})
	$('.project.seven').hover(()=>{
		$('.seven').addClass('selected');
	})
	$('.project.eight').hover(()=>{
		$('.eight').addClass('selected');
	})

	$('.project').click(function(){
		setTimeout(()=>{
			if(!$(this)[0].getAttribute("data-link"))
				return
			window.location.href = $(this)[0].getAttribute("data-link");
		},300)
	})

	$('.work-type .opt').click(function(){
		$('.work-type .opt').removeClass('selected');
		$(this).addClass('selected');
		if($(this).hasClass("work-opt")){
			showCategoryWork();
		}else{
			showCategoryLab();
		}
	})
}
function showCategoryWork(){
	$('.project').removeClass('selected');
	$('.bg-container .bg').removeClass('selected');
	//$('.two').addClass('selected'); //focus second project
	$('#work-section .work-projects').removeClass('hidden');
	$('#work-section .lab-projects').addClass('hidden');
	$('#work-section .workOpts').removeClass('hidden');
	$('#work-section .labOpts').addClass('hidden');
	$('.work-type .work-opt').addClass('selected');
	$('.work-type .lab-opt').removeClass('selected');
}
function showCategoryLab(){
	$('.project').removeClass('selected');
	$('.bg-container .bg').removeClass('selected');
	$('.one').addClass('selected'); //focus first project
	$('#work-section .lab-projects').removeClass('hidden');
	$('#work-section .work-projects').addClass('hidden');
	$('#work-section .labOpts').removeClass('hidden');
	$('#work-section .workOpts').addClass('hidden');
	$('.work-type .work-opt').removeClass('selected');
	$('.work-type .lab-opt').addClass('selected');
}
function hideSection(tSection){
	//console.log("hidding",tSection[0])
	tSection.addClass('transitionOut');
	tSection.removeClass('show');
	setTimeout(()=>{
		tSection.addClass('hidden');
		tSection.removeClass('transitionOut');
	},600);
}
function showSection(tSection){
	tSection.addClass('transitionOut');
	
	var transOut = new Promise(function(resolve, reject) {
		tSection.removeClass('hidden');
		setTimeout(()=>{
			resolve();
		},10);
	});
	
	var removeHidden = new Promise(function(resolve, reject) {
		// tSection.removeClass('hidden');
		setTimeout(()=>{
			tSection.addClass('show');
			resolve();
		},200);
	});

	Promise.all([transOut,removeHidden]).then(()=>{
		tSection.addClass('show');
		tSection.removeClass('transitionOut');
	})
}
function nav(){
	$('.menu .opt').click(()=>{
		setTimeout(()=>{
			closeMenu();
		},250)
	})
	$('.menu-work').click(()=>{
		showCategoryWork();
	})

	$('.goBack .container').click(()=>{
		window.location.href = '#work';
		showCategoryWork();
	})
}

function checkURL(){
	window.onpopstate = function(event) {
		tempUri = window.location.hash;
		//console.log('url', tempUri);
		renderContent(tempUri);
	};
}

function renderContent(uri){
	//console.log('rendering url', uri);
	switch(uri){
		case '#loading':
			hideSection($('.section').not('#loading-section').not('.hidden'));
			setTimeout(()=>{
				showSection($('#loading-section'));
			},300)
		break;
		case '#about':
			hideSection($('.section').not('#about-section').not('.hidden'));
			setTimeout(()=>{
				showSection($('#about-section'));
			},300)
		break;
		case '#work':
			hideSection($('.section').not('#work-section').not('.hidden'));
			setTimeout(()=>{
				showSection($('#work-section'));
			},300)
		break;
		case '#web':
			hideSection($('.section').not('#web-section').not('.hidden'));
			setTimeout(()=>{
				showSection($('#web-section'));
			},300)
		break;
		case '#webar':
			hideSection($('.section').not('#web-ar').not('.hidden'));
			setTimeout(()=>{
				showSection($('#web-ar'));
			},300)
		break;
		case '#press':
			hideSection($('.section').not('#press-section').not('.hidden'));
			setTimeout(()=>{
				showSection($('#press-section'));
			},300)
		break;
		case '#video':
			hideSection($('.section').not('#video-section').not('.hidden'));
			setTimeout(()=>{
				showSection($('#video-section'));
			},300)
		break;
		case '#comefindme':
			hideSection($('.section').not('#come-find-me').not('.hidden'));
			setTimeout(()=>{
				showSection($('#come-find-me'));
			},300)
		break;
		case '#g2':
			hideSection($('.section').not('#g2').not('.hidden'));
			setTimeout(()=>{
				showSection($('#g2'));
			},300)
		break;
		case '#carhartt':
			hideSection($('.section').not('#carhartt').not('.hidden'));
			setTimeout(()=>{
				showSection($('#carhartt'));
			},300)
		break;
		case '#wineEnthusiast':
			hideSection($('.section').not('#wineEnthusiast').not('.hidden'));
			setTimeout(()=>{
				showSection($('#wineEnthusiast'));
			},300)
		break;
		case '#monarch':
		hideSection($('.section').not('#monarch').not('.hidden'));
		setTimeout(()=>{
			showSection($('#monarch'));
		},300)
		break;
		case '#filterslenses':
			hideSection($('.section').not('#filterslenses').not('.hidden'));
			setTimeout(()=>{
				showSection($('#filters-lenses'));
			},300)
		break;
		case '#thejourney':
			hideSection($('.section').not('#thejourney').not('.hidden'));
			setTimeout(()=>{
				showSection($('#thejourney'));
			},300)
		break;
		case '#surfrx':
			hideSection($('.section').not('#surf-prescriptions').not('.hidden'));
			setTimeout(()=>{
				showSection($('#surf-prescriptions'));
			},300)
		break;
		case '#contact':
			hideSection($('.section').not('#contact-section').not('.hidden'));
			setTimeout(()=>{
				showSection($('#contact-section'));
			},300)
		break;
		case '#':
		case '#landing':
		default:
			hideSection($('.section').not('#landing-section').not('.hidden'));
			setTimeout(()=>{
				showSection($('#landing-section'));
			},300)
			setTimeout(() => {
				updateWorkCarousel();
			}, 1000);
		break;
	}
	var section = $('.section .content');
	TweenLite.to(section, 1, {scrollTo:0});
	//TweenLite.to(window, 1, {scrollTo:0});
}
function UIAnimations(){
	var menu = $('.menu');
	var options = menu.find('.opt');
	$.each(options, function(i,val){
		TweenLite.from(options[i],0.6,{left:"-40rem", opacity: 0, delay:0.2+(i*0.2)})
	})
}

function validateForm(){

	// Forms.
	let formsArray = [];

	let form1 = {
		formId: '#contactForm',
		submitButton: '#contactForm .submitBtn',
		location: '#contact'
	}

	let form2 = {
		formId: '#contactForm2',
		submitButton: '#contactForm2 .submitBtn',
		location: '#web'
	}

	formsArray.push(form1);
	formsArray.push(form2);

	for(let form of formsArray) {
		let submitButton =  $(form.submitButton);
		let formContent = $(form.formId);
		
		submitButton.on('click',function(){
			this.preventDefault;
			formContent.trigger("submit");
		})
		
		$(document).on(form.formId + " focusout", form.formId + ".inputContainer.required input",()=>{
			checkFormInputs(formContent)
		})

		formContent.on('submit',(event)=>{
			event.preventDefault();
			if(checkFormInputs(formContent)){
				$('.required').each(function(){
					$(this).removeClass('required');
				})
				var tempEmail = 'mailto:sales@augmentedislandstudios.com?subject=Contact from website';
				tempEmail+='&body='+formContent[0].message.value;
				tempEmail+='%0D%0A%0D%0A%0D%0AContact info: %0D%0A Name: '+formContent[0].name.value;
				tempEmail+='%0D%0A Email: '+formContent[0].email.value;
				tempEmail+='%0D%0A Phone: '+formContent[0].phone.value;
				location.href=tempEmail;
				location.href=form.location;
			}
		});
	}

}

function checkFormInputs(formContent){
	//console.log(formContent);
	let fail = false;
	let name;
	let fail_log = '';
	let userEmailValid = false;
	formContent.find('input, textarea').each(function(){
		if( !$( this ).prop( 'required' )){
			//Do nothing
		} else {
			if ( ! $( this ).val() ) {
				fail = true;
				$( this ).parent().addClass("required");
				name = $( this ).attr( 'name' );
				fail_log += name + " is required \n";
			}else{
				$( this ).parent().removeClass("required");
			}
		}
	});

	//submit if fail never got set to true
	if ( ! fail ) {	
		return true;
	} else {
		return false
	}
}

function scrollDirection(){
	//  //Firefox
	//  $('.content').bind('DOMMouseScroll', function(e){
	// 	if(e.originalEvent.detail > 0) {
	// 		//scroll down
	// 		console.log('Down');
	// 	}else {
	// 		//scroll up
	// 		console.log('Up');
	// 	}
   
	// 	//prevent page fom scrolling
	// 	return false;
	// },{passive: true});
   
	// //IE, Opera, Safari
	// $('.content').bind('mousewheel', function(e){
	// 	if(e.originalEvent.wheelDelta < 0) {
	// 		//scroll down
	// 		console.log('Down');
	// 	}else {
	// 		//scroll up
	// 		console.log('Up');
	// 	}
   
	// 	//prevent page fom scrolling
	// 	return false;
	// },{passive: true});
	var iScrollPos = 0;

	$('.content').scroll(function () {
		var iCurScrollPos = $(this).scrollTop();
		if (iCurScrollPos > iScrollPos) {
			//Scrolling Down
			//console.log('Down');
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				// is mobile..
				//alert('ismobile');
				$('.fixed-ui').addClass('out');
				//TweenLite.to($('.fixed-ui'),0.6,{top:'-100px'})
			}
		} else {
		//Scrolling Up
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			// is mobile..
			
			//TweenLite.to($('.fixed-ui'),0.6,{top:'0%'})
			$('.fixed-ui').removeClass('out');
		}
		//console.log('Up');
		}
		iScrollPos = iCurScrollPos;
	});
}
function removeAutoComplete(){
	if (document.getElementsByTagName) {

		var inputElements = document.getElementsByTagName("input");
		
		for ( var i=0; inputElements[i]; i++) {
			if (inputElements[i].className && (inputElements[i].className.indexOf("disableAutoComplete") != -1)) {
				inputElements[i].setAttribute("autocomplete","nope");
				//console.log("disbale",i)	
			}
		}
	}
}

function initWebSectionAnimations(){

	let webWindow = document.getElementById("web-section");

	let viewportHeight = window.innerHeight; // This is the viewport height.

	// The top value of elements.
	let complaint1Position = document.getElementById("complaint-1").getBoundingClientRect().top;
	let complaint2Position = document.getElementById("complaint-2").getBoundingClientRect().top;
	let complaint3Position = document.getElementById("complaint-3").getBoundingClientRect().top;
	let complaint4Position = document.getElementById("complaint-4").getBoundingClientRect().top;

	// State. Defines if a complaint has not appeared, has appeared and has finished.
	let complaint1state = 0;
	let complaint2state = 0;
	let complaint3state = 0;
	let complaint4state = 0;

	/* Tweens. */

	// Intro animation of complaints.
	let tw1 = TweenLite.from("#complaint-1", 0.5, {x: -20, opacity: 0, paused: true});
	let tw2 = TweenLite.from("#complaint-2", 0.5, {x: 20, opacity: 0, paused: true});
	let tw3 = TweenLite.from("#complaint-3", 0.5, {x: -20, opacity: 0, paused: true});
	let tw4 = TweenLite.from("#complaint-4", 0.5, {x: 20, opacity: 0, paused: true});

	// Store lodash throttle function.
	let lodashFunction = _.throttle(() => {

		//console.log("Scrolleando.");

		// Update positions.
		complaint1Position = document.getElementById("complaint-1").getBoundingClientRect().top;
		complaint2Position = document.getElementById("complaint-2").getBoundingClientRect().top;
		complaint3Position = document.getElementById("complaint-3").getBoundingClientRect().top;
		complaint4Position = document.getElementById("complaint-4").getBoundingClientRect().top;

		// Check position. Intro animations.
		if((((complaint1Position*100)/viewportHeight) <= 70) && complaint1state === 0) {
			tw1.play();
			complaint1state = 1;
		}
		if((((complaint2Position*100)/viewportHeight) <= 70) && complaint2state === 0) {
			tw2.play();
			complaint2state = 1;
		}
		if((((complaint3Position*100)/viewportHeight) <= 70) && complaint3state === 0) {
			tw3.play();
			complaint3state = 1;
		}
		if((((complaint4Position*100)/viewportHeight) <= 70) && complaint4state === 0) {
			tw4.play();
			complaint4state = 1;
		}

		// Eliminate envent listener if all animations are complete.
		if(complaint1state === 1 && complaint2state === 1 && complaint3state === 1 && complaint4state === 1) {
			//console.log("Todas las animaciones se terminaron.");
			webWindow.removeEventListener("scroll", lodashFunction);
		}

	}, 200);

	webWindow.addEventListener("scroll", lodashFunction);

}

function initImageCarousels() {

	let carousels = [];

	carousels[0] = {
		src: ".ourwork-container .carousel-container",
		startX: "",
		posWrapper: 0,
		clickIsDown: false,
		walk: 0,
		walkTransition: window.innerWidth <= 740 ? window.innerWidth/4 : window.innerWidth/5,
		webSlider: document.querySelector(".ourwork-container .carousel-container"),
		webWrapper: document.querySelector(".ourwork-container .carousel-container .mask .wrapper"),
		items: $(".ourwork-container .carousel-container .mask .wrapper .slide"),
		arrows: $(".ourwork-container .carousel-container .carousel-arrow"),
		dots: $(".ourwork-container .carousel-container .carousel-dots .dot"),
		dotsContainer: $(".ourwork-container .carousel-container .carousel-dots"),
		dotsSrc: ".ourwork-container .carousel-container .carousel-dots .dot",
		activeIndex: 0,
	};

	carousels[1] = {
		src: ".webarwork-container .carousel-container",
		startX: "",
		posWrapper: 0,
		clickIsDown: false,
		walk: 0,
		walkTransition: window.innerWidth <= 740 ? window.innerWidth/4 : window.innerWidth/5,
		webSlider: document.querySelector(".webarwork-container .carousel-container"),
		webWrapper: document.querySelector(".webarwork-container .carousel-container .mask .wrapper"),
		items: $(".webarwork-container .carousel-container .mask .wrapper .slide"),
		arrows: $(".webarwork-container .carousel-container .carousel-arrow"),
		dots: $(".webarwork-container .carousel-container .carousel-dots .dot"),
		dotsContainer: $(".webarwork-container .carousel-container .carousel-dots"),
		dotsSrc: ".webarwork-container .carousel-container .carousel-dots .dot",
		activeIndex: 0,
	};

	for(let carousel of carousels) {

		for(let arrow of carousel.arrows) {
			arrow.addEventListener("click", (e) => {
				// If arrow was clicked.
				if($(e.currentTarget).hasClass('right')){
					carousel.activeIndex++;
					if(carousel.activeIndex>= carousel.items.length){
						carousel.activeIndex = 0;
					}
				}else{
					carousel.activeIndex--;
					if(carousel.activeIndex<0){
						carousel.activeIndex = carousel.items.length-1;
					}
				}
				carouselScroll(carousel);
			});
		}

		createCarouselDots(carousel);

		for(let dot of carousel.dots) {
			//console.log(dot);
			dot.addEventListener("click", (e) => {
				let slide = $(e.currentTarget).attr('slide');
				carousel.activeIndex = slide - 1;
				carouselScroll(carousel);
			});
		}

		carousel.webWrapper.style.transition = "all 500ms ease-in-out";

		carousel.webSlider.addEventListener("touchstart", (e) => { // 
		
			//console.log("Mouse down.");
			
			carousel.clickIsDown = true;
			carousel.walk = 0;
			carousel.startX = e.touches[0].screenX;
	
			carousel.posWrapper = carousel.items[carousel.activeIndex].offsetLeft;
	
		});
	
		carousel.webSlider.addEventListener("touchend", () => {
			
			//console.log("Mouse up.");
	
			carousel.webWrapper.style.transition = "all 500ms ease-in-out";
			
			carousel.clickIsDown = false;
	
			//console.log("Walk final: " + walk);
	
			if(carousel.walk >= carousel.walkTransition) { // Si va hacia la izquierda.
				if(carousel.activeIndex <= 0) {
					carousel.activeIndex = carousel.items.length - 1;
				} else {
					carousel.activeIndex--;
				}
			} else if (carousel.walk <= -(carousel.walkTransition)) { // Si va hacia la derecha.
				if(carousel.activeIndex < carousel.items.length - 1) {
					carousel.activeIndex++;
				} else {
					carousel.activeIndex = 0;
				}
			} else { // Si no hay un movimiento suficiente.
			}
	
			carouselScroll(carousel);
	
		});
	
		carousel.webSlider.addEventListener("touchmove", (e) => {
	
			if (!carousel.clickIsDown) {
	
			} else {
	
				carousel.webWrapper.style.transition = "";
	
				e.preventDefault();
				carousel.walk = (e.touches[0].screenX - carousel.startX);
				carousel.webWrapper.style.transform = "translateX(" + ((carousel.posWrapper*(-1)) + carousel.walk) + "px)";
	
				//console.log(walk);
	
			}
			
		});

	}
	
}

function createCarouselDots(carousel) {

	for(let i = 0; i < carousel.items.length; i++) {
		if(i === 0) {
			carousel.dotsContainer.append("<div class='dot active' slide=" + (i+1) + "><div class='graphic'></div></div>");
		} else {
			carousel.dotsContainer.append("<div class='dot' slide=" + (i+1) + "><div class='graphic'></div></div>");
		}
	}

	// Update dots.
	carousel.dots = $(carousel.dotsSrc);

}

function carouselScroll(carousel) {

	// Scroll action.
	let position = $(carousel.items[carousel.activeIndex]).position().left;
	carousel.webWrapper.style.transform = "translateX(" + position*(-1) + "px)";
	carousel.dots.removeClass('active');
	$(carousel.dots[carousel.activeIndex]).addClass('active');

}

function initLandingWhySlider() {

	const whyImages = document.querySelectorAll("#landing-section .auto-carousel-img");

	let whySlideIndex = 0;

	setInterval(() => {
		if (whySlideIndex >= (whyImages.length-1)) {
			TweenLite.to(whyImages[whySlideIndex], 1, {opacity: 0});
			TweenLite.to(whyImages[0], 1, {opacity: 1});
			whySlideIndex = 0;
		} else {
			TweenLite.to(whyImages[whySlideIndex], 1, {opacity: 0});
			TweenLite.to(whyImages[whySlideIndex+1], 1, {opacity: 1});
			whySlideIndex++;
		}
	}, 5500);

}

function initLandingWorkSlider() {

	let landingWindow = document.getElementById("landing-section");
	let viewportHeight = window.innerHeight; // This is the viewport height.

	const workSlider = document.getElementById("landing-work-carousel");
	const workWrapper = document.querySelector("#landing-work-carousel .wrapper");

	// const workCursor = document.querySelector("#landing-work-carousel .cursor-drag");

	let startX;
	let posWrapper = 0;
	let clickIsDown = false;
	let walk = 0;
	let walkTransition = window.innerWidth <= 740 ? window.innerWidth/4 : window.innerWidth/5;
	let activeIndex = 0;
	let widthMiddle = 0;

	let projects = [];
	const projectsElements = document.querySelectorAll("#landing-work-carousel .project-container");

	for(let p of projectsElements) {
		projects.push({
			parent: p,
			element: p.children[0],
			timeline: new TimelineLite({
							paused: true
						})/*.to(p.children[0], 0.2, {width: "90%", height: "77.1%"})
						.to(p.children[0], 0.5, {padding: "4%"}, 0.2)
						.to(p.children[0].children[1], 0.5, {width: "78%", height: "70%", opacity: 1}, 0.9)
						.to(p.children[0].children[1].children[0], 0.2, {opacity: 1}, 1.5)
						.to(p.children[0].children[1].children[1], 0.2, {opacity: 1}, 1.5)
						.to(p.children[0].children[1].children[2], 0.2, {opacity: 1}, 1.5),*/
						.to(p.children[0], 1.2, {width: "90%", height: "77.1%"})
						.to(p.children[0], 0.8, {padding: "4%"}, 0.7)
						.to(p.children[0].children[1], 0.8, {width: "78%", height: "70%", opacity: 1}, 0.7)
						.to(p.children[0].children[1].children[0], 0.5, {opacity: 1}, 1.5)
						.to(p.children[0].children[1].children[1], 0.5, {opacity: 1}, 1.5)
						.to(p.children[0].children[1].children[2], 0.5, {opacity: 1}, 1.5),
			isActive: false
		});
	}

	//Animation.
	let playOnArrival = _.throttle(() => {
		//console.log("LANDING SCROLL!");
		if(window.innerWidth <= 740) {
			if((((projects[activeIndex].parent.getBoundingClientRect().top*100)/viewportHeight) <= 70)) {
				projects[activeIndex].timeline.play();
				landingWindow.removeEventListener("scroll", playOnArrival);
			}
		} else {
			if((((projects[activeIndex].parent.getBoundingClientRect().top*100)/viewportHeight) <= 40)) {
				projects[activeIndex].timeline.play();
				landingWindow.removeEventListener("scroll", playOnArrival);
			}
		}
	}, 200);

	landingWindow.addEventListener("scroll", playOnArrival);

	setTimeout(() => {
		//console.log(projects[0].parent.offsetWidth);
		widthMiddle = projects[0].parent.offsetWidth / 2;
		workWrapper.style.transform = "translateX(calc(50% - " + widthMiddle +"px))";
	}, 1000);

	workSlider.addEventListener("mousedown", (e) => { // 
		
		//console.log("Mouse down.");
		
		clickIsDown = true;
		walk = 0;
		startX = e.pageX;

	});

	workSlider.addEventListener("touchstart", (e) => { // 
		
		//console.log("Mouse down.");
		
		clickIsDown = true;
		walk = 0;
		startX = e.touches[0].screenX;

	});

	workSlider.addEventListener("mouseup", () => {
		
		//console.log("Mouse up.");

		workWrapper.style.transition = "all 1s";
		
		clickIsDown = false;

		//console.log("Walk final: " + walk);

		if(walk >= walkTransition) { // Si va hacia la izquierda.
			if(activeIndex <= 0) {
				// Si va más a la izquierda cuando finalizó, no pasa nada.
				workWrapper.style.transform = "translateX(calc(50% - " + widthMiddle + "px + " + posWrapper*(-1) + "px))";
			} else {
				projects[activeIndex].timeline.reverse().timeScale(1.8);
				activeIndex--;
				//console.log(activeIndex);
				posWrapper = projects[activeIndex].parent.offsetLeft;
				workWrapper.style.transform = "translateX(calc(50% - " + widthMiddle + "px + " + posWrapper*(-1) + "px))";
				projects[activeIndex].timeline.play().timeScale(1);
			}
		} else if (walk <= -(walkTransition)) { // Si va hacia la derecha.
			if(activeIndex < projects.length - 1) {
				projects[activeIndex].timeline.reverse().timeScale(1.8);
				activeIndex++;
				//console.log(activeIndex);
				posWrapper = projects[activeIndex].parent.offsetLeft;
				workWrapper.style.transform = "translateX(calc(50% - " + widthMiddle + "px + " + posWrapper*(-1) + "px))";
				projects[activeIndex].timeline.play().timeScale(1);
			} else {
				// Si va más a la derecha cuando finalizó, no pasa nada.
				workWrapper.style.transform = "translateX(calc(50% - " + widthMiddle + "px + " + posWrapper*(-1) + "px))";
			}
		} else { // Si no hay un movimiento suficiente.
			workWrapper.style.transform = "translateX(calc(50% - " + widthMiddle + "px + " + posWrapper*(-1) + "px))";
		}

		//console.log(posWrapper);

	});

	workSlider.addEventListener("touchend", () => {
		
		//console.log("Mouse up.");

		workWrapper.style.transition = "all 1s";
		
		clickIsDown = false;

		//console.log("Walk final: " + walk);

		if(walk >= walkTransition) { // Si va hacia la izquierda.
			if(activeIndex <= 0) {
				// Si va más a la izquierda cuando finalizó, no pasa nada.
				workWrapper.style.transform = "translateX(calc(50% - " + widthMiddle + "px + " + posWrapper*(-1) + "px))";
			} else {
				projects[activeIndex].timeline.reverse().timeScale(1.8);
				activeIndex--;
				//console.log(activeIndex);
				posWrapper = projects[activeIndex].parent.offsetLeft;
				workWrapper.style.transform = "translateX(calc(50% - " + widthMiddle + "px + " + posWrapper*(-1) + "px))";
				projects[activeIndex].timeline.play().timeScale(1);
			}
		} else if (walk <= -(walkTransition)) { // Si va hacia la derecha.
			if(activeIndex < projects.length - 1) {
				projects[activeIndex].timeline.reverse().timeScale(1.8);
				activeIndex++;
				//console.log(activeIndex);
				posWrapper = projects[activeIndex].parent.offsetLeft;
				workWrapper.style.transform = "translateX(calc(50% - " + widthMiddle + "px + " + posWrapper*(-1) + "px))";
				projects[activeIndex].timeline.play().timeScale(1);
			} else {
				// Si va más a la derecha cuando finalizó, no pasa nada.
				workWrapper.style.transform = "translateX(calc(50% - " + widthMiddle + "px + " + posWrapper*(-1) + "px))";
			}
		} else { // Si no hay un movimiento suficiente.
			workWrapper.style.transform = "translateX(calc(50% - " + widthMiddle + "px + " + posWrapper*(-1) + "px))";
		}

		//console.log(posWrapper);

	});

	workSlider.addEventListener("mousemove", (e) => {

		if (!clickIsDown) {

		} else {

			workWrapper.style.transition = "";

			e.preventDefault();
			walk = (e.pageX - startX);
			workWrapper.style.transform = "translateX(calc(50% - " + widthMiddle + "px + " + ((posWrapper*(-1)) + walk) + "px))";

			//console.log(walk);

		}
		
	});

	workSlider.addEventListener("touchmove", (e) => {

		if (!clickIsDown) {

		} else {

			workWrapper.style.transition = "";

			e.preventDefault();
			walk = (e.touches[0].screenX - startX);
			workWrapper.style.transform = "translateX(calc(50% - " + widthMiddle + "px + " + ((posWrapper*(-1)) + walk) + "px))";

			//console.log(walk);

		}
		
	});

	window.addEventListener('resize', () => {
		widthMiddle = projects[activeIndex].parent.offsetWidth / 2;
		posWrapper = projects[activeIndex].parent.offsetLeft;
		workWrapper.style.transform = "translateX(calc(50% - " + widthMiddle + "px + " + posWrapper*(-1) + "px))";
		walkTransition = window.innerWidth <= 740 ? window.innerWidth/4 : window.innerWidth/5;
	});

	return function () {
		widthMiddle = projects[activeIndex].parent.offsetWidth / 2;
		posWrapper = projects[activeIndex].parent.offsetLeft;
		workWrapper.style.transform = "translateX(calc(50% - " + widthMiddle + "px + " + posWrapper*(-1) + "px))";
		walkTransition = window.innerWidth <= 740 ? window.innerWidth/4 : window.innerWidth/5;
	}

}

function initLandingTestimonials() {

	let testimonialsJson = require('./data/testimonials.json');
	let testimonialIndex = 0;

	let testimonialElements = document.querySelector("#landing-section > .content > .landing-container-5 > .grid-container > .testimonials > .content");

	let testimonialStatement = testimonialElements.children.item(1);
	let testimonialClient = testimonialElements.children.item(2);
	let testimonialClientDescription = testimonialElements.children.item(3);

	let testimonialLeftArrow = document.querySelector("#landing-section > .content > .landing-container-5 > .grid-container > .testimonials > .left-arrow");
	let testimonialRightArrow = document.querySelector("#landing-section > .content > .landing-container-5 > .grid-container > .testimonials > .right-arrow");

	// Testimonial touch movement.
	const testimonialSlider = document.querySelector("#landing-section > .content > .landing-container-5 > .grid-container > .testimonials");

	let startX;
	let clickIsDown = false;
	let walk = 0;
	let walkTransition = window.innerWidth/5;

	// Testimonial dots.
	let testimonialDotsContainer = document.querySelector("#landing-section > .content > .landing-container-5 > .grid-container > .testimonial-dots");
	let testimonialDots = document.querySelectorAll("#landing-section > .content > .landing-container-5 > .grid-container > .testimonial-dots > .dot");

	// Testimonial animation.
	let tlTestimonials = new TimelineLite({
		paused: true,
		autoRemoveChildren: true
	});

	let changeTestimonial = (action) => {
		console.log(testimonialIndex);
		if(action === "left") { // If left.
			if(testimonialIndex <= 0) {
				testimonialIndex = testimonialsJson.length - 1;
			} else {
				testimonialIndex--;
			}
			
			testimonialStatement.innerHTML = testimonialsJson[testimonialIndex].statement;
			testimonialClient.innerHTML = testimonialsJson[testimonialIndex].client;
			testimonialClientDescription.innerHTML = testimonialsJson[testimonialIndex].description;
		} else if(action === "right") { // If right.
			if(testimonialIndex >= (testimonialsJson.length - 1)) {
				testimonialIndex = 0;
			} else {
				testimonialIndex++;
			}

			testimonialStatement.innerHTML = testimonialsJson[testimonialIndex].statement;
			testimonialClient.innerHTML = testimonialsJson[testimonialIndex].client;
			testimonialClientDescription.innerHTML = testimonialsJson[testimonialIndex].description;
		} else { // Action is the index.
			testimonialStatement.innerHTML = testimonialsJson[action].statement;
			testimonialClient.innerHTML = testimonialsJson[action].client;
			testimonialClientDescription.innerHTML = testimonialsJson[action].description;
		}

		// testimonialStatement.innerHTML = testimonialsJson[action].statement;
		// testimonialClient.innerHTML = testimonialsJson[action].client;
		// testimonialClientDescription.innerHTML = testimonialsJson[action].description;

	};

	testimonialStatement.innerHTML = testimonialsJson[testimonialIndex].statement;
	testimonialClient.innerHTML = testimonialsJson[testimonialIndex].client;
	testimonialClientDescription.innerHTML = testimonialsJson[testimonialIndex].description;

	testimonialLeftArrow.addEventListener("click", () => {
		tlTestimonials.to(testimonialElements, 0.7, {opacity: 0})
					  .call(() => {
						changeTestimonial("left")
						for(let dot of testimonialDots) {
							dot.classList.remove('active');
						}
						testimonialDots[testimonialIndex].classList.add('active');
					  })
					  .to(testimonialElements, 0.7, {opacity: 1});
		tlTestimonials.play();
	});

	testimonialRightArrow.addEventListener("click", () => {
		tlTestimonials.to(testimonialElements, 0.7, {opacity: 0})
					  .call(() => {
						changeTestimonial("right")
						for(let dot of testimonialDots) {
							dot.classList.remove('active');
						}
						testimonialDots[testimonialIndex].classList.add('active');
					  })
					  .to(testimonialElements, 0.7, {opacity: 1});
		tlTestimonials.play();
	});

	// Create testimonial dots.
	for(let i = 0; i < testimonialsJson.length; i++) {
		if(i === 0) {
			testimonialDotsContainer.innerHTML += ("<div class='dot active' testimonial=" + (i+1) + "><div class='graphic'></div></div>");
		} else {
			testimonialDotsContainer.innerHTML += ("<div class='dot' testimonial=" + (i+1) + "><div class='graphic'></div></div>");
		}
	}

	// Update testimonial dots.
	testimonialDots = document.querySelectorAll("#landing-section > .content > .landing-container-5 > .grid-container > .testimonial-dots > .dot");

	for(let dot of testimonialDots) {
		dot.addEventListener("click", (e) => {
			let testi = $(e.currentTarget).attr('testimonial');
			if(testimonialIndex === (testi-1)) {
				// Stay in the same testimonial.
			} else {
				testimonialIndex = testi - 1;
				for(let dot of testimonialDots) {
					dot.classList.remove('active');
				}
				testimonialDots[testimonialIndex].classList.add('active');
				tlTestimonials.to(testimonialElements, 0.7, {opacity: 0})
							.call(() => {
								changeTestimonial(testimonialIndex)
							})
							.to(testimonialElements, 0.7, {opacity: 1});
				tlTestimonials.play();
			}
		});
	}

	testimonialSlider.addEventListener("touchstart", (e) => { // 
		
		//console.log("Mouse down.");
		
		clickIsDown = true;
		walk = 0;
		startX = e.touches[0].screenX;

	});

	testimonialSlider.addEventListener("touchend", () => {
		
		//console.log("Mouse up.");
		
		clickIsDown = false;

		//console.log("Walk final: " + walk);

		if(walk >= walkTransition) { // Si va hacia la izquierda.
			tlTestimonials.to(testimonialElements, 0.7, {opacity: 0})
							.call(() => {
								changeTestimonial("left")
								for(let dot of testimonialDots) {
									dot.classList.remove('active');
								}
								testimonialDots[testimonialIndex].classList.add('active');
							})
							.to(testimonialElements, 0.7, {opacity: 1});
			tlTestimonials.play();
		} else if (walk <= -(walkTransition)) { // Si va hacia la derecha.
			tlTestimonials.to(testimonialElements, 0.7, {opacity: 0})
						.call(() => {
							changeTestimonial("right")
							for(let dot of testimonialDots) {
								dot.classList.remove('active');
							}
							testimonialDots[testimonialIndex].classList.add('active');
						})
						.to(testimonialElements, 0.7, {opacity: 1});
			tlTestimonials.play();
		} else { // Si no hay un movimiento suficiente.
		}

	});

	testimonialSlider.addEventListener("touchmove", (e) => {

		if (!clickIsDown) {

		} else {

			//workWrapper.style.transition = "";

			e.preventDefault();
			walk = (e.touches[0].screenX - startX);
			//workWrapper.style.transform = "translateX(calc(50% - " + widthMiddle + "px + " + ((posWrapper*(-1)) + walk) + "px))";

			//console.log(walk);

		}
		
	});

}

function initPressPosts() {

	// Press.
	let pressJson = require('./data/press.json');
	let booleanNextArticle = false;

	let postsContainer = document.querySelector("#press-section > .content > .posts-container");
	let postsColumn1 = document.querySelector("#press-section > .content > .posts-container > .column-1");
	let postsColumn2 = document.querySelector("#press-section > .content > .posts-container > .column-2");
	let postsColumn3 = document.querySelector("#press-section > .content > .posts-container > .column-3");
	let loadMoreButton = document.querySelector("#press-section > .content > .posts-container > .load-button-container > button");

	let columnCounter = 1;
	let postCounter = 0;
	let initialPostCounter = 0;

	let postContent = document.querySelector("#press-section > .content > .post-content");
	let article = document.querySelector("#press-section > .content > .post-content > .article");
	let closeButton = document.querySelector("#press-section > .content > .post-content > .article > .top-bar > .top-bar-close");
	
	let readMoreButtons;

	// If the number of posts is less than the recommended number for the grid.
	if(pressJson.length <= 6) {
		loadMoreButton.style.display = "none";
		postsContainer.style.marginBottom = "170rem";
	}

	//console.log(window.innerWidth);

	for(let i = 0; i <= 5; i++) {
		let post = pressJson[i];
		switch(columnCounter) {
			case 1:
				postsColumn1.innerHTML += "<div class='post'><img class='lazyload' src='./assets/images/lazyload-image.png' data-src=" + post.cover + 
				" alt=''><div class='date'>" + post.date + 
				"</div><div class='title'>" + post.title + 
				"</div><button postkey='" + i + "'>Read more</button></div>";
				//columnCounter = 2;
				if(window.innerWidth >= 1200) { // Large desktop.
					columnCounter = 2;
				} else if(window.innerWidth >= 741 && window.innerWidth <= 1199) { // Medium desktop and tablets.
					columnCounter = 2;
				} else if(window.innerWidth <= 740) {
					// Do nothing.
				} else {
					console.log("Width not recognized.");
				}
				postCounter++;
				break;
			case 2:
				postsColumn2.innerHTML += "<div class='post'><img class='lazyload' src='./assets/images/lazyload-image.png' data-src=" + post.cover + 
				" alt=''><div class='date'>" + post.date + 
				"</div><div class='title'>" + post.title + 
				"</div><button postkey='" + i + "'>Read more</button></div>";
				//columnCounter = 3;
				if(window.innerWidth >= 1200) { // Large desktop.
					columnCounter = 3;
				} else if(window.innerWidth >= 741 && window.innerWidth <= 1199) { // Medium desktop and tablets.
					columnCounter = 1;
				} else if(window.innerWidth <= 740) {
					// Doesn't reach.
				} else {
					console.log("Width not recognized.");
				}
				postCounter++;
				break;
			case 3:
				postsColumn3.innerHTML += "<div class='post'><img class='lazyload' src='./assets/images/lazyload-image.png' data-src=" + post.cover + 
				" alt=''><div class='date'>" + post.date + 
				"</div><div class='title'>" + post.title + 
				"</div><button postkey='" + i + "'>Read more</button></div>";
				//columnCounter = 1;
				if(window.innerWidth >= 1200) { // Large desktop.
					columnCounter = 1;
				} else if(window.innerWidth >= 741 && window.innerWidth <= 1199) { // Medium desktop and tablets.
					// Doesn't reach.
				} else if(window.innerWidth <= 740) {
					// Doesn't reach.
				} else {
					console.log("Width not recognized.");
				}
				postCounter++;
				break;
			default:
				break;
		}

		if(postCounter >= pressJson.length) {
			loadMoreButton.style.display = "none";
			postsContainer.style.marginBottom = "170rem";
			break;
		}
	}

	readMoreButtons = document.querySelectorAll("#press-section > .content > .posts-container .post button");

	for(let button of readMoreButtons) {
		button.addEventListener("click", () => {
			openPressPost(button.getAttribute("postkey"), pressJson, booleanNextArticle);
		});
	}

	loadMoreButton.addEventListener("click", () => {
		initialPostCounter = postCounter;
		for(let i = initialPostCounter; i <= (initialPostCounter+5); i++) {
			let post = pressJson[i];
			switch(columnCounter) {
				case 1:
					postsColumn1.innerHTML += "<div class='post'><img src=" + post.cover + 
					" alt=''><div class='date'>" + post.date + 
					"</div><div class='title'>" + post.title + 
					"</div><button postkey='" + i + "'>Read more</button></div>";
					//columnCounter = 2;
					if(window.innerWidth >= 1200) { // Large desktop.
						columnCounter = 2;
					} else if(window.innerWidth >= 741 && window.innerWidth <= 1199) { // Medium desktop and tablets.
						columnCounter = 2;
					} else if(window.innerWidth <= 740) {
						// Do nothing.
					} else {
						console.log("Width not recognized.");
					}
					postCounter++;
					break;
				case 2:
					postsColumn2.innerHTML += "<div class='post'><img src=" + post.cover + 
					" alt=''><div class='date'>" + post.date + 
					"</div><div class='title'>" + post.title + 
					"</div><button postkey='" + i + "'>Read more</button></div>";
					//columnCounter = 3;
					if(window.innerWidth >= 1200) { // Large desktop.
						columnCounter = 3;
					} else if(window.innerWidth >= 741 && window.innerWidth <= 1199) { // Medium desktop and tablets.
						columnCounter = 1;
					} else if(window.innerWidth <= 740) {
						// Doesn't reach.
					} else {
						console.log("Width not recognized.");
					}
					postCounter++;
					break;
				case 3:
					postsColumn3.innerHTML += "<div class='post'><img src=" + post.cover + 
					" alt=''><div class='date'>" + post.date + 
					"</div><div class='title'>" + post.title + 
					"</div><button postkey='" + i + "'>Read more</button></div>";
					//columnCounter = 1;
					if(window.innerWidth >= 1200) { // Large desktop.
						columnCounter = 1;
					} else if(window.innerWidth >= 741 && window.innerWidth <= 1199) { // Medium desktop and tablets.
						// Doesn't reach.
					} else if(window.innerWidth <= 740) {
						// Doesn't reach.
					} else {
						console.log("Width not recognized.");
					}
					postCounter++;
					break;
				default:
					break;
			}
	
			if(postCounter >= pressJson.length) {
				loadMoreButton.style.display = "none";
				//postsContainer.style.marginBottom = "170rem";
				break;
			}
		}

		readMoreButtons = document.querySelectorAll("#press-section > .content > .posts-container .post button");

		for(let button of readMoreButtons) {
			button.addEventListener("click", () => {
				openPressPost(button.getAttribute("postkey"), pressJson, booleanNextArticle);
			});
		}

	});

	closeButton.addEventListener("click", () => {
		setTimeout(()=>{
			article.style.transform = "translateX(-100%)";
			postContent.style.opacity = "0";
			setTimeout(()=>{
				postContent.style.display = "none";
			},600);
		},50);
	});

}

function openPressPost(key, pressJson, booleanNextArticle) {

	let post = pressJson[key];

	let postContainer = document.querySelector("#press-section > .content > .post-content");
	let article = document.querySelector("#press-section > .content > .post-content > .article");
	let articleTitle = document.querySelector("#press-section > .content > .post-content > .article > .article-container > .title");
	let articleDate = document.querySelector("#press-section > .content > .post-content > .article > .article-container > .date");
	let articleContent = document.querySelector("#press-section > .content > .post-content > .article > .article-container > .article-content");
	let nextButton = document.querySelector("#press-section > .content > .post-content > .article > .article-container > .next-article-button > button");

	articleTitle.innerHTML = post.title;
	articleDate.innerHTML = post.date;
	articleContent.innerHTML = post.article;

	if(key >= (pressJson.length-1)) {
		nextButton.style.display = "none";
	} else {
		nextButton.style.display = "block";
		nextButton.setAttribute("postkey", Number(key)+1);
	}

	if(!booleanNextArticle) {
		//console.log("Añade el listener.");
		nextButton.addEventListener("click", () => {
			let newKey = nextButton.getAttribute("postkey");
			//console.log("Siguiente key: " + newKey);
			//console.log("Siguiente botón key: " + (Number(newKey)+1));
			post = pressJson[newKey];
			articleTitle.innerHTML = post.title;
			articleDate.innerHTML = post.date;
			articleContent.innerHTML = post.article;
			if(newKey >= (pressJson.length-1)) {
				nextButton.style.display = "none";
			} else {
				nextButton.style.display = "block";
				nextButton.setAttribute("postkey", Number(newKey)+1);
			}
			article.scrollTop = 0;
		});

		booleanNextArticle = true;
	} else {
		
	}

	postContainer.style.display = "block";
	article.scrollTop = 0;

	setTimeout(()=>{
		postContainer.style.opacity = "1";
		setTimeout(()=>{
			article.style.transform = "translateX(0)";
		},300);
	},50);

}

function initLazyLoad() {

	(function (root, factory) {
		if (typeof exports === "object") {
			module.exports = factory(root);
		} else if (typeof define === "function" && define.amd) {
			define([], factory);
		} else {
			root.LazyLoad = factory(root);
		}
	}) (typeof global !== "undefined" ? global : this.window || this.global, function (root) {
	
		"use strict";
	
		if (typeof define === "function" && define.amd){
			root = window;
		}
	
		const defaults = {
			src: "data-src",
			srcset: "data-srcset",
			selector: ".lazyload",
			root: null,
			rootMargin: "0px",
			threshold: 0
		};
	
		/**
		* Merge two or more objects. Returns a new object.
		* @private
		* @param {Boolean}  deep     If true, do a deep (or recursive) merge [optional]
		* @param {Object}   objects  The objects to merge together
		* @returns {Object}          Merged values of defaults and options
		*/
		const extend = function ()  {
	
			let extended = {};
			let deep = false;
			let i = 0;
			let length = arguments.length;
	
			/* Check if a deep merge */
			if (Object.prototype.toString.call(arguments[0]) === "[object Boolean]") {
				deep = arguments[0];
				i++;
			}
	
			/* Merge the object into the extended object */
			let merge = function (obj) {
				for (let prop in obj) {
					if (Object.prototype.hasOwnProperty.call(obj, prop)) {
						/* If deep merge and property is an object, merge properties */
						if (deep && Object.prototype.toString.call(obj[prop]) === "[object Object]") {
							extended[prop] = extend(true, extended[prop], obj[prop]);
						} else {
							extended[prop] = obj[prop];
						}
					}
				}
			};
	
			/* Loop through each object and conduct a merge */
			for (; i < length; i++) {
				let obj = arguments[i];
				merge(obj);
			}
	
			return extended;
		};
	
		function LazyLoad(images, options) {
			this.settings = extend(defaults, options || {});
			this.images = images || document.querySelectorAll(this.settings.selector);
			this.observer = null;
			this.init();
		}
	
		LazyLoad.prototype = {
			init: function() {
	
				/* Without observers load everything and bail out early. */
				if (!root.IntersectionObserver) {
					this.loadImages();
					return;
				}
	
				let self = this;
				let observerConfig = {
					root: this.settings.root,
					rootMargin: this.settings.rootMargin,
					threshold: [this.settings.threshold]
				};
	
				this.observer = new IntersectionObserver(function(entries) {
					Array.prototype.forEach.call(entries, function (entry) {
						if (entry.isIntersecting) {
							self.observer.unobserve(entry.target);
							let src = entry.target.getAttribute(self.settings.src);
							let srcset = entry.target.getAttribute(self.settings.srcset);
							if ("img" === entry.target.tagName.toLowerCase()) {
								if (src) {
									//console.log("Cargó imagen.");
									entry.target.src = src;
								}
								if (srcset) {
									entry.target.srcset = srcset;
								}
							} else {
								entry.target.style.backgroundImage = "url(" + src + ")";
							}
						}
					});
				}, observerConfig);
	
				Array.prototype.forEach.call(this.images, function (image) {
					self.observer.observe(image);
				});
			},
	
			loadAndDestroy: function () {
				if (!this.settings) { return; }
				this.loadImages();
				this.destroy();
			},
	
			loadImages: function () {
				if (!this.settings) { return; }
	
				let self = this;
				Array.prototype.forEach.call(this.images, function (image) {
					let src = image.getAttribute(self.settings.src);
					let srcset = image.getAttribute(self.settings.srcset);
					if ("img" === image.tagName.toLowerCase()) {
						if (src) {
							image.src = src;
						}
						if (srcset) {
							image.srcset = srcset;
						}
					} else {
						image.style.backgroundImage = "url('" + src + "')";
					}
				});
			},
	
			destroy: function () {
				if (!this.settings) { return; }
				this.observer.disconnect();
				this.settings = null;
			}
		};
	
		root.lazyload = function(images, options) {
			return new LazyLoad(images, options);
		};
	
		if (root.jQuery) {
			const $ = root.jQuery;
			$.fn.lazyload = function (options) {
				options = options || {};
				options.attribute = options.attribute || "data-src";
				new LazyLoad($.makeArray(this), options);
				return this;
			};
		}
	
		return LazyLoad;
	});
	
	lazyload();

}