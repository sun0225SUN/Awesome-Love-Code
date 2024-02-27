$(function() {
    $('#yes').click(function(event) {
        modal('我就知道小宝宝一定会愿意~(^_^)', function() {
            $('.page_one').addClass('hide');
            $('.page_two').removeClass('hide');
            // typeWrite();
            fireworks();

        });
    });
    $('#no').click(function(event) {
        modal('明人不说暗话！', A);
    });
});

function A() {
    modal('我爱你！', B);
}

function B() {
    modal('我知道你在等我这一句话', C);
}

function C() {
    modal('请宝宝不要拒绝我嘛~', D);
}

function D() {
    modal('拒绝我，不存在的', E);
}

function E() {
    modal('这辈子都不可能让你离开我的!!!', F);
}

function F() {
    modal('跟我走吧宝宝~', G);
}

function G() {
    modal('房产证上写你的名字', H);
}

function H() {
    modal('我会做饭', I);
}
 function I() {
    modal('我会买很多东西给你', J)
}
function I() {
    modal('会好好疼你', J)
}
function I() {
    modal('会哄你睡觉', J)
}
function I() {
    modal('会唱歌给你听', J)
}
function I() {
    modal('爱你。么么哒！', J)
}

function J() {
    modal('行，我们去民政局登记吧', function() {
        fireworks();
    });
}

function fireworks() {
    $('.page_one').addClass('hide');
    initAnimate();
}

function modal(content, callback) {
    var tpl = '<div class="container">'+
        '<div class="mask"></div>'+
        '<div class="modal">'+
        '<p>'+ content +'</p>'+
        '<button type="button" id="confirm" class="confirm">确定</button>'+
        '</div>'+
        '</div>';
    $('body').append(tpl);
    $(document).on('click', '.confirm', function() {
        $('.container').remove();
        callback();
    });
}
