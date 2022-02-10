//0.4.5
;(function($){
	$.fn.navs=function(o){
		this.each(function(){
			var th=$(this),
				data=th.data('navs'),
				_={
					enable:true,
					actCl:'active',
					changeEv:'change',
					indx:[],
					hshx:[],
					useHash:false,
					defHash:'#!/',
					emptyHash:'#',
					outerHash:false,
					autoPlay:false,
					blockSame:true,
					hover:true,
					contRetFalse:true,
					preFu:function(){						
						_.li.each(function(n){
							var th=$(this)
							_.indx[n]=th
							_.useHash
								&&(_.hshx[n]=$('a',th).attr('href'))
								&&location.hash==_.hshx[n]
									&&th.addClass(_.actCl)
						})						
					},
					rfrshFu:function(){
						_.prev=_.curr
						_.pren=_.n
						_.curr=false
						_.n=-1
						_.param='close'
						
						_.li.each(function(n){
							var th=$(this)
							if(th.hasClass(_.actCl))
								_.curr=th,
								_.n=n,
								_.href=$('a',th).attr('href'),
								_.param=_.useHash?_.href:_.n
						})						
					},
					markFu:function(){
						_.li.each(function(n){
							var th=$(this)
							_.n==n?_.hvrin(th):_.hvrout(th)
						})
					},
					hashFu:function(){
						$(window)
							.bind('hashchange',function(){
								if(location.hash==_.emptyHash||location.hash.length==0){
									location.hash=_.hash
									return false
								}
								_.prevHash=_.hash
								_.checkHashFu(_.outerHash=_.hash=location.hash)
							})
						$('a',_.li)
							.click(function(){
								if(!_.enable)
									return false
							})
					},
					checkHashFu:function(hash){
						if(hash==_.emptyHash||hash.length==0)
							location.hash=_.defHash
						if(hash=='#back')
							return _.backFu()
						if(hash=='#close')
							return _.closeFu()
						_.li.each(function(n){
							if(_.hshx[n]==_.hash)
								_.chngFu(n),
								_.outerHash=false
						})
						if(_.outerHash)							
							_.li.removeClass(_.actCl),
							_.rfrshFu(),
							_.markFu(),
							_.param=_.outerHash,
							_.me.trigger(_.changeEv)
					},
					cntrFu:function(){
						_.li.each(function(n){
							var th=$(this)
							$('a',th)
								.click(function(){
									_.chngFu(n)
									if(_.contRetFalse)
										return false
								})									
						})
					},
					autoPlayFu:function(){
						if(!_.autoPlay)
							return false
						if(_.int)
							clearInterval(_.int)
						_.int=setInterval(_.nextFu,_.autoPlay)
					},
					chngFu:function(n){
						if(!_.enable)
							return false
						if(n==_.n&&_.blockSame)
							return false						
						_.indx[n]
							&&_.li.removeClass(_.actCl)
							&&_.indx[n].addClass(_.actCl)
						_.rfrshFu()
						_.markFu()
						_.autoPlayFu()
						if(_.useHash&&location.hash!=_.hshx[_.n])
							location.hash=_.hshx[_.n]
							
						_.me.trigger(_.changeEv)
					},
					closeFu:function(){
						_.li.removeClass(_.actCl)
						_.rfrshFu()
						_.markFu()
						_.me.trigger(_.changeEv)
						location.hash=_.defHash
					},
					backFu:function(){
						_.chngFu(_.pren)
					},
					nextFu:function(){
						var n=_.n
						_.chngFu(++n<_.li.length?n:0)
					},
					prevFu:function(){
						var n=_.n
						_.chngFu(--n>=0?n:_.li.length-1)
					},
					customStr:function(str){
						//console.log(str)
					},
					init:function(){						
						_.li=$('>ul>li',_.me)
						_.preFu()
						_.rfrshFu()
						_.markFu()
						_.useHash
							?_.hashFu()
							:_.cntrFu()
						_.hoverFu()
						_.autoPlayFu()
						_.useHash
							&&_.checkHashFu(_.outerHash=_.hash=location.hash)
						_.li.hasClass(_.actCl)
							&&_.me.trigger(_.changeEv)
					},
					hoverFu:function(){
						_.li.each(function(n){
							var th=$(this)
							$('a',th)
								.bind('mouseenter',function(){
									if(_.enable)
										if(_.hover&&n!=_.n)
											_.hvrin(th)
								})
								.bind('mouseleave',function(){
									if(_.enable)
										if(_.hover&&n!=_.n)
											_.hvrout(th)
								})
						})
					},
					hvrin:function(el){
						_.hoverIn(el,_)
						_.hover=='sprites'
							&&$('a',el).sprites('hoverin')
					},
					hvrout:function(el){
						_.hoverOut(el,_)
						_.hover=='sprites'
							&&$('a',el).sprites('hoverout')
					},
					hoverIn:function(){},
					hoverOut:function(){},
					defFunc:function(){}
				}
				
			data?_=data:th.data({navs:_})
			typeof o=='object'&&$.extend(_,o)
			
			if(typeof o=='function')
				return th.bind(_.changeEv,function(){o(_.param,_);return false}).trigger(_.changeEv)
			
			_.me||_.init(_.me=th)
			
			typeof o=='number'&&_.chngFu(o)
			typeof o=='boolean'&&(_.enable=o)
			typeof o=='string'&&(o=='prev'||o=='next'||o=='close'||o=='back'?_[o+'Fu']():_.useHash?o.slice(0,3)=='#!/'&&(location.hash=o)||_.customStr(o):_.customStr(o))
		})
		return this
	}
	
	$.fn.tabs=function(o){
		return this.each(function(){
			var th=$(this)
				,_=th.data('tabs')||{
					enable:true,
					show:0,
					blockSame:true,
					changeEv:'change',
					empty:'#!/splash',
					preFu:function(){
						_.li.hide()
					},
					actFu:function(){
						_.prev
							&&_.prev.hide()
						_.curr
							&&_.curr.show()
					},
					navFu:function(s){						
						if(_.pres==s||s.slice(0,3)!='#!/')
							return false
						_.pres=s
						s==_.empty
							&&$.when(_.li).then(_.closeFu)
						_.li.each(function(n){
							$(this).attr('id')==s.slice(3)
								&&_.chngFu(n)
						})
					},
					chngFu:function(a){						
						if(!_.enable||(a==_.n&&_.blockSame)||a>=_.li.length)
							return false
						$.when(_.li)
							.then(function(){
								_.pren=_.n
								_.prev=_.curr
								_.curr=_.li.eq(_.n=a)
								_.actFu(_)
								_.me.trigger(_.changeEv)
							})
					},
					nextFu:function(){
						var n=_.n
						_.way=1
						_.chngFu(++n<_.li.length-_.show?n:0)
					},
					prevFu:function(){
						var n=_.n
						_.way=-1
						_.chngFu(--n>=0?n:_.li.length-1-_.show)						
					},
					closeFu:function(){						
						if(_.pres=='close')
							return false
						_.pren=_.n
						_.prev=_.curr
						_.n=-1
						_.curr=false
						_.pres='close'
						_.actFu(_)
					},
					backFu:function(){
						_.chngFu(_.pren)
					},
					init:function(){						
						_.ul=$('>ul',_.me)
						_.li=$('>li',_.ul)
						_.preFu(_)
						_.navs&&_.navs.navs(function(n){th.tabs(n)})
					}
				}
			
			if(typeof o=='object')
				_=$.extend(true,_,o)
			
			
			_.me||_.init(_.me=th.data({tabs:_}))
						
			typeof o=='function'&&_.me.bind(_.changeEv,function(){o(_.n,_);return false})
			typeof o=='boolean'&&(_.enable=o)
			typeof o=='number'&&_.chngFu(o)
			typeof o=='string'&&(o=='prev'||o=='next'||o=='close'||o=='back'?_[o+'Fu']():_.navFu(o))
		})		
	}	
})(jQuery)
