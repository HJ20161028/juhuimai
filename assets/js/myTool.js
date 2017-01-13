//封装了一个$函数 
function $$(selector,parent,tagName){
				
	var firstChar=selector.charAt(0);
	
	parent=parent||document;
	
	if(firstChar=="#"){
		return document.getElementById(selector.substring(1));
	}else if(firstChar=="."){
		//对tagName做一个判断，默认是* 全部标签
		tagName=tagName||"*";
		//从父级下获取特定的标签
		var allEles=parent.getElementsByTagName(tagName);
		
		var arr=[];//用于存储要找的所有的带该类的元素
		//循环所有的标签
		for(var i=0;i<allEles.length;i++){
			//将每一个标签的class通过空格 转成数组
			var arrClassNames=allEles[i].className.split(" ");
			//循环数组中的每一个class名，进行判断
			for(var j=0;j<arrClassNames.length;j++){
				//如果有一个class名和我要找的相等，说明该元素是我要找的元素
				if(arrClassNames[j]==selector.slice(1)){
					//用数组存起来
					arr.push(allEles[i]);
					break;//停止向后查找
				}
			};
		};
		//当整个循环完毕， 返回数组（里面存着所有找到的元素）
		return arr;
		
	}else{
		return parent.getElementsByTagName(selector);
	}
	
	
}
//添加指定的类名
	function addClass(obj,myClass){
					
		if(obj.classname==""){
			obj.className=myClass;
		}else{
			
			var arrClass=obj.className.split(" ");
				
			var _index=arrIndexOf(arrClass,myClass);
			if(_index==-1){
				obj.className+=" "+myClass;
			}
		}
		
	}
	
	//单独可以作为一个数组的查找方法
	function arrIndexOf(arr,v){
		for(var i=0;i<arr.length;i++){
			if(arr[i]==v){
				return i;
			}
			
		};
		return -1;
	}
//删除指定的类名
function removeClass(obj,myClass){
	if(obj.className!=""){
		
		var arrClass=obj.className.split(" ");
		
		var _index=arrIndexOf(arrClass,myClass);
		if(_index!=-1){
			arrClass.splice(_index,1);
		}
		obj.className=arrClass.join(" ");
	}
}
//获取obj的首个子元素
	function getFirst(obj){
		var first=obj.firstElementChild || obj.firstChild;
		if(!first || first.nodeType!=1){
			return null;
		}
		else{
			return first;
		}
	}
	
	//获取指定元素的下一个兄弟节点；
	function getNextNode(obj){
		var next=obj.nextElementSibling || obj.nextSibling;
		if(!next || next.nodeType!="1"){
			return null;
		}
		else{
			return next;
		}
	}
	//获取前一个兄弟元素
	function getPreviousNode(obj){
		var previous=obj.previousElementSibling || obj.previousSibling;
		if(!previous || previous.nodeType!="1"){
			return null;
		}
		else{
			return previous;
		}
	}
	//获取最后一个子节点
	function getLastNode(obj){
		var last=obj.lastElementChild || obj.lastChild;
		if(!last ||last.nodeType!="1"){
			return null;
		}
		else{
			return last;
		}
	}

