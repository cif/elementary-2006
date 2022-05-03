function List(id, elementIo, change){
	var This=this;
	this.element = new Element(id, elementIo);	
	this.onUpdate = change ? change : false;
	this.onDrag = function(drag){
		var ox = drag.originX; var oy = drag.originY; 
		for(var i=0;i<This.drags.length;i++){
			var d = This.drags[i];
			if(drag.index!=i  
				&& (drag.element.y > d.originY)
				&& (drag.element.y < d.originY + d.element.getRealHeight()/2)){
				swap(drag.order,This.drags[i].order);
				var a = new Animation(This.items[i],{x:This.drags[i].originX,y:This.drags[i].originY});
					a.effect({x:ox,y:oy,duration:0.2});
				drag.originX = This.drags[i].originX;
				drag.originY = This.drags[i].originY;
				This.drags[i].originX = ox;
				This.drags[i].originY = oy;				
			}
		}
	}
	this.onStopDrag = function(drag){
		var a = new Animation(This.items[drag.index],{x:drag.element.getRealLeft(),y:drag.element.getRealTop()});
			a.effect({x:drag.originX,y:drag.originY,duration:0.2});
		if(This.onUpdate) This.onUpdate(This, This.order);	
	}
	this.addItem = function(){
		This.element.append("li","new");
		This.init();		
	}
	this.removeItem = function(i){
		This.element.remove(This.items[i]);
		This.init();		
	}
	function swap(a,b){
		var ai = _index(This.order,a);
		var bi = _index(This.order,b);
		var t = This.order[ai];
		This.order[ai] = This.order[bi];
		This.order[bi] = t;		
	}
	this.init = function(){	
	
		This.items = this.element.getChildren('li');
		This.drags = new Array();
		This.order = new Array();		
		for(var i = 0; i < This.items.length; i++){
			var it = new Draggable(This.items[i]);
				it.index = i;
				it.order = i+1;
				var y = i*it.element.getRealHeight(); 	
				it.element.setPosition(it.element.x,y);	
				it.addListener(This);
				it.originX = it.element.getRealLeft();
				it.originY = it.element.getRealTop();			
			this.drags.push(it);
			this.order.push(i+1);			
		}
		this.element.setDimensions(this.element.width, this.drags.length * this.drags[0].element.getRealHeight());			
	}
	this.init();	
	function _index(arr,val){ for(var a=0;a<arr.length;a++) if(arr[a]==val) return a; return -1; }
}