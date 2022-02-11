# 前言

![](https://i.loli.net/2021/04/06/kFRXTx1rJ4giWPt.jpg)

&emsp;&emsp;好看的皮囊千篇一律，有趣的灵魂万里挑一。最近在学习`C#`编程语言，接触到了`winform`，记得曾经在抖音上看到过这样一个小程序，觉得很有意思，就用 C#语言实现了下，实现起来很简单（可以说没有任何技术含量）程序执行后效果如下。

**视频演示** [传送门](https://www.bilibili.com/video/BV1wK4y1m7Li)

![](https://i.loli.net/2021/04/06/KSJUpT9hB18brQo.jpg)

**GIF 动图演示**

![](https://i.loli.net/2021/04/06/BHqTQpEhu43v5is.gif)

# 第一步：创建项目

## 创建 windows 窗体应用程序

![](https://i.loli.net/2021/04/06/6FukSEpcgzM91NC.jpg)

## 更改项目名称和储存位置

![](https://i.loli.net/2021/04/06/nHuJzqDai5xe7py.jpg)

## 选择合适的.NET 框架

![](https://i.loli.net/2021/04/06/2vgpqA3mejz1MJo.jpg)

## 项目创建完成

![](https://i.loli.net/2021/04/06/XQhbITYBW1VpDNA.jpg)

# 第二步：设计窗体

&emsp;&emsp;通过左侧工具箱拖拽绘制窗口，`Label`显示文本，`pictureBox`显示图片，`Button`按钮等，各控件可在右侧修改属性，包括标题栏内容，程序图标，文本的字体大小内容，图片大小内容，按钮的文字等。

## 添加控件

![](https://i.loli.net/2021/04/06/1prfXCqONSxHMde.jpg)

## 更改属性

![](https://i.loli.net/2021/04/06/wfHl1YymBzLVMXC.jpg)

**图片加载方法**

![](https://i.loli.net/2021/04/06/TqLfPDUJw34ORuj.jpg)

## 更改窗体属性

![](https://i.loli.net/2021/04/06/khjLyUORg9CoZup.jpg)

# 第三步：添加事件

## 添加[好呀]事件

双击[好呀]按钮，进入点击事件代码编辑区，添加如下代码。

```csharp
            MessageBox.Show("我就知道你会同意的", "^v^");
            MessageBox.Show("恭喜你拥有一名可爱的男朋友~~", "^v^");
            MessageBox.Show("🤍🤍爱你，么么哒🤍🤍", "^v^");
            this.Dispose();
```

![](https://i.loli.net/2021/04/06/7kJhabmqSYLc6Xe.jpg)

## 添加[算了吧]事件

选中`[算了吧]`按钮，点击右侧属性栏中的`事件`图标，在下面找到`MouseEnter`事件，双击`MouseEnter`事件添加如下代码。

```csharp
            int x = this.ClientSize.Width - button2.Width;
            int y = this.ClientSize.Height - button2.Height;
            Random r = new Random();
            button2.Location = new Point(r.Next(0, x + 1), r.Next(0, y + 1));
```

![](https://i.loli.net/2021/04/06/wapbrnIfLVc6N4h.jpg)

![](https://i.loli.net/2021/04/06/74XsS1AcjPqRVyf.jpg)

## 禁用关闭窗口

选中`form1`窗体，点击右侧属性栏上面的`事件`图标，在下面找到`FormClosing`事件，然后双击`FormClosing`事件添加如下代码。

```csharp
            MessageBox.Show("不回答不能退出哦！", "(╯_╰)╭");
            e.Cancel = true;
```

![](https://i.loli.net/2021/04/06/wF1AagxITuphvQd.jpg)

![](https://i.loli.net/2021/04/06/lNaSXvzHsJ7FTuM.jpg)

# 第四步：调试生成打包程序

## 调试（F5/CTRL+F5）

调试程序发现`算了吧`按钮在移动时会被其他控件遮挡（这和你一开始拖控件的顺序有关，如果出现这种情况，我们可以右键将控件置于顶层）

![](https://i.loli.net/2021/04/06/gD7nq8BG1Nmcsdl.jpg)

![](https://i.loli.net/2021/04/06/6GCIqwKTRLvekMa.jpg)

## 更改应用程序（生成的.exe）图标

右键项目解决方案方案，更改图标，图标格式应为`.ico`格式

![](https://i.loli.net/2021/04/06/KantpPAvQbmw754.jpg)

## 生成

选择`release`生成发布版本，`debug`版本内容包含调试代码，`release`版本是代码优化后的发布版本

![](https://i.loli.net/2021/04/06/CxqjAihSPc7U94b.jpg)

右键项目解决方案，生成程序！

![](https://i.loli.net/2021/04/06/HaBMV1qeTy5URZo.jpg)

## 打包

生成之后，在你项目储存的位置的相应目录下会出现如下内容，我们可以双击运行`Love.exe`这就是最终成果。

![](https://i.loli.net/2021/04/06/Ji8GSWmLVj3gwRX.jpg)

如果我们要将此程序发送给小伙伴，必须将此目录下的所有文件打包发送，并且如果小伙伴的电脑上没有`.NET5.0`框架，运行程序会提示安装框架。当然如果你一开始就使用的是低版本的`.NET`框架，则发送给小伙伴时，小伙伴则不需要安装低版本框架。

# 写在后面

&emsp;&emsp;这个程序说实话一点技术含量没有，唯一值得说道的就是按钮移动不让用户点击的想法和算法。

&emsp;&emsp;源代码放在了 github 上，记得素质三连，[传送门](https://github.com/sun0225SUN/code.git)

![](https://i.loli.net/2021/04/06/qK1j65LVnkOUorB.jpg)
