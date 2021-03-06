require(["jquery-1.8.3.min"], function (){
$(function  () {
	$(".index").toggle(
		function () {
	    	$(".up").css({display:"block",zIndex:"999"});
	    	$(this).children().children().eq(0).text(" 返 回 ");
	    	$(this).children().children().eq(1).children().attr("src","img/up.png")
	  	},
	  	function () {
	    	$(".up").css("display","none");
	    	$(this).children().children().eq(0).text(" 首 页 ");
	    	$(this).children().children().eq(1).children().attr("src","img/down.png")
	    	
	  	}
	)
	$(".toTop1").click(function () {
	    var speed=1000;//滑动的速度
	    $('body,html').animate({scrollTop: 0}, speed);
	    return false;
	});
	
	new Fade({
		boxId:"#ban",
		imgArr:["img/banner2.jpg","img/banner3.jpg"],
		height:800,
		timeSpace:3000,
		fadeTimeSpace:2000,
		btnPreColor:"#413935",
		btnLightColor:"#edc89e",
		btnWidth:50,
		btnHeight:6,
		btnHasOrd:false
	});
})
function Fade (obj) {
	this.boxId=obj.boxId;
	this.imgArr=obj.imgArr;
	this.width=obj.width;
	this.height=obj.height;
	this.currInOrd=1;
	this.currOutOrd=0;
	this.timeSpace=obj.timeSpace;
	this.timer=null;
	
	this.fadeTimeSpace=obj.fadeTimeSpace;
	
	this.btnWidth=obj.btnWidth;
	this.btnHeight=obj.btnHeight;
	this.btnPreColor=obj.btnPreColor;
	this.btnLightColor=obj.btnLightColor;
	this.btnHasOrd=obj.btnHasOrd;
	this.initUI();
	this.go();	
	
	
}
Fade.prototype.initUI=function () {
	for (let i=0;i<this.imgArr.length;i++) {
		let str="<img src='"+this.imgArr[i]+"'margin:auto;left:0;right:0; style='width:100%;text-align:center;height:"+this.height+"px;position:absolute;display: none;'/>"
		$(this.boxId).append(str);
	}
	$(this.boxId+" img:first").css("display","block");
	
	let ulStr="<ul style='position:absolute;display:flex;justify-content:center;bottom:30px;left:0;right:0;margin:0 auto;'>";
	for (let i=0;i<this.imgArr.length;i++) {
		ulStr+="<li ord='"+(i+1)+"' style='float:left;margin:10px;width:"+this.btnWidth+"px;height:"+this.btnHeight+"px;text-align:center;background-color:"+this.btnPreColor+";'>"+(i+1)+"</li>"
	}
	ulStr+="</ul>;"
	$(this.boxId).append(ulStr);
	if(this.btnHasOrd==false){
		$(this.boxId+" ul li").html("");
		/*let sWidth=this.btnWidth/2+"px";
		let sHeight=this.btnHeight/2+"px";
		$(this.boxId+" ul li").css({"width":sWidth,"height":sHeight})
		*/
		/*for(let i=0;i<$(this.boxId+" ul li").length;i++){
			$(this.boxId+" ul li")[i].innerHTML="";
		}*/
	}
	let that=this;
	$(this.boxId+" ul li").mouseover(function(){
		that.goImg(this.getAttribute("ord"));
	});
	$(this.boxId+" ul li:first").css({"background":this.btnLightColor});
	$(this.boxId).mouseover(function(){		
		that.stop();
	});
	$(this.boxId).mouseout(function(){
		that.go();
	});	
}
Fade.prototype.go=function () {
	let that=this;
	this.timer=setInterval(function () {
		that.goStep();
	},this.timeSpace)
}
Fade.prototype.goStep=function () {
	this.currInOrd++;
	this.currOutOrd=this.currInOrd-1;
	if(this.currInOrd>this.imgArr.length){
		this.currInOrd=1;
	}
	if(this.currOutOrd>this.imgArr.length){
		this.currOutOrd=1;
	}
	this.fadeInOut();
	this.btnColorChange();
}
Fade.prototype.fadeInOut=function () {
	$(this.boxId+" img:eq("+(this.currInOrd-1)+")").fadeIn(this.fadeTimeSpace);
	$(this.boxId+" img:eq("+(this.currOutOrd-1)+")").fadeOut(this.fadeTimeSpace);	
}
Fade.prototype.btnColorChange=function () {
	$(this.boxId+" ul li:eq("+(this.currInOrd-1)+")")
	.css("background-color",this.btnLightColor)
	.siblings()
	.css("background-color",this.btnPreColor);
	
}
Fade.prototype.stop=function () {
	window.clearInterval(this.timer)
}
Fade.prototype.goImg=function (ord) {
	this.currOutOrd=this.currInOrd;
	this.currInOrd=ord;
	this.fadeInOut();
	this.btnColorChange();
}


});