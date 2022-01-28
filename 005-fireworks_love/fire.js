var canvas = document.getElementById("cas");
var ocas = document.createElement("canvas");
var octx = ocas.getContext("2d");
var ctx = canvas.getContext("2d");
ocas.width = canvas.width = window.innerWidth;
ocas.height = canvas.height = window.innerHeight;
var bigbooms = [];

// window.onload = function() {
//     initAnimate();
// };

document.getElementById("iframMusic").onload = function(){
    var music = document.getElementById("music");
    music.src = 'music.mp3';
    music.oncanplay = function(){
        music.play();
    };
};

function initAnimate() {
    drawBg();
    lastTime = new Date();
    animate()
}
var lastTime;
function animate() {
    ctx.save();
    ctx.fillStyle = "rgba(0,5,24,0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    var newTime = new Date();
    if (newTime - lastTime > 500 + (window.innerHeight - 767) / 2) {
        var random = Math.random() * 100 > 33 ? true: false;
        var x = getRandom(canvas.width / 5, canvas.width * 4 / 5);
        var y = getRandom(50, 200);
        if (random) {
            var bigboom = new Boom(getRandom(canvas.width / 3, canvas.width * 2 / 3), 2, "#FFF", {
                x: x,
                y: y
            });
            bigbooms.push(bigboom)
        } else {
            var bigboom = new Boom(getRandom(canvas.width / 3, canvas.width * 2 / 3), 2, "#FFF", {
                    x: canvas.width / 2,
                    y: 200
                },
                document.querySelectorAll(".shape")[parseInt(getRandom(0, document.querySelectorAll(".shape").length))]);
            bigbooms.push(bigboom)
        }
        lastTime = newTime;
        console.log(bigbooms)
    }
    stars.foreach(function() {
        this.paint()
    });
    drawMoon();
    bigbooms.foreach(function(index) {
        var that = this;
        if (!this.dead) {
            this._move();
            this._drawLight()
        } else {
            this.booms.foreach(function(index) {
                if (!this.dead) {
                    this.moveTo(index)
                } else {
                    if (index === that.booms.length - 1) {
                        bigbooms[bigbooms.indexOf(that)] = null
                    }
                }
            })
        }
    });
    raf(animate)
}
function drawMoon() {
    var moon = document.getElementById("moon");
    var centerX = canvas.width - 200,
        centerY = 100,
        width = 80;
    if (moon.complete) {
        ctx.drawImage(moon, centerX, centerY, width, width)
    } else {
        moon.onload = function() {
            ctx.drawImage(moon, centerX, centerY, width, width)
        }
    }
    var index = 0;
    for (var i = 0; i < 10; i++) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX + width / 2, centerY + width / 2, width / 2 + index, 0, 2 * Math.PI);
        ctx.fillStyle = "rgba(240,219,120,0.005)";
        index += 2;
        ctx.fill();
        ctx.restore()
    }
}
Array.prototype.foreach = function(callback) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] !== null) {
            callback.apply(this[i], [i])
        }
    }
};
var raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 1000 / 60)
    };
