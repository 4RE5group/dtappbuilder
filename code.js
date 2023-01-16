let offsetX;
let offsetY;

let gui_items = [];

function get_import_input(name2, file2)
{
	result = "not found";
	importfile=file2.replaceAll("\r", "");
	lines = importfile.split("\n");
	// lines.forEach(element => 
		// if(element == "")
		// {
			// if(!element == " ")
			// {
			// name2=name+": ";
			// console.log(element.startsWith(name2));
				// if(element.startsWith(name+": "))
				// {
					// result=element.replaceAll(name+": ", "");
				// }
			// }
		// }
	// );
	return result;
}

function import_code()
{
	var input = document.createElement('input');
	input.type = 'file';
	
	input.onchange = e => { 
		var files = e.target.files;
		var file = files[0];           
		var reader = new FileReader();
		reader.onload = function(event) {
			var importfile=event.target.result.replaceAll("\r", "");
			var lines = importfile.split("\n");
			// lines.forEach(element => 
				// if(element != "" & element != " ")
				// {
					// console.log(get_import_input("name", element));
				// }
			// );
		}
		reader.readAsText(file)
	}

	
	
	input.click();
}
function export_code()
{
	let name = document.getElementById('formname').value.replaceAll(" ", "_");
	if(name == "")
	{
		name="untitled";
	}
	
	
	
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
	
	var matches = [];
	var searchEles = document.getElementById("id2").children;
	for(var i = 0; i < searchEles.length; i++) {
		if(searchEles[i].tagName == 'SELECT' || searchEles.tagName == 'INPUT') {
			if(searchEles[i].id.indexOf('q1_') == 0) {
				matches.push(searchEles[i]);
			}
		}
	}
	
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
	if(width > 1000)
	{
		document.getElementById('window').style.width = "1000px";
		// console.log("too width");
	}
	if(height > 640)
	{
		document.getElementById('window').style.height = "640px";
		// console.log("too height");
	}
	if(width < 350)
	{
		document.getElementById('window').style.width = "350px";
		// console.log("not too width");
	}
	if(height < 200)
	{
		document.getElementById('window').style.height = "200px";
		// console.log("not too height");
	}
	// console.log("width: "+width+" height: "+height);
}

function allowDrop(ev) {
	ev.preventDefault();
	ev.dataTransfer.dropEffect = "move";
}

function allowDelete(ev) {
	ev.preventDefault();
	ev.dataTransfer.dropEffect = "move";
}
function deletebin(ev, type) {
	ev.preventDefault();
	// id = ev.target.id;
	console.log(id);
	var elem = document.getElementById(id);
    return elem.parentNode.removeChild(elem);
}

function drag(ev) {
	id = ev.target.id;
	// const rect = ev.target.getBoundingClientRect();

    // offsetX = ev.clientX - rect.x;
    // offsetY = ev.clientY - rect.y;
}

function add_item(type, id, name, width, height, color, top, left)
{
	gui_items.push(type+";"+id+";"+name+";"+width+";"+height+";"+color+";"+top+";"+left);
}

