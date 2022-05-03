function Physics(){
	
	//the shortest distance between two points... 
	this.linear = function(x){ return x; }
	
	//easing using quadratic equasions...
	this.easeIn = function(x){ return Math.pow(x,2); }
	this.easeOut = function(x){ return 1 - Math.pow((x-1), 2); }
	
	//easing using trig equasions.. 
	
	//ease in and out... 
	this.sineWave = function(x){ return Math.sin(x*Math.PI/2); }
	
	
	//TODO:
	//this.setSpring(amp, gamma)
	
	this.spring = function(x){
		if(x < 0.65)
			return 1.1 * Math.sin(x * (Math.PI/1.5666) ); 
		else if(x < 1)
			return 1 + 0.1 * Math.sin(3.3 * (x +0.21) * Math.PI);	
		else
			return 1;
		
	}
	
	//TODO: figure out kinematic parameters...  
	this.snap = function(x){ 
		if(x < 1)
			return 1.1 * Math.sin(x * (Math.PI/1.5666) );  
		else
			return 1;
	}
}
//var physics = new Physics();