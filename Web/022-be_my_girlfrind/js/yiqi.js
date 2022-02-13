// JavaScript Document
var Dianji=0;
window.onload=function(){
	var buhao = document.getElementById("buhao");
	var hao = document.getElementById("hao");
	buhao.onclick=function(){
		Dianji++;
		if(Dianji==1){
	   			alert("能够遇见你");
	   }else if(Dianji==2){
		   		alert("对我来说是最大的幸福!");
		   		
	   }else if(Dianji==3){
		   		alert("有了你，我的生活变的无限宽广!");
		   		
	   }else if(Dianji==4){
		   		alert("有了你，世界变得如此迷人!");
		   		
	  }else if(Dianji==5){
		   		alert("你是世界，世界是你!");
	  }else if(Dianji==6){
		   		alert("我愿意用自己的心，好好的陪着你，爱着你。");
	  }else if(Dianji==7){
		   		alert("你考虑一下呗");
		  		Dianji=1;
	  }

	}
	hao.onclick=function(){
		alert("❤❤❤ 终于同意了，我爱你 ❤❤❤");
	}
	

}