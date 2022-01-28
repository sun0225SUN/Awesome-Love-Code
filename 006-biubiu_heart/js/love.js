const blk_pitn = { //各小方块相对【自身中心】的位置 -- 【自身中心】确定为#div22的方块
        block1: [[0, 1], [0, 0], [-1, 0], [-1, -1]],
        block2: [[0, 1], [0, 0], [-1, 0], [0, -1]],
        block3: [[-1, 1], [0, 0], [-1, 0], [-1, -1]],
        block4: [[0, 1], [0, 0], [-1, 0], [-1, -1]], /* 1 */
        block5: [[-1, 1], [0, 0], [-1, 0], [0, -1]],
        block6: [[0, -1], [0, 0], [-1, 0], [1, -1]],
        block7: [[-1, -1], [0, 0], [-1, 0], [1, 0]],
        block8: [[-1, 1], [0, 0], [-1, 0], [-1, -1]], /* 3 */
        block9: [[0, -1], [0, 0], [-1, 0], [1, 0]],
        block10: [[-1, 1], [0, 0], [-1, 0], [1, 0]],
        block11: [[2, 0], [0, 0], [-1, 0], [1, 0]], /* — */
        block12: [[0, 1], [0, 0], [-1, 0], [0, -1]], /* 2 */
        block13: [[0, 1], [0, 0], [-1, 0], [-1, -1]], /* 1 */
        block14: [[1, 1], [0, 0], [-1, 0], [1, 0]],
        block15: [[1, -1], [0, 0], [-1, 0], [1, 0]],
        block16: [[-1, -1], [0, 0], [-1, 0], [1, 0]], /* 7 */
        block17: [[0, 1], [0, 0], [-1, 0], [0, -1]], /* 2 */
        block18: [[0, 1], [0, 0], [-1, 0], [-1, -1]], /* 1 */
        block19: [[0, -1], [0, 0], [-1, 0], [1, 0]], /* 9 */
        block20: [[1, -1], [0, 0], [-1, 0], [1, 0]],
        block21: [[0, 1], [0, 0], [-1, 0], [-1, -1]], /* 1 */
        block22: [[1, 1], [0, 0], [-1, 0], [1, 0]], /* 14 */
        block23: [[0, 2], [0, 0], [0, -1], [0, 1]]      /* | */
    },
    offset_pitn = { //各方块block相对【爱心中心】的位置
        block1: [5, 3],
        block2: [5, 1],
        block3: [3, 4],
        block4: [3, 2],
        block5: [3, -1],
        block6: [2, 5],
        block7: [2, 1],
        block8: [1, -1],
        block9: [1, -3],
        block10: [1, 2],
        block11: [0, 3],
        block12: [0, 0], /* 【爱心中心】*/
        block13: [-1, -4],
        block14: [0, -2],
        block15: [-2, 4],
        block16: [-2, 2],
        block17: [-2, 0],
        block18: [-3, -2],
        block19: [-4, 0],
        block20: [-3, 5],
        block21: [-5, 3],
        block22: [-4, 1],
        block23: [-6, 1]    /* 因动画需要移动一个方块，故y轴坐标-1*/
    };

let blocks = document.getElementsByClassName("block"),
    block = blocks[0],
    love = document.getElementsByClassName("love")[0],
    timer = null,
    index = 0,  //记录拼接爱心的动画步骤
    clone_block;    //用于克隆方块

//1.移动方块的【自身中心】到【爱心中心】
block.style.top = "50%";
block.style.left = "50%";
block.style.margin = "-20px 0 0 -20px";

const block_left = parseFloat(window.getComputedStyle(block, null).left.slice(0, -2)), //【爱心中心】 左边距离父元素的距离
    block_top = parseFloat(window.getComputedStyle(block, null).top.slice(0, -2));  //【爱心中心】 顶部距离父元素的距离

function Next() {
    if (++index >= 24) {
        clearInterval(timer);

        Rise();
        // alert("已经是最后一个了！");
        return;
    }

    block.style.visibility = "visible"; //升空动画前允许可见

    //2.移动方块到指定的位置-即是移动【自身中心】到目标位置
    block.style.left = block_left + 40 * offset_pitn["block" + index][0] + "px";
    block.style.top = block_top - 40 * offset_pitn["block" + index][1] + "px";
    for (let i = 0; i < block.children.length; i++) {
        // block.children[1].innerText = index;    //编号便于调试
        block.children[i].style.left = blk_pitn["block" + index][i][0] * -40 + "px";
        /* -40 是因为逻辑坐标和浏览器的x，y轴方向不一样*/
        block.children[i].style.top = blk_pitn["block" + index][i][1] * -40 + "px";
    }

    //3.克隆方块—保存现在的位置
    /* 一共会克隆23个方块，加上原先的一个方块block，共24个方块，即多出原先的block方块*/
    clone_block = block.cloneNode(true);
    love.appendChild(clone_block);

    if (love.children.length >= 24) {
        blocks[blocks.length - 1].children[2].style.display = "none"; //去掉多余的小方块
        block.style.display = "none";   //隐藏多出的block方块
    }
}

function Rise() {
    //4.爱心升高，多出的那个小方块开始掉落
    console.log("开始升空");
    let timer2 = null,
        distance = 0;
    /* 升高时，移动的距离*/
    const target = 120, /* 目标距离*/
        speed = 1;
    /*移动速度*/

    let love_top = parseFloat(window.getComputedStyle(love, null).top.slice(0, -2));  //爱心盒子距离屏幕顶部的距离


    timer2 = setInterval(() => {
        distance += speed;
        // console.log(distance);
        if (distance >= target) {
            clearInterval(timer2);

            console.log("升空完毕");

        }

        love.style.top = (love_top - distance) + "px";

    }, 22);

}

window.onload = function () {
    setTimeout(() => {

        timer = setInterval(() => {
            Next();
        }, 300);


    }, 12000);   //gif图播放完毕所需时间为11.73s
};
