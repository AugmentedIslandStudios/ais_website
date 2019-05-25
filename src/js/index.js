var $ = require('jquery');
//var json = require('./data/project.json'); //with path
var tempUri = window.location.hash;
import { TweenLite ,TweenMax, TimelineLite, Power4, Power3, Linear, Elastic, CSSPlugin} from 'gsap';
import 'gsap/src/uncompressed/plugins/ScrollToPlugin';
//var mJson = JSON.parse(json);
//console.log("json",json.projects);

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
	$('.two').addClass('selected'); //focus second project
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
	const submitButton =  $('.submitBtn');
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
	});
}

function checkFormInputs(formContent){
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
			console.log('Down');
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
		console.log('Up');
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
				console.log("disbale",i)	
			}
		}
	}
}