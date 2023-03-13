var backslash = "\\";

function build_wpf(name, width, height, color)
{
	var zip = new JSZip();
	zip.add("hello1.txt", "Hello First World\n");
	zip.add("hello2.txt", "Hello Second World\n");
	content = zip.generate();
	location.href="data:application/zip;base64," + content;
}
function build_xml(name, width, height, color)
{
	var privitemslist="";
	for (var i = 0; i < gui_items.length; i++) {
		var line=gui_items[i].split(';');
		privitemslist+="private "+line[0]+" "+line[2]+";\n		"
	  
	  	// add_item("Label", rand+5, randomCharacter, "Title", 248, 20, "#ffffff", getDivPosition(rand+5), getDivPosition2(rand+5), #000000, 20px);
	}
	`<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".`+name+`Activity">

    `+getitems(color, "xml")+`

</androidx.constraintlayout.widget.ConstraintLayout>`

}
function build(name, width, height, color)
{
	// var buttonwidth="248";
	// var buttonheight="20";
	
	
	// elmnt = document.getElementById(rand+5);
	// var elementx=getDivPosition(rand+5) - getDivPosition("id2");
	// var elementy=getDivPosition2(rand+5) - getDivPosition2("id2");
	// elementx = parseInt(elementx, 10);
	// elementy = parseInt(elementy, 10);
	var privitemslist="";
	for (var i = 0; i < gui_items.length; i++) {
		var line=gui_items[i].split(';');
		privitemslist+="private "+line[0]+" "+line[2]+";\n		"
	  
	  	// add_item("Label", rand+5, randomCharacter, "Title", 248, 20, "#ffffff", getDivPosition(rand+5), getDivPosition2(rand+5), #000000, 20px);
	}
	
	
var cscode = `using System;
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
	//made with DT Application Builder (https://duckpvpteam.github.io/dtappbuilder/)
	
    public class CSform : Form {
		`+privitemslist+`
		
        public CSform() {
            DisplayGUI();
        }
        private void DisplayGUI() {
			this.BackColor = Color.FromA`+color+`;
            this.Name = "`+name+`";
            this.Text = "`+name+`";
			//this.Icon = new Icon(tempdir+"\\dsicon.ico");
            this.Size = new Size(`+width+", "+height+`);
			this.MinimumSize = new Size(`+width+", "+height+`);
			this.MaximumSize = new Size(`+width+", "+height+`);
            this.StartPosition = FormStartPosition.CenterScreen;
			this.SuspendLayout();
			this.FormBorderStyle = FormBorderStyle.FixedDialog;
			//
			// picturebox
			//
			//dsicon = new PictureBox();
            //dsicon.Name = "pic";
			//dsicon.ImageLocation = tempdir+"\\dsicon.ico";
			//dsicon.SizeMode = PictureBoxSizeMode.Zoom;
			//dsicon.ClientSize = new Size(440, 100);
            //dsicon.Size = new Size(440, 100);
            //dsicon.Location = new Point(0, 10);
			`+getitems(color)+`

            `+getitemscontrols()+`
        }
		private void launch(object source, EventArgs e) {
			
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
		  GraphPath.AddArc(Rect.X + Rect.Width - radius, Rect.Y + Rect.Height - radius, radius, radius, 0, 90);
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
		[DllImport("kernel32.dll")]
		static extern IntPtr GetConsoleWindow();
		[DllImport("user32.dll")]
		static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
		const int SW_HIDE = 0;
		const int SW_SHOW = 5;
		static void Main(string[] args)
		{
			Console.SetWindowSize(1, 1);
			var handle = GetConsoleWindow();
			ShowWindow(handle, SW_HIDE);
			Application.Run(new CSform());
			System.Environment.Exit(0);
		}
	}
}`;
downloadfile(name+".cs", cscode);
customAlert.alert(`I've just finnished to build your C# Form window. You can now compile it with:
C:`+backslash+`Windows`+backslash+`Microsoft.net`+backslash+`Framework64`+backslash+`v3.5`+backslash+`csc.exe `+name+".cs",'Your code is builded!');
}