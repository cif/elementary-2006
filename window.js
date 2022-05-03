function _window(win){

  //without scrolling
  if( typeof( win.innerWidth ) == 'number' ) {
  //moz, opera
  this.width = win.innerWidth;
  this.height = win.innerHeight;
  } else if( document.documentElement &&
  ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
  //ie
  this.width = document.documentElement.clientWidth;
  this.height = document.documentElement.clientHeight;
  }

  //window scrolling..
  if( typeof( win.pageYOffset ) == 'number' ) {
    //Netscape compliant
    this.vscroll = win.pageYOffset;
    this.hscroll = win.pageXOffset;
  } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
    //DOM compliant
    this.vscroll = document.body.scrollTop;
    this.hscroll = document.body.scrollLeft;
  } else if( document.documentElement &&
      ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
    //IE6 standards compliant mode
    this.vscroll = document.documentElement.scrollTop;
    this.hscroll = document.documentElement.scrollLeft;
  }


 //get dimensions for percentage values in pixels
 this.getPixelHeight = function(percent){
  return Math.floor(this.height * (percent/100)); 
 }
 
this.getPixelWidth = function(percent){
  return Math.floor(this.width * (percent/100)); 
 }


}