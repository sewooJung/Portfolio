$(function(){
	var cnt=0, gTot=[0,0,0,0,0], gAvg=[0,0,0,0,0], tot=0, avg=0;
	var txt='';
	var max=[0,0,0,0,0], min=[100,100,100,300,100];
	var a=[];  //1차원 배열 선언
	var suk=1;
	var imsi='';
	
	//AJAX 처리는 헤딩 제목을 클릭하면 처리하게 함.
$('.table-title').on({
	click:	function(){
		
	$.ajax({
		url:'./db/sungjuk.json',
		dataType:'json',
		success:	function(result){
			
			$.each(result.성적표, function(idx, object){
				
				tot = object.국어+object.영어+object.수학;  //개인총점
				avg = Math.round(tot/3);  //개인평균
				
				a[idx]=[];  //2차원 배열 선언
				
				a[idx][0] = object.번호;
				a[idx][1] = object.이름;
				a[idx][2] = object.국어;
				a[idx][3] = object.영어;
				a[idx][4] = object.수학;
				a[idx][5] = tot;
				a[idx][6] = avg;
				a[idx][7] = 1;  //석차
				
				if( avg>=95 ){ //95 ~ 100까지
					a[idx][8] = 'A+';
				}
				else if( avg>=90 ){ //90~95미만
					a[idx][8] = 'A';
				}
				else if( avg>=85 ){ //85~90미만
					a[idx][8] = 'B+';
				}
				else if( avg>=80 ){ //80~85미만
					a[idx][8] = 'B';
				}
				else if( avg>=75 ){ //75~80미만
					a[idx][8] = 'C+';
				}
				else if( avg>=70 ){ //70~75미만
					a[idx][8] = 'C';
				}
				else if( avg>=65 ){ //65~70미만
					a[idx][8] = 'D';
				}
				else if( avg>=60 ){ //60~65미만
					a[idx][8] = 'E';
				}
				else{  //0 ~ 60미만
					a[idx][8] = 'F';
				}
				
				if( avg>=100 && a[idx][2]>=100 && a[idx][3]>=100 && a[idx][4]>=100 ){
					a[idx][9] = '전액';
				}
				else if( avg>=95 && a[idx][2]>=95 && a[idx][3]>=95 && a[idx][4]>=95 ){
					a[idx][9] = '100만원';
				}
				else if( avg>=95 && a[idx][2]>=90 && a[idx][3]>=90 && a[idx][4]>=90 ){
					a[idx][9] = '50만원';
				}
				else if( avg>=95){
					a[idx][9] = '30만원';
				}
				else{
					a[idx][9] = '';
				}
				
				
				
				//총합계
				cnt++;  				//10  인원수 카운트
				gTot[0]	+= object.국어;  	//국어점수 누적(국어점수 총합계)
				gTot[1]	+= object.영어; 	//국어점수 누적(국어점수 총합계)
				gTot[2]	+= object.수학;  	//국어점수 누적(국어점수 총합계)
				gTot[3]	+= tot;  		//총점총합계
				gTot[4]	+= avg;  		//평균총합계
				
				if( max[0] < object.국어 ){  //국어점수 최대값 max[0] 보다 더 크면
					max[0] = object.국어  	//더큰점수로 변수값 변경
				}
				if( max[1] < object.영어 ){  //영어점수 최대값 max[1] 보다 더 크면
					max[1] = object.영어  	//더큰점수로 변수값 변경
				}
				if( max[2] < object.수학 ){  //수학점수 최대값 max[2] 보다 더 크면
					max[2] = object.수학  	//더큰점수로 변수값 변경
				}
				if( max[3] < (object.국어+object.영어+object.수학) ){  //총점점수 최대값 max[3] 보다 더 크면
					max[3] = (object.국어+object.영어+object.수학)  	//더큰점수로 변수값 변경
				}
				if( max[4] < Math.round( (object.국어+object.영어+object.수학)/3 ) ){  //평균점수 최대값 max[4] 보다 더 크면
					max[4] = Math.round( (object.국어+object.영어+object.수학)/3 )  	//더큰점수로 변수값 변경
				}
				
				if( min[0] > object.국어 ){  //국어점수 최소값 min[0] 보다 더 작으면
					min[0] = object.국어  	//더 작은 점수로 변수값 변경
				}
				if( min[1] > object.영어 ){  //영어점수 최소값 min[1] 보다 더 작으면
					min[1] = object.영어  	//더 작은 점수로 변수값 변경
				}
				if( min[2] > object.수학 ){  //수학점수 최소값 min[2] 보다 더 작으면
					min[2] = object.수학  	//더 작은 점수로 변수값 변경
				}
				if( min[3] > (object.국어+object.영어+object.수학) ){  //총점점수 최소값 min[3] 보다 더 작으면
					min[3] = (object.국어+object.영어+object.수학)  	//더 작은 점수로 변수값 변경
				}
				if( min[4] > Math.round( (object.국어+object.영어+object.수학)/3 ) ){  //평균점수 최소값 min[4] 보다 더 작으면
					min[4] = Math.round( (object.국어+object.영어+object.수학)/3 )  	//더 작은 점수로 변수값 변경
				}
				
				
				
			});  //each 배열 반복문
				 
				
				//피벗 합계				
				$('.inwonsoo').html( cnt );				//총인원수
				
				for(i=0; i<=4; i++){
					gAvg[i] = gTot[i]/cnt,  			//과목평균
					$('.tot').eq(i).html( gTot[i] );  	//과목총점 바인딩
					$('.avg').eq(i).html( gAvg[i] );	//과목평균 바인딩
					$('.max').eq(i).html( max[i] );	//과목평균 바인딩
					$('.min').eq(i).html( min[i] );	//과목평균 바인딩
				}
					
				
				for(i=0; i<=9; i++){
					suk=1;
					for(j=0; j<=9; j++){
						if( a[i][5] < a[j][5] ){
							suk = suk + 1;
						}						
					}
					a[i][7] = suk;  //석차저장
				}

				//정렬 - 총점점수 내림차순 [==석차의 오름차순]가 가장 큰사람 순으로 정렬 데이터 바인딩 하세요
				for( i=0; i<cnt-1; i++){ //i는 처음부터 마지막 전 까지
					for( j=i+1; j<cnt; j++){  //j는 i 다음부터 마지막 까지
						if( a[i][7] > a[j][7] ){
							for(k=0; k<=9; k++){
								   imsi = a[i][k];
								a[i][k] = a[j][k];
								a[j][k] = imsi;								
							}
						}
					}
				}
				
				
				//출력문
				for(i=0; i<=9; i++){ //10줄
					txt += '<tr>';
					for(j=0; j<=9; j++){  //칸
						txt += '<td>' +  a[i][j]  + '</td>';						
					}
					txt += '</tr>';
				}
				
				// tbody 내에 태그 속성 삽입
				$('tbody').html( txt );	   				//성적표 바인딩


				//장학금란에 전액 글자에 색상을 빨강으로 조건부 서식
				for(i=0; i<cnt; i++){									
					if( $('tr').eq(i).children('td').eq(9).text() == '전액' ){
						$('tr').eq(i).children('td').css({color:'#c00'});
					}
				}

				//평균점수가 100점이상이면 행전체를 배경색상을 청록색으로 연하게 하라 조건부 서식
				for(i=0; i<cnt; i++){									
					if( $('tr').eq(i).children('td').eq(6).text() >= 100 ){
						
						$('tr').eq(i).children('td').css({backgroundColor:'rgba(130,200,240, .1)'});
					}
				}

				//국어 영어 수학점수가  90이상은 모두 파랑으로 글자색지정 조건부 서식
				for(i=0; i<cnt; i++){	
					for(j=2; j<=4; j++){	 //국어.eq(2) 영어.eq(3) 수학.eq(4)
						if( parseInt( $('tr').eq(i).find('td').eq(j).text() ) >= 90 ){
							$('tr').eq(i).find('td').eq(j).css({color:'#00c'});
						}
					}
				}
				
				
				
				cnt=0; 
				gTot=[0,0,0,0,0];
				gAvg=[0,0,0,0,0]; 
				tot=0; 
				avg=0;
				txt='';
				max=[0,0,0,0,0];
				min=[100,100,100,300,100];
				a=[];  //1차원 배열 선언
				suk=1;
			
		},
		error: 		function(){
			console.log( 'AJAX 파일 로딩 실패' );
		}
	});
		
	}
});

	
});//ajax.js