function Slider(selector){/*轮播图插件构造函数*/
	this.ele = document.getElementById(selector);
	this.list = this.ele.children[0];
	this.cLi = this.list.children;
	this.index = 0;
};
Slider.prototype.initFullScreen = function(){/* 初始化全屏轮播图，设置li的宽度 */
	var that = this;
	var screenW = document.documentElement.clientWidth || document.body.clientWidth;
	for(var i=0; i < this.cLi.length; i++) {
		this.cLi[i].style.width = screenW + "px";
	};
	/*重置宽高*/
	window.onresize = function(){
		var screenW = document.documentElement.clientWidth || document.body.clientWidth;
		for (var i = 0; i < this.cLi.length; i++) {
			this.cLi[i].style.width = screenW + "px";
		};
	}
	return this;
};
Slider.prototype.next = function(){/* 下一个 */
	this.index++;
	if(this.index >=this.cLi.length){
		this.index = 1;
		this.list.style.left = 0+"px";
	};
	return this;
};
Slider.prototype.prev = function(){/* 上一个 */
	this.index--;
	if(this.index < 0){
		this.list.style.left = -this.list.children[0].offsetWidth*(this.list.children.length-1)+"px";
		this.index=this.cLi.length-2;

	};
	return this;
};
Slider.prototype.createCtrl = function(){/* 创建前后控制按钮 */
	var that = this;
	this.prevCtrl = Slider.createEle("div","prev",this.ele);
	this.nextCtrl = Slider.createEle("div","next",this.ele);
	return this;
};
Slider.prototype.createDots = function(){/* 创建轮播图标识图标 */
	var that = this;
	this.Dots = Slider.createEle("div", "dots", this.ele);
	for (var i =0; i < this.cLi.length-1;  i++) {
		Slider.createEle("span","", this.Dots);
	};
	this.Dots.children[0].className = "active";
	return this;
};
Slider.prototype.activeDot = function(){/* 变化轮播图标识圆点 */

	for (var i = 0; i < this.Dots.children.length; i++) {
		var num = this.index;
		if(num >= this.Dots.children.length){
			num=0;
		}
		this.Dots.children[i].className = "";
	}
	this.Dots.children[num].className = "active";
	return this;
};
Slider.prototype.offsetMove = function(){/* 水平偏移轮播图 */
	var that = this;
	move({
		ele:that.list,
		props:{
			left:-that.index*that.cLi[0].offsetWidth
		},
		timing:"slow"
	});
	return this;
};
Slider.createEle = function(tagName, className, oParent){/* 创建元素封装函数 */
	var ele = document.createElement(tagName);
	ele.className = className;
	oParent.appendChild(ele);
	return ele;
};
Slider.prototype.extend = function(oParent, oChild){
	oChild = oChild || this;
	for(var attr in oParent){
		if(typeof oParent[attr] === "object"){
			oChild[attr] = (oParent[attr] instanceof Array) ? [] : {};
			Slider.prototype.extend(oParent[attr], oChild[attr]);
		}else{
			oChild[attr] = oParent[attr];
		}
	}
	return this;
}