var rand;
function drop(ev, type) {
	
	ev.preventDefault();
	rand = Math.random().toString().substr(2, 8);
	// const left = parseInt(id2.style.left);
	// const top = parseInt(id2.style.top);

	// label.style.position = 'absolute';
	// label.style.left = ev.clientX - left - offsetX + 'px';
	// label.style.top = ev.clientY - top - offsetY + 'px';
	// id2.appendChild(document.getElementById("label"));
	
	
	if (id == "label")
	{
		const newdiv = document.createElement("div");
		newdiv.setAttribute("id", rand);
		
		newdiv.innerHTML += "<input id='"+rand+5+"' class='draggable_div' style='background-color: transparent; margin-bottom: 5px;' value='Title' name='Title'></input>";
		ev.target.appendChild(newdiv);
		
		const collection = document.getElementsByClassName("draggable_div");
		for (let i = 0; i < collection.length; i++) {
			dragElement(collection[i]);
			getDivPosition(rand);
		}
		// console.log(document.getElementById(rand).offsetWidth);
		add_item("title", rand+5, "Title", 248, 20, "#ffffff", getDivPosition(rand+5), getDivPosition2(rand+5));
		// console.log("title", rand+5, "Title", 248, 20, "#ffffff", getDivPosition(rand+5), getDivPosition2(rand+5));
	}
	if (id == "label2")
	{
		const newdiv = document.createElement("div");		
		newdiv.innerHTML += "<input draggable='true' ondragstart='drag(event)' style='background-color: transparent; margin-bottom: 5px;' value='Subtitle' name='Subtitle'></input>";
		
		ev.target.appendChild(newdiv);
	}
	if (id == "pic")
	{
		const newdiv = document.createElement("div");
		newdiv.setAttribute("id", rand);
		
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
		newdiv.setAttribute("id", rand);		
		newdiv.innerHTML += "<button draggable='true' ondragstart='drag(event)' style='border-color: #000000; border-width: 1px;'>Button</button>";
		ev.target.appendChild(newdiv);
	}
	if (id == "textbox")
	{
		const newdiv = document.createElement("div");
		newdiv.setAttribute("id", rand);
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
	var buttonwidth="248";
	var buttonheight="20";
	
	
	elmnt = document.getElementById(rand+5);
	var elementx=getDivPosition(rand+5) - getDivPosition(elmnt.parentNode.id);
	var elementy=getDivPosition2(rand+5) - getDivPosition2(elmnt.parentNode.id);
	elementx = parseInt(elementx, 10);
	elementy = parseInt(elementy, 10);
	
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
            button.Size = new Size(`+buttonwidth+`, `+buttonheight+`);
            button.Location = new Point(`+elementx+`, `+elementy+buttonheight+`);
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

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "_header")) {
	/* if present, the header is where you move the DIV from:*/
	document.getElementById(elmnt.id + "_header").onmousedown = dragMouseDown;
  } else {
	/* otherwise, move the DIV from anywhere inside the DIV:*/
	elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
	e = e || window.event;
	e.preventDefault();
	// get the mouse cursor position at startup:
	pos3 = e.clientX;
	pos4 = e.clientY;
	document.onmouseup = closeDragElement;
	// call a function whenever the cursor moves:
	document.onmousemove = elementDrag;
  }
	  
  function elementDrag(e) {
	e = e || window.event;
	e.preventDefault();
	// calculate the new cursor position:
	pos1 = pos3 - e.clientX;
	pos2 = pos4 - e.clientY;
	pos3 = e.clientX;
	pos4 = e.clientY;
	// set the element's new position:
	elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
	elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }
  function closeDragElement() {
	/* stop moving when mouse button is released:*/
	document.onmouseup = null;
	document.onmousemove = null;
	 }	  
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "_header")) {
	/* if present, the header is where you move the DIV from:*/
	document.getElementById(elmnt.id + "_header").onmousedown = dragMouseDown;
  } else {
	/* otherwise, move the DIV from anywhere inside the DIV:*/
	elmnt.onmousedown = dragMouseDown;
  }
  function dragMouseDown(e) {
	e = e || window.event;
	e.preventDefault();
	// get the mouse cursor position at startup:
	pos3 = e.clientX;
	pos4 = e.clientY;
	document.onmouseup = closeDragElement;
	// call a function whenever the cursor moves:
	document.onmousemove = elementDrag;
  }
  
  function elementDrag(e) {
	e = e || window.event;
	e.preventDefault();
	// calculate the new cursor position:
	pos1 = pos3 - e.clientX;
	pos2 = pos4 - e.clientY;
	pos3 = e.clientX;
	pos4 = e.clientY;
	// set the element's new position:
  	elmnt.style.top = (getDivPosition(elmnt.id) - pos2) + "px";
	elmnt.style.left = (getDivPosition2(elmnt.id) - pos1) + "px";
	
	//cant go less than window
	if((getDivPosition(elmnt.id) - pos2) <= getDivPosition("id2"))
	{
		elmnt.style.top = getDivPosition("id2") + "px";
	}
	if((getDivPosition2(elmnt.id) - pos1) <= getDivPosition2("id2"))
	{
		elmnt.style.left = getDivPosition2("id2") + "px";
	}
	
	if((getDivPosition(elmnt.id) - pos2) >= getDivPosition("id2")+document.getElementById("id2").offsetHeight-elmnt.offsetHeight-25)
	{
		elmnt.style.top = getDivPosition("id2")+document.getElementById("id2").offsetHeight-elmnt.offsetHeight-25 + "px";
	}
	if((getDivPosition2(elmnt.id) - pos1) >= getDivPosition2("id2")+document.getElementById("id2").offsetWidth-elmnt.offsetWidth)
	{
		elmnt.style.left = getDivPosition2("id2")+document.getElementById("id2").offsetWidth-elmnt.offsetWidth + "px";
	}
	
	
	// console.log(getDivPosition(elmnt.id) - pos2);
	// console.log("X: "+((getDivPosition(elmnt.id) - pos2) - getDivPosition(elmnt.parentNode.id))+" Y: "+ ((getDivPosition2(elmnt.id) - pos1) - getDivPosition2(elmnt.parentNode.id)));
	// console.log(elmnt.marginLeft - pos1);
  }

  function closeDragElement() {
	/* stop moving when mouse button is released:*/
	document.onmouseup = null;
	document.onmousemove = null;
  }
}
function getDivPosition(name)
{
    var rect = document.getElementById(name).getBoundingClientRect();
    var x = document.getElementById(name).clientX - rect.left; //x position within the element.
    var y = document.getElementById(name).clientY - rect.top;  //y position within the element.
    // console.log("Left? : " + x + " ; Top? : " + y + ".");
    // console.log("Left? : " + rect.top);
    return(rect.top);
}
function getDivPosition2(name)
{
    var rect = document.getElementById(name).getBoundingClientRect();
    var x = document.getElementById(name).clientX - rect.left; //x position within the element.
    var y = document.getElementById(name).clientY - rect.top;  //y position within the element.
    // console.log("Left? : " + x + " ; Top? : " + y + ".");
    // console.log("Left? : " + rect.top);
    return(rect.left);
}