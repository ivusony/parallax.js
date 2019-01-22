;
(function () {
    var ratio = 20;
        duration = 0.5;
   var div = document.querySelector('#first');
   var halfx = document.querySelector('#second');
   var halfy = document.querySelector('#third');


   halfx.style.left = window.innerWidth/2 + 'px';
   halfy.style.top = window.innerHeight/2 + 'px'; 

   

    // div.style.left = window.innerWidth/2 - 100 +'px';
    // div.style.top = window.innerHeight/2 - 100 +'px';


   console.log("Screen: " + screen.width + ' : ' + screen.height);
   console.log("Window: "+window.innerWidth + ' : ' + window.innerHeight);

   var divPos = div.getBoundingClientRect();
   var x = divPos.left + (divPos.width/2);
   var y = divPos.top + (divPos.height/2);


  

   window.addEventListener('mousemove', function(e){
       


       if(divPos.x>e.clientX){
           if(divPos.y>e.clientY){
                div.style.transform = `translate3d(-${(x - e.clientX)/ratio}px,-${(y - e.clientY)/ratio}px,0)`;
                div.style.transition = 'transition-duration ' + duration + 's';
           }else{
                div.style.transform = `translate3d(-${(x - e.clientX)/ratio}px,${(e.clientY - y)/ratio}px,0)`;
                div.style.transition = 'transition-duration ' + duration + 's';
           }
       }else{ //if divX < clientX
            if(divPos.y>e.clientY){
                div.style.transform = `translate3d(${(e.clientX - x)/ratio}px,-${(y - e.clientY)/ratio}px,0)`;
                div.style.transition = 'transition-duration ' + duration + 's';
            }else{
                div.style.transform = `translate3d(${(e.clientX - x)/ratio}px,${(e.clientY - y)/ratio}px,0)`;
                div.style.transition = 'transition-duration ' + duration + 's';
            }
       }
       
   })

  
})();
