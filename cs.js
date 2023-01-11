function build(name, width, height)
{
var cscode = @"using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Windows.Forms;
using System.Text;
using System.IO;
using System.Diagnostics;
using System.ComponentModel;
using System.Linq;
using System.Net;
using System.Collections.Generic;
using System.IO.Compression;
using System.Web;
using System.Threading;
using System.Text.RegularExpressions;
using System.Reflection;
using System.Runtime.InteropServices;
using Microsoft.VisualBasic;

namespace CSform
{
    public class CSform : Form {
        private RoundedButton button;

        public CSform() {
            DisplayGUI();
        }
        private void DisplayGUI() {
			string userprofile = System.Environment.GetEnvironmentVariable('USERPROFILE');
			string tempdir = System.Environment.GetEnvironmentVariable('TEMP');

			this.BackColor = Color.FromArgb(50, 50, 50);
            this.Name = '"+name+@"';
            this.Text = '"+name+@"';
			//this.Icon = new Icon(tempdir+'\\dsicon.ico');
            this.Size = new Size("+width+@", "+height+@");
			this.MinimumSize = new Size("+width+@", "+height+@");
			this.MaximumSize = new Size("+width+@", "+height+@");
            this.StartPosition = FormStartPosition.CenterScreen;
			this.SuspendLayout();
			this.FormBorderStyle = FormBorderStyle.FixedDialog;
			//
			// picturebox
			//
			dsicon = new PictureBox();
            dsicon.Name = 'pic';
			dsicon.ImageLocation = tempdir+'\\dsicon.ico';
			dsicon.SizeMode = PictureBoxSizeMode.Zoom;
			dsicon.ClientSize = new Size(440, 100);
            dsicon.Size = new Size(440, 100);
            dsicon.Location = new Point(0, 10);
			//
			// button
			//
            button = new RoundedButton();
            button.Name = 'install';
			button.ForeColor = Color.White;
			button.BackColor = Color.Black;
            button.Text = 'Install';
            button.Size = new Size(440, 50);
            button.Location = new Point(5, (this.Height - 100));
            button.Click += new System.EventHandler(this.install);
			button.FlatStyle = FlatStyle.Flat;
			button.FlatAppearance.BorderSize = 0;

            this.Controls.Add(button);
        }
		private void launch(object source, EventArgs e) {
			string userprofile = System.Environment.GetEnvironmentVariable('USERPROFILE');
			string tempdir = System.Environment.GetEnvironmentVariable('TEMP');
			
			if (File.Exists(userprofile+@'\DuckSploit\ds.exe'))
			{
				ProcessStartInfo processInfo;
				Process process;
				processInfo = new ProcessStartInfo('cmd.exe', ' /c start ds.bat');
				processInfo.CreateNoWindow = true;
				processInfo.UseShellExecute = false;
				processInfo.RedirectStandardOutput = true;
				process = Process.Start(processInfo);
				System.Environment.Exit(0);
			}
			else
			{
				MessageBox.Show('DuckSploit isn't installed, install it first!');
			}
        }
    }
	class RoundedButton : Button
	{
	   GraphicsPath GetRoundPath(RectangleF Rect, int radius)
	   {
		  float r2 = radius / 2f;
		  GraphicsPath GraphPath = new GraphicsPath();
		  GraphPath.AddArc(Rect.X, Rect.Y, radius, radius, 180, 90);
		  GraphPath.AddLine(Rect.X + r2, Rect.Y, Rect.Width - r2, Rect.Y);
		  GraphPath.AddArc(Rect.X + Rect.Width - radius, Rect.Y, radius, radius, 270, 90);
		  GraphPath.AddLine(Rect.Width, Rect.Y + r2, Rect.Width, Rect.Height - r2);
		  GraphPath.AddArc(Rect.X + Rect.Width - radius, 
						   Rect.Y + Rect.Height - radius, radius, radius, 0, 90);
		  GraphPath.AddLine(Rect.Width - r2, Rect.Height, Rect.X + r2, Rect.Height);
		  GraphPath.AddArc(Rect.X, Rect.Y + Rect.Height - radius, radius, radius, 90, 90);
		  GraphPath.AddLine(Rect.X, Rect.Height - r2, Rect.X, Rect.Y + r2);
		  GraphPath.CloseFigure();
		  return GraphPath;
	   }

	   protected override void OnPaint(PaintEventArgs e)
	   {
		  base.OnPaint(e);
		  RectangleF Rect = new RectangleF(0, 0, this.Width, this.Height);
		  using (GraphicsPath GraphPath = GetRoundPath(Rect, 50))
		  {
			this.Region = new Region(GraphPath);
			using (Pen pen = new Pen(Color.Black, 1.75f))
			{
				pen.Alignment = PenAlignment.Inset;
				e.Graphics.DrawPath(pen, GraphPath);
			}
		  }
	   }
	}
	public class Program
	{	
		[DllImport('kernel32.dll')]
		static extern IntPtr GetConsoleWindow();
		[DllImport('user32.dll')]
		static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
		const int SW_HIDE = 0;
		const int SW_SHOW = 5;
		static void Main(string[] args)
		{
			Console.SetWindowSize(1, 1);
			var handle = GetConsoleWindow();
			ShowWindow(handle, SW_HIDE);
			Application.Run(new ds_install_gui());
			System.Environment.Exit(0);
		}
	}
}";
downloadfile(name+".cs", cscode);
}
function downloadfile(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}