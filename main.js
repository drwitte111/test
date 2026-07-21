function theRotator() {
	//Set the opacity of all images to 0
	$('div.rotator ul li').css({opacity: 0.0});
	
	$('div.pagingContainer ul li').removeClass('active');
	
	//Get the first image and display it (gets set to full opacity)
	$('div.rotator ul li:first').css({opacity: 1.0});
	$('div.pagingContainer ul li:first').addClass('active');


	//Call the rotator function to run the slideshow, 6000 = change to next image after 6 seconds
	
	timer = setInterval('rotate()',6000);
	
}

function rotate() {	
	//Get the first image
	var current = ($('div.rotator ul li.show')?  $('div.rotator ul li.show') : $('div.rotator ul li:first'));
	
	var currentPage = ($('div.pagingContainer ul li.active')?  $('div.pagingContainer ul li.active') : $('div.pagingContainer ul li:first'));

    	if ( current.length == 0 ) current = $('div.rotator ul li:first');
    	
    	if ( currentPage.length == 0 ) currentPage = $('div.pagingContainer ul li:first');
    	

	//Get next image, when it reaches the end, rotate it back to the first image
	var next = ((current.next().length) ? ((current.next().hasClass('show')) ? $('div.rotator ul li:first') :current.next()) : $('div.rotator ul li:first'));
	
	var nextPage = ((currentPage.next().length) ? ((currentPage.next().hasClass('active')) ? $('div.pagingContainer ul li:first') :currentPage.next()) : $('div.pagingContainer ul li:first'));
	

	//Set the fade in effect for the next image, the show class has higher z-index
	next.css({opacity: 0.0})
	.addClass('show')
	.animate({opacity: 1.0}, 1000);
	
	nextPage.addClass('active');

	//Hide the current image
	current.animate({opacity: 0.0}, 1000)
	.removeClass('show');
	
	currentPage.removeClass('active');
	
};


function manualRotate() {
	
	clearInterval(timer);

	$('div.rotator ul li').css({opacity: 0.0});
	$('div.rotator ul li.show').removeClass('show');
	$('div.pagingContainer ul li.active').removeClass('active');

	$('div.rotator ul li:nth-child(' + index + ')').addClass('show')
		.animate({opacity: 1.0}, 1000);
	$('div.pagingContainer ul li:nth-child(' + index + ')').addClass('active');

	timer = setInterval('rotate()',6000);
}


$(document).ready(function() {		
	//Load the slideshow
	theRotator();
	$('div.rotator').fadeIn(1000);
    $('div.rotator ul li').fadeIn(1000); // tweek for IE

	$('.pagingContainer ul li a').click(function(){
	 	index = $(this).attr('href');
	 	manualRotate();
		return false;
	});
});
