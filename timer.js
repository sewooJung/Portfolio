$(function(){
	
	var toDay = new Date(); //데이트 객체
	var nowHours = toDay.getHours();  		//시
	var nowHours24 = toDay.getHours();  		//시
	var txtHours24 = '';
	var nowMinutes = toDay.getMinutes();  	//분
	var txtMinutes = '';
	var nowSeconds = toDay.getSeconds();  	//분	
	var txtSeconds = '';
	
	var nowYear = toDay.getFullYear();  	//년
	var nowMonth = toDay.getMonth()+1;  	//월 0 ~11 +1 (1~12)
	var txtMonth = '';
	var nowDate = toDay.getDate();  		//일
	var txtDate = '';
	var nowDay = toDay.getDay()+1;  			//요일 0 ~ 6 +1 (1~7)
	
				
		nowTimerFn();
		setInterval(nowTimerFn, 10);
	
		function nowTimerFn(){
			
			toDay = new Date();
			nowHours = toDay.getHours();

			if(nowHours>12){
				nowHours = nowHours-12;
			}
			nowMinutes = toDay.getMinutes();
			nowSeconds = toDay.getSeconds();
								
			//아날로그 시계 각도 환산
			$('.timeH').css({transform:'rotate(' +  ((nowHours*30)+(nowMinutes*0.5)) + 'deg)'});
			$('.timeM').css({transform:'rotate(' +  (nowMinutes*6) + 'deg)'});
			$('.timeS').css({transform:'rotate(' +  (nowSeconds*6) + 'deg)'});
			
			
			//날짜 초기값 가져오기
			nowYear = toDay.getFullYear();  	//년
			nowMonth = toDay.getMonth()+1;  	//월 0 ~11 +1 (1~12)
			nowDate = toDay.getDate();  		//일
			nowDay = toDay.getDay()+1;  			
			
			
			if(nowMonth<10){
				txtMonth = '0'+nowMonth;
			}
			else{
				txtMonth = nowMonth;
			}
			
			
			if(nowDate<10){
				txtDate = '0'+nowDate;
			}
			else{
				txtDate = nowDate;
			}

			
			if(nowHours24<10){
				txtHours24 = '0'+nowHours24;
			}
			else{
				txtHours24 = nowHours24;
			}

			
			if(nowMinutes<10){
				txtMinutes = '0'+nowMinutes;
			}
			else{
				txtMinutes = nowMinutes;
			}
			
			
			if(nowSeconds<10){
				txtSeconds = '0'+nowSeconds;
			}
			else{
				txtSeconds = nowSeconds;
			}

			
			if(nowDay==1){
				nowDay='일';
			}
			else if(nowDay==2){
				nowDay='월';
			}
			else if(nowDay==3){
				nowDay='화';
			}
			else if(nowDay==4){
				nowDay='수';
			}
			else if(nowDay==5){
				nowDay='목';
			}
			else if(nowDay==6){
				nowDay='금';
			}
			else if(nowDay==7){
				nowDay='토';
			}
			
			
			//DIGITAL TIMER			
			$('.digital-wrap span').eq(0).text(nowYear);   //년
			$('.digital-wrap span').eq(1).text(txtMonth);  //월
			$('.digital-wrap span').eq(2).text(txtDate);   //일
			$('.digital-wrap span').eq(3).text(nowDay);   //요일
			$('.digital-wrap span').eq(4).text(txtHours24);  //시
			$('.digital-wrap span').eq(5).text(txtMinutes);  //분
			$('.digital-wrap span').eq(6).text(txtSeconds);  //초
		
		}
		
})//timer.js