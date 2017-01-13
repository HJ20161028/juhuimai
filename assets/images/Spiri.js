$(document).ready(function(e) {					   
	 $(".loadFourth").delegate(".titieBox li", "mouseenter", 
    function(e) {
        var width = $(this).width(),
        $parents = $(this).parents(".contentThree"),
        $titieBox = $(this).parents(".titieBox"),
        index = $titieBox.find("li").index($(this)),
        opt = $(".optionsID"),
        $cont = $(".logoAll");
        if (index == 0) {
            opt.show();
        } else {
            opt.hide();
        }
        $titieBox.find("li").removeClass("on").eq(index).addClass("on");
        $parents.find(".titleSlider").stop().animate({
            "left": (width + 15) * index
        },
        300);
        $cont.hide().eq(index).show();
        $(".loadFourth .logoAll").eq(index).find("img").lazyload_index({
            effect: "show"
        });
    });
    $(".loadFourth").delegate(".logoAll a", "mouseenter", 
    function(e) {
        $(this).find("img").stop().animate({
            "margin-left": "-100px"
        },
        500);
    });
    $(".loadFourth").delegate(".logoAll a", "mouseleave", 
    function(e) {
        $(this).find("img").stop().animate({
            "margin-left": "0"
        },
        500);
    });
    var currentPage1 = 0;
    var countPage1;
    $(".loadFourth").delegate(".optionsID .nextPage", "click", 
    function(e) {
        countPage1 = $(".loadFourth .logoFirstbd ul").length;				
        currentPage1++;
        if (currentPage1 >= countPage1) {
            currentPage1 = countPage1 - 1;
            return false;
        }
        var sliderWidth = $(".logoFirst ul").width();
        $(".logoFirstbd").stop(true, true).animate({
            "margin-left": -sliderWidth * currentPage1
        },
        500);
    });
    $(".loadFourth").delegate(".optionsID .prevPage", "click", 
    function(e) {
        countPage1 = $(".loadFourth .logoFirstbd ul").length;
        currentPage1--;
        if (currentPage1 < 0) {
            currentPage1 = 0;
            return false;
        }
        var sliderWidth = $(".logoFirst ul").width();
        $(".logoFirstbd").stop(true, true).animate({
            "margin-left": -sliderWidth * currentPage1
        },
        500);
    });						   
/*******************************************************************/					   
  
   
});