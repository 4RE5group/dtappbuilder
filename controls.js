function set_text() {
	document.getElementById(selected_elem+5).textContent=document.getElementById("label1_text").value;
	update_elem();
}
function set_textsize () {
	document.getElementById('label1_size_range').textContent=document.getElementById("label1_size").value;
	
	let fontSize = window.getComputedStyle(document.getElementById(selected_elem+5)).fontSize;
	document.getElementById(selected_elem+5).style.fontSize = document.getElementById("label1_size").value + 'px';
	
	update_elem();
}
function set_backcolor() {
	document.getElementById(selected_elem+5).style.backgroundColor=document.getElementById("label1_back").value;
	update_elem();
}
function set_src() {
	document.getElementById(selected_elem+5).src=document.getElementById("picturebox_url").value;
	update_elem();
}
function set_width_button() {
	document.getElementById(selected_elem+5).style.width=document.getElementById("buttonedit_width").value+"px";
	document.getElementById("buttonedit_width_range").innerHTML=document.getElementById("buttonedit_width").value;
	update_elem();
}
function set_height_button() {
	document.getElementById(selected_elem+5).style.height=document.getElementById("buttonedit_height").value+"px";
	document.getElementById("buttonedit_height_range").innerHTML=document.getElementById("buttonedit_height").value;
	update_elem();
}
function set_button_text () {
	document.getElementById(selected_elem+5).innerHTML=document.getElementById("buttonedit_text").value;
	update_elem();
}
function set_width() {
	document.getElementById(selected_elem+5).style.width=document.getElementById("picturebox_width").value+"px";
	document.getElementById("picturebox_width_range").innerHTML=document.getElementById("picturebox_width").value;
	update_elem();
}
function set_height() {
	document.getElementById(selected_elem+5).style.height=document.getElementById("picturebox_height").value+"px";
	document.getElementById("picturebox_height_range").innerHTML=document.getElementById("picturebox_height").value;
	update_elem();
}
function set_forecolor() {
	document.getElementById(selected_elem+5).style.color=document.getElementById("label1_fore").value;
	update_elem();
}