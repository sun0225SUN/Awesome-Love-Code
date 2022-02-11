

        function init_onlyyou(){
            // 初始化两个div的高度
            $("#div_onlyyou").css({"height":$(window).height()+260+"px"});
            $("#div_oy_inner").css({"height":$(window).height()+260+"px"});

            // 设置自定义背景
            var start_bg_img=start_content['bg_img'];
            if(typeof(start_content['bg_style'])!='undefined' && start_content['bg_style']=='bg_custom'){
                if(typeof(start_bg_img)!='undefined' && start_bg_img!=''){
                    $("#div_onlyyou").css({"background-image": 'url('+start_bg_img+')'});
                }
            }


            if(typeof(start_content['chase_title'])!='undefined' && start_content['chase_title']!=''){
                $('.div_oy_text h1').html(start_content['chase_title']); //加载自定义内容
            }else{
                $('.div_oy_text h1').html('做我女朋友好不好'); //设置默认值
            }

            if(typeof(start_content['chase_text'])!='undefined' && start_content['chase_text']!=''){ 
                $('.div_oy_text .p_oy_text').html(start_content['chase_text']); //加载自定义内容
            }else{ //设置默认值
                $('.div_oy_text .p_oy_text').html('小可爱，我喜欢你好久了。不只是遇见你，即使只是想起你，都会让我小鹿突突地乱撞。我一定会好好地疼你，你做我女朋友好不好？');
            }
            
            // 设置正文之前的照片
            if(typeof(start_content['img_bool'])!='undefined' && start_content['img_bool']=='img_true'){ //如果设置了照片就显示
                if(typeof(start_content['img_src'])!='undefined' && start_content['img_src']!=''){
                    $(".img_oy_text").attr('src', start_content['img_src']);
                }
            } 
            if(typeof(start_content['img_bool'])=='undefined' || typeof(start_content['chase_text'])=='undefined'){
                var random_img=random_img_as();
                $(".img_oy_text").attr('src', random_img);
            }
        } 


        var array_oy_benefit; 
        //加载内容或设置默认值
        if(typeof(start_content['chase_benefit'])!='undefined'){
            array_oy_benefit=start_content['chase_benefit']; 
            // array_oy_benefit = array_oy_benefit.filter(function (s) {
            //     return s && s.trim(); // 去掉空值
            // }); //全空作品，但是却定义了key的情况
            if(array_oy_benefit[0]==''){
                array_oy_benefit[0]='我会把全部工资都给你';
            }
            if(array_oy_benefit[1]==''){
                array_oy_benefit[1]='每天做好吃的给你';
            }
            if(array_oy_benefit[2]==''){
                array_oy_benefit[2]='你睡不着时给你讲故事';
            }
            if(array_oy_benefit[3]==''){
                array_oy_benefit[3]='给你自由去做喜欢的事情';
            }            
        }else{
            array_oy_benefit=['我会把全部工资都给你','每天做好吃的给你','你睡不着时给你讲故事','给你自由去做喜欢的事情'];
        }
        console.log(array_oy_benefit); 
        var index_text_oy=0; 

        var count_text_oy=array_oy_benefit.length;
        console.log('一共有'+count_text_oy+'条件');
        function oy_show_benefit(){
            var oy_text_height=$(".div_oy_text").height();
            if(index_text_oy<count_text_oy){  
                console.log('now the index_benefit_oy is->'+index_text_oy);                
                console.log('now the benefit_oy is->'+array_oy_benefit[index_text_oy]);
                $(".li_oy_benefit").eq(index_text_oy).html(array_oy_benefit[index_text_oy]).show();
                if($(document).height()-oy_text_height<520){ //随着文字的增多，实时调整高度
                    $("#div_onlyyou").css({"height":$(document).height()+160+"px"});
                    $("#div_oy_inner").css({"height":$(document).height()+"px"});
                    console.log('update the document height +120');
                } 
                index_text_oy++;
            } else{
                oy_show_note();
            }
        }

        function oy_show_note(){
            $("#div_oy_note").show(); 
        }

        function oy_hide_note(){
            $("#div_oy_note").hide(); 
        }

        function oy_go_next(){  
            $("#div_oy_yes").show();
            setTimeout(function(){                
                $('#div_onlyyou').fadeOut();
                init_theme(); 
            },2000);
            setTimeout(function(){ 
                $('#div_onlyyou').remove();
            },3000);
        }



    function random_img_as(){  //获取随机的模板图片
        // console.log('random_img_as'); 
        var random_num=Math.floor(Math.random()*(array_as_pics_s.length)); //随机取值 
        var random_img=array_as_pics_s[random_num];
        return random_img;
    } 
