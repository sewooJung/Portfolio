$(function(){
	var s=[0,0,0];	
	var a=[0,1,2]; //Next
	var b=[2,1,0]; //Prev
		s[0]=1;
	
		//AutoPlay();
		function AutoPlay(){
			  setId = setInterval(NextSideIf,3000);
			//setId = setInterval(PrevSideIf,3000);
		}
		
		//swipeleft / swiperight 터치이벤트
		$('.slide-wrap').on({  //슬라이드 감싸는 박스블럭에서 터치이벤트
			swipeleft:	function(){  //우측에서 좌측으로 드래그앤 드롭
				NextSideIf();
			},
			swiperight:	function(){
				PrevSideIf();
			}
		});
		
		
		
		
		//다음버튼
		$('.nextBtn').on({
			click:	function(){
				NextSideIf();
			}
		});
		
		//이전버튼
		$('.prevBtn').on({
			click:	function(){
				PrevSideIf();
			}
		});
		
		
		//네비게이션 이벤트
		function navEvent(z){
			$('.navBtn').removeClass('addNavcolor');
			$('.navBtn').eq(z).addClass('addNavcolor');
		}
		
		//네비버튼
		$('.navBtn').each(function(idx){
			$(this).on({
				click:	function(){
					
					for(i=0; i<=2; i++){
						if( s[i]==1 ){
							
							if( i < idx ){
								slide(idx);
								//i=0 && idx=2
								if(i==0 && idx==2){
									slide0To2(idx);
								}
							}
							else if( i > idx ){
								PrevSlide(idx);
								if(i==2 && idx==0){
									PrevSlide2To0(idx);
								}
							}
							
						}
					}
				}
			});
		});
		
		
		
	
		
		
		
		
		function NextSideIf(){
			if(s[0]==1){
				slide(1);
			}
			else if(s[1]==1){
				slide(2);
			}
			else if(s[2]==1){
				slide(0);
			}
		}
		
		function PrevSideIf(){
			if(s[2]==1){
				PrevSlide(1);
			}
			else if(s[1]==1){
				PrevSlide(0);
			}
			else if(s[0]==1){
				PrevSlide(2);
			}
		}
		
		function slide(z){	
			s=[0,0,0];
			s[z]=1;
			navEvent(z);
			
			if(z==0){
				a=[2,0,1];
			}
			else if(z==1){
				a=[0,1,2];
			}
			else if(z==2){
				a=[1,2,0];
			}
			
			$('.slide').eq(a[0]).stop().animate({left:(100*0)+'%'},0).animate({left:(100*-1)+'%'},1000);
			$('.slide').eq(a[1]).stop().animate({left:(100*1)+'%'},0).animate({left:(100* 0)+'%'},1000);
			$('.slide').eq(a[2]).stop().animate({left:(100*2)+'%'},0).animate({left:(100* 1)+'%'},1000);
		}
		
		function slide0To2(z){	
			s=[0,0,0];
			s[z]=1;
			navEvent(z);
			
			$('.slide').eq(0).stop().animate({left:(100*0)+'%'},0).animate({left:(100*-2)+'%'},1000);
			$('.slide').eq(1).stop().animate({left:(100*1)+'%'},0).animate({left:(100*-1)+'%'},1000);
			$('.slide').eq(2).stop().animate({left:(100*2)+'%'},0).animate({left:(100* 0)+'%'},1000);
		}
		
		function PrevSlide2To0(z){	
			s=[0,0,0];
			s[z]=1;
			navEvent(z);
			
			$('.slide').eq(2).stop().animate({left:(100* 0)+'%'},0).animate({left:(100* 2)+'%'},1000);
			$('.slide').eq(1).stop().animate({left:(100*-1)+'%'},0).animate({left:(100* 1)+'%'},1000);
			$('.slide').eq(0).stop().animate({left:(100*-2)+'%'},0).animate({left:(100* 0)+'%'},1000);
		}
		
		
		
		function PrevSlide(z){	
			s=[0,0,0];
			s[z]=1;
			navEvent(z);
			
			if(z==2){
				b=[0,2,1];
			}
			else if(z==1){
				b=[2,1,0];
			}
			else if(z==0){
				b=[1,0,2];
			}
			
			$('.slide').eq(b[0]).stop().animate({left:(100* 0)+'%'},0).animate({left:(100* 1)+'%'},1000);
			$('.slide').eq(b[1]).stop().animate({left:(100*-1)+'%'},0).animate({left:(100* 0)+'%'},1000);
			$('.slide').eq(b[2]).stop().animate({left:(100*-2)+'%'},0).animate({left:(100*-1)+'%'},1000);
		}
		
		
		
		
		
	
	
}); //MainSlide.js