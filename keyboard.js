// detect keyboard shortcuts
document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (selected_elem != "" && evt.ctrlKey && evt.keyCode == 90) {
        alert("Ctrl-Z may be added soon ;)");
    }
	if (selected_elem != "" && evt.keyCode == 46) {
        for (var i = 0; i < gui_items.length; i++) {
			if(gui_items[i].contains(selected_elem))
			{
				let fontSize = window.getComputedStyle(document.getElementById(selected_elem+5)).fontSize.split("px").join('');
				elmnt=document.getElementById(selected_elem);
				elmnt.remove();
				selected_elem="";
				gui_items.splice(i, 1);
			}
		}
    }
	if(document.getElementById('templates_list').style.display == 'block' && evt.key === "Escape") 
	{
		document.getElementById('templates_list').style.display = 'none';
	}
	if(evt.keyCode == 72 && evt.altKey)
	{
		alert("need help?");
	}
};