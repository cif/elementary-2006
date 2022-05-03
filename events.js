function EventInfo(e, cancel){
		
  if (!e) var e = window.event;
  
  //source
  if (e.target) this.source = e.target;
  else if (e.srcElement) this.source = e.srcElement;
  if (this.source.nodeType == 3) //safari bug
  this.source = this.source.parentNode;
  
  //coordinates
  if (e.pageX || e.pageY) {
    this.xmouse = e.pageX;
    this.ymouse = e.pageY;
  }
  else if (e.clientX || e.clientY) {
    this.xmouse = e.clientX + document.body.scrollLeft;
    this.ymouse = e.clientY + document.body.scrollTop;
  }
  
  if(cancel){
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
  }	
}

