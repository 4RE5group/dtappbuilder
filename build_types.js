var backslash = "\\";

function build_d3m0n(name, width, height, color)
{
	
}

function build_wpf(name, width, height, color)
{
	xaml = `
	<Window x:Class="`+name+`.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        xmlns:local="clr-namespace:`+name+`"
        mc:Ignorable="d"
        Title="`+name+`" Height="`+height+`" Width="`+width+`">
    <Grid Background="`+color+`">
        <Text
	</Grid>
	</Window>`;
	customAlert.alert(`I've just finnished to build your WPF (xaml) file. You can now add it to your WPF project or create a new one with:
	WIN+R and type "dotnet new WPF"`,'Your code is builded!');
	downloadfile("MainWindow.xaml", xaml);
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
function build_winform(name, width, height, color)
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
	private Image LoadImageFromUrl(string imageUrl)
		{
			try
			{
				// Create a web request to get the image
				WebRequest request = WebRequest.Create(imageUrl);

				// Get the response
				using (WebResponse response = request.GetResponse())
				using (Stream responseStream = response.GetResponseStream())
				{
					// Load the image from the stream
					return Image.FromStream(responseStream);
				}
			}
			catch (Exception ex)
			{
				MessageBox.Show("An error occurred while loading image: " + ex.Message);
			}
			return null; // Return null if there was an error
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

			`+getitems(color, "cs")+`

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
C:`+backslash+`Windows`+backslash+`Microsoft.net`+backslash+`Framework64`+backslash+`v3.5`+backslash+`csc.exe `+name+`.cs & call "`+name+`.exe"`,'Your code is builded!');
}




function getitems(color, type)
{
	var list="";
	for (var i = 0; i < gui_items.length; i++) {
		var line=gui_items[i].split(';');
		line[6]=line[6].split('transparent').join(color);
		line[9]=line[9].split('transparent').join(color);
		line[6]=convert_color_to_hex(line[6]);
		line[9]=convert_color_to_hex(line[9]);
		line[7]=(line[7] | 0);
		elemname=line[1]+5;
		try
		{
			//get font size
			let fontSize = window.getComputedStyle(document.getElementById(elemname)).fontSize.split("px").join('');
		}
		catch(e)
		{}
		line[8]=(line[8] | 0);
		if(line[0] == "Label")
		{
			if(type=="cs")
			{
				list += `
				//
				// `+line[1]+`
				//
				`+line[2]+` = new `+line[0]+`();
				`+line[2]+`.Name = "`+line[2]+`";
				`+line[2]+`.Font = new Font("Arial", `+fontSize+`);
				`+line[2]+`.ForeColor = Color.FromA`+line[6]+`;
				`+line[2]+`.BackColor = Color.FromA`+line[9]+`;
				`+line[2]+`.Text = "`+line[3]+`";
				`+line[2]+`.AutoSize = true;
				`+line[2]+`.Size = new Size(`+line[4]+`, `+line[5]+`);
				`+line[2]+`.Location = new Point(`+line[7]+`, `+line[8]+`);
				`+line[2]+`.FlatStyle = FlatStyle.Flat;`;
			}
			if(type=="wpf")
			{
				list += `<Text>`;
			}
			if(type=="xml")
			{
				list += `
				<TextView
			android:layout_width="`+line[4]+`dp"
			android:layout_height="`+line[5]+`dp"
			android:id="`+line[2]+`"
			android:text="`+line[3]+`"/>`;
			}
		
		}
		if(line[0] == "RoundedButton")
		{
			if(type=="cs")
			{
				list += `//
				// `+line[1]+`
				//
				`+line[1]+` = new RoundedButton();
				`+line[1]+`.Name = "`+line[2]+`";
				`+line[1]+`.ForeColor = Color.FromA`+line[6]+`;
				`+line[1]+`.BackColor = Color.FromA`+line[9]+`;
				`+line[1]+`.Text = "`+line[3]+`";
				`+line[1]+`.Size = new Size(`+line[4]+`, `+line[5]+`);
				`+line[1]+`.Location = new Point(`+line[7]+`, `+line[8]+`);
				`+line[1]+`.FlatStyle = FlatStyle.Flat;
				`+line[1]+`.FlatAppearance.BorderSize = 0;`;
			}
			if(type=="wpf")
			{
				
			}
			if(type=="xml")
			{
				list += `
				<Button
			android:id="`+line[2]+`"
			android:layout_width="`+line[4]+`dp"
			android:layout_height="`+line[5]+`dp"
			android:text="`+line[3]+`"/>`;
			}
		}
		if(line[0] == "TextBox")
		{
			if(type=="cs")
			{
				
			}
			if(type=="wpf")
			{
				
			}
			if(type=="xml")
			{
				list += `<EditText
			android:id="`+line[2]+`"
			android:layout_height="`+line[5]+`dp"
			android:layout_width="`+line[4]+`dp"
			android:hint="Cost of Service"
			android:inputType="text"/>`;
			}
		}
		if(line[0] == "PictureBox")
		{
			if(type=="cs")
			{
				list += `
				//
				// `+line[1]+`
				//
				`+line[2]+` = new `+line[0]+`();
				`+line[2]+`.Name = "`+line[2]+`";
				`+line[2]+`.Image = LoadImageFromUrl("`+line[3]+`");
				`+line[2]+`.SizeMode = PictureBoxSizeMode.AutoSize;
				`+line[2]+`.ClientSize = new Size(`+line[4]+`, `+line[5]+`);
				`+line[2]+`.Size = new Size(`+line[4]+`, `+line[5]+`);
				`+line[2]+`.Location = new Point(`+line[7]+`, `+line[8]+`);`;
			}
			if(type=="wpf")
			{
				
			}
			if(type=="xml")
			{
				
			}
		}
		// add_item("title", rand+5, random, "Title", 248, 20, "#ffffff", getDivPosition(rand+5), getDivPosition2(rand+5)), "#000000", 20px;
		list+="\n";
		if(type == "cs")
		{
			list+="this.Controls.Add("+line[2]+");\n";
		}
		if(type=="wpf")
		{
			
		}
		if(type=="xml")
		{
			
		}
		
	}
	return list;
}
