(function(d) {
   'use strict';

    var sections=document.querySelectorAll(".podcast-item");

    Array.from(sections).forEach(function(s){
	var audio=s.querySelector(".audioPlayer");
        var timecodeLinks=s.querySelectorAll('.player__timecode');

        Array.from(timecodeLinks).forEach(function(r){
            var e=r.innerText,
                t=function(r) {
	            var e=r.split(":").map(Number);
		    return 60*e[0]+e[1]}(r.innerText);
            r.addEventListener("click",function(l){
	        l.preventDefault();
                audio.currentTime=t;
	        audio.play();
            });
        });
    });

}(document));
