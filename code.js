let offsetX;
let offsetY;
let selected_elem;

let gui_items = [];
coloractive="#16953a";
colorinactive="#f95151";

var userAgent = window.navigator.userAgent,
platform = window.navigator.platform,
macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
iosPlatforms = ['iPhone', 'iPad', 'iPod'],
os = null;
// disable android and IOS cuz these devices have too small screens
if (/Android/.test(userAgent) || iosPlatforms.indexOf(platform) !== -1) {
  document.getElementsByTagName("body")[0].style.display = "none";
  alert(`This website don't works on phones
Android app soon ;)`);
}
  
function get_import_input(name2, file2)
{
	result = "not found";
	importfile=file2.split("\r").join("");
	lines = importfile.split("\n");
	for (i = 0; i < lines.length; i++) { 
		if(lines[i] == undefined)
		{}
		else
		{
			// get value from variable name 
			if(lines[i].startsWith(name2+": "))
			{
				result=lines[i].replace(name2+": ", "");
			}
		}
	}
	if(result == "not found")
	{
		customAlert.alert("Error at line "+i.toString()+": "+lines[i]);
	}
	return result;
}

function import_code()
{
	//import file
	var input = document.createElement('input');
	input.type = 'file';
	
	input.onchange = e => { 
		var files = e.target.files;
		var file = files[0];           
		var reader = new FileReader();
		// read file
		reader.onload = function(event) 
		{
			document.getElementById("id2").innerHTML="";
			gui_items=[];
			selected_elem="";
			// set project name
			document.getElementById("formname").value=get_import_input("project_name", event.target.result);
			document.getElementById("html5colorpicker").value=get_import_input("window_background", event.target.result);
			try
			{
				clickColor(0, -1, -1, 5);
			}
			catch(e)
			{}
			//set window height
			windows_width=get_import_input("window_width", event.target.result);
			windows_height=get_import_input("window_height", event.target.result);
			
			items=get_import_input("items", event.target.result);
			item_list=items.split("///");
			// set window dimentions
			document.getElementById("window").style.width=windows_width;
			document.getElementById("window").style.height=windows_height;
			for (var i = 0; i < item_list.length; i++) {
				line=item_list[i].split(';');
				gui_items.push(item_list[i]);
				rand=line[2].substring(0, line.length-1);
				// display items
				alert(line);
				if(line[0] == "Label")
				{
					new_element(rand, "label", line[2], line);
				}
				if(line[0] == "Label2")
				{
					new_element(rand, "label2", line[2], line);
				}
				if(line[0] == "PictureBox")
				{
					new_element(rand, "pic", line[2], line);
				}
				const collection = document.getElementsByClassName("draggable_div");
				for (let i = 0; i < collection.length; i++) {
					dragElement(collection[i]);
					getDivPosition(rand);
				}
				// add_item("Label", rand+5, randomCharacter, "Title", 248, 20, "#ffffff", getDivPosition(rand+5), getDivPosition2(rand+5), #000000, 20px);
			}
		}
		reader.readAsText(file)
	}
	
	
	input.click();
}
function export_code(build)
{
	// sets name to untitled if null
	let name = document.getElementById('formname').value.split(" ").join("-");
	if(name == "")
	{
		name="untitled";
	}
	
	//get elements
	let box = document.getElementById('window');
	let width = box.offsetWidth;
	let height = box.offsetHeight;
		
	c = document.getElementById("html5colorpicker").value;
	cObj = w3color(c);
	colorhex = cObj.toHexString();
	r = cObj.red;
	g = cObj.green;
	b = cObj.blue;
		
	var matches = [];
	var searchEles = document.getElementById("id2").children;
	for(var i = 0; i < searchEles.length; i++) {
		if(searchEles[i].tagName == 'SELECT' || searchEles.tagName == 'INPUT') {
			if(searchEles[i].id.indexOf('q1_') == 0) {
				matches.push(searchEles[i]);
			}
		}
	}
	
	
	
	//get export type
	var e = document.getElementById("export_option");
	var value = e.value;
	var text = e.options[e.selectedIndex].text;
	
	if(build == false) {
		var itemlist="";
		for (var i = 0; i < gui_items.length; i++) {
			var line=gui_items[i];
			if(i!=0)
			{
				itemlist+="///"+line;
			}
			else
			{
				itemlist=line;
			}
			
		}
		
		
		exported_code=`project_name: `+name+`
project_type: `+value+`
project_description: by ...
window_width: `+width+`px
window_height: `+height+`px
window_background: `+cObj.toRgbString()+`
items: `+itemlist;
	downloadfile(name+".dtab", exported_code);
	}
	else
	{
		var e = document.getElementById("export_option");
		var value = e.value;
		type="error";
		if(e.selectedIndex == 0)
		{
			type="winform";
			build_winform(name, width, height, cObj.toRgbString());
		}
		if(e.selectedIndex == 1)
		{
			type="wpf";
			build_wpf(name, width, height, cObj.toRgbString());
		}
		if(e.selectedIndex == 2)
		{
			type="xml";
			build_xml(name, width, height, cObj.toRgbString());
		}
		if(e.selectedIndex == 3)
		{
			type="android";
			build_android(name, width, height, cObj.toRgbString());
		}
	}
}
function resize()
{
	// resize window if it's too wide or too tall
	let box = document.getElementById('window');
	let width = box.offsetWidth;
	let height = box.offsetHeight;
	document.getElementById("dimentions").innerHTML = width+"x"+height;
	if(width > 1000)
	{
		document.getElementById('window').style.width = "1000px";
	}
	if(height > 640)
	{
		document.getElementById('window').style.height = "640px";
	}
	if(width < 350)
	{
		document.getElementById('window').style.width = "350px";
	}
	if(height < 200)
	{
		document.getElementById('window').style.height = "200px";
	}
}

