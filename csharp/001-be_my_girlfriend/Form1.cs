using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Love
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            MessageBox.Show("我就知道你会同意的", "^v^");
            MessageBox.Show("恭喜你拥有一名可爱的男朋友~~", "^v^");
            MessageBox.Show("🤍🤍爱你，么么哒🤍🤍", "^v^");
            this.Dispose();
        }
        private void button2_MouseEnter(object sender, EventArgs e)
        {
            int x = this.ClientSize.Width - button2.Width;
            int y = this.ClientSize.Height - button2.Height;
            Random r = new Random();
            button2.Location = new Point(r.Next(0, x + 1), r.Next(0, y + 1));
        }

        private void Form1_FormClosing(object sender, FormClosingEventArgs e)
        {
            MessageBox.Show("不回答不能退出哦！", "(╯_╰)╭");
            e.Cancel = true;
        }
    }
}
