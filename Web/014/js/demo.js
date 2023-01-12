var timer = null;
emp();
function emp() {
    timer = setInterval(function () {
        auto();
    },800)
}
$("img.gb").click(function () {
    $("#Tz_gray").show(); //显示
    $("#Music").get(0).play();

});
//点击颜色时，显示和隐藏
$("span.col").click(function () {
    $(".Con ul").toggle("slow");
});
//点击颜色时，更换颜色
$(".Con ul li").click(function () {
    var col = $(this).data("color");
    $("span.col font").css("background-color", col);
    $(this).addClass("xz").siblings().removeClass("xz"); //指定的加上 class="xz" 其它的移除
    $(".Con ul").toggle("slow"); //隐藏
});
//当我们抬起键盘时
var arr = [];
$('p.txt').blur(function () {
    emp();
})
$("p.txt").keyup(function (e) {
    clearInterval(timer);
    var col = $(".Con ul li.xz").data("color");
    var txt = "<span style='color:" + col + "'>" + $(this).text() + "</span>"; //获取输入框内容
    $(".Text").html(arr.join("").toString() + txt); //保证输入的内容同步
    //判断有没有按回车键
    //keyCode 的值为 13时，说明是回车键
    if (e.keyCode == 13) {
        //清空输入框内容
        $("p.txt").empty(); //清空
        arr.push("<P>" + txt + "</p>");
        var html = "";
        for (var i = 0; i < arr.length; i++) {
            html += arr[i];
        }
        $(".Text").html(html);
    }
    $('.but').click(function () {
        auto();
    })
    function auto(){
        $(".Text span").animate({
            opacity: 0.1
        }, 500, function () {
            $('.Text').find('span').empty()
            $('.Text').find('p').remove();
        })
        $("p.txt").empty();
    }
});
$(document).snowfall({
    flakeCount: 50
})