canvas.onclick = function() {
    var x = event.clientX;
    var y = event.clientY;
    var bigboom = new Boom(getRandom(canvas.width / 3, canvas.width * 2 / 3), 2, "#FFF", {
        x: x,
        y: y
    });
    bigbooms.push(bigboom)
};
var Boom = function(x, r, c, boomArea, shape) {
    this.booms = [];
    this.x = x;
    this.y = (canvas.height + r);
    this.r = r;
    this.c = c;
    this.shape = shape || false;
    this.boomArea = boomArea;
    this.theta = 0;
    this.dead = false;
    this.ba = parseInt(getRandom(80, 200))
};
Boom.prototype = {
    _paint: function() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = this.c;
        ctx.fill();
        ctx.restore()
    },
    _move: function() {
        var dx = this.boomArea.x - this.x,
            dy = this.boomArea.y - this.y;
        this.x = this.x + dx * 0.01;
        this.y = this.y + dy * 0.01;
        if (Math.abs(dx) <= this.ba && Math.abs(dy) <= this.ba) {
            if (this.shape) {
                this._shapBoom()
            } else {
                this._boom()
            }
            this.dead = true
        } else {
            this._paint()
        }
    },
    _drawLight: function() {
        ctx.save();
        ctx.fillStyle = "rgba(255,228,150,0.3)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r + 3 * Math.random() + 1, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore()
    },
    _boom: function() {
        var fragNum = getRandom(30, 200);
        var style = getRandom(0, 10) >= 5 ? 1 : 2;
        var color;
        if (style === 1) {
            color = {
                a: parseInt(getRandom(128, 255)),
                b: parseInt(getRandom(128, 255)),
                c: parseInt(getRandom(128, 255))
            }
        }
        var fanwei = parseInt(getRandom(300, 400));
        for (var i = 0; i < fragNum; i++) {
            if (style === 2) {
                color = {
                    a: parseInt(getRandom(128, 255)),
                    b: parseInt(getRandom(128, 255)),
                    c: parseInt(getRandom(128, 255))
                }
            }
            var a = getRandom( - Math.PI, Math.PI);
            var x = getRandom(0, fanwei) * Math.cos(a) + this.x;
            var y = getRandom(0, fanwei) * Math.sin(a) + this.y;
            var radius = getRandom(0, 2);
            var frag = new Frag(this.x, this.y, radius, color, x, y);
            this.booms.push(frag)
        }
    },
    _shapBoom: function() {
        var that = this;
        putValue(ocas, octx, this.shape, 5,
            function(dots) {
                var dx = canvas.width / 2 - that.x;
                var dy = canvas.height / 2 - that.y;
                for (var i = 0; i < dots.length; i++) {
                    color = {
                        a: dots[i].a,
                        b: dots[i].b,
                        c: dots[i].c
                    };
                    var x = dots[i].x;
                    var y = dots[i].y;
                    var radius = 1;
                    var frag = new Frag(that.x, that.y, radius, color, x - dx, y - dy);
                    that.booms.push(frag)
                }
            })
    }
};
function putValue(canvas, context, ele, dr, callback) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    var img = new Image();
    if (ele.innerHTML.indexOf("img") >= 0) {
        img.src = ele.getElementsByTagName("img")[0].src;
        imgload(img,
            function() {
                context.drawImage(img, canvas.width / 2 - img.width / 2, canvas.height / 2 - img.width / 2);
                dots = getimgData(canvas, context, dr);
                callback(dots)
            })
    } else {
        var text = ele.innerHTML;
        context.save();
        var fontSize = 200;
        context.font = fontSize + "px 宋体 bold";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle = "rgba(" + parseInt(getRandom(128, 255)) + "," + parseInt(getRandom(128, 255)) + "," + parseInt(getRandom(128, 255)) + " , 1)";
        context.fillText(text, canvas.width / 2, canvas.height / 2);
        context.restore();
        dots = getimgData(canvas, context, dr);
        callback(dots)
    }
}
function imgload(img, callback) {
    if (img.complete) {
        callback.call(img)
    } else {
        img.onload = function() {
            callback.call(this)
        }
    }
}
function getimgData(canvas, context, dr) {
    var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
    context.clearRect(0, 0, canvas.width, canvas.height);
    var dots = [];
    for (var x = 0; x < imgData.width; x += dr) {
        for (var y = 0; y < imgData.height; y += dr) {
            var i = (y * imgData.width + x) * 4;
            if (imgData.data[i + 3] > 128) {
                var dot = {
                    x: x,
                    y: y,
                    a: imgData.data[i],
                    b: imgData.data[i + 1],
                    c: imgData.data[i + 2]
                };
                dots.push(dot)
            }
        }
    }
    return dots
}
function getRandom(a, b) {
    return Math.random() * (b - a) + a
}
var maxRadius = 1,
    stars = [];
function drawBg() {
    for (var i = 0; i < 100; i++) {
        var r = Math.random() * maxRadius;
        var x = Math.random() * canvas.width;
        var y = Math.random() * 2 * canvas.height - canvas.height;
        var star = new Star(x, y, r);
        stars.push(star);
        star.paint()
    }
}
var Star = function(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r
};
Star.prototype = {
    paint: function() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = "rgba(255,255,255," + this.r + ")";
        ctx.fill();
        ctx.restore()
    }
};
var focallength = 250;
var Frag = function(centerX, centerY, radius, color, tx, ty) {
    this.tx = tx;
    this.ty = ty;
    this.x = centerX;
    this.y = centerY;
    this.dead = false;
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = radius;
    this.color = color
};
Frag.prototype = {
    paint: function() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = "rgba(" + this.color.a + "," + this.color.b + "," + this.color.c + ",1)";
        ctx.fill();
        ctx.restore()
    },
    moveTo: function(index) {
        this.ty = this.ty + 0.3;
        var dx = this.tx - this.x,
            dy = this.ty - this.y;
        this.x = Math.abs(dx) < 0.1 ? this.tx: (this.x + dx * 0.1);
        this.y = Math.abs(dy) < 0.1 ? this.ty: (this.y + dy * 0.1);
        if (dx === 0 && Math.abs(dy) <= 80) {
            this.dead = true
        }
        this.paint()
    }
};