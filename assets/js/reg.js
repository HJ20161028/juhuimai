$(function(){
	//页面加载完给图片喝登录框运动
	//reg-pic从左边运动到left:0
	//login-box从右边运动到right:0
	$("#reg-pic").animate({"left":0},"normal");
	$("#login-box").animate({"right":0},"normal");
	var flag1=false,flag2=false,flag3=false,flag4=false;
	//手机号注册
	var oReg=$("#btn_submit");
	//手机号验证
	$("#mobile_phone").blur(function(){
		var re=/^1+\d{10}$/;
		if(re.test($("#mobile_phone").val())){
			$.ajax({
				type:"get",
				url:"http://10.35.161.52:8080/myWeb/checkUser.jsp",
				dataType:"json",
				data:"stuId=43&userName="+$("#mobile_phone").val(),
				success:function(data){
					if(data==0){
						flag1=true;
						$("#mobile_phone_notice").html("*可以注册！").css("color", "rgb(0, 153, 51)");
					}else if(data==1){
						$("#mobile_phone_notice").html("-您已经注册过了！").css("color", "red");
					}
				}
			});
			
		}else{
			$("#mobile_phone_notice").html("-您输入手机号格式不正确").css("color","rgb(153,0,0 )");
		}
	});
	//密码验证;一边输入一边验证
	$("#password").on({
		keyup:function(){
			pwStrength( $("#password").val() );
		},
		blur:function(){
			if( $("#password").val()==""){
				$("#password_notice").html("密码不能为空").css("color", "rgb(153, 0, 0)");
				$("#pwd_notice").css("display","block");
				$("#pwd_intensity").css("display","none");
			}
		}
	});
	//确认密码
	$("#conform_password").blur(function(){
		if($("#conform_password").val()==""){
			$("#conform_password_notice").html("-密码不能为空").css("color", "rgb(153,0,0 )");
		}else if($("#conform_password").val().length<6){
			$("#conform_password_notice").html("-密码长度不能小于6").css("color", "rgb(153,0,0");
		}else if($("#password").val()==$("#conform_password").val()){
			flag3=true;
			$("#conform_password_notice").html("*可以注册").css("color","rgb(0, 153, 51)");
		}else{
			$("#conform_password_notice").html("-两次输入密码不一致").css("color", "rgb(153,0,0");
		}
	});
	//验证码
	randomCode();
	$("#zphone").click(function(){
		randomCode();
		$("#mobile_code").val("");//清空验证码输入框内容
	});
	$("#mobile_code").blur(function(){
		if($("#mobile_code").val()==""){
			$("#extend_field5i").html("请输入验证码").css("color", "rgb(153,0,0)");
		}else if($("#mobile_code").val()==$("#randomW").html()){
			flag4=true;
			$("#extend_field5i").html("恭喜您验证成功！").css("color","rgb(0, 153, 51)");
		}else{
			$("#extend_field5i").html("您输入的验证码有误").css("color", "rgb(153,0,0)");
		}
	});
	//注册：判断开关状态全部正确，发送ajax请求，将信息存入数据库；然后跳转到注册页面；
	$("#btn_submit").click(function(){
		if(flag1&&flag2&&flag3&&flag4){
			$.ajax({
				type:"post",
				url:"http://10.35.161.52:8080/myWeb/reg.jsp",
				data:"stuId=43&userName="+$("#mobile_phone").val()+"&userPass="+$("#password").val()+"&userEmail=1",
				dataType:"json",
				success:function(data){
					if(data){
						alert("注册成功，正在为您跳转登录界面！")
						location.href="log.html";
					}
				}
			});	
		}
		
	})
	//密码安全性验证
	//CharMode函数
	//测试某个字符是属于哪一类.
	function CharMode(iN){
		if (iN>=48 && iN <=57) //数字
			return 1;
		if (iN>=65 && iN <=90) //大写字母
			return 2;
		if (iN>=97 && iN <=122) //小写
			return 4;
		else
			return 8; //特殊字符
	}
	//bitTotal函数
	//计算出当前密码当中一共有多少种模式
	function bitTotal(num){
		modes=0;
		for (i=0;i<4;i++){
			if (num & 1) modes++;
			num /= 2;
		}
		return modes;
	}
	//checkStrong函数
	//返回密码的强度级别
	function checkStrong(sPW){
		if (sPW.length<6)
			return 0; //密码太短
		var Modes=0;
		for (i=0;i<sPW.length;i++){
			//测试每一个字符的类别并统计一共有多少种模式.
			Modes|=CharMode(sPW.charCodeAt(i));
		}
		 return bitTotal(Modes);
	}		
	//pwStrength函数
	function pwStrength(pwd){
		if (pwd==null||pwd==''){
			$("#password_notice").html("密码不能为空").css("color", "rgb(153, 0, 0)");
			$("#pwd_notice").css("display","block");
			$("#pwd_intensity").css("display","none");
		}else{
		   	S_level=checkStrong(pwd);
			switch(S_level){
				case 0:
					$("#pwd_notice").css("display","block");
					$("#pwd_intensity").css("display","none");
					$("#password_notice").html("密码不能少于6位").css("color", "rgb(153, 0, 0)");
				break;
				case 1:
					//密码较弱
					flag2=true;
					$("#pwd_notice").css("display","none");
					$("#pwd_intensity").css("display","block");
					$("#pwd_intensity td").eq(0).css("border-bottom-color","red").siblings().css("border-bottom-color","rgb(218, 218, 218)");
					break;
				case 2:
					//密码强度为中
					flag2=true;
					$("#pwd_notice").css("display","none");
					$("#pwd_intensity").css("display","block");
					$("#pwd_intensity td").eq(1).css("border-bottom-color","rgb(255, 153, 0)").siblings().css("border-bottom-color","rgb(218, 218, 218)");
					break;
				default:
					//密码强
					flag2=true;
					$("#pwd_notice").css("display","none");
					$("#pwd_intensity").css("display","block");
					$("#pwd_intensity td").eq(2).css("border-bottom-color","rgb(51, 204, 0)").siblings().css("border-bottom-color","rgb(218, 218, 218)");
			}
		} 
		 
	}
	//产生四位随机验证码
	function randomCode(){
		var a="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
		var arr=a.split("");
		var str="";
	
		for(var i=1;i<=4;i++){
			var index=Math.floor(Math.random()*62);
			str+=arr[index];
		}
		//将验证码输入到页面上；
		$("#randomW").html(str);
	}
})
