function Draggable(element, io){
	if (!io) io = {};
	var This = this;
	var xoffset = 0;
	var yoffset = 0;
	this.listeners = new Array();
	this.drag = false;
	this.onTarget = false;
	this.onOver = io.onrollover ? io.onrollover : false;
	this.onOut = io.onrollout ? io.onrollout : false;
	this.onDouble = io.ondouble ? io.ondouble : false;
	this.constrainX = io.constrainX ? true : false;
	this.constrainY = io.constrainY ? true : false;
	this.dragZ = io.dragZ ? io.dragZ : 900;
	this.defaultZ = io.defaultZ ? io.defaultZ : 10;
	this.addListener = function(object){
		this.listeners[this.listeners.length] = object;
	}
	this.broadcast = function(e){
		for(var l=0;l<This.listeners.length;l++){
			eval('This.listeners[l].on' + e + '(This)');
		}
	}	
	this.doDrag = function(e){
		var ei = new EventInfo(e);
		if(This.drag){
			var nx = This.constrainX ? This.element.getRealLeft() : ei.xmouse-xoffset;
			var ny = This.constrainY ? This.element.getRealTop() : ei.ymouse-yoffset
			This.element.setPosition(nx,ny);
			delete nx; delete ny;
			This.broadcast('Drag');
		}
		delete ei;
	}
	this.start = function(e){ 
		var ei = new EventInfo(e);
		xoffset = ei.xmouse-This.element.getRealLeft();
		yoffset = ei.ymouse-This.element.getRealTop();
		This.element.setStyleProperty('zIndex',This.dragZ);
		This.element.setStyleProperty('cursor','move');
		This.drag = true;
		if(This.onStart) This.onStart(ei, This); 
		delete ei;
	}	
	this.stop = function(e){
		var ei = new EventInfo(e, true);
		This.element.setStyleProperty('zIndex',This.defaultZ);
		This.element.setStyleProperty('cursor','');	
		if(This.drag) This.broadcast('StopDrag');
		This.drag = false; 
		if(This.onStop) This.onStop(ei, This);
		delete ei;
	}
	this.element = new Element(element, { onpress:this.start, onrollover:this.onOver, onrollout:this.onOut, ondouble:this.onDouble, onrelease:this.stop, onmove:this.doDrag});
	this.element.forceAbsolute();
	this.element.setStyleProperty('zIndex',this.defaultZ);
	this.originX = this.element.getRealLeft();
	this.originY = this.element.getRealTop();
	this.currentTarget = null;
	this.onStop = io.onStop ? io.onStop : false;
	this.onStart = io.onStart ? io.onStart : false;
	this.onMiss = io.onMiss ? io.onMiss : false;
	dragRegistry.addListener(this);
}
function DragTarget(id, io){
	var This = this;
	this.element = new Element(id);
	this.overTarget = false;
	if(!io) io = {};
	this.hoverClass = io.hoverClass ? io.hoverClass : "";
	this.offClass = io.offClass ? io.offClass : "";
	this.onDrop = io.onDrop ? io.onDrop : false;
	this.onDrag = function(drag){
		if(checkBounds(drag)){
			drag.onTarget = true;
			This.element.setClass(This.hoverClass);
		}else{
			drag.onTarget = false;
			This.element.setClass(This.offClass);
		}
	}
	this.onStopDrag = function(drag){
		if(checkBounds(drag)){
			if(This.onDrop) This.onDrop(This, drag);
			This.element.removeClass(This.hoverClass);
		}else{
			if(drag.onMiss && !drag.onTarget) drag.onMiss(This, drag);
			This.element.removeClass(This.hoverClass);
		}
	}
	function checkBounds(drag){
		var x = This.element.getRealLeft();
		var y = This.element.getRealTop();
		var w = This.element.getRealWidth();
		var h = This.element.getRealHeight();
		var dx = drag.element.x+drag.element.getRealWidth()/2;
		var dy = drag.element.y+drag.element.getRealHeight()/2;
		if(dx > x && dx < (x + w))
			if(dy > y && dy < (y + h))
				return true;
		return false;		
	}
	
}
// DragRegistry 
// broadcasts events to draggable elements from the document mouse handlers 
// the element onmouseup is not used in case the user mouse goes astray from the element.
function DragRegistry(){
	var This = this;
	var listeners = new Array();
	this.lastEvent = null;
	this.addListener = function(obj){
		listeners.push(obj);
	}
	this.broadcastUp = function(e){
		This.lastEvent = e;
		for(var l =0; l < listeners.length; l++)
				listeners[l].stop(e);
	}
	this.broadcastMv = function(e){
		This.lastEvent = e;
		for(var l =0; l < listeners.length; l++){
				listeners[l].doDrag(e);
		}
	}
	document.onmouseup=this.broadcastUp;
	document.onmousemove=this.broadcastMv;
} dragRegistry = new DragRegistry();