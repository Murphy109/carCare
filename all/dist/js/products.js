require(["jquery-1.8.3.min"], function (){
	$(function  () {
		$(".top").load("publicTop.html",function () {
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
		
		});
		$(".bottom").load("publicBottom.html",function  () {
			$(".toTop").click(function () {
			    var speed=1000;//滑动的速度
			    $('body,html').animate({scrollTop: 0}, speed);
			    return false;
			});
		});
		
	})
	
})