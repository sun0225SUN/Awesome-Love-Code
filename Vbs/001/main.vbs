msgbox ("我有一件事想跟你说"),vbQuestion,("在吗？")
msgbox ("自从第一天遇见你，我便对你难以忘怀了！")
msgbox ("做我女朋友好吗？")
msgbox ("房产写你名字")
msgbox ("保大")
msgbox ("我妈会游泳")
dim j
do while j<1
Select Case msgbox("做我女朋友好吗？",68,"请郑重的回答我！")
Case 6 j=1
Case 7 msgbox("再给你一次机会")
end Select
loop
msgbox("我就知道你会同意的，哈哈哈哈！！")
