$(function(){
	//页面加载完给图片喝登录框运动
	//reg-pic从左边运动到left:0
	//login-box从右边运动到right:0
	$("#reg-pic").animate({"left":0},"normal");
	$("#login-box").animate({"right":0},"normal");
	//点击登录，发送ajax请求，判断用户信息
	
	$("#loginsubmit").click(function(){
		if($("#username").val()==""|| $("#password").val()==""){
			alert("账户名和密码不能为空");
		}else{
			$.ajax({
				type:"post",
				url:"http://10.35.161.52:8080/myWeb/login.jsp",
				data:"stuId=43&userName="+$("#username").val()+"&userPass="+$("#password").val(),
				dataType:"json",
				success:function(data){
					if(data){
						//将用户名存入cookie,用于判断登录状态；退出时清空；
						$.cookie("userName",$("#username").val(),{expires:7});
						//跳转到主页
						location.href="index.html";
					}
				}
			});
		}
		
	});
});
