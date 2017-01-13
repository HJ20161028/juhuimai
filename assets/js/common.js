$(function(){
	//更新侧边栏信息
	var count=0;//商品总数
	var user=$.cookie("userName");
	updateCart();
	function updateCart(){
		count=0;
		//var user=$.cookie("userName");
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
})
