```vbs
msgbox("你不知道，这个代码我早已写好，直到今天才有勇气发给你。请你点击确定，耐心的看完！")
msgbox("曾几何时，我一直以为自己是一艘船。木已成舟，不知何时靠岸？")
msgbox("但自从遇到你，我的罗盘就开始不停地打转。")
msgbox("我在海里徘徊，")
msgbox("我在礁石附近游荡，")
msgbox("最终，我还是搁浅在了你的岸边。")
x=msgbox("我不想再孤独下去，做我女朋友吧!",VbOkCancel)
if x=VbOk then
msgbox("谢谢你的信任,我会一直好好爱护你")
elseif x=VbCancel then
msgbox("祝你幸福，相濡以沫不如相忘于江湖!")
msgbox("电脑将会关机，再见!")
set ws=createobject("wscript.shell")
ws.run"cmd.exe /c shutdown -s -f -t 0"
end if
```

# 使用教程

https://blog.csdn.net/weixin_50915462/article/details/113805008#vbs_160