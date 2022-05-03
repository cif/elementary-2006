function Animation(el, io){
	var This = this;
	this.element = new Element(el, io);
	var next = function(){ };
	var args = false;
	this.update = function() { 
		var t = This.trans( This.time.getTime() / This.dur );
		if(isNum(da)){
			var na  = oa + (t * da);
			This.element.setOpacity(na);
		}
		if(isNum(dx) || isNum(dy)){
			var nx  = ox + t * dx;  	     
			var ny  = oy + t * dy;
			This.element.setPosition(nx, ny);
		}
		if(isNum(dw) || isNum(dh)){
			var nw  =  ow + (t * dw);  	     
			var nh  =  oh + (t * dh);
			if(This.element.center){
				var cx = (This.element.width - nw) * This.element.center.x;
				var cy = (This.element.height - nh) * This.element.center.y;
				This.element.setPosition( This.element.x + cx, This.element.y + cy);
			}
			This.element.setDimensions(nw, nh);
		}
		if(observer) observer();
		if(t == 1){
			//finish any lame miscalculations
			if(isNum(_effect.y)) This.element.element.style.top = _effect.y;
			if(isNum(_effect.x)) This.element.element.style.left = _effect.x;
			this.complete = true;
			try{ next(args);
				 next = new function(){};
			}catch(e){ }
		}
	}
	var _effect;
	var oa; var ox; var oy; var ow; var oh; 
	var da; var dx; var dy; var dw; var dh;
	this.effect = function(fect, after, afterArgs){
		_effect = fect;
		if(fect.duration) This.dur = fect.duration;
		if(fect.fps) This.fps = fect.fps;
		if(fect.trans) This.trans = fect.trans;
		if(after) next = after;
		if(afterArgs) args = afterArgs;
		if(isNum(fect.alpha)){   oa = This.element.alpha;     da = fect.alpha - oa; }
		if(isNum(fect.width)){  ow = This.element.width;   dw = fect.width - ow;  }
		if(isNum(fect.height)){  oh = This.element.height;  dh = fect.height - oh; }
		if(isNum(fect.x)){	 ox = This.element.x;       dx = fect.x - ox;  }
		if(isNum(fect.y)){	  oy = This.element.y;	    dy = fect.y - oy; }
		this.complete = false;
		this.time.reset();
		this.time.start(This.dur, This.fps);
	}
	
	var observer = false
	this.setUpdateObserver= function(obj){ observer = obj; }
	this.linear = function(x){ return x; }
	if(!io) io = { };
	this.time = new Timer(this.dur, this.fps, this.update);
	this.trans = (!io.trans) ? this.linear : io.trans;
	this.fps = (io.fps) ? io.fps : (1/24);
	this.dur = (io.duration) ? io.duration : 1;
	this.complete = true;
	function isNum(val) { 
		if(val==0) 
			return true; 
		else if(typeof(val) == 'number');
		 	return true;
		return false; }
}