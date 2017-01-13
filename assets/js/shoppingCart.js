$(function(){
	var count=0;//商品总数
	var user=$.cookie("userName");
	shoppingCart();
	//删除购物车
	$("#formCart1").on("click",".del",function(){
		var that=$(this);
		var goodsId = $(this).parents("table.goodsList").attr("id");
		//console.log(goodsId);
		$.ajax({
			type:"get",
			url:"http://10.35.161.52:8080/myWeb/deleteGoods.jsp",
			dataType:"json",
			data:"stuId=43&userName="+user+"&goodsId="+goodsId,
			success:function(data){
				that.parents("table.goodsList").remove();
				if($("table.goodsList").size()<1){
					$("#cart_money_info span").html("0.00");
				}
				shoppingCart();
			}
		});
	})
	//修改数量
	//点击减按钮
	var $number=1;
	$("#formCart1").on("click",".jmminu",function(){
		var goodsId = $(this).parents("table.goodsList").attr("id");
		$number=parseInt($(this).next().val());
		$number--;
		//$number=($number>0)?$number : 1; 
		if($number<1){
			$number=1;
			alert("商品数量至少为1.");
		}else{
			$.ajax({
				type:"get",
				url:"http://10.35.161.52:8080/myWeb/updateGoodsCount.jsp",
				dataType:"json",
				data:"stuId=43&userName="+user+"&goodsId="+goodsId+"&goodsCount="+$number,
				success:function(data){
					shoppingCart();
				}
			});
		}
	})
	//点击加按钮
	$("#formCart1").on("click",".jmadd",function(){
		var goodsId = $(this).parents("table.goodsList").attr("id");
		$number=parseInt($(this).prev().val());
		$number++;
		//$number=($number>0)?$number : 1; 
		//假设库存为20
		if($number>20){
			$number=20;
			alert("商品库存不足");
		}else{
			$.ajax({
				type:"get",
				url:"http://10.35.161.52:8080/myWeb/updateGoodsCount.jsp",
				dataType:"json",
				data:"stuId=43&userName="+user+"&goodsId="+goodsId+"&goodsCount="+$number,
				success:function(data){
					shoppingCart();
				}
			});
		}
	})
	//清空购物车
	$(".jmclear").click(function(){
		
		$("#formCart1 .goodsList").each(function(i,ele){
			var goodsId=$(ele).attr("id");
			$.ajax({
				type:"get",
				url:"http://10.35.161.52:8080/myWeb/deleteGoods.jsp",
				dataType:"json",
				data:"stuId=43&userName="+user+"&goodsId="+goodsId,
				success:function(data){
					$(ele).remove();
				}
			});
		})
		//$("#formCart1 .goodsList").remove();
	});
	function shoppingCart(){
		var sumPrice=0.00;
		if(user){
			$.ajax({
				url:"http://10.35.161.52:8080/myWeb/getShoppingCart.jsp",
				type:"get",
				data:"stuId=43&userName="+user,
				dataType:"json",
				error:function(data){
					var json=eval("("+data.responseText+")");
					var len=json.length;
					//拼接前先保证form为空
					$("#formCart1").html("");
					for(var i=0;i<len;i++){
						var data=json[i];
						sumPrice+=(parseFloat(data.goodsPrice)*parseInt(data.goodsCount));
						$("#formCart1").prepend(
							'<table id='+data.goodsId+' class="goodsList" align="center" cellpadding="0" cellspacing="0" style="height:auto;width:100%;">'+
								'<tbody>'+
									'<tr>'+
										'<td style="width:100%;">'+
											'<table cellpadding="5" cellspacing="1" border="0" width="100%">'+
												'<tbody>'+
													'<tr>'+
														'<td align="center" width="5%">'+
														'<input type="checkbox" autocomplete="off" name="sel_cartgoods[]" value="1514" id="sel_cartgoods_1514" checked="checked"></td>'+
														'<td align="center" width="40%">'+
															'<div class="thumb_name">'+
																'<dl>'+
																	'<dt>'+
																		'<a href="###" target="_blank">'+
																			'<img src='+data.goodsImg+' border="0" title='+data.goodsName+'>'+
																		'</a>'+
																	'</dt>'+
																	'<dd>'+
																		'<a href="###" target="_blank" class="f6">'+data.goodsContent+'</a>'+
																		'<br>'+
																		'<font class="attrname"></font>'+
																	'</dd>'+
																'</dl>'+
															'</div>'+
														'</td>'+
														'<td align="center" width="15%">'+
															'<div class="jm_cartnum">'+
																'<span class="jmminu">-</span>'+
																'<input type="text" name='+data.goodsId+' value='+data.goodsCount+' size="4" class="jminputBg">'+
																'<span class="jmadd">+</span>'+
															'</div>'+
														'</td>'+
														'<td align="center" width="15%">'+
															'<font class="cart_jmprice">'+parseFloat(data.goodsPrice).toFixed(2)+'</font>'+
														'</td>'+
														'<td align="center" width="15%">'+
															'<font class="cart_jmprice">'+(parseFloat(data.goodsPrice)*parseInt(data.goodsCount)).toFixed(2)+'</font>'+
														'</td>'+
														'<td align="center" width="10%">'+
															'<a href="###" class="f6 del">删除</a>'+
														'</td>'+
													'</tr>'+
												'</tbody>'+
											'</table>'+
										'</td>'+
									'</tr>'+
								'</tbody>'+
							'</table>');
					}
					//总计写入对应位置
					$("#cart_money_info span").html(sumPrice.toFixed(2));
				}
			})
			
		}
	}
});
