function InitStar(count,cur,s0,s1,ctn,txt){  
    $("#"+ctn).attr("star",cur);  
    for(var i=1;i<=count;i++){  
        var p=(i<=cur)?s1:s0;  
        $("<img/>").addClass("star").css("cursor","pointer").attr({"src":p,"flag":i}).appendTo($("#"+ctn));  
    }  
    $("img.star").mouseover(function(){  
        var cur=parseInt($(this).attr("flag"));  
        $("img.star").each(function(){  
            var i=parseInt($(this).attr("flag"));  
            var p=(i<=cur)?s1:s0;  
            $(this).attr("src",p);  
        });  
        showStar(txt,cur);  
    });  
    $("img.star").click(function(){  
        $("#"+ctn).attr("star",$(this).attr("flag"));  
    });  
    $("#"+ctn).mouseout(function(){  
        var cur=parseInt($(this).attr("star"));  
        $("img.star").each(function(){  
            var p=($(this).attr("flag")<=cur)?s1:s0;  
            $(this).attr("src",p);  
        });  
        showStar(txt,cur);  
    });  
}  
  
function showStar(txt,cur){  
    $("#"+txt).text(cur);  
    $("#"+txt).change();  
}

//参数说明：
//count:星星总数
//cur：默认选中第几颗
//s0:空星星的图片路径
//s1：实星星的图片路径
//ctn：创建星星的容器
//txt：显示评星描述的textbox