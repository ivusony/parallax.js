;
(function (global) {
    function factory(element, ratio){
        if(!ratio){
            ratio = 20
        }
        var duration = 1;
        var div = element;
        console.log(div);

   

        // div.style.left = window.innerWidth/2 - 100 +'px';
        // div.style.top = window.innerHeight/2 - 100 +'px';


//         console.log("Screen: " + screen.width + ' : ' + screen.height);
//    console.log("Window: "+window.innerWidth + ' : ' + window.innerHeight);

        var divPos = div.getBoundingClientRect();
        var x = divPos.left + (divPos.width/2);
        var y = divPos.top + (divPos.height/2);


  
        div.style.transition =  'all 0.3s ease 0s';

        window.addEventListener('mousemove', function(e){

            if(divPos.x>e.clientX){
                if(divPos.y>e.clientY){
                        div.style.transform = `translate3d(-${(x - e.clientX)/ratio}px,-${(y - e.clientY)/ratio}px,0)`;
                }else{
                        div.style.transform = `translate3d(-${(x - e.clientX)/ratio}px,${(e.clientY - y)/ratio}px,0)`;
                }
            }else{ //if divX < clientX
                    if(divPos.y>e.clientY){
                        div.style.transform = `translate3d(${(e.clientX - x)/ratio}px,-${(y - e.clientY)/ratio}px,0)`;
                    }else{
                        div.style.transform = `translate3d(${(e.clientX - x)/ratio}px,${(e.clientY - y)/ratio}px,0)`;
                    }
            }
            
        })

        //if screen is resized
        
    } //end of factory

    // window.addEventListener('resize', factory(div, ratio))

   const parallax = function(elementToBeAnimated, ratio){
       
        if(typeof elementToBeAnimated === 'string'){
            if(!document.querySelector(elementToBeAnimated)){
                return
            }else{
                return factory(document.querySelector(elementToBeAnimated), ratio);
            }
        }

        if(typeof elementToBeAnimated === 'object'){
            return factory(elementToBeAnimated, ratio)
        }
       
   }
   global.parallax = parallax;
   return parallax
})(window);
