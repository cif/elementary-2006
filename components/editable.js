function EditableElement(element, io){
	
	if(!io) io = {};
	var This = this;
	
	this.content = "";
	this.editMode = function(){
		var w = This.element.getRealWidth() > 0 ? This.element.getRealWidth() + 'px' : 'auto';
		var h = This.element.getRealHeight() > 0 ? This.element.getRealHeight() + 'px' : 'auto';
	    var ta =  document.createElement('textarea');
	ta.style.width = w;
	ta.style.height = h;
	ta.fontFamily = 'inherit';
		ta.innerHTML = This.content;
		This.element.setContent("");
		This.element.element.appendChild(ta);
			tinyMCE.init({
				mode : "textareas"
			});
	}
	
	this.finishEdit = function(){
	 	var new_cont = document.forms['ef_' + This.e_index].elements['eta_' + This.e_index].value;
		This.content = replace_all(new_cont,"\n","<br >");
		This.element.setContent(This.content);
		if(This.onSave) This.onSave(content);
	}
	
	this.cancelEdit = function(){
		This.element.setContent(This.content);	
	}

	this.element = new Element(element,{ ondouble:this.editMode } );
	this.onSave = io.onSave ? io.onSave : false;
	this.content = this.element.getContent();
	this.e_index = editables.length;
	editables.push(this); 
}

//this stuff keeps track of all the editable elements on the page and catches the button events.
var editables = new Array();
var catchSave = function(index){ editables[index].finishEdit(); }
var catchCancel = function(index){ 	editables[index].cancelEdit(); }
var replace_all = function(str, to, repl){
	while(str.indexOf(to) >= 0){ 
		var b = str.substring(0, str.indexOf(to));
		var e = str.substring(str.indexOf(to) + to.length, str.length);
		str = b + repl + e;
	}
	return str;
}