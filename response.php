<?php

	$servername = 'localhost';
	$username	= 'tjdn1353';
	$password	= 'seowoo!77';
	$dbname		= 'tjdn1353';
	
	$connect = new mysqli($servername,$username,$password,$dbname);
	
	if(!$connect){
		echo 'error';
	}
	else{
		echo '접속성공<br><br>';
	}
	
	//데이터입력 (저장)
	//회원가입창 정보를 AJAX구현
	//id, pass, name 정보를 가져와서
	//sql로 구현하여 데이터베이스 테이블에 정보를 저장한다.
	
	$sql = "insert into idmember(id,pass,name) values
			(
				'$_POST[id]',
				'$_POST[pass]',
				'$_POST[name]'
			)";
	
	if(mysqli_multi_query($connect,$sql)){
		echo '데이터입력성공<br><br>';
	}
	else{
		die('데이터입력실패<br><br>');
	}
	
	//데이터베이스 닫기
	
	
	mysql_close($connect);
	
	
	
	
?>