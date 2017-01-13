$(function(){
	//drag($(".MagicZoomPup").get(0));
	var oSmall=$("#zoom");
	var oMask=$(".MagicZoomPup");
	var oBig=$(".MagicZoomBigImageCont");
	var bigImg=$("#bigimg");
	function drag(obj){
		oSmall.mouseover(function(){
			oMask.css("display","block");
			oBig.css("display","block");
			oSmall.mousemove(function(ev){
				
				var scrollT=$(window).scrollTop();
				var l=ev.clientX-oSmall.offset().left-obj.outerWidth()/2;
				var t=ev.clientY-oSmall.offset().top-obj.outerHeight()/2+scrollT;
				var visiableW=oSmall.outerWidth()-obj.outerWidth();
				var visiableH=oSmall.outerHeight()-obj.outerHeight();
				
				l= l<0? 0:l;
				l= l>visiableW?visiableW:l;
				t= t<0?0:t;
				t= t>visiableH?visiableH:t;
				oMask.css({
					left:l,
					top:t
				});
				bigImg.css({
					left:-l*(700/378),
					top:-t*(700/378)
				});
				return false;//组织默认事件和冒泡
			});
			oSmall.contextmenu(function(ev){
				return false;//组织右键菜单
			})
			
		});
		oSmall.mouseout(function(){
			oMask.css("display","none");
			oBig.css("display","none");
		});
		
	}
	drag(oMask);
	//全部商品分类，划上.menuEvent,显示.all_cats;划上自身显示，离开隐藏；
	$(".menuEvent").hover(function(){
		$(".all_cats").show();
	},function(){
		$(".all_cats").hide();
	});
	$(".all_cats").hover(function(){
		$(this).show();
	},function(){
		$(this).hide();
	});
	//点击.B_blue切换到对应的图片
	$("#goods_gallery .B_blue").each(function(i,ele){
		$(ele).click(function(){
			if(i==0){
				$("#bigimg").attr("src","images/175_P_1452904659477.jpg");
				$("#goods_bimg").attr("src","images/175_P_1452904659002.jpg").css({opacity:0.5}).animate({opacity:0.99},"500","linear");
			}else if(i==1){
				$("#bigimg").attr("src","images/175_P_1452904754871.jpg");
				$("#goods_bimg").attr("src","images/175_P_1452904754767.jpg").css({opacity:0.5}).animate({opacity:0.99},"500","linear");
			}
		});
	});
	//划上图片p-img；.rain-product-info上移25px，移开下移25px;
	$(".slider1 li").hover(function(){
		$(this).find(".rain-product-info").stop().animate({bottom:0},"fast");
	},function(){
		$(this).find(".rain-product-info").stop().animate({bottom:-25},"fast");
	});
	//吸顶效果.main-nav-holder
	var holderTop=$("#main-nav-holder").offset().top;
	$(window).scroll(function(){
		var scrollT=$(window).scrollTop();
		if(scrollT>holderTop){
			$("#main-nav-holder").css({
				"position":"fixed",
				top:0
			});
		}else{
			$("#main-nav-holder").css({
				"position":"static",
				top:0
			});
		}
	});
	//计价器里边的逻辑
	//一，划上#pickup_point,pickup_point_list显示
	$("#pickup_point").hover(function(){
		$("#pickup_point_list").show();
		$(this).css("border-bottom-color","rgb(255,255,255)");
	},function(){
		$("#pickup_point_list").hide();
		$(this).css("border-bottom-color","rgb(204,204,204)");
	});
	$("#pickup_point_list").hover(function(){
		$(this).show();
		$("#pickup_point").css("border-bottom-color","rgb(255,255,255)");
	},function(){
		$(this).hide();
		$("#pickup_point").css("border-bottom-color","rgb(204,204,204)");
	});
	//二，划上#area_label显示选择地区#area_list_wrap
	$("#area_label").hover(function(){
		$("#area_list_wrap").show();
		$(this).css("border-bottom-color","rgb(255,255,255)");
	},function(){
		$("#area_list_wrap").hide();
		$(this).css("border-bottom-color","rgb(204,204,204)");
	});
	$("#area_list_wrap").hover(function(){
		$(this).show();
		$("#area_label").css("border-bottom-color","rgb(255,255,255)");
	},function(){
		$(this).hide();
		$("#area_label").css("border-bottom-color","rgb(204,204,204)");
	});
	//三，选择颜色添加样式.cattsel
	$("#catt_39 a").click(function(){
		$(this).addClass("cattsel").siblings().removeClass("cattsel");
	});
	//简单计价器
	//console.log( typeof $("#shows_number").html() );字符串
	$number=parseInt( $("#number").val() );
	$(".btn-reduce").click(function(){
		$number--;
		$number=($number>0)?$number : 1; 
		$("#number").val($number);
	});
	$(".btn-add").click(function(){
		$number++;
		$("#number").val($number);
	});
	//吸顶上的类似楼层效果
	$("#nav li").click(function(){
		var index=$(this).index();
		if(index==0){
			$("body,html").animate({
				"scrollTop":$("#os_canshu").offset().top
				
			});
		}else if(index==1){
			$("body,html").animate({
				"scrollTop":$("#os_jieshao").offset().top
			});
		}else if(index==2){
			$("body,html").animate({
				"scrollTop":$("#os_pinglun").offset().top
			});
		}else if(index==3){
			$("body,html").animate({
				"scrollTop":$("#os_shouhou").offset().top
			});
		}
	});
	//右侧楼层效果，给当前楼层添加类abs_active
	var $Top=$("#main_widget_1").offset().top;
	($(".abs_ul li").click(function(){
		var top=$("#main_widget_1 .mc").eq($(this).index()).offset().top;
		$(this).addClass("abs_active").siblings().removeClass("abs_active");
		$("body,html").animate({
			scrollTop:top
		},"normal");
	}),
	//滚动的时候，触发 里面的事情
	$(window).scroll(function(){
		var scrollT=$(window).scrollTop();
		//滚动过程中的样式的添加与删除的变化
		$("#main_widget_1 .mc").each(function(i,ele){
			var dis=$(ele).offset().top+$(ele).outerHeight()/2;
			if(dis>scrollT){
				$(".abs_ul li").removeClass("abs_active");
				$(".abs_ul li").eq(i).addClass("abs_active");
				
				return false;//跳出循环；
			}
		})
	}));
});