function Slideshow( images, imgOne, imgTwo, io ){
	
	//  public
	this.images = images;
	this.play = function(){
		paused = false;
		run();
		if(status) status.setContent("playing");
	}
	this.pause = function(){
		window.clearTimeout(timer);
		paused = true;
		if(status) status.setContent("paused");
	}
	this.next = function(pse){
		current = (current == This.images.length-1) ? 0 : current + 1;
		doLoad(pse);
	}
	this.previous = function(pse){
		current = (current == 0) ? This.images.length -1 : current - 1;
		doLoad(pse);
	}
	
	//  private
	if(!io) io = {};
	//properties copied to animations
	var fr = io.framerate ? io.framerate : 1/19;
	var This = this;
	var one = new Animation(imgOne, { alpha:0.1, fps:fr });
	var two = new Animation(imgTwo, { alpha:0.1, fps:fr });
	var trans = io.transTime ? io.transTime : 1;
	var delay = io.interval ? io.interval * 1000 : 6000;
	var timer = null;
	var current = -1;
	var which = 1;
	var paused = false;
	var status = false;
	if(io.status_id)
		status = new Element(io.status_id, {});
	var loading = false;
	if(io.loader)
		loading = new Animation(io.loader, {alpha : 0.1});	
	function doLoad(pse){
		window.clearTimeout(timer);
		if(loading) loading.effect({alpha:99.9, duration:0.5});
		if(which == 1)
			document.images[imgOne].src = This.images[current];
		else
			document.images[imgTwo].src = This.images[current];
		if(pse)
			This.pause();
	}
	function onImgLoad(e){
		if(loading) loading.effect({alpha:0.01, duration:0.3}, out);
		if(which==1){
			one.effect({alpha:99.99, duration:This.transTime});
			two.effect({alpha:0.01, duration:This.transTime});
			which = 2;
		}else{
			one.effect({alpha:0.01, duration:This.transTime});
			two.effect({alpha:99.9, duration:This.transTime});
			which = 1;
		}
		if(!paused)
			timer = window.setTimeout(run, delay);
	}
	function out(){
		loading.element.setOpacity(0);
	}
	function run(){
		if(!paused){ 
			This.next();
			timer = window.setTimeout(run, delay);
		}
	}
	//assign handlers
	document.images[imgOne].onload = onImgLoad;
	document.images[imgTwo].onload = onImgLoad;			
}