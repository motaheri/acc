// JavaScript Document
// By Mohammad Taheri http://pictor.us
// Please leave credit when used.

/* Suppress Errors */
function DmpError()
{
	return true;
}
window.onerror = DmpError;



/* Chrome is still buggy lets help ot out */
var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1; 
function chromeStyle(rome)
{
	if (rome){document.write('<style type="text/css">#credit {opacity:1}</style>')}
}


/* javascript hides google title helpers and about description On Load, oh boy am I cryptic */
function seoHide(){
	document.write('<s');
	document.write('tyle type="text/cs');
	document.write('s">	.blind, .se');
	document.write('o {display:none;visibility:hidden;}'); 
	document.write('</style>');
}


// iPhone / iPod user test
window.ifonTest = false;
function ifon()
{
	if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)))
	{ 
	window.ifonTest = true; // a window variable that tells us if the user is on an iPhone
	// location.replace("http://tumblephone.com/acc/");
	}
}


// iPhone / iPod compatible music
function embedMp3(ea)
{
	ifon();
	if(window.ifonTest)
	{
		document.write('<div class="music-poster"><a title="click here to play the music mp3" href="'); 
		document.write(ea);
		document.write('"><img src="http://u1.ipernity.com/10/31/65/3603165.fa91ef0c.gif" alt="click here to play the music mp3" width="207" height="27"></a></div>');
	}
}



/* Show Hide basic Toggle script */
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
	if (document.getElementById('notesDes')) {
		var obj = document.getElementById('notesDes');
		obj.style.display = 'none';  
	}
}


window.styleArray = new Array('beige','noir','vogue');


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
			case 'notes':
				popIt('notesDes');  // show notes
				break;
			default:
				if (styleArray.inArray(anchorId)){toggleStyle(anchorId);} // maybe it's a style call?
			  break;
		}
	}
}

/* Show Notes using Purple Include */
window.notesToggled = 0;
function showNotes()
{
	popFade('notesDes');
	if (window.notesToggled == 0)
	{
		purpleInclude.run();
		window.notesToggled++;
	}
}


function shiftStyle(i) // shift to next style
{
		(i == styleArray.length-1)? i=0 : i++;
		window.switchStyle = styleArray[i];
		setActiveStyleSheet(window.switchStyle);
}
function whatsNext() // which style is next?
{
		window.switchStyle = getActiveStyleSheet(); // where are we now?
		var i = styleArray.indexOf(window.switchStyle,0,1); /* which number?*/
		(i >= styleArray.length-1)? i=0 : i++;
		window.nextStyle = styleArray[i]; // next style
}

function toggleStyle(ile) // the toggle function
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
function loadStyle() { // if so load it!
	window.switchStyle = (window.styleCookie == undefined || window.styleCookie == "null") ?  getPreferredStyleSheet() : window.styleCookie;
	setActiveStyleSheet(window.switchStyle);
}
window.onunload = function(e) { // save it on window close
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



// Set Style, then Set Cookie so it will remember it for 365 Days 
// A List Apart http://www.alistapart.com/articles/alternate/
function setActiveStyleSheet(title) {
  var i, a, main;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")) {
      a.disabled = true;
      if(a.getAttribute("title") == title) a.disabled = false;
    }
  }
  window.switchStyle = title;
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
  return null; //really?
}
/*
window.onload = function(e) {
  var cookie = readCookie("style");
  var title = cookie ? cookie : getPreferredStyleSheet();
  setActiveStyleSheet(title);
}
*/

	