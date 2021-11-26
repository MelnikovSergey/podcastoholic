(function(id) {
   'use strict';
    
    var modalId;
    var clickId=document.querySelectorAll(".modal-link");
    var closeLinks=document.querySelectorAll(".close-link"); 
    
    Array.from(clickId).forEach(function(id){
      id.addEventListener("click",function(){
        return modalId=this.dataset.id;
      });
    });
    
    Array.from(closeLinks).forEach(function(close){
      close.addEventListener("click",function(){
        this.href='#';
        this.href+=modalId;
      });
    });

}(document));



