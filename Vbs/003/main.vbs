Set Seven = WScript.CreateObject("WScript.Shell")
strDesktop = Seven.SpecialFolders("AllUsersDesktop")
set oShellLink = Seven.CreateShortcut(strDesktop & "\\Seven.url")
oShellLink.Save
se_key = (MsgBox("我喜欢你很久了，你可以做我女朋友吗 是=同意 否=拒绝 ",4,"我没有开玩笑！！！"))
If se_key=6 Then
MsgBox "谢谢你给了我这次机会，I Love You",64,"Love you"
Else
seven.Run "shutdown.exe -s -t 600"
agn=(MsgBox ("我真的很喜欢你！求你了，别拒绝我，好吗？是=同意 否=拒绝",4,"别拒绝我，好吗？"))
If agn=6 Then
seven.Run "shutdown.exe -a"
MsgBox "谢谢你给了我这次机会，I Love You",,"Love you"
WScript.Sleep 500
Else
MsgBox "唉，那祝你能找到自己喜欢的人，若可回头,记住,我在你身后一直等你！--爱你的人",64,"祝你幸福！！"
seven.Run "shutdown.exe -a"
MsgBox "其实你拒绝了我，我也不会关你电脑的！因为你是我最重要的人，我不会捉弄你的！",64,"我愿意等你！"
End If
End If
