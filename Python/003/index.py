import turtle
import time
 
 
# 清屏函数
def clear_all():
    turtle.penup()
    turtle.goto(0, 0)
    turtle.color('white')
    turtle.pensize(800)
    turtle.pendown()
    turtle.setheading(0)
    turtle.fd(300)
    turtle.bk(600)
 
 
# 重定位海龟的位置
def go_to(x, y, state):
    turtle.pendown() if state else turtle.penup()
    turtle.goto(x, y)
 
 
# 画线
# state为真时海龟回到原点，为假时不回到原来的出发点
def draw_line(length, angle, state):
    turtle.pensize(1)
    turtle.pendown()
    turtle.setheading(angle)
    turtle.fd(length)
    turtle.bk(length) if state else turtle.penup()
    turtle.penup()
 
 
# 画箭羽
def draw_feather(size):
    angle = 30                          # 箭的倾角
    feather_num = size//6               # 羽毛的数量
    feather_length = size // 3          # 羽毛的长度
    feather_gap = size//10              # 羽毛的间隔
    for i in range(feather_num):
        draw_line(feather_gap, angle+180, False)            # 箭柄，不折返
        draw_line(feather_length, angle + 145, True)        # 羽翼，要折返
    draw_line(feather_length, angle + 145, False)
    draw_line(feather_num*feather_gap, angle, False)
    draw_line(feather_length, angle + 145 + 180, False)
    for i in range(feather_num):
        draw_line(feather_gap, angle+180, False)            # 箭柄，不折返
        draw_line(feather_length, angle - 145, True)        # 羽翼，要折返
    draw_line(feather_length, angle - 145, False)
    draw_line(feather_num*feather_gap, angle, False)
    draw_line(feather_length, angle - 145 + 180, False)
 
 
# 画爱心
def draw_heart(size):
    turtle.color('red', 'pink')
    turtle.pensize(2)
    turtle.pendown()
    turtle.setheading(150)
    turtle.begin_fill()
    turtle.fd(size)
    turtle.circle(size * -3.745, 45)
    turtle.circle(size * -1.431, 165)
    turtle.left(120)
    turtle.circle(size * -1.431, 165)
    turtle.circle(size * -3.745, 45)
    turtle.fd(size)
    turtle.end_fill()


def hart_arc():
    for i in range(200):
        turtle.right(1)
        turtle.forward(2)
 
# 画箭
def draw_arrow(size):
    angle = 30
    turtle.color('black')
    draw_feather(size)
    turtle.pensize(4)
    turtle.setheading(angle)
    turtle.pendown()
    turtle.fd(size*2)
 
 
# 一箭穿心
# 箭的头没有画出来，而是用海龟来代替
def arrow_heart(x, y, size):
    go_to(x, y, False)
    draw_heart(size*1.15)
    turtle.setheading(-150)
    turtle.penup()
    turtle.fd(size*2.2)
    draw_heart(size)
    turtle.penup()
    turtle.setheading(150)
    turtle.fd(size * 2.2)
    draw_arrow(size)
 
 
# 画出发射爱心的小人
def draw_people(x, y):
    turtle.penup()
    turtle.goto(x, y)
    turtle.pendown()
    turtle.pensize(2)
    turtle.color('black')
    turtle.setheading(0)
    turtle.circle(60, 360)
    turtle.penup()
    turtle.setheading(90)
    turtle.fd(75)
    turtle.setheading(180)
    turtle.fd(20)
    turtle.pensize(4)
    turtle.pendown()
    turtle.circle(2, 360)
    turtle.setheading(0)
    turtle.penup()
    turtle.fd(40)
    turtle.pensize(4)
    turtle.pendown()
    turtle.circle(-2, 360)
    turtle.penup()
    turtle.goto(x, y)
    turtle.setheading(-90)
    turtle.pendown()
    turtle.fd(20)
    turtle.setheading(0)
    turtle.fd(35)
    turtle.setheading(60)
    turtle.fd(10)
    turtle.penup()
    turtle.goto(x, y)
    turtle.setheading(-90)
    turtle.pendown()
    turtle.fd(40)
    turtle.setheading(0)
    turtle.fd(35)
    turtle.setheading(-60)
    turtle.fd(10)
    turtle.penup()
    turtle.goto(x, y)
    turtle.setheading(-90)
    turtle.pendown()
    turtle.fd(60)
    turtle.setheading(-135)
    turtle.fd(60)
    turtle.bk(60)
    turtle.setheading(-45)
    turtle.fd(30)
    turtle.setheading(-135)
    turtle.fd(35)
    turtle.penup()
 
 
# 第一个画面，显示文字
def page0():
    turtle.penup()
    turtle.goto(-350, 0)
    turtle.color('black')
    turtle.write('专属于我们的情人节', font=('宋体', 60, 'normal'))
    time.sleep(3)
 
 
# 第二个画面，显示发射爱心的小人
def page1():
    turtle.speed(10)
    draw_people(-250, 20)
    turtle.penup()
    turtle.goto(-150, -30)
    draw_heart(14)
    turtle.penup()
    turtle.goto(-20, -60)
    draw_heart(25)
    turtle.penup()
    turtle.goto(250, -100)
    draw_heart(45)
    turtle.hideturtle()
    time.sleep(3)
 
 
# 最后一个画面，一箭穿心
def page2():
    turtle.speed(1)
    turtle.penup()
    turtle.goto(-200, -200)
    turtle.color('blue')
    turtle.pendown()
    turtle.write('大笨蛋         小笨蛋', font=('wisdom', 50, 'normal'))
    turtle.penup()
    turtle.goto(0, -190)
    draw_heart(10)
    arrow_heart(20, -60, 51)
    turtle.showturtle()
 
 
def main():
    turtle.setup(900, 500)
    page0()
    clear_all()
    page1()
    clear_all()
    page2()
    turtle.done()
 
 
main()
