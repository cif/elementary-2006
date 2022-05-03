function Timer(duration, updateInterval, listener){
  
	this.update = (updateInterval) ? updateInterval : (1/24); //default is 24 frames per second..
	this.duration = (duration) ? duration : 1;
	this.listeners = new Array();
	if(listener) this.listeners.push(listener);
	
	//private vars
	var time = 0;  var timer = null;
	var self = this; var check;
	
	this.addListener = function(listenerObj){
		this.listeners.push(listenerObj);
	}
	
	this.start = function(duration, interval){
		if(duration) this.duration = duration;
		if(interval) this.update = interval;
		check = this.update;
		run();
	}
	
	this.stop = function(nocall){ 
		window.clearTimeout(timer);
		time = this.duration; 
		for(var l=0; l < self.listeners.length; l++)
			self.listeners[l].call(this, self); 
		
	}
							 
	this.getTime = function(){ return time; }
	this.reset = function() {  window.clearTimeout(timer); 
									   time = 0; 
									   check = 0; 
										timer = null; 
									}
	//private run
	function run(){
		if(time <= self.duration){
			if(time >= check){
				for(var l=0; l < self.listeners.length; l++)
						self.listeners[l].call(this, self);
				check += self.update;	
			}
			time+= 0.01;			
			loop();
			return;	
		}
	  self.stop();
	}
	
	function loop(){
		timer = window.setTimeout(run, 10);
	}
};
