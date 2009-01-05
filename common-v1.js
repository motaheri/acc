// JavaScript Document
// By Mohammad Taheri http://pictor.us
// Please leave credit when used.

/* Suppress Errors */
function DmpError()
{
	return true;
}
window.onerror = DmpError;


/* javascript hides google titles helpers and about description on load */
document.write('<style type="text/css">	.blind {display:none;visibility:hidden;}</');
document.write('style>');


/* redirection for iPhone / iPod users to the iPhone friendly page */
function ifon()
{
	if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)))
	{
	location.replace("http://tumblephone.com/acc/");
	}
}

/* Show Hide Basic Toggle script */
function popFade(divID)
{ // check if div is visible, if not make it visible
	window.divToggleID = divID;
	var obj = document.getElementById(divToggleID);
	if (obj.style.display == 'none') { popIt(divToggleID);}else{removeIt(divID);}
}
function popIt(divID)
{
	
	var obj = document.getElementById(divID);
	obj.style.visibility = 'visible'; 
	obj.style.display = 'block'; 
	//var popFX  = new Fx.Style(divID, 'opacity', {duration: 0}).custom(0,1);
}

function removeIt(divID)
{
		var obj = document.getElementById(divID);
		obj.style.display = 'none';
		obj.style.visibility = 'hidden';
}
/* function fadeIt(divID)
{
	var fadeFX  = new Fx.Style(divID, 'opacity', {duration: 500}, { onComplete: function(){ removeIt(divID); } }).custom(.5,0);
}
*/



/* Get anchor name and initialize Show Hide Toggle */
function initializeHide(){
	if (document.getElementById('aboutDes')) {
		var obj = document.getElementById('aboutDes');
		obj.style.display = 'none';
	}
	if (document.getElementById('followingPpl')) {
		var obj = document.getElementById('followingPpl');
		obj.style.display = 'none';  
	}
}
function initializePop(){
	var thisURL = document.location.href;
	var splitURL = thisURL.split("#");
	var anchorId = splitURL[1];
	if (anchorId) //if not empty
	{
		switch(anchorId)
		{ 
			case 'about':
			  popIt('aboutDes'); // show about description
			  break;    
			case 'following':
			  popIt('followingPpl');  // show following
			  break;
			default:
			  toggleStyle(anchorId);  // maybe its a style call?
			  break;
		}
	}
}



window.styleArray = new Array('default','noir','beige');

function shiftStyle(i) //shift to next style
{
		(i == styleArray.length-1)? i=0 : i++;
		window.switchStyle = styleArray[i];
		setActiveStyleSheet(window.switchStyle);
}
function whatsNext() //which style is next?
{
		window.switchStyle = getActiveStyleSheet(); // where are we now?
		var i = styleArray.indexOf(window.switchStyle,0,1); /* which number?*/
		(i >= styleArray.length-1)? i=0 : i++;
		window.nextStyle = styleArray[i]; // next style
}

function toggleStyle(ile) //the toggle function
{	
	if(styleArray.inArray(ile)) // if its a style call - check if style exists
	{
		window.switchStyle = ile; setActiveStyleSheet(ile); // set the style variable and toggle skin
	} 
	else // if we are shifting skins
	{
		window.switchStyle = getActiveStyleSheet(); // where are we now?
		window.styleNumb = styleArray.indexOf(window.switchStyle,0,1); // which number?
		shiftStyle(window.styleNumb); 
	}
	createCookie("style", window.switchStyle, 365);
	fixButton();
}
function fixButton() //updates the href and title value of toggle button
{
	window.styleNumb = styleArray.indexOf(window.switchStyle,0,1); // find the style number 
	hrefVal = styleArray[window.styleNumb++]; //set the button link to its next vale
	document.getElementById('styletoggle').href = '#'+hrefVal;
	whatsNext();
	document.getElementById('styletoggle').title = 'toggle '+nextStyle+' skin';	
}
function initializeStyle() { // do we have a cookie?
	window.styleCookie = readCookie("style");
}
function loadStyle() { //if so load it!
	window.switchStyle = (window.styleCookie || window.styleCookie != "null") ? window.styleCookie : getPreferredStyleSheet();
	setActiveStyleSheet(window.switchStyle);
}
window.onunload = function(e) { //save it on close window
  var title = getActiveStyleSheet();
  createCookie("style", title, 365);
}


// Array.indexOf( value, begin, strict ) - Return index of the first element that matches value
Array.prototype.indexOf = function( v, b, s ) {
 for( var i = +b || 0, l = this.length; i < l; i++ ) {
  if( this[i]===v || s && this[i]==v ) { return i; }
 }
 return -1;
};

Array.prototype.inArray = function (value)
// http://hiox.org/index.php?id=102
// Returns true if the passed value is found in the
// array. Returns false if it is not.
//    if (myList.inArray('search term')) {
//    	Found it!
//    }
{
var i;
for (i=0; i < this.length; i++) {
// Matches identical (===), not just similar (==).
if (this[i] === value) {
return true;
}
}
return false;
};



// set style, then set cookie so it will remember it for 365 days 
// A List Apart http://www.alistapart.com/articles/alternate/
function setActiveStyleSheet(title) {
  var i, a, main;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")) {
      a.disabled = true;
      if(a.getAttribute("title") == title) a.disabled = false;
    }
  }
}

function getActiveStyleSheet() {
  var i, a;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title") && !a.disabled) return a.getAttribute("title");
  }
  return null;
}

function getPreferredStyleSheet() {
  var i, a;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1
       && a.getAttribute("rel").indexOf("alt") == -1
       && a.getAttribute("title")
       ) return a.getAttribute("title");
  }
  return null;
}

function createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}
/*
window.onload = function(e) {
  var cookie = readCookie("style");
  var title = cookie ? cookie : getPreferredStyleSheet();
  setActiveStyleSheet(title);
}
*/

	