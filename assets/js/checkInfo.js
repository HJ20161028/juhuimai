$(function(){
	//省市县三级联动
	var pro=$("#selProvinces");
	var citys=$("#selCities");
	var dis=$("#selDistricts");
	
	$.ajax({
		type:"get",
		dataType:"json",
		url:"js/city1.json",
		success:function(data){
			var len=data.length;
			for(var i=0;i<len;i++){
				pro.append("<option value='"+i+"'>"+data[i].name+"</option>");
			}
		}
	});
	pro.change(function(){
		if(pro.val()=="请选择省"){
			citys.html("<option>请选择市</option>");
			dis.css("display","none").html("<option>请选择区</option>");
		}else{
			citys.html("<option>请选择市</option>");
			$.ajax({
				type:"get",
				dataType:"json",
				url:"js/city1.json",
				success:function(data){
					var x=pro.val();
					var len=data[x].city.length;
					for(var i=0;i<len;i++){
						citys.append("<option value='"+i+"'>"+data[x].city[i].name+"</option>");
					}
				}
			});
		}
	});
	citys.change(function(){
		dis.html("<option>请选择区</option>");
		if(citys.val()=="请选择市"){
			dis.css("display","none");
		}else{
			dis.css("display","");
			$.ajax({
				type:"get",
				url:"js/city1.json",
				dataType:"json",
				success:function(data){
					var x=pro.val();
					var y=citys.val();
					var len=+data[x].city[y].area.length;
					for(var i=0;i<len;i++){
						dis.append("<option value='"+i+"'>"+data[x].city[y].area[i]+"</option>");
					}
				}
			});
		}
	});
	//地址填写，信息格式要求
	$(".BonusButton").click(function(){
		//收件人判断
		if($("input[name='consignee']").val()==""){
			alert("收件人不能为空");
			return false;
		}
		//收货地址判断
		if(pro.val()=="请选择省" ||citys.val()=="请选择市"|| dis.val()=="请选择区"){
			alert("所在地区选择不完整！");
			return false;
		}
		//收货地址判断
		if($("input[name='address']").val()==""){
			alert("收货地址不能为空");
			return false;
		}
		//手机号码和固定电话不能为空
		if($("input[name='mobile']").val()=="" && ($("input[name='tel_01']").val()=="" || $("input[name='tel_02']").val()=="" || $("input[name='tel_03']").val()=="")){
			alert('手机号码和固定电话必须填写至少一项！');
			return false;
		}
		//手机号不为空
		if ($("input[name='mobile']").val()!=""){
			var reg = /^1[34578]\d{9}$/;
			if (!reg.test($("input[name='mobile']").val())){
				alert('手机号码格式不正确！');
				return false;
			}
		}
	});
	//送货时间里单样式变化
	$(".checkBox_jm").eq(1).find("li").click(function(){
		$(this).addClass("curr").siblings().removeClass("curr");
	});
	$("#time_id_4").hover(function(){
		$("#seltimebox").css("display","block");
	},function(){
		$("#seltimebox").css("display","none");
	});
	//商品清单
	$(".jmbag").click(function(){
		$(this).parent().toggleClass("checkout_other");
	});
	//支付方式
	$(".payment_tab_jm li label").click(function(){
		$(this).next().css("display","block");
		$(this).parent().siblings().find(".payment_subbox").css("display","none");
	});
});
