        var audio_music=document.getElementById('audio_music'); 
        var audio_record=document.getElementById('audio_record'); 
        
        if(typeof(music_json['music_select'])!='undefined' && music_json['music_select']!='null' && music_json['music_select']!=''){
            if(music_json['music_select']=='m_online' && music_json['m_online_url']!='null' && music_json['m_online_url']!=''){ //选择在线列表
                $('#audio_music').attr('src',music_json['m_online_url']);
            }
            if(music_json['music_select']=='m_upload' && music_json['m_upload_url']!='null' && music_json['m_upload_url']!=''){ //选择在线列表并且上传了歌曲
                $('#audio_music').attr('src',music_json['m_upload_url']);
            }
            if(music_json['music_select']=='m_upload' && (music_json['m_upload_url']=='null' || music_json['m_upload_url']=='')){ //选择在线列表但是没有上传歌曲
                console.log('music_select m_upload but m_upload_url is null, set defaulted music');
                var random_music=random_music_as();
                $('#audio_music').attr('src',random_music);
            }
            if(theme!='audio_list' || (theme=='audio_list' && start_id!='null')){
                audio_music.play(); //触发音乐自动播放
            }else{
                audio_music.pause();
                console.log('audio_list && no start');
            }
        }else{ //全新作品或空作品
            console.log('set random music');
            var random_music=random_music_as();
            $('#audio_music').attr('src',random_music);
            if(theme!='audio_list' || (theme=='audio_list' && start_id!='null')){
                audio_music.play(); //触发音乐自动播放
            }else{
                audio_music.pause();
                console.log('audio_list && no start');
            }
        }

        if(typeof(record_json['record_bool'])!='undefined' && record_json['record_bool']!='null' && record_json['record_bool']!=''){
            if(record_json['record_bool']=='r_true' && record_json['r_wechat_url']!='null' && record_json['r_wechat_url']!=''){ //选择要语音
                $('#audio_record').attr('src',record_json['r_wechat_url']);
            }
            if(record_json['record_bool']=='r_true' && (record_json['r_wechat_url']=='null' || record_json['r_wechat_url']=='')){ //选择要语音，但却没有录语音
                $('#div_record').hide(); //不显示
                $('#div_record_tips').hide();
            }
            if(record_json['record_bool']=='r_false'){ //如果不要语音则不显示
                $('#div_record').hide();
                $('#div_record_tips').hide();
            }
        }else{
            if(theme_content['bool_save']==false){ //全新作品或未保存内容，且未定义语音
                console.log('set random record');
                $('#audio_record').attr('src','http://cdn.aitetu520.com/chongqin_shenlin.mp3');
            }else{ //非全新作品或已保存内容，但未定义语音，则不显示语音
                $('#div_record').hide();
                $('#div_record_tips').hide();
            }
        }



        function random_music_as(){  //获取随机的模板图片
            // console.log('random_words_as'); 
            var random_num=Math.floor(Math.random()*(array_as_music.length)); //随机取值 
            var random_music=array_as_music[random_num];
            return random_music;
        }

        //控制音乐切换播放暂停 
        var img_music=document.getElementById('img_music');
        var timeout_music;
        function music_switch(){ //切换   
            clearTimeout(timeout_music);  
            if(audio_music.paused){
                console.log('switch music to play');
                audio_music.play();
                audio_record.pause(); //播放音乐时录音一定暂停                
                img_music.style.webkitAnimation="music_play_rotate 1s linear infinite";
                $(".div_music_tips").html("正播放").show();                
                timeout_music=setTimeout(function(){$(".div_music_tips").hide()}, 2500);
            }else{
                console.log('switch music to paused'); 
                audio_music.pause();
                // audio_record.play(); //
                img_music.style.webkitAnimation="";
                $(".div_music_tips").html("已暂停").show();  
                timeout_music=setTimeout(function(){$(".div_music_tips").hide()}, 2500); 
            } 
        }

        var timeout_record;
        var div_record=document.getElementById('div_record');
        function record_switch(){ //切换 
            clearTimeout(timeout_record);
            if(audio_record.paused){
                console.log('switch record to play'); 
                audio_record.play();
                audio_music.pause(); //
                img_music.style.webkitAnimation="";
                div_record.style.webkitAnimation="btn_rotate 1s linear infinite";
                $(".div_record_tips").html("正播放").show(); 
                timeout_record=setTimeout(function(){$(".div_record_tips").hide()}, 2500);
            }else{
                console.log('switch record to pause');  
                audio_record.pause(); //播放音乐时录音一定暂停
                audio_music.play();                
                img_music.style.webkitAnimation="music_play_rotate 1s linear infinite";
                div_record.style.webkitAnimation="";
                $(".div_record_tips").html("已暂停").show();  
                timeout_record=setTimeout(function(){$(".div_record_tips").hide()}, 2500); 
            } 
        }



       

        wx.ready(function(){
            console.log('wx.ready success to start');
            audio_music.play(); //触发音乐自动播放
            wx.checkJsApi({
                jsApiList: ['updateAppMessageShareData','updateTimelineShareData'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                success: function(res) {
                    console.log('wx.checkJsApi success');
                    if(theme!='audio_list' || (theme=='audio_list' && start_id!='null')){
                        audio_music.play(); //触发音乐自动播放
                    }else{
                        audio_music.pause();
                        console.log('audio_list && no start');
                    }
                },
                complete: function(res) {
                    console.log('wx.checkJsApi complete');
                    if(theme!='audio_list' || (theme=='audio_list' && start_id!='null')){
                        audio_music.play(); //触发音乐自动播放
                    }else{
                        audio_music.pause();
                        console.log('audio_list && no start');
                    }
                }
            });
        });

        wx.error(function(res){
            console.log('wx.error -> '+res);
            audio_music.play();  
            wx.checkJsApi({
                jsApiList: ['updateAppMessageShareData','updateTimelineShareData'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                success: function(res) {
                    console.log('wx.checkJsApi success');
                    if(theme!='audio_list' || (theme=='audio_list' && start_id!='null')){
                        audio_music.play(); //触发音乐自动播放
                    }else{
                        audio_music.pause();
                        console.log('audio_list && no start');
                    }
                },
                complete: function(res) {
                    console.log('wx.checkJsApi complete');
                    if(theme!='audio_list' || (theme=='audio_list' && start_id!='null')){
                        audio_music.play(); //触发音乐自动播放
                    }else{
                        audio_music.pause();
                        console.log('audio_list && no start');
                    }
                }
            });                  
        });

        

        


        