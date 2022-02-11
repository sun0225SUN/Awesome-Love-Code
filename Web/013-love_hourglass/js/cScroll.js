(function($){
	$.fn.extend({
		cScroll:function(opt){
			if(opt===undefined)
				opt={}
			var th=this
			th.each(function(){
				var th=$(this),
					data=th.data('cScroll'),
					_={
						step:'80px',
						duration:150,
						sleep:150,
						easing:'swing',
						pasta:'<div></div>',
						trackCl:'_track',
						upButtonCl:'_up-butt',
						downButtonCl:'_down-butt',
						shuttleCl:'_shuttle',
						paddingTop:0,
						paddingBottom:0,
						preFu:function(){
							if(_.me.css('position')=='static')
								_.me.css({position:'relative',zIndex:1})
							if(_.me.css('zIndex')=='auto')
								_.me.css({zIndex:1})
							_.me.css({overflow:'hidden'})
							_.hH=_.me.height()
							_.hW=_.me.width()
							_.val=0
							_.step=parseInt(_.step)

							_.track=$(_.pasta)
							
							
							
							_.track
								.addClass(_.trackCl)
								.appendTo(_.me.parent())

							_.altTop=_.track.css('top')=='auto'?false:true
							_.altLeft=_.track.css('left')=='auto'?false:true
							_.altHeight=(_.height=parseInt(_.track.css('height')))==0?false:true
							_.paddingTop=parseInt(_.track.css('paddingTop'))
							_.paddingBottom=parseInt(_.track.css('paddingBottom'))
							
							_.track
								.css({
									position:'absolute',
									zIndex:2,
									padding:0
								})
							_.width=_.track.width()
							if(!_.altLeft)
								_.track.css({left:_.me.prop('offsetLeft')+_.me.outerWidth()-_.width})
							if(!_.altTop)
								_.track.css({top:_.me.prop('offsetTop')})
									
							
							
							_.track.slider({
								min:1,max:100,value:100,
								orientation: "vertical",
								slide:function(e,ui){
									_.shuttle
										.css({
											top:(100-ui.value)+'%'
										})
									_.me.prop({scrollTop:(100-ui.value)*_.delta/100})
								},
								change:function(e,ui){
									_.val=(100-ui.value)*_.delta/99
								}
							})
							
							_.shuttle=$(_.pasta)
							_.shuttle
								.appendTo(_.track)
								.addClass(_.shuttleCl)
								.css({
									marginTop:-_.shuttle.height()/2+1,
									cursor:'pointer',
									position:'absolute'
								})
							if(!_.shuttle.height())
								_.shuttle.height(_.width)
							_.sH=_.shuttle.height()
							_.track
								.css({
									top:parseInt(_.track.css('top'))+_.sH/2+_.paddingTop,
									bottom:parseInt(_.track.css('bottom'))+_.sH/2+_.paddingBottom,
									height:!_.altHeight?_.hH-_.sH:_.track.height()-_.sH-_.paddingBottom-_.paddingTop,
									width:_.track.width()
								})
							_.trackBG=$(_.pasta)
								.appendTo(_.me.parent())
								.css({
									width:_.width,
									height:_.height,
									position:'absolute',
									left:_.track.css('left'),
									top:parseInt(_.track.css('top'))-_.sH/2+1-_.paddingTop,
									backgroundColor:_.track.css('backgroundColor'),
									backgroundImage:_.track.css('backgroundImage'),
									backgroundPosition:_.track.css('backgroundPosition'),
									backgroundRepeat:_.track.css('backgroundRepeat')
								})
							_.track.css('background','none')
								
							_.delta=_.me.prop('scrollHeight')-_.hH
							
							_.upBu=$(_.pasta)
								.appendTo(_.trackBG)
								.addClass(_.upButtonCl)
								.css({
									position:'absolute',
									width:_.width,
									height:_.width,
									left:0,
									top:0,
									cursor:'pointer',
									zIndex:3
								})
								.click(function(){
									_.upFu()
								})
							_.downBu=$(_.pasta)
								.appendTo(_.trackBG)
								.addClass(_.downButtonCl)
								.css({
									position:'absolute',
									width:_.width,
									height:_.width,
									left:0,
									bottom:0,
									cursor:'pointer',
									zIndex:3
								})
								.click(function(){
									_.downFu()
								})
						},
						scrollFu:function(n){
							if(!_.b)
								return false
							_.b=false
							_.val+=n
							_.val=_.val<0?0:_.val
							_.val=_.val<=_.delta?_.val:_.delta
							
							_.me
								.stop()
								.animate({
									scrollTop:_.val
								},{
									duration:_.duration,
									easing:_.easing,
									step:function(now){
										var v=100-now/_.delta*100
										_.track.slider({value:v})
										_.shuttle.css({top:(100-v)+'%'})
								},
									complete:function(){
										_.val=_.me.prop('scrollTop')
									}
								})
							setTimeout(function(){
								_.b=true
							},_.sleep)
						},
						downFu:function(){
							_.scrollFu(_.step)
						},
						upFu:function(){
							_.scrollFu(-_.step)
						},
						wheelFu:function(){
							_.b=true
							_.me.add(_.track)
								.bind('mousewheel',function(e,d){
									if(d<0)
										_.downFu()							
									else
										_.upFu()
									return false
								})
						},
						init:function(){
							_.me=this
							_.preFu()
							if($.fn.mousewheel)
								_.wheelFu()
						}
					}
				if(!data)
					(typeof opt=='object'?$.extend(_,opt):_).init.call(th),
					th.data({cScroll:_}),
					data=_
				else
					_=typeof opt=='object'?$.extend(data,opt):data
			})
			return th
		}
	})	
})(jQuery)