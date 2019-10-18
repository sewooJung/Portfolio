$(function(){
	var a = [];  //전체 공지
	var b = [];  //쇼핑 공지
	var c = [];  //브랜드 공지
	var d = [];  //당첨발표 공지	
    var t = [-1,-1,-1,-1];  //카운트 변수 전체공지, 쇼핑, 브랜드, 당첨,
    var Rcnt = 0; 
    var LastRoord = 0;
    var txt = '';
	
    var filterBtnNum = 0; // 0전체 공지  1 쇼핑 공지 2 브랜드 소식 3 당첨자 발표
	
    var StartPageNum = 0;  //페이지네이션 시작 변수 - 페이지네이션에 사용할 변수 
    var EndPageNum = 10;   //페이지네이션 끝 변수 - 페이지네이션에 사용할 변수
    
	var StartRecordNum = 0;   //레코드시작 번호 변수 - 메인함수에 사용할 변수
    var EndRecordNum = 10;   //레코드시작 번호 변수 - 메인함수에 사용할 변수
	
	

	$.ajax({
		url:'ajax/notice.json',
		type:'GET',
		dataType:'JSON',
		success:	function(data){
			//반복 배열 처리
			$.each(data.공지사항, function(index, object){
				
				//이미지 구분하여 파일일름과 경로 지정
				if( object.구분 == '쇼핑' ){	
					imgUrl = "<img src='img/icon_notice1.gif' alt='' title=''>";
				}
				else{				
					imgUrl = "<img src='img/icon_notice2.gif' alt='' title=''>";
				}	
				
				//전체공지 데이터 입력 2차원 배열처리 저장 a = []
				t[0]++;   //0 1 2 3 ... 189
				a[ t[0] ] = [];  //2차원배열 선언
				
				a[ t[0] ][0] = object.글번호;
				a[ t[0] ][1] = imgUrl;  //이미지 구분에 따른 이미지 경로 파일이름
				a[ t[0] ][2] = object.제목;
				a[ t[0] ][3] = object.날짜;
				a[ t[0] ][4] = object.구분;
				
				
				if( object.구분 == '쇼핑' ){	
					//필터링 : 쇼핑 저장 b=[]
					t[1]++;
					b[ t[1] ] = [];
					
					b[ t[1] ][0] = object.글번호;
					b[ t[1] ][1] = imgUrl;  //이미지 구분에 따른 이미지 경로 파일이름
					b[ t[1] ][2] = object.제목;
					b[ t[1] ][3] = object.날짜;
					b[ t[1] ][4] = object.구분;
				}	
				if( object.구분 == '브랜드' ){	
					//필터링 : 브랜드 저장 b=[]
					t[2]++;
					c[ t[2] ] = [];
					
					c[ t[2] ][0] = object.글번호;
					c[ t[2] ][1] = imgUrl;  //이미지 구분에 따른 이미지 경로 파일이름
					c[ t[2] ][2] = object.제목;
					c[ t[2] ][3] = object.날짜;
					c[ t[2] ][4] = object.구분;
				}	
				
						 //search('당첨')
				if( object.제목.indexOf('당첨') != -1 || object.제목.indexOf('발표') != -1 ){	
					//필터링 : 브랜드 저장 b=[]
					t[3]++;
					d[ t[3] ] = [];
					
					d[ t[3] ][0] = object.글번호;
					d[ t[3] ][1] = imgUrl;  //이미지 구분에 따른 이미지 경로 파일이름
					d[ t[3] ][2] = object.제목;
					d[ t[3] ][3] = object.날짜;
					d[ t[3] ][4] = object.구분;
				}	
					
				
			});
				//전체 공지 글번호는 이미 정리 된상태 t[0]
				//쇼핑 공지 글번호 역순으로 정리해서 번호 재기입(재 저장)
				//쇼핑 공지 글번호 b[][0]로 적당한 카운트 값 - t[1] 을 이용

				//Rcnt = t[1]+1;  //쇼핑공지의 전체 카운트 개수 0 ~ 143
				Rcnt = b.length;  //쇼핑공지의 전체 카운트 개수 144
				//144
				for(i=0; i<b.length; i++){
					b[i][0]=Rcnt; //144 143 142  ... 1
					Rcnt--;
					
					// console.log( b[i][0] );
				}
				
				
				Rcnt = c.length;  //브랜드공지의 전체 카운트 개수 45
				//45
				for(i=0; i<c.length; i++){
					c[i][0]=Rcnt; //45  ... 1
					Rcnt--;
					
					// console.log( c[i][0] );
				}
				
				Rcnt = d.length;  //브랜드공지의 전체 카운트 개수 16
				//16
				for(i=0; i<d.length; i++){
					d[i][0]=Rcnt; //16 ... 1
					Rcnt--;
					
					// console.log( d[i][0] );
				}
				
				
				
				
				//메인 처리 프로그램
				function AJAXFN(z){
					
					//전체 공지 
					if(z==0){
						//전체 공지 a[][] 배열값 모두를 웹사이트에 바인딩해서 보여준다.
						//총레코드 수 만큼 반복(행열) 출력
						//표 tbody 내에 tr td
						LastRoord = a.length; //189 - 총레코드 개수 
						for(i=StartRecordNum; i<EndRecordNum; i++){ //10개씩 뭈음
							txt += '<tr>';			//19페이지	
							for(j=0; j<4; j++){
								txt += '<td>' + a[i][j]  + '</td>';
							}
							txt += '</tr>';
						}						
						//바인딩
						$('tbody').html( txt );
						txt='';
					}
					//쇼핑 공지 
					else if(z==1){
						LastRoord = b.length; //144
						
						for(i=StartRecordNum; i<EndRecordNum; i++){ //10개씩 뭈음
							txt += '<tr>';
							for(j=0; j<4; j++){
								txt += '<td>' + b[i][j] + '</td>';
							}
							txt += '</tr>';
						}
						$('tbody').html( txt );
						txt='';
					}
					//브랜드 
					else if(z==2){
						LastRoord = c.length; //144
						
						for(i=StartRecordNum; i<EndRecordNum; i++){ //10개씩 뭈음
							txt += '<tr>';
							for(j=0; j<4; j++){
								txt += '<td>' + c[i][j] + '</td>';
							}
							txt += '</tr>';
						}
						$('tbody').html( txt );
						txt='';
					}
					//당첨자 발표 
					else if(z==3){
						LastRoord = d.length; //16
						
						for(i=StartRecordNum; i<EndRecordNum; i++){ //10개씩 뭈음
							txt += '<tr>';
							for(j=0; j<4; j++){
								txt += '<td>' + d[i][j] + '</td>';
							}
							txt += '</tr>';
						}
						$('tbody').html( txt );
						txt='';
					}
								
					PageNationBtnFn(z);
				}

				
				//메인 프로그램
				AJAXFN(0);
				
				
				//페이지네이션 페이지 버튼 추가 생성
				function PageNationBtnFn(z){
					//버튼의 개수는 전체레코드 개수가 중요
					LastRoord = t[z]; //총레코드 개수  //parseInt(181개/10)
					
					//10개 미만인경우 버튼 처리  예]레코드 parseInt(16개/10+0.9) = 2개
					if( parseInt(LastRoord/10+0.9) <= 10 ){
						StartPageNum = 0;
						EndPageNum   = parseInt(LastRoord/10+0.9) % 10; //2
						               //전체레코드를  10으로 나누고 올림수 발생 시키고 글구
									   // 결과값을 다시 10으로 나누어 나머지를 산출한다.	
					}
					else{
						StartPageNum = 0;
						EndPageNum   = StartPageNum + 10;
					}
					
					//페이지 넘김(그룹단위로 넘김 
					//1 2 3 4 5 6 7 8 9 10 --- 11 12 13 14 15 16 17 18 19 
					//10페이지()를 넘어가면 11 ~ 19 변환
					//10페이지이하이면 1 ~ 10 변환
					//레코드가 100을 초과하면 10페이지 초과하면 --  페이지네이션 버튼이 변경 
					if( (EndRecordNum/10) > 10 ){  //100개레코드가 초과되면

						//다음 그룹으로 변경 11 ~ 19
						if( (parseInt(LastRoord/10+0.9)/10) >=1 ){
							StartPageNum = 10;
							EndPageNum   = StartPageNum  +  (parseInt(LastRoord/10+0.9)%10);
						}
					}
					
					$('.pageNum-wrap>li').remove();
					for(i=StartPageNum; i<EndPageNum; i++){
						$('.pageNum-wrap').append("<li><span><a href='javascript:' class='pageNumBtn'>" + (i+1) + "</a></span></li>");
					}
										
				}
				
				
				//페이지네이션 버튼 클릭 이벤트 - append로 추가된 버튼은 이렇게 사용한다.
				$(document).on('click','.pageNumBtn', function(){
					//클릭한 번호로 페이지를 호출 레코드 10개씩 1-  0 ~ 0+10  
					//클릭한 번호로 페이지를 호출 레코드 10개씩 2- 10 ~ 10+10=20  
					//클릭한 번호로 페이지를 호출 레코드 10개씩 3- 20 ~ 20+10=30  
					
					//:
					//클릭한 번호로 페이지를 호출 레코드 10개씩 10- 90 ~ 90+10=100  
					//:
					//클릭한 번호로 페이지를 호출 레코드 10개씩 18- 170 ~ 170+10=180  
					//클릭한 번호로 페이지를 호출 레코드 10개씩 19- 180 ~ 180+(189%10=9) = 189  
					LastRoord = t[filterBtnNum];
					
					StartRecordNum = (parseInt($(this).text())-1) * 10 //클릭한 버튼의 글자 가져오기
					EndRecordNum   = StartRecordNum + 10;
					 
					if( EndRecordNum > LastRoord ){
						StartRecordNum = LastRoord - (LastRoord % 10); 
						EndRecordNum = (LastRoord+1); //189
					}
					 
					 //메인함수 호출 실행
					 AJAXFN(filterBtnNum);  //필터값 전달 하면서 실행

				});
				
				
				//다음버튼 :  마지막(마지막 페이지 레코드 ) 페이지네이션 버튼에서 오류 처리
				$('.pageNumNextBtn').on({   //0~10  10~20 20~30
					click:	function(){
						//현재위치에서 + 10 다음
						LastRoord = t[filterBtnNum];					
						
						StartRecordNum += 10; 
						EndRecordNum    = StartRecordNum + 10;
						
						//마지막 페이지 레코드 오류처리 190  180     [189 - 나머지9] =180
						if( EndRecordNum > LastRoord ){
							StartRecordNum = LastRoord - (LastRoord % 10); 
							EndRecordNum = (LastRoord+1); //189
						}
						
						
						PageNationBtnFn(filterBtnNum); // 페이지함수 호출
						AJAXFN(filterBtnNum);  //메인함수 호출
					}
				});
				
				
				
				//이전버튼 : 이전페이지 (처음 페이지 이전 레코드 ) 페이지네이션 버튼에서 오류 처리
				$('.pageNumPrevBtn').on({
					click:	function(){
						
						LastRoord = t[filterBtnNum];
						
						//현재위치에서 - 10 이전
						StartRecordNum -= 10; 
						EndRecordNum    = StartRecordNum + 10;
								
						//오류처리
						if( StartRecordNum < 0 ){
							StartRecordNum = 0;
							EndRecordNum = StartRecordNum + 10;
						}		
								
								
						PageNationBtnFn(filterBtnNum); // 페이지함수 호출
						AJAXFN(filterBtnNum);  //메인함수 호출
					}
				});				
				
				
				
				
				
				//필터 버튼 이벤트 전체 공지, 쇼핑 공지, 브랜드 소식, 당첨자 발표
				//1 - 버튼에 클래스 추가하기 addClass
				$('.filterBtn').each(function(index){
					$(this).on({
						click:	function(){
							//전체 공지0, 쇼핑 공지1, 브랜드 소식2, 당첨자 발표3 배열번호
							
							filterBtnNum = index;  
							
							$('.filterBtn').removeClass('addNoticeBtn');	
							$(this).addClass('addNoticeBtn');
							
							StartRecordNum = 0;
							EndRecordNum   = StartRecordNum + 10;
							
							
							AJAXFN( filterBtnNum );
							
						}
					});
				});
				
				
				
			
			
		},
		error:		function(){
			console.log( 'AJAX DATA 처리 실패' );
		}
	});
	
	
	
	
	
});	//pageNation.js