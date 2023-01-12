//贵宾VIP系统，版权所有表白时刻.Com
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) return unescape(arr[2]);
    else return null;
}
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString()+";path=/";
}
function LoginExit() {
    delCookie("vip_username");
    delCookie("vip_password");
    alert("退出成功");
    window.history.go(0);
}

c_start = document.cookie.indexOf("vip_username=");
if (c_start != -1) {
    document.getElementById("login").innerHTML = "安全退出";
    document.getElementById("login").setAttribute("title", "★客户类型：贵宾会员\n★客户账号：" + getCookie("vip_username") + "\n★账户限期：永久无限期\n");
    document.getElementById("login").setAttribute("data-toggle", "");
    document.getElementById("login").setAttribute("data-target", "");
    document.getElementById("login").setAttribute("onclick", "LoginExit()");
}