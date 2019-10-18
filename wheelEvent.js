$(function(){
	
	$(window).scroll(function(){
		
		if( $(window).scrollTop() >= $('#section1').offset().top+20){
			$('#header').addClass('addFixed');
		}
		else{
			$('#header').removeClass('addFixed');	
		}

	});
	


window.onload = function(){
	var Delta = 0;
	
	
	$('html,body').each(function(index){
		$(this).on('mousewheel',function(event){
			event.preventDefault(); 
			if( window.navigator.userAgent.toUpperCase().indexOf('FIREFOX') > -1 ){
				Delta = event.detail*-40;
			}
			else{	//나머지 브라우저 모두 크롬,사파리,익스플로러,오페라
				Delta = event.originalEvent.wheelDelta;
			}
			
			if(Delta < 0){
				$('#header').addClass('addFixed2');
			}
			else{
				$('#header').removeClass('addFixed2');
			}
			
		});
	});
}

});