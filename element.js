function Element(id, io){	
	var This = this;
	
	//create element holder
	if(typeof(id) == 'string'){
		try{
			This.element = document.getElementById(id);
			This.id = id;
		}catch(e){
			alert("Problem initializing Element object with id: " + id + ". \n" + e);
		}
	}else{
		This.element = id;
		This.id = This.element.getAttribute('id');	
	}
	
	if(!io) io = {};
	
	//private units
	var units = io.units ? io.units : 'px';
	
	//public properties, width, height, x, y..  etc.
	this.x = io.x ? io.x : this.element.offsetLeft;  
	this.y = io.y ? io.y : this.element.offsetTop;
	this.width = io.width ? io.width : false; 
	this.height = io.height ? io.height : false; 
	this.alpha = (io.alpha != undefined) ? io.alpha : 100;
	this.center = (io.center) ? io.center : false;
	this.contentElement = false;
	if(io.contentElement)  
		this.contentElement = document.getElementById(io.contentElement); 
	
	this.setDimensions = function(w,h){
		if(isNum(w)) { this.element.style.width = (w + units); this.width = w;   }
		if(isNum(h)) { this.element.style.height = (h + units); this.height = h; }
		if(This.center){
			var cx = (This.width-w) * This.center.x;
			var cy = (This.height-h) * This.center.y;
			This.setPosition( This.x + cx, This.y + cy);
		}
	}
	this.setPosition = function(x,y){
	  if(isNum(y)) { this.element.style.top = y + units;  this.y = y;   }
	  if(isNum(x)) { this.element.style.left = x + units; this.x = x;  }
	  if(this.center) this.setDimentions(this.width, this.height);
	}
	this.setOpacity = function(a){ 
		if(isNum(a)){
			this.element.style.opacity = (a/100);		
			this.element.style.filter = "Alpha(Opacity=" + a + ")";  
			this.alpha = a;
		}
	};	
	this.setStyleProperty = function(property, value){
		eval("this.element.style." + property + "=\"" + value + "\"");
	}
	this.setClass = function(name){
		this.element.className = name;	
	}
	this.addClass = function(name){
		if(this.element.className.toString().indexOf(name) < 0)
			this.element.className = this.element.className + " " + name;
	}
	this.removeClass = function(name){
		var cc = this.element.className.toString();
		var e = cc.substring(0,cc.indexOf(name));
		var b = cc.substring(cc.indexOf(name) + name.length, cc.length);
		this.element.className = b + " " + e;
	}	
	this.hide = function(disp){
		this.element.style.visibility = 'hidden';
		if(disp) this.element.style.display = disp;
	}	
	this.show = function(disp){
		this.element.style.visibility = 'visible';
		if(disp) this.element.style.display = disp;
	}	
	this.getRealHeight = function(){
		return this.element.offsetHeight;
	}
	this.getRealWidth = function(){
		return this.element.offsetWidth;
	}
	this.getRealTop = function(){
		return this.element.offsetTop;
	}
	this.getRealLeft = function(){
		return this.element.offsetLeft;
	}
	this.getContent = function(cont){
		if(this.contentElement) return this.contentElement.innerHTML;
		return this.element.innerHTML;	
	}
	this.setContent = function(cont){
		if(this.contentElement) this.contentElement.innerHTML = cont;
		else this.element.innerHTML = cont;	
	}
	this.insertContent = function(cont, pos){
		var bCont = this.getContent();
		if(pos=='before') this.setContent(cont + bCont);
		else this.setContent(bCont + cont);
	}
	this.getChildren = function(tag){
		return this.element.getElementsByTagName(tag);
	}
	this.append = function(type, content){
		var ne = document.createElement(type);
		this.element.appendChild(ne);
		ne.innerHTML = content;
	}
	this.remove = function(node){
		this.element.removeChild(node);
	}
	this.insert = function(node, before){
		this.element.insertBefore(node, before);
	}
	this.setHandlers = function(io){
		//initialize handler events
		if(io.onclick) this.element.onclick = io.onclick;
		if(io.onrollover) this.element.onmouseover = io.onrollover;
		if(io.onrollout) this.element.onmouseout = io.onrollout;
		if(io.onpress) this.element.onmousedown = io.onpress;
		if(io.onrelease) this.element.onmouseup = io.onrelease;
		if(io.ondouble) this.element.ondblclick = io.ondouble;
		if(io.onmove) this.element.onmousemove = io.onmove;
	}	
	this.forceAbsolute = function(){
		var x = This.x; var y = This.y;
		var w = This.width; var h = This.height;
		This.element.style.position = 'absolute';
		This.setPosition(x,y);
		This.setDimensions(w, h);
	}	
	if(this.width || this.height)
		this.setDimensions(this.width, this.height);
	if(this.x || this.y)
		this.setPosition(this.x, this.y);
	if(this.alpha)
		this.setOpacity(this.alpha);
	if(io)
		this.setHandlers(io);
	
	//private
	function isNum(num){ if(!num) return false; else return typeof(num) == 'number' };	
}