function allowDrop(ev) {
	//allow elements to be droped
	ev.preventDefault();
	ev.dataTransfer.dropEffect = "move";
}

function drag(ev) {
	//start dragging elements
	id = ev.target.id;
}

function add_item(type, id, randomname, name, width, height, color, top, left, backcolor, fontsize)
{
	// add items to list
	gui_items.push(type+";"+id+";"+randomname+";"+name+";"+width+";"+height+";"+color+";"+top+";"+left+";"+backcolor+";"+fontsize);
}

function setup_elements()
{
	document.getElementById("controls_list").innerHTML+=`
<div class="app-component-container app-component-root-class-name">
	<div id="addbutton" draggable="true" ondragstart="drag(event)" class="app-component-container1">
		<img alt="image" src="./favicon.png" class="app-component-image" />
        <h1 class="app-component-text"><span>Button</span></h1>
    </div>
</div>`;
}


var rand;
function set_elem(ev, type) {
	const collection = document.getElementsByClassName("draggable_div");
	for (let i = 0; i < collection.length; i++) {
		dragElement(collection[i]);
		getDivPosition(rand);
	}
	if(!selected_elem == "")
	{
		document.getElementById(selected_elem).style.border = "0px solid #257AFD"; 
	}
	selected_elem=ev.target.id.slice(0, -1);
	document.getElementById(selected_elem).style.border = "3px solid #257AFD"; 
	// selected_elem=ev.target.id;
	console.log(selected_elem);
	set_bar();
}
function update_elem() {
	for (var i = 0; i < gui_items.length; i++) {
		if(gui_items[i].contains(selected_elem))
		{
			elmnt=document.getElementById(selected_elem);
			var temp=gui_items[i];
			temp=temp.replace('"', "'");
			var temp5=temp.split(';');
			gui_items.splice(i,1);
			if(temp5[0] == "Label" || temp5[0] == "RoundedButton")
			{
				fontSize = window.getComputedStyle(document.getElementById(selected_elem+5)).fontSize.split("px").join("");
				alert("'"+fontSize+"'");
				text=elmnt.textContent;
				add_item(temp5[0], elmnt.id, temp5[2], text, elmnt.offsetWidth, elmnt.offsetHeight, convert_color_to_hex(document.getElementById(elmnt.id+5).style.color), getDivPosition(elmnt.id+5), getDivPosition2(elmnt.id+5), convert_color_to_hex(document.getElementById(elmnt.id+5).style.backgroundColor), fontSize);
			}
			if(temp5[0] == "PictureBox")
			{
				imagesrc=document.getElementById(elmnt.id+5).src;
				add_item(temp5[0], elmnt.id, temp5[2], imagesrc, elmnt.offsetWidth, elmnt.offsetHeight, convert_color_to_hex(document.getElementById(elmnt.id+5).style.color), getDivPosition(elmnt.id+5), getDivPosition2(elmnt.id+5), convert_color_to_hex(document.getElementById(elmnt.id+5).style.backgroundColor), imagesrc);
			}
		}
	}
	const collection = document.getElementsByClassName("draggable_div");
	for (let i = 0; i < collection.length; i++) {
		dragElement(collection[i]);
		getDivPosition(rand);
	}
}
function set_bar() {
	// set left bar based on element's type
	for (var i = 0; i < gui_items.length; i++) {
		console.log(gui_items[i]);
		if(gui_items[i].contains(selected_elem))
		{
			elmnt=document.getElementById(selected_elem+5);
			var temp=gui_items[i];
			var temp5=temp.split(';');
			
			//hide edit divs
			document.getElementById('label1').style.display="none";
			document.getElementById('buttonedit').style.display="none";
			document.getElementById('picturebox').style.display="none";
			
			//titles and subtitles
			if(temp5[0] == "Label")
			{
				document.getElementById('label1').style.display="block";
				document.getElementById('label1_text').value=elmnt.textContent;
				document.getElementById('label1_size').value=elmnt.style.fontSize;
				document.getElementById('label1_size_range').textContent=elmnt.style.fontSize;
				document.getElementById('label1_fore').value=elmnt.style.color;
				document.getElementById('label1_back').value=elmnt.style.backgroundColor;
			}
			//button
			if(temp5[0] == "RoundedButton")
			{
				document.getElementById('buttonedit').style.display="block";
				document.getElementById('buttonedit_text').value=elmnt.innerHTML;
				document.getElementById('buttonedit_width').value=elmnt.style.width;
				document.getElementById('buttonedit_width_range').innerHTML=elmnt.style.width;
				document.getElementById('buttonedit_height_range').innerHTML=elmnt.style.height;
				document.getElementById('buttonedit_height').value=elmnt.style.height;
			}
			// imageboxes
			if(temp5[0] == "PictureBox")
			{
				document.getElementById('picturebox').style.display="block";
				document.getElementById('picturebox_url').value=elmnt.src;
				document.getElementById('picturebox_width').value=elmnt.style.width;
				document.getElementById('picturebox_height').textContent=elmnt.style.height;
			}
		}
	}
}
highlighted=false;
function highlight_all()
{
	if(highlighted)
	{
		document.getElementById("highlight_img").src="public/assets/highlight.png";
		document.getElementById("highlight_div").style.color=colorinactive;
		var x = document.getElementById("id2").querySelectorAll("div"); 

		for (i = 0; i < x.length; i++)
		{
			if(x[i].offsetWidth != "4px" && x[i].id != selected_elem)
			{
				x[i].style.border = "0px solid #ff0000";  
			}
		}
		highlighted=false;
	}
	else
	{
		document.getElementById("highlight_img").src="public/assets/highlight2.png";
		document.getElementById("highlight_div").style.color=coloractive;
		var x = document.getElementById("id2").querySelectorAll("div"); 

		for (i = 0; i < x.length; i++)
		{
			if(x[i].style.width != "4px" && x[i].id != selected_elem)
			{
				x[i].style.border = "2px solid #ff0000";  
			}
		}
		highlighted=true;
	}
}
function drop(ev, type) {
	// on element dropped
	ev.preventDefault();
	
	const alphabet = "abcdefghijklmnopqrstuvwxyz"
	const randomCharacter = alphabet[Math.floor(Math.random() * alphabet.length)]+alphabet[Math.floor(Math.random() * alphabet.length)]+alphabet[Math.floor(Math.random() * alphabet.length)]+alphabet[Math.floor(Math.random() * alphabet.length)]+alphabet[Math.floor(Math.random() * alphabet.length)]+alphabet[Math.floor(Math.random() * alphabet.length)]+alphabet[Math.floor(Math.random() * alphabet.length)]+alphabet[Math.floor(Math.random() * alphabet.length)];

	rand = Math.random().toString().substr(2, 8);
	new_element(rand, id, randomCharacter);
}
function new_element(rand, elid=id, randomCharacter, data="")
{
	if(!selected_elem == "")
	{
		// select visually an element
		document.getElementById(selected_elem).style.border = "0px solid #257AFD"; 
	}
	if (elid == "label")
	{
		const newdiv = document.createElement("div");
		newdiv.style.display="contents";
		
		// alert("data: '"+data+"'");
		if(data=="")
		{
			newdiv.innerHTML += "<div id='"+rand+"' class='draggable_div' onclick='set_elem(event)' style='background-color: transparent; margin-bottom: 5px;'><h1 id='"+rand+5+"' style='font-size: 40px; color: #000000; background-color: transparent'>Title</h1></div>";
		}
		else
		{
			fontsize=data[10];
			newdiv.innerHTML += "<div id='"+rand+"' class='draggable_div' onclick='set_elem(event)' style='top: "+(parseInt(Number(getDivPosition("id2")))+parseInt(Number(data[7])))+"px; left: "+(parseInt(Number(getDivPosition2("id2")))+parseInt(Number(data[8])))+"px;background-color: transparent; margin-bottom: 5px;'><h1 id='"+rand+5+"' style='font-size: "+fontsize+"; color: "+data[9]+"; background-color: "+data[6]+"'>"+data[3]+"</h1></div>";
		}
		document.getElementById("id2").appendChild(newdiv);
		
		const collection = document.getElementsByClassName("draggable_div");
		for (let i = 0; i < collection.length; i++) {
			dragElement(collection[i]);
			getDivPosition(rand);
		}
		//trying to get numbers without komas
		let temp1=(getDivPosition(rand+5) - getDivPosition("id2")).toString().split('.');
		let temp2=(getDivPosition(rand+5) - getDivPosition("id2")).toString().split('.');
		if(data=="")
		{
			add_item("Label", rand+5, randomCharacter, "Title", 248, 20, "#ffffff", temp1[0], temp2[0], "#000000", 40);
		}
	}
	if (elid == "label2")
	{
		const newdiv = document.createElement("div");
		newdiv.style.display="contents";
		
		newdiv.innerHTML += "<div id='"+rand+"' class='draggable_div' onclick='set_elem(event)' style='background-color: transparent; margin-bottom: 5px;'><h2 id='"+rand+5+"' style='font-size: 30px; color: #000000; background-color: transparent'>Subtitle</h2></div>";
		document.getElementById("id2").appendChild(newdiv);
		
		const collection = document.getElementsByClassName("draggable_div");
		for (let i = 0; i < collection.length; i++) {
			dragElement(collection[i]);
			getDivPosition(rand);
		}
		
		let temp1=(getDivPosition(rand+5) - getDivPosition("id2")).toString().split('.');
		let temp2=(getDivPosition(rand+5) - getDivPosition("id2")).toString().split('.');
		
		add_item("Label", rand+5, randomCharacter, "Subtitle", 248, 20, "#ffffff", temp1[0], temp2[0], "#000000", 30);
		// console.log("title", rand+5, "Title", 248, 20, "#ffffff", getDivPosition(rand+5), getDivPosition2(rand+5), #000000, fontsize);
	}
	if (elid == "pic")
	{
		const newdiv = document.createElement("div");
		newdiv.style.display="contents";
		
		
		newdiv.innerHTML += "<div id='"+rand+"' class='draggable_div' onclick='set_elem(event)' style='background-color: transparent; margin-bottom: 5px;'><img id='"+rand+5+"' style='width: 50px; height: 50px; background-color: transparent' src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/C_Sharp_wordmark.svg/1200px-C_Sharp_wordmark.svg.png'></img></div>";
		document.getElementById("id2").appendChild(newdiv);
		
		const collection = document.getElementsByClassName("draggable_div");
		for (let i = 0; i < collection.length; i++) {
			dragElement(collection[i]);
			getDivPosition(rand);
		}
		
		let temp1=(getDivPosition(rand+5) - getDivPosition("id2")).toString().split('.');
		let temp2=(getDivPosition(rand+5) - getDivPosition("id2")).toString().split('.');
		
		add_item("PictureBox", rand+5, randomCharacter, "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/C_Sharp_wordmark.svg/1200px-C_Sharp_wordmark.svg.png", 248, 20, "#ffffff", temp1[0], temp2[0], "#000000");
	}
	if (elid == "addbutton")
	{
		const newdiv = document.createElement("div");
		newdiv.style.display="contents";
		
		newdiv.innerHTML += "<div id='"+rand+"' class='draggable_div' onclick='set_elem(event)' style='background-color: transparent; margin-bottom: 5px;'><button id='"+rand+5+"' style='width: 100px; height: 35px; color: #ffffff; background-color: #000000' name='"+rand+5+"'>Button</button></div>";
		document.getElementById("id2").appendChild(newdiv);
		
		const collection = document.getElementsByClassName("draggable_div");
		for (let i = 0; i < collection.length; i++) {
			dragElement(collection[i]);
			getDivPosition(rand);
		}
		
		let temp1=(getDivPosition(rand+5) - getDivPosition("id2")).toString().split('.');
		let temp2=(getDivPosition(rand+5) - getDivPosition("id2")).toString().split('.');
		
		add_item("RoundedButton", rand+5, randomCharacter, "Button", 248, 20, "#ffffff", temp1[0], temp2[0], "#000000");
	}
	if (elid == "textbox")
	{
		const newdiv = document.createElement("div");
		newdiv.style.display="contents";
		newdiv.setAttribute("id", rand);
		const newbut = document.createElement("textbox");
		newbut.setAttribute("placeholder", "TextBox");
		newbut.setAttribute("width", "100px");
		newbut.setAttribute("heigth", "50px");
					
		newdiv.appendChild(newbut);
		document.getElementById("id2").appendChild(newdiv);
	}
	if(!selected_elem=="")
	{
		set_bar();
	}
	document.getElementById(rand).style.border = "3px solid #257AFD"; 
}
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
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
	if((parseInt(Number(getDivPosition(elmnt.id))) - pos2) <= parseInt(Number(getDivPosition("id2"))))
	{
		elmnt.style.top = parseInt(Number(getDivPosition("id2"))) + "px";
	}
	if((parseInt(Number(getDivPosition2(elmnt.id))) - pos1) <= parseInt(Number(getDivPosition2("id2"))))
	{
		elmnt.style.left = parseInt(Number(getDivPosition2("id2"))) + "px";
	}
	
	if((parseInt(Number(getDivPosition(elmnt.id))) - pos2) >= parseInt(Number(getDivPosition("id2")))+document.getElementById("id2").offsetHeight-elmnt.offsetHeight-25)
	{
		elmnt.style.top = parseInt(Number(getDivPosition("id2")))+document.getElementById("id2").offsetHeight-elmnt.offsetHeight-25 + "px";
	}
	if((parseInt(Number(getDivPosition2(elmnt.id))) - pos1) >= getDivPosition2("id2")+document.getElementById("id2").offsetWidth-elmnt.offsetWidth)
	{
		elmnt.style.left = parseInt(Number(getDivPosition2("id2")))+document.getElementById("id2").offsetWidth-elmnt.offsetWidth + "px";
	}
	
	
	// console.log(getDivPosition(elmnt.id) - pos2);
	// console.log("X: "+((getDivPosition(elmnt.id) - pos2) - getDivPosition("id2"))+" Y: "+ ((getDivPosition2(elmnt.id) - pos1) - getDivPosition2("id2")));
	let temp1=(getDivPosition2(elmnt.id) - getDivPosition2("id2")).toString().split('.');
	let temp2=(getDivPosition(elmnt.id) - getDivPosition("id2")).toString().split('.');
	// alert(temp1);
	// alert(temp2);
	for (var i = 0; i < gui_items.length; i++) {
		if(gui_items[i].contains(elmnt.id))
		{
			var temp=gui_items[i];
			var temp5=temp.split(';');
			gui_items.splice(i,1);
			// text=""+elmnt.textContent;
			add_item(temp5[0], elmnt.id, temp5[2], temp5[3], elmnt.offsetWidth, elmnt.offsetHeight, document.getElementById(elmnt.id+5).style.color, temp1[0], temp2[0], document.getElementById(elmnt.id+5).style.backgroundColor);
			// console.log(gui_items);
		}
	}
	// console.log(elmnt.marginLeft - pos1);
  }

  function closeDragElement() {
	/* stop moving when mouse button is released:*/
	document.onmouseup = null;
	document.onmousemove = null;
  }
  // document.querySelector('.tooltip').classList.remove('active');
}
function getDivPosition(name)
{
    var rect = document.getElementById(name).getBoundingClientRect();
    var x = document.getElementById(name).clientX - rect.left; //x position within the element.
    var y = document.getElementById(name).clientY - rect.top;  //y position within the element.
    // console.log("Left? : " + x + " ; Top? : " + y + ".");
    // console.log("Left? : " + rect.top);
	result=rect.top.toString().split(".")[0];
    return(parseInt(Number(result)));
}
function getDivPosition2(name)
{
    var rect = document.getElementById(name).getBoundingClientRect();
    var x = document.getElementById(name).clientX - rect.left; //x position within the element.
    var y = document.getElementById(name).clientY - rect.top;  //y position within the element.
    // console.log("Left? : " + x + " ; Top? : " + y + ".");
    // console.log("Left? : " + rect.top);
	result=rect.left.toString().split(".")[0];
    return(parseInt(Number(result)));
}
function convert_color_to_hex(color2) {
	color=color2;
	color=color.split("AliceBlue").join("#F0F8FF");
	color=color.split("AntiqueWhite").join("#FAEBD7");
	color=color.split("Aqua").join("#00FFFF");
	color=color.split("Aquamarine").join("#7FFFD4");
	color=color.split("Azure").join("#F0FFFF");
	color=color.split("Beige").join("#F5F5DC");
	color=color.split("Bisque").join("#FFE4C4");
	color=color.split("Black").join("#000000");
	color=color.split("BlanchedAlmond").join("#FFEBCD");
	color=color.split("Blue").join("#0000FF");
	color=color.split("BlueViolet").join("#8A2BE2");
	color=color.split("Brown").join("#A52A2A");
	color=color.split("BurlyWood").join("#DEB887");
	color=color.split("CadetBlue").join("#5F9EA0");
	color=color.split("Chartreuse").join("#7FFF00");
	color=color.split("Chocolate").join("#D2691E");
	color=color.split("Coral").join("#FF7F50");
	color=color.split("CornflowerBlue").join("#6495ED");
	color=color.split("Cornsilk").join("#FFF8DC");
	color=color.split("Crimson").join("#DC143C");
	color=color.split("Cyan").join("#00FFFF");
	color=color.split("DarkBlue").join("#00008B");
	color=color.split("DarkCyan").join("#008B8B");
	color=color.split("DarkGoldenRod").join("#B8860B");
	color=color.split("DarkGray").join("#A9A9A9");
	color=color.split("DarkGrey").join("#A9A9A9");
	color=color.split("DarkGreen").join("#006400");
	color=color.split("DarkKhaki").join("#BDB76B");
	color=color.split("DarkMagenta").join("#8B008B");
	color=color.split("DarkOliveGreen").join("#556B2F");
	color=color.split("Darkorange").join("#FF8C00");
	color=color.split("DarkOrchid").join("#9932CC");
	color=color.split("DarkRed").join("#8B0000");
	color=color.split("DarkSalmon").join("#E9967A");
	color=color.split("DarkSeaGreen").join("#8FBC8F");
	color=color.split("DarkSlateBlue").join("#483D8B");
	color=color.split("DarkSlateGray").join("#2F4F4F");
	color=color.split("DarkSlateGrey").join("#2F4F4F");
	color=color.split("DarkTurquoise").join("#00CED1");
	color=color.split("DarkViolet").join("#9400D3");
	color=color.split("DeepPink").join("#FF1493");
	color=color.split("DeepSkyBlue").join("#00BFFF");
	color=color.split("DimGray").join("#696969");
	color=color.split("DimGrey").join("#696969");
	color=color.split("DodgerBlue").join("#1E90FF");
	color=color.split("FireBrick").join("#B22222");
	color=color.split("FloralWhite").join("#FFFAF0");
	color=color.split("ForestGreen").join("#228B22");
	color=color.split("Fuchsia").join("#FF00FF");
	color=color.split("Gainsboro").join("#DCDCDC");
	color=color.split("GhostWhite").join("#F8F8FF");
	color=color.split("Gold").join("#FFD700");
	color=color.split("GoldenRod").join("#DAA520");
	color=color.split("Gray").join("#808080");
	color=color.split("Grey").join("#808080");
	color=color.split("Green").join("#008000");
	color=color.split("GreenYellow").join("#ADFF2F");
	color=color.split("HoneyDew").join("#F0FFF0");
	color=color.split("HotPink").join("#FF69B4");
	color=color.split("IndianRed ").join("#CD5C5C");
	color=color.split("Indigo ").join("#4B0082");
	color=color.split("Ivory").join("#FFFFF0");
	color=color.split("Khaki").join("#F0E68C");
	color=color.split("Lavender").join("#E6E6FA");
	color=color.split("LavenderBlush").join("#FFF0F5");
	color=color.split("LawnGreen").join("#7CFC00");
	color=color.split("LemonChiffon").join("#FFFACD");
	color=color.split("LightBlue").join("#ADD8E6");
	color=color.split("LightCoral").join("#F08080");
	color=color.split("LightCyan").join("#E0FFFF");
	color=color.split("LightGoldenRodYellow").join("#FAFAD2");
	color=color.split("LightGray").join("#D3D3D3");
	color=color.split("LightGrey").join("#D3D3D3");
	color=color.split("LightGreen").join("#90EE90");
	color=color.split("LightPink").join("#FFB6C1");
	color=color.split("LightSalmon").join("#FFA07A");
	color=color.split("LightSeaGreen").join("#20B2AA");
	color=color.split("LightSkyBlue").join("#87CEFA");
	color=color.split("LightSlateGray").join("#778899");
	color=color.split("LightSlateGrey").join("#778899");
	color=color.split("LightSteelBlue").join("#B0C4DE");
	color=color.split("LightYellow").join("#FFFFE0");
	color=color.split("Lime").join("#00FF00");
	color=color.split("LimeGreen").join("#32CD32");
	color=color.split("Linen").join("#FAF0E6");
	color=color.split("Magenta").join("#FF00FF");
	color=color.split("Maroon").join("#800000");
	color=color.split("MediumAquaMarine").join("#66CDAA");
	color=color.split("MediumBlue").join("#0000CD");
	color=color.split("MediumOrchid").join("#BA55D3");
	color=color.split("MediumPurple").join("#9370D8");
	color=color.split("MediumSeaGreen").join("#3CB371");
	color=color.split("MediumSlateBlue").join("#7B68EE");
	color=color.split("MediumSpringGreen").join("#00FA9A");
	color=color.split("MediumTurquoise").join("#48D1CC");
	color=color.split("MediumVioletRed").join("#C71585");
	color=color.split("MidnightBlue").join("#191970");
	color=color.split("MintCream").join("#F5FFFA");
	color=color.split("MistyRose").join("#FFE4E1");
	color=color.split("Moccasin").join("#FFE4B5");
	color=color.split("NavajoWhite").join("#FFDEAD");
	color=color.split("Navy").join("#000080");
	color=color.split("OldLace").join("#FDF5E6");
	color=color.split("Olive").join("#808000");
	color=color.split("OliveDrab").join("#6B8E23");
	color=color.split("Orange").join("#FFA500");
	color=color.split("OrangeRed").join("#FF4500");
	color=color.split("Orchid").join("#DA70D6");
	color=color.split("PaleGoldenRod").join("#EEE8AA");
	color=color.split("PaleGreen").join("#98FB98");
	color=color.split("PaleTurquoise").join("#AFEEEE");
	color=color.split("PaleVioletRed").join("#D87093");
	color=color.split("PapayaWhip").join("#FFEFD5");
	color=color.split("PeachPuff").join("#FFDAB9");
	color=color.split("Peru").join("#CD853F");
	color=color.split("Pink").join("#FFC0CB");
	color=color.split("Plum").join("#DDA0DD");
	color=color.split("PowderBlue").join("#B0E0E6");
	color=color.split("Purple").join("#800080");
	color=color.split("Red").join("#FF0000");
	color=color.split("RosyBrown").join("#BC8F8F");
	color=color.split("RoyalBlue").join("#4169E1");
	color=color.split("SaddleBrown").join("#8B4513");
	color=color.split("Salmon").join("#FA8072");
	color=color.split("SandyBrown").join("#F4A460");
	color=color.split("SeaGreen").join("#2E8B57");
	color=color.split("SeaShell").join("#FFF5EE");
	color=color.split("Sienna").join("#A0522D");
	color=color.split("Silver").join("#C0C0C0");
	color=color.split("SkyBlue").join("#87CEEB");
	color=color.split("SlateBlue").join("#6A5ACD");
	color=color.split("SlateGray").join("#708090");
	color=color.split("SlateGrey").join("#708090");
	color=color.split("Snow").join("#FFFAFA");
	color=color.split("SpringGreen").join("#00FF7F");
	color=color.split("SteelBlue").join("#4682B4");
	color=color.split("Tan").join("#D2B48C");
	color=color.split("Teal").join("#008080");
	color=color.split("Thistle").join("#D8BFD8");
	color=color.split("Tomato").join("#FF6347");
	color=color.split("Turquoise").join("#40E0D0");
	color=color.split("Violet").join("#EE82EE");
	color=color.split("Wheat").join("#F5DEB3");
	color=color.split("White").join("#FFFFFF");
	color=color.split("WhiteSmoke").join("#F5F5F5");
	color=color.split("Yellow").join("#FFFF00");
	color=color.split("YellowGreen").join("#9ACD32");
	return color;
}