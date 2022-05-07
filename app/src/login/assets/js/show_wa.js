var show_time;
var notif = true;
function posY(elm) {
    var test = elm, top = 0;

    while(!!test && test.tagName.toLowerCase() !== "body") {
        top += test.offsetTop;
        test = test.offsetParent;
    }

    return top;
}

function viewPortHeight() {
    var de = document.documentElement;

    if(!!window.innerWidth)
    { return window.innerHeight; }
    else if( de && !isNaN(de.clientHeight) )
    { return de.clientHeight; }
    
    return 0;
}

function scrollY() {
    if( window.pageYOffset ) { return window.pageYOffset; }
    return Math.max(document.documentElement.scrollTop, document.body.scrollTop);
}

function checkvisible( elm ) {
    var vpH = viewPortHeight(), // Viewport Height
        st = scrollY(), // Scroll Top
        y = posY(elm);
    
    return (y > (vpH + st));
}

var sleep = true;
document.addEventListener('scroll', function () {


    if(!checkvisible(document.getElementById("fiveth")))
    {
        document.getElementById("whatsapp_hover").style.display = "block"
        if(notif == true)
        {
            notif = false
            display_notif();
            
        }
      
      // document.getElementById("whatsapp_hover").getElementsByTagName("i")[0].className = "fade_animate"
    }
    else
    {
        if(notif == false)    {
            notif = true
            document.getElementById("whatsapp_hover").style.display = "none"
            window.clearTimeout( show_time );
            if(show_time){}
           // document.getElementById("whatsapp_hover").getElementsByTagName("i")[0].className = ""
        }
    }

  
    
}, {
    passive: true
});

var isScrolling;

// Listen for scroll events
document.addEventListener('scroll', function ( event ) {
    document.getElementById("scrolled").style.display = "none"
	// Clear our timeout throughout the scroll
	window.clearTimeout( isScrolling );

	// Set a timeout to run after scrolling ends
	isScrolling = setTimeout(function() {

		// Run the callback
		document.getElementById("scrolled").style.display = "block"

	}, 5000);

}, false);

var nama = `Ariono
Vina
Isli
Haura
Eha
Emiyati
Puji
Asep
Sri
Budi
Ade
Ahmad
Siti
Muslimah
Gus
Kuswara
Uun
Risti
Sutrisno
Komaridi
Mila
Yayan
Ike
Suryani
Ela
Rinda
Sugiarti`
nama = nama.split("\n");
var paket = ['6','12'];
Array.prototype.sample = function(){
  return this[Math.floor(Math.random()*this.length)];
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }
function display_notif()
{
    if(notif == false)
    {
         show_time = setTimeout(function (){
            document.getElementById("notif").getElementsByTagName("span")[0].innerText =`${nama.sample()} membeli\n PAKET ${paket.sample()} BULAN !`
            document.getElementById("notif").style.display = "block"
            remove_notif()
        },getRandomInt(3000,7000))
    }
}
function remove_notif(){
    setTimeout(function (){
        document.getElementById("notif").style.display = "none"
        display_notif()
    },3000)
}