//封装了一个兼容获取样式表中的样式的函数
function getStyle(obj,attr){
	return obj.currentStyle ? obj.currentStyle[attr] :getComputedStyle(obj)[attr];
}
//计算obj距离浏览器的偏移量；
function getOffset(obj){
	var top=0,left=0;
	while(obj){
		top+=obj.offsetTop;
		left+=obj.offsetLeft;
		obj=obj.offsetParent;
	}
	return{
		l:left,
		t:top
	}
}
//改进后算法,累加了obj的边框！！！
function getPos( obj ){
    var left = 0, top = 0;
    //先找到obj到 obj的定位父级的偏移量
    // 然后依次向上找 obj的定位父级的定位父级的偏移量

    //border在ie下的默认值为medium，其余浏览器中 0

    //刚上来的时候，先保存一下，要获取offsetLeft的这个元素的边框
    var borderLeft = parseInt( getStyle(obj,"borderLeftWidth") );
    var borderTop = parseInt( getStyle(obj,"borderTopWidth") );
    borderLeft = isNaN( borderLeft )? 0 : borderLeft;
    borderTop = isNaN( borderTop )? 0 : borderTop;

    while( obj ){
        /*var borderL = parseInt( getStyle(obj,"borderLeftWidth") ) || 0;
        var borderT = parseInt( getStyle(obj,"borderTopWidth") ) || 0;*/
        var borderL = parseInt( getStyle(obj,"borderLeftWidth") );
        var borderT = parseInt( getStyle(obj,"borderTopWidth") );

        borderL = isNaN( borderL )? 0 : borderL;
        borderT = isNaN( borderT )? 0 : borderT;

        left+= obj.offsetLeft+borderL;
        top+= obj.offsetTop+borderT;

        obj = obj.offsetParent;
    }
    return {
        left:left-borderLeft,
        top:top-borderTop
    }

}
//拖拽函数：
function drag(obj){
	var divX;
	var divY;
	//鼠标按下时
	obj.onmousedown=function(ev){
			ev=ev||event;
			divX=ev.clientX-this.offsetLeft;
			divY=ev.clientY-this.offsetTop;
			//if(ev.preventDefault){
				ev.preventDefault&&ev.preventDefault();
				ev.returnvalue&&(ev.returnvalue=false);
				this.setCapture&&this.setCapture();
			//}
			//鼠标移动时，相对于整个文档移动
		document.onmousemove=function(ev){
			ev=ev||event;
			obj.style.left=ev.clientX-divX+"px";
			obj.style.top=ev.clientY-divY+"px";
		}
		//鼠标松开时
		document.onmouseup=function(){
			document.onmouseup=document.onmousemove=null;
			obj.releaseCapture&&obj.releaseCapture();
		}
	}
}
/*-------------------------------------------------cookie操作---------------------------------------------------*/
//设置cookie；
function setCookie(key,value,t){
	var mydate=new Date();
	mydate.setDate(mydate.getDate()+t);
	document.cookie=key+"="+encodeURI(value)+"; expires="+mydate.toGMTString();
}
//获取cookie;
function getCookie(key){
	var arr=document.cookie.split("; ");
	for(var i=0;i<arr.length;i++){
		var newArr=arr[i].split("=");
		if(newArr[0]==key){
			return decodeURI(newArr[1]);
		}
	}
}
//移除cookie;
function removeCookie(key){
	setCookie(key,"",-1);
}
/*------------------------封装运动函数--------------------------------------------*/
//基本的左右、上下匀速直线运动；
function move(obj,attr,rate,target,fn){
	//做一个速率的正负处理
	rate=parseInt(getStyle(obj,attr))>target ? -rate : rate;
	//清除前一个定时器
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var speed=parseInt(getStyle(obj,attr))+rate;
		if(speed>=target&&rate>0||speed<=target&&rate<0){
			speed=target;
		}
		obj.style[attr]=speed+"px";
		if(speed==target){
			clearInterval(obj.timer);
			fn&&fn();
		}
	},30)
}
//抖动函数；
function shake(obj,attr,fudu,rate,fn){
	if(obj.timer) return;
	obj.timer=null;
	
	var arr=[];
	var num=0;
	var pos=parseInt(getStyle(obj,attr));
	
	for(var i=fudu;i>0;i-=rate){
		arr.push(-i,i);
	}
	arr.push(0);
	
	obj.timer=setInterval(function(){
		obj.style[attr]=pos+arr[num]+"px";
		num++;
		if(num>arr.length-1){
			clearInterval(obj.timer);
			obj.timer=null;
			fn&&fn();
		}
	},30);
}
//多个属性值同时变化
function  startMove(obj,json,fn){
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var onOff=true;
		//遍历json里面的每一个属性
		for( var attr in json){
			
			var iCur=0;
			if(attr=="opacity"){
			    iCur=parseFloat(getStyle(obj,attr))*100;
			   
			}else{
				iCur=parseInt(getStyle(obj,attr));
			}
			
			
			//初始化的时候的这个对象下的这个属性的值
		//0  	10
		//用目标属性值减去 目前的样式的值，差值 除以8 得到一个小的速度值
			var speed=(json[attr]-iCur)/8;
			
			//进行向上取整 （js中计算的样式的小数值得时候，会进行四舍五入，所以到了某一个
			//值得时候,就会发生停止(四舍五入不上去了)）
			speed=json[attr]-iCur>0 ?  Math.ceil(speed)  : Math.floor(speed);
			//只要有一个属性值没有到目标点，则让开关变成假	
			if(iCur!=json[attr]){
				onOff=false;
			}
			//console.log(iCur+":"+speed);
			//让对象的这个属性等于当前的样式里面的属性值加上  速度（已经处理过了）
			if(attr=="opacity"){
				obj.style.opacity=(iCur+speed)/100;
				obj.style.filter="alpha(opacity="+ (iCur+speed) +")";
			}else{
				obj.style[attr]=iCur+ speed   +"px";
			}
			
			
		}
		//当循环完json的属性的时候，判断这次循环的开关是不是真的，如果是真的，说明
	//	都到目标点了，停止定时器，并且执行回调函数
		if(onOff){
			clearInterval(obj.timer);
			fn&&fn();
		}
		
	},30);
}
//抛物线 左右抛；
function parabola(obj,target,speed,fn){
	if(obj.timer) return;
	var a=0.001;
	var yuan={
		left:getPos(obj).left,
		top:getPos(obj).top
	};
	//相对坐标
	var coord={
		x:target.left-yuan.left,
		y:target.top-yuan.top
	};
	var b=(coord.y-a*coord.x*coord.x)/coord.x;
	var num=0;
	speed= (coord.x>0) ? speed : -speed;
	obj.timer=setInterval(function(){
		num+=speed;
		obj.style.left=yuan.left+num+"px";
		obj.style.top=yuan.top+(a*num*num+b*num)+"px";
		if(speed>0&&num>coord.x || speed<0&&num<=coord.x){
			obj.style.left=target.left+"px";
			obj.style.top=target.top+"px";
			clearInterval(obj.timer);
			obj.timer=null;
			fn&fn();
		}	
	},30);
}
//-------------------------------------随机颜色-----------------------------
function randomColor(){
	var R=Math.round(Math.random()*255).toString(16);
	var G=Math.round(Math.random()*255).toString(16);
	var B=Math.round(Math.random()*255).toString(16);
	
	return "#"+(R= R<10 ? ("0"+R) : R)+(G= G<10 ? ("0"+G) : G)+(B= B<10 ? ("0"+B) : B)
}