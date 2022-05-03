function Request(handlers){
 	
  //event handler functions 
  this.onData = handlers.onData;
  this.onError = handlers.onError ? handlers.onError : false;
  this.onLoading = handlers.onLoading ? handlers.onLoading : false;
  this.lastRequest = "";
  
  var xmlhttp=false;
  var This = this;
  
  //create xmlhttp object.. http://jibbering.com/2002/4/httprequest.htm
  try { //ie
  	xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
 	} catch (e) {
 		 try {
  	 		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  		  } catch (E) {
   			xmlhttp = false;
  		 }
 	}

   if (!xmlhttp && typeof XMLHttpRequest!='undefined') { //moz
  		xmlhttp = new XMLHttpRequest();
    }

   this.stateChange = function( ){
		if ( xmlhttp.readyState == 4) {
        	if (xmlhttp.status == 200) {
		    	var response = (xmlhttp.responseText) ? xmlhttp.responseText : "";
				This.onData(response, This);
       		} else {
            	var e = xmlhttp.statusText;
				if(This.onError) This.onError(e, This);
        	}
	   }
   }
   
   this.send = function( url, requestHeaders ) {
	  if(xmlhttp){		
	    if(This.onLoading) This.onLoading();
  			xmlhttp.open("POST", url , true);
			xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
 			xmlhttp.onreadystatechange = This.stateChange;
			This.lastRequest = url;
			xmlhttp.send(null);
	   }else{
		   if(This.onError) This.onError("Sorry, your browser does not support remote requests.");
	   }
   }
}