$(function(){
	
	$(".help-side h4").click(function(){
		$(this).next().toggle();
		$(this).parent().toggleClass("current")
	})
})