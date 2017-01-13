//划上显示，离开隐藏
function tog(obj1,obj2){
	$(obj1).mouseover(function(){
		$(obj2).css("display","block");
	});
	$(obj1).mouseout(function(){
		$(obj2).css("display","none");
	});
}
//给obj1添加类  //让小图标旋转；transform:rotate(7deg);
function togClass(obj1,obj2,zhuan,className){
	$(obj1).mouseover(function(){
		$(obj2).css("display","block");
		$(obj1).addClass(className);
		$(zhuan).css({
			"transform":"rotate(-180deg)",
			"transition":"all 0.1s"
		});
	});
	$(obj1).mouseout(function(){
		$(obj2).css("display","none");
		$(obj1).removeClass(className);
		$(zhuan).css({
			"transform":"rotate(0deg)",
			"transition":"0.5s"
		});
	});
}
//常规选项卡，移上obj1，显示对应obj2,给obj2添加类className2(控制显示隐藏),限于布局（obj2就是div）
function tabTog(obj1,obj2,className1,className2){
	$(obj1).mouseover(function(){
		var index=$(this).index();
		$(obj2).eq(index).removeClass(className2).siblings("div").addClass(className2);
		$(this).addClass(className1).siblings().removeClass(className1);
		
	})
}
//侧边栏上翻下翻效果实现
function upDown(obj1){
	$(obj1).on({
		mouseover:function(){
			$(obj1).find(".btn").addClass("hover");
			$(obj1).find("table").stop().animate({"margin-top":"-47px"},"fast");
		},
		mouseout:function(){
			$(obj1).find(".btn").removeClass("hover");
			$(obj1).find("table").stop().animate({"margin-top":"0px"},"fast");
		}
	});
}
$(function(){
	
	//页面一加载，直接获取cookie中userName，判断用户登录状态
	updateUserAfterEvent();
	function updateUserAfterEvent(){
		var username=$.cookie("userName");
		if(username){
			$("#top .top_nav_login").html("<li><em>"+username+"欢迎您回来！</em></li>"+
			"<li class='login'><a href='user.html'>用户中心</a></li>"+
			"<li><a href='javascript:;' class='register' id='toplogout'>退出</a></li>");
		}else{
			$("#top .top_nav_login").html("<li><em>欢迎光临本店！</em></li>"+
			"<li class='login'><a href='log.html'>请登录</a></li>"+
			"<li><a href='reg.html' class='register'>免费注册</a></li>");
		}
	}
	//点击退出清除cookie,还原页面
	$("#toplogout").click(function(){
		$.cookie("userName","",{expires:-1});
		updateUserAfterEvent();
	})
	var screenLunboTimer=null;
	var num=0;
	var $listLen=$("#screenLunbo li").length;
	//top_nav下的效果
	tog($(".city"),$(".city .citydown"));
	togClass((".myinfo"),(".myinfo .infodown"),".myinfo span.fa-angle-down","active");
	togClass($(".favorites"),$(".favorites .favdown"),(".favorites span.fa-angle-down"),"active");
	togClass($(".mobile"),$(".mobile .mobdown"),(".mobile span.fa-angle-down"),"active");
	togClass($(".sup"),$(".sup .supdown"),(".sup span.fa-angle-down"),"active");
	togClass($(".nav"),$(".nav .navdown"),(".nav span.fa-angle-down"),"active");
	//header_search的切换效果；
	$(".mallSearch .mall01 li").click(function(){
		$(this).addClass("active1").siblings().removeClass("active1");
	});
	$(".mallSearch .mall01 li").hover(function(){
		if($(this).prop("className")=="active1") return;
		$(this).addClass("hover1").siblings().removeClass("hover1");
	},function(){
		$(this).removeClass("hover1");
	});
	//all_cats选项卡切换
	$(".all_cats .list").on({
		mouseover:function(){
			$(this).find(".catName a").addClass("tofff");
			$(this).find(".hideMap").css("display","block");
		},
		mouseout:function(){
			$(this).find(".catName a").removeClass("tofff");
			$(this).find(".hideMap").css("display","none");
		}
	});
	//screenLunbo下的tabs-nav切换
	$(".tabs-nav li").mouseover(function(){
		$(this).addClass("tabs-selected").siblings().removeClass("tabs-selected");
		//$(".tabs-panel").eq($(this).index()).removeClass("tabs-hide").siblings().addClass("tabs-hide");
		$(".proclamation .tabs-panel").not(":eq("+$(this).index()+")").addClass("tabs-hide").siblings().removeClass("tabs-hide");
	});
	//.wine .logoBox .allWines下的图片左右移动；
	$(".allWines li img").hover(function(){
		$(this).stop().animate({"margin-left":-100},"800");
	},function(){
		$(this).stop().animate({"margin-left":0},"800");
	});
	//.wine .logoBox .allWines下的选项卡切换；
	$(".wines li").mouseover(function(){
		var index=$(this).index();
		$(".titleSlider").stop().animate({left:index*105},"500");
		$(".logoBox>div").eq(index+1).css("display","block").siblings().css("display","none");
		if(index==0){
			$(".logoBox .btn").css("display","block");
		}
	});
	$(".logoBox .left").click(function(){
		$(".logoFirstBd").animate({"margin-left":0},"normal");
	});
	$(".logoBox .right").click(function(){
		$(".logoFirstBd").animate({"margin-left":-1185},"normal");
	});
	//.brand-wall a img 弹簧运动
	$(".brand-wall img").mouseover(function(){
		$(this).stop().animate({top:-10},"fast","easeIn",function(){
			$(this).stop().animate({top:0},1000,"bounceOut");
			//shake(obj,attr,fudu,rate,fn)
			//var obj=$(this).get(0);
			//shake(obj,"top",10,2);
			/** 
			 参数列表 
			 
			t: current time(当前时间) 
			b: beginning value(初始值) 
			c: change in value(变化量//不懂看下边的解释) 
			d: duration(持续时间) 
			 
			*/ 
		})
		
	});
	//.sale_layout .sale_left下的选项卡切换
	$(".tab_nav li").mouseover(function(){
		$(this).addClass("tab-selected").siblings().removeClass("tab-selected");
		$(".tab_sale").eq($(this).index()).removeClass("tab_hide").siblings("div").addClass("tab_hide");
	});
	/*
	 * 楼层选项卡*
	 *我想写成闭包的形式，不知道对不对？？？
	 */
	//.style-one .middle-layout一楼选项卡
	(tabTog(".style-one .tabs-nav1 li",".style-one .middle-layout .tabs-panel","tabs-selected","tabsHide"),
	//.style-two .middle-layout二楼选项卡
	tabTog(".style-two .tabs-nav1 li",".style-two .middle-layout .tabs-panel","tabs-selected","tabsHide"),
	//.style-three .middle-layout三楼选项卡
	tabTog(".style-three .tabs-nav1 li",".style-three .middle-layout .tabs-panel","tabs-selected","tabsHide"),
	//.style-four .middle-layout四楼选项卡
	tabTog(".style-four .tabs-nav1 li",".style-four .middle-layout .tabs-panel","tabs-selected","tabsHide"),
	//.style-five .middle-layout五楼选项卡
	tabTog(".style-five .tabs-nav1 li",".style-five .middle-layout .tabs-panel","tabs-selected","tabsHide"),
	//.style-six .middle-layout六楼选项卡
	tabTog(".style-six .tabs-nav1 li",".style-six .middle-layout .tabs-panel","tabs-selected","tabsHide"),
	//.style-seven .middle-layout七楼选项卡
	tabTog(".style-seven .tabs-nav1 li",".style-seven .middle-layout .tabs-panel","tabs-selected","tabsHide"),
	//.style-eight .middle-layout八楼选项卡
	tabTog(".style-eight .tabs-nav1 li",".style-eight .middle-layout .tabs-panel","tabs-selected","tabsHide"),
	//给.m-floor .goods .wrap添加一个微动效果
	$(".m-floor .goods .wrap").hover(function(){
		$(this).css("top","-2px");
	},function(){
		$(this).css("top",0);
	}));
	
	//侧边栏效果实现
	(
		tog($("#right_login"),$("#right_login .dropdown")),
		tog($(".mods .online-service"),$(".online-service .dropdown")),
		upDown(".mods .vote_list"),tog(".mods .vote_list",".vote_leaseInist .dropdown"),
		tog(".reserve",".reserve .dropdown"),
		upDown(".mods .traffic"),
		upDown(".mods .insure"),
		upDown(".mods .qrcode"),tog(".mods .qrcode",".qrcode .dropdown"),
		upDown(".mods .top"),
		$(".mods .top").click(function(){
			$("body,html").animate({
				scrollTop:0
			},"normal");
		}),
		$(window).scroll(function(){
			if($(window).scrollTop()>100){
				$(".sidebar-nav .top").removeClass("disabled").stop().animate({"bottom":3},"fast","easeIn");
			}else{
				$(".sidebar-nav .top").stop().animate({"bottom":-40},"fast","easeIn",function(){
					$(this).addClass("disabled")});
			}
		})
	);
	//点击index_city_close按钮，关闭收货地址选择框
	(
		$(".index_city_close").click(function(){
			$("#index_city_form").css("display","none");
			$(".bg").css("display","none");
		})
	);
	//screenLunbo自动播放的函数；
	(
		autoPlay(),
		$(".screenNav li").on({
			mouseover:function(){
				clearInterval(screenLunboTimer);
			},
			click:function(){
				num=$(this).index();
				$(".screenNav li").eq(num).addClass("current").siblings().removeClass("current");
				$("#screenLunbo li").eq(num).fadeIn("600").siblings().fadeOut("600");
			},
			mouseout:function(){
				autoPlay();
			}
		})
	);
	function autoPlay(){
		screenLunboTimer=setInterval(function(){
			num++;
			num= num>($listLen-1)?0:num;
			$("#screenLunbo li").eq(num).fadeIn(600).siblings().fadeOut(600);
			$(".screenNav li").eq(num).addClass("current").siblings().removeClass("current");
		},3000);
	}
});
