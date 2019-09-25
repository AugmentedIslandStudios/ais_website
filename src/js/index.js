var $ = require('jquery');
var tempUri = window.location.hash;
import { TweenLite ,TweenMax, TimelineLite, Power4, Power3, Linear, Elastic, CSSPlugin, TimelineMax} from 'gsap';
import 'gsap/src/uncompressed/plugins/ScrollToPlugin';

// Import lodash.
import _ from 'lodash';
import 'lodash/throttle';
import { start } from 'repl';
import { read } from 'fs';

// Carousel.
let carouselWrapper = $(".ourwork-container .carousel-container .mask .wrapper");
let items = $(".ourwork-container .carousel-container .mask .wrapper .slide");
let arrows = $(".ourwork-container .carousel-container .carousel-arrow");
let dots = $(".ourwork-container .carousel-container .carousel-dots .dot");
let activeIndex = 0;

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

// Press.
let pressJson = require('./data/press.json');
let booleanNextArticle = false;
//console.log(pressJson);

function createProjects(){
	for (var i = json.projects.work.length - 1; i >= 0; i--) {
		var obj = json.projects.work[i];
		var work= $('<div />',{"class":'work'})
		var wTitle = $('<h1 />',{"class":'title', text:obj.title})
		var wDes = $('<p />',{"class":'description', text:obj.description})
		var wClient = $('<p />',{"class":'client', text:obj.client})
		work.append(wTitle,wDes,wClient)
		$(".work-container").append(work);
	};	
}

// Testimonials.
let testimonialsJson = require('./data/testimonials.json');

