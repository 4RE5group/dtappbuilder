let offsetX;
let offsetY;

function export_code()
{
	let name = document.getElementById('formname').value.replaceAll(" ", "_");
	let box = document.getElementById('window');
	let width = box.offsetWidth;
	let height = box.offsetHeight;
	
	c = document.getElementById("html5colorpicker").value;
    cObj = w3color(c);
    colorhex = cObj.toHexString();
    r = cObj.red;
    g = cObj.green;
    b = cObj.blue;
	
	var backslash = "\\";
	
	build(name, width, height, cObj.toRgbString());
	customAlert.alert(`I've just finnished to build your C# Form window. You can now compile it with:
C:`+backslash+`Windows`+backslash+`Microsoft.net`+backslash+`Framework64`+backslash+`v3.5`+backslash+`csc.exe `+name+".cs",'Your code is builded!');
	
}

function resize()
{
	let box = document.getElementById('window');
	let width = box.offsetWidth;
	let height = box.offsetHeight;
	document.getElementById("dimentions").innerHTML = width+"x"+height;
	if(width > 1400)
	{
		document.getElementById('window').style.width = "1400px";
	}
	if(height > 6)
	{
		document.getElementById('window').style.height = "640px";
	}
	if(width < 100)
	{
		document.getElementById('window').style.width = "100px";
	}
	if(height < 100)
	{
		document.getElementById('window').style.height = "100px";
	}
	console.log("width: "+width+" height: "+height);
}

function allowDrop(ev) {
	ev.preventDefault();
	ev.dataTransfer.dropEffect = "move";
}

function drag(ev) {
	id = ev.target.id;
	// const rect = ev.target.getBoundingClientRect();

    // offsetX = ev.clientX - rect.x;
    // offsetY = ev.clientY - rect.y;
}

function drop(ev) {
	id = ev.target.id;
}


function drop(ev, type) {
	
	ev.preventDefault();
	// const left = parseInt(id2.style.left);
	// const top = parseInt(id2.style.top);

	// label.style.position = 'absolute';
	// label.style.left = ev.clientX - left - offsetX + 'px';
	// label.style.top = ev.clientY - top - offsetY + 'px';
	// id2.appendChild(document.getElementById("label"));
	
	
	if (id == "label")
	{
		const newdiv = document.createElement("div");		
		newdiv.innerHTML += "<input name='Title'></input>";
		
		ev.target.appendChild(newdiv);
	}
	if (id == "label2")
	{
		const newdiv = document.createElement("div");		
		newdiv.innerHTML += "<input name='Subtitle'></input>";
		
		ev.target.appendChild(newdiv);
	}
	if (id == "pic")
	{
		const newdiv = document.createElement("div");
		newdiv.setAttribute("id", "picture_");
			
		const newpic = document.createElement("img");
		newpic.setAttribute("id", "image");
		newpic.setAttribute("width", "50px");
		newpic.setAttribute("heigth", "50px");
		newpic.setAttribute("src", "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/C_Sharp_wordmark.svg/1200px-C_Sharp_wordmark.svg.png");
			
		newdiv.onclick = function () {
			this.parentElement.removeChild(this);
		};
			
		newdiv.appendChild(newpic);
		ev.target.appendChild(newdiv);
	}
	if (id == "button")
	{
		const newdiv = document.createElement("div");
		newdiv.setAttribute("id", "button_");
		newdiv.innerHTML += "<button style='border-color: #000000; border-width: 1px;'>Button</button>";
		ev.target.appendChild(newdiv);
	}
	if (id == "textbox")
	{
		const newdiv = document.createElement("div");
		newdiv.setAttribute("id", "textbox_");
		const newbut = document.createElement("textbox");
		newbut.setAttribute("placeholder", "TextBox");
		newbut.setAttribute("width", "100px");
		newbut.setAttribute("heigth", "50px");
					
		newdiv.appendChild(newbut);
		ev.target.appendChild(newdiv);
	}
}
function build(name, width, height, color)
{
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
    public class CSform : Form {
        private RoundedButton button;

        public CSform() {
            DisplayGUI();
        }
        private void DisplayGUI() {
			string userprofile = System.Environment.GetEnvironmentVariable("USERPROFILE");
			string tempdir = System.Environment.GetEnvironmentVariable("TEMP");

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
			//
			// button
			//
            button = new RoundedButton();
            button.Name = "button1";
			button.ForeColor = Color.White;
			button.BackColor = Color.Black;
            button.Text = "Install";
            button.Size = new Size(440, 50);
            button.Location = new Point(5, (this.Height - 100));
            //button.Click += new System.EventHandler(this.install);
			button.FlatStyle = FlatStyle.Flat;
			button.FlatAppearance.BorderSize = 0;

            this.Controls.Add(button);
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
function CustomAlert(){
  this.alert = function(message,title){
    document.body.innerHTML = document.body.innerHTML + '<div id="dialogoverlay"></div><div id="dialogbox" class="slit-in-vertical"><div><div id="dialogboxhead"></div><div id="dialogboxbody"></div><div id="dialogboxfoot"></div></div></div>';

    let dialogoverlay = document.getElementById('dialogoverlay');
    let dialogbox = document.getElementById('dialogbox');
    
    let winH = window.innerHeight;
    dialogoverlay.style.height = winH+"px";
    
    dialogbox.style.top = "100px";

    dialogoverlay.style.display = "block";
    dialogbox.style.display = "block";
    
    document.getElementById('dialogboxhead').style.display = 'block';

    if(typeof title === 'undefined') {
      document.getElementById('dialogboxhead').style.display = 'none';
    } else {
      document.getElementById('dialogboxhead').innerHTML = '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> '+ title;
    }
    document.getElementById('dialogboxbody').innerHTML = message;
    document.getElementById('dialogboxfoot').innerHTML = '<button class="pure-material-button-contained active" onclick="customAlert.ok()">OK</button>';
  }
  
  this.ok = function(){
    document.getElementById('dialogbox').style.display = "none";
    document.getElementById('dialogoverlay').style.display = "none";
  }
}

let customAlert = new CustomAlert();