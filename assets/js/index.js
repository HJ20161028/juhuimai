$(function(){
	var user=$.cookie("userName");
	updateCart();
	function updateCart(){
		count=0;
		if(user){
			$.ajax({
				url:"http://10.35.161.52:8080/myWeb/getShoppingCart.jsp",
				type:"get",
				data:"stuId=43&userName="+user,
				dataType:"json",
				error:function(data){
					var json=eval("("+data.responseText+")");
					console.log(json);
					var len=json.length;
					console.log(json.length);
					for(var i=0;i<len;i++){
						count+=parseInt(json[i].goodsCount);
					}
					//console.log(count);
					$("#formCart a.btn span").html(count);
					//先拼接公共样式：
					$("#J-flow-drop").html(
						'<div class="bar clearfix">'+
					    	'<div class="tip Left">共<span class="count">'+count+'</span>件宝贝</div>'+
					      	'<div class="btn-bar Right"> <a href="shoppingCart.html" class="submit-btn" rel="nofollow">去购物车结算</a> </div>'+
					    '</div>'+
					    '<div class="cart_goods">'+
						    '<div class="cart_goods_list">'+
							   	'<ul class="unstyled"></ul>'+
							'</div>'+
						'</div>'+
						"<span class='cart_arrow'><b class='arrow-1'></b> <b class='arrow-2'></b></span>"
					);
					for(var i=0;i<len;i++){
						var data=json[i];
						$("#J-flow-drop .unstyled").append(
							'<li id='+data.goodsId+'>'+
								'<a href="javascript:;"><img src='+data.goodsImg+'>'+
									'<h4>'+data.goodsName+'</h4>'+
									'<span>'+data.goodsPrice+'<strong style="margin:0 7px;">×</strong>'+data.goodsCount+'</span>'+
								'</a><i class="del-btn" title="删除">×</i>'+
							'</li>');
					}
				}
			});
		}
	}
	//添加购物车
 	$(".j_AddCart").click(function(){
		//var user=$.cookie("userName");
		if(user){
			var goodsId = $(this).parent().parent().attr("id");
			fly($(this).parent().parent());
		$.ajax({
				type:"get",
				url:"http://10.35.161.52:8080/myWeb/addShoppingCart.jsp",
				dataType:"json",
				data:"stuId=43&userName="+user+"&goodsId="+goodsId+"&goodsCount=1",
				success:function(data){
					updateCart();
				}
		});
		}else{
			alert("请先登录");
			location.href="log.html";
		}	
	})
	//删除购物车商品
	$("#J-flow-drop").on("click",".del-btn",function(){
		var that=$(this);
		var goodsId = $(this).parent().attr("id");
		console.log(that);
		
		$.ajax({
			type:"get",
			url:"http://10.35.161.52:8080/myWeb/deleteGoods.jsp",
			dataType:"json",
			data:"stuId=43&userName="+user+"&goodsId="+goodsId,
			success:function(data){
				console.log(data);
				that.parent().remove();
				if($("#J-flow-drop .unstyled li").size()<1){
					console.log("删除完了");
					$("#formCart a.btn span").html(0);
					$("#J-flow-drop").html(
					"<div class='empty-tip'>"+
			      		"<p></p>"+
			      		"<p><a href='javascript:;' rel='nofollow'>您的购物车里什么都没有哦，再去看看吧</a></p>"+
			    	"</div><span class='cart_arrow'><b class='arrow-1'></b> <b class='arrow-2'></b></span>");
				}
				updateCart();
			}
		});
	})
	//让子弹飞,参数为当前div
	function fly(obj){
		//console.log(obj.find("img").attr("src"));
		var goods=$("<div></div>");
		$("body").append(goods);
		goods.css({
			width:80,
			height:80,
			position:"absolute",
			zIndex:100000,
			backgroundImage:"url("+obj.find('img').attr('src')+")",
			backgroundSize:"cover",
			top:obj.offset().top,
			left:obj.offset().left
		});
		parabola(goods.get(0),{
			left:$("#collectBox i").offset().left-goods.width(),
			top:$("#collectBox i").offset().top-goods.height()/2
		},20,function(){
			goods.remove();
		});
	}
	//楼层效果实现;
	//鉴于浏览器版本以及屏幕分辨率的影响，先把楼层top值存一下；
	var $floorTop=$(".floorList").offset().top;
	($(".floorInfo a").click(function(){
		var top=$(".floorList .floor").eq($(this).index()).offset().top;
		$(this).addClass("active").siblings().removeClass("active");
		$("body,html").animate({
			scrollTop:top
		},"normal");
	}),
	//滚动的时候，触发 里面的事情
	$(window).scroll(function(){
		var scrollT=$(window).scrollTop();
		//显示和隐藏导航条
		if(scrollT>$floorTop){
			//$(".floorInfo").fadeIn();
			$(".floorInfo").css({
				"opacity":1,
				"transform":"scale(1)",
				"transition":"all 0.3s ease"
			});
		}else{
			//$(".floorInfo").fadeOut();
			$(".floorInfo").css({
				"opacity":0,
				"transform":"scale(1.2)",
				"transition":"all 0.3s ease"
			});
		}
		//滚动过程中的样式的添加与删除的变化
		$(".floorList .floor").each(function(i,ele){
			var dis=$(ele).offset().top+$(ele).outerHeight()/2;
			if(dis>scrollT){
				$(".floorInfo a").removeClass("active");
				$(".floorInfo a").eq(i).addClass("active");
				
				return false;//跳出循环；
			}
		})
	}));
})