$(document).ready(()=>{
	tempUri = window.location.hash;
	//createProjects();
	menuControl();
	selectWork();
	nav();
	checkURL();
	renderContent(tempUri);
	validateForm();
	scrollDirection();
	removeAutoComplete();
	initWebSectionAnimations(); // Web Section scroll animations.
	initImageCarousels(); // Web Section carousel.
	initLandingWhySlider(); // Landing automatic slider from "We start with why?".
	initLandingWorkSlider(); // Landing slider.
	initLandingTestimonials(); // Landing testimonials.
	initPressPosts(); // Press Section posts.
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
		case '#press':
			hideSection($('.section').not('#press-section').not('.hidden'));
			setTimeout(()=>{
				showSection($('#press-section'));
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
	/*const submitButton =  $('.submitBtn');
	const formContent = $('#contactForm')
	
	submitButton.on('click',function(){
		this.preventDefault;
		formContent.trigger("submit");
	})
	
	$(document).on("focusout",".inputContainer.required input",()=>{
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
			location.href='#contact';
		}
	});*/

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

	// Animation for the complaints cross out.
	let tw5 = TweenLite.to("#complaint-1", 0.5, {opacity: 0.2, paused: true});
	let tw6 = TweenLite.to("#complaint-2", 0.5, {opacity: 0.2, paused: true});
	let tw7 = TweenLite.to("#complaint-3", 0.5, {opacity: 0.2, paused: true});
	let tw8 = TweenLite.to("#complaint-4", 0.5, {opacity: 0.2, paused: true});

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

		// Check position. Crossout animations.
		if((((complaint1Position*100)/viewportHeight) <= 20) && complaint1state === 1) {
			tw5.play();
			complaint1state = 2;
		}
		if((((complaint2Position*100)/viewportHeight) <= 20) && complaint2state === 1) {
			tw6.play();
			complaint2state = 2;
		}
		if((((complaint3Position*100)/viewportHeight) <= 20) && complaint3state === 1) {
			tw7.play();
			complaint3state = 2;
		}
		if((((complaint4Position*100)/viewportHeight) <= 20) && complaint4state === 1) {
			tw8.play();
			complaint4state = 2;
		}

		// Eliminate envent listener if all animations are complete.
		if(complaint1state === 2 && complaint2state === 2 && complaint3state === 2 && complaint4state === 2) {
			//console.log("Todas las animaciones se terminaron.");
			webWindow.removeEventListener("scroll", lodashFunction);
		}

	}, 200);

	webWindow.addEventListener("scroll", lodashFunction);

}

function initImageCarousels() {

	for(let arrow of arrows) {
		arrow.addEventListener("click", onCarouselArrowClick);
	}

	createCarouselDots();

	for(let dot of dots) {
		//console.log(dot);
		dot.addEventListener("click", onCarouselDotClick);
	}
	
}

function createCarouselDots() {

	let dotsContainer = $(".ourwork-container .carousel-container .carousel-dots");

	for(let i = 0; i < items.length; i++) {
		if(i === 0) {
			dotsContainer.append("<div class='dot active' slide=" + (i+1) + "><div class='graphic'></div></div>");
		} else {
			dotsContainer.append("<div class='dot' slide=" + (i+1) + "><div class='graphic'></div></div>");
		}
	}

	// Update dots.
	dots = $(".ourwork-container .carousel-container .carousel-dots .dot");

}

function onCarouselArrowClick(e) {
	// If arrow was clicked.
	if($(e.currentTarget).hasClass('right')){
		activeIndex++;
		if(activeIndex>= items.length){
			activeIndex = 0;
		}
	}else{
		activeIndex--;
		if(activeIndex<0){
			activeIndex = items.length-1;
		}
	}
	carouselScroll();
}

function onCarouselDotClick(e) {
	let slide = $(e.currentTarget).attr('slide');
	activeIndex = slide - 1;
	carouselScroll();
}

function carouselScroll() {
	// Scroll action.
	let position = $(items[activeIndex]).position().left;
	carouselWrapper.css('transform','translateX('+position*(-1)+'px )');
	dots.removeClass('active');
	$(dots[activeIndex]).addClass('active');
	//console.log($(items[activeIndex]));
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
						}).to(p.children[0], 0.2, {width: "90%", height: "77.1%"})
						.to(p.children[0], 0.5, {padding: "4%"}, 0.2)
						.to(p.children[0].children[1], 0.5, {width: "78%", height: "70%", opacity: 1}, 0.9)
						.to(p.children[0].children[1].children[0], 0.2, {opacity: 1}, 1.5)
						.to(p.children[0].children[1].children[1], 0.2, {opacity: 1}, 1.5)
						.to(p.children[0].children[1].children[2], 0.2, {opacity: 1}, 1.5),
			isActive: false
		});
	}

	projects[0].timeline.play();

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
				projects[activeIndex].timeline.reverse().timeScale(10);
				activeIndex--;
				//console.log(activeIndex);
				posWrapper = projects[activeIndex].parent.offsetLeft;
				workWrapper.style.transform = "translateX(calc(50% - " + widthMiddle + "px + " + posWrapper*(-1) + "px))";
				projects[activeIndex].timeline.play().timeScale(1);
			}
		} else if (walk <= -(walkTransition)) { // Si va hacia la derecha.
			if(activeIndex < projects.length - 1) {
				projects[activeIndex].timeline.reverse().timeScale(10);
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
				projects[activeIndex].timeline.reverse().timeScale(10);
				activeIndex--;
				//console.log(activeIndex);
				posWrapper = projects[activeIndex].parent.offsetLeft;
				workWrapper.style.transform = "translateX(calc(50% - " + widthMiddle + "px + " + posWrapper*(-1) + "px))";
				projects[activeIndex].timeline.play().timeScale(1);
			}
		} else if (walk <= -(walkTransition)) { // Si va hacia la derecha.
			if(activeIndex < projects.length - 1) {
				projects[activeIndex].timeline.reverse().timeScale(10);
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

		// Cursor.
		// workCursor.style.top = e.pageY + "px";
		// workCursor.style.left = e.pageX + "px";

		//console.log(e.pageX, e.pageY);
		
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

	// workSlider.addEventListener("mouseenter", (e) => {
	// 	TweenLite.to(workCursor, 0.5, {opacity: 1});
	// });

	// workSlider.addEventListener("mouseleave", (e) => {
	// 	TweenLite.to(workCursor, 0.2, {opacity: 0});
	// });

	window.addEventListener('resize', () => {
		widthMiddle = projects[0].parent.offsetWidth / 2;
		workWrapper.style.transform = "translateX(calc(50% - " + widthMiddle + "px + " + posWrapper*(-1) + "px))";
		walkTransition = window.innerWidth <= 740 ? window.innerWidth/4 : window.innerWidth/5;
	});

}

function initLandingTestimonials() {

	let testimonialIndex = 0;

	let testimonialElements = document.querySelector("#landing-section > .content > .landing-container-5 > .grid-container > .testimonials > .content");

	let testimonialStatement = testimonialElements.children.item(1);
	let testimonialClient = testimonialElements.children.item(2);
	let testimonialClientDescription = testimonialElements.children.item(3);

	let testimonialLeftArrow = document.querySelector("#landing-section > .content > .landing-container-5 > .grid-container > .testimonials > .left-arrow");
	let testimonialRightArrow = document.querySelector("#landing-section > .content > .landing-container-5 > .grid-container > .testimonials > .right-arrow");

	let tlTestimonials = new TimelineLite({
		paused: true,
		autoRemoveChildren: true
	});

	let changeTestimonial = (action) => {
		//console.log(testimonialIndex);
		if(action === "left") { // If left.
			if(testimonialIndex <= 0) {
				testimonialIndex = testimonialsJson.length - 1;
			} else {
				testimonialIndex--;
			}
			
			testimonialStatement.innerHTML = testimonialsJson[testimonialIndex].statement;
			testimonialClient.innerHTML = testimonialsJson[testimonialIndex].client;
			testimonialClientDescription.innerHTML = testimonialsJson[testimonialIndex].description;
		} else { // If right.
			if(testimonialIndex >= (testimonialsJson.length - 1)) {
				testimonialIndex = 0;
			} else {
				testimonialIndex++;
			}

			testimonialStatement.innerHTML = testimonialsJson[testimonialIndex].statement;
			testimonialClient.innerHTML = testimonialsJson[testimonialIndex].client;
			testimonialClientDescription.innerHTML = testimonialsJson[testimonialIndex].description;
		}
	};

	testimonialStatement.innerHTML = testimonialsJson[testimonialIndex].statement;
	testimonialClient.innerHTML = testimonialsJson[testimonialIndex].client;
	testimonialClientDescription.innerHTML = testimonialsJson[testimonialIndex].description;

	testimonialLeftArrow.addEventListener("click", () => {
		tlTestimonials.to(testimonialElements, 0.7, {opacity: 0})
					  .call(() => {
						changeTestimonial("left")
					  })
					  .to(testimonialElements, 0.7, {opacity: 1});
		tlTestimonials.play();
	});

	testimonialRightArrow.addEventListener("click", () => {
		tlTestimonials.to(testimonialElements, 0.7, {opacity: 0})
					  .call(() => {
						changeTestimonial("right")
					  })
					  .to(testimonialElements, 0.7, {opacity: 1});
		tlTestimonials.play();
	});

}

function initPressPosts() {

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
			postsContainer.style.marginBottom = "170rem";
			break;
		}
	}

	readMoreButtons = document.querySelectorAll("#press-section > .content > .posts-container .post button");

	for(let button of readMoreButtons) {
		button.addEventListener("click", () => {
			openPressPost(button.getAttribute("postkey"));
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
				postsContainer.style.marginBottom = "170rem";
				break;
			}
		}

		readMoreButtons = document.querySelectorAll("#press-section > .content > .posts-container .post button");

		for(let button of readMoreButtons) {
			button.addEventListener("click", () => {
				openPressPost(button.getAttribute("postkey"));
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

function openPressPost(key) {

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