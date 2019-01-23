;
(function (global) {

    
    function factory(element, ratio){
        if(!ratio){
            ratio = 20
        }
        var duration = 1;
        // var div = element;
        

   

        // div.style.left = window.innerWidth/2 - 100 +'px';
        // div.style.top = window.innerHeight/2 - 100 +'px';


//         console.log("Screen: " + screen.width + ' : ' + screen.height);
//    console.log("Window: "+window.innerWidth + ' : ' + window.innerHeight);


        var elementPos = element.getBoundingClientRect();
        //calculate new x and y of the element, so that the calculations can be made from the elements center
        var elementCenterPosition = (function(currentPos){
            return {
                x   :   currentPos.left + (currentPos.width/2),
                y   :   currentPos.top + (currentPos.height/2)
            }
        })(elementPos)
     


  
        element.style.cssText =  "-webkit-transition: all 1300ms cubic-bezier(0.000, 0.000, 0.460, 1); -webkit-transition: all 1300ms cubic-bezier(0.000, 0.000, 0.460, 1.195);-moz-transition: all 1300ms cubic-bezier(0.000, 0.000, 0.460, 1.195);-o-transition: all 1300ms cubic-bezier(0.000, 0.000, 0.460, 1.195);transition: all 1300ms cubic-bezier(0.000, 0.000, 0.460, 1.195);transform-origin: cemter;-webkit-backface-visibility: hidden;"

        window.addEventListener('mousemove', function(e){
            //translate3d(X, Y, Z)
            if(elementPos.x>e.clientX){ //
                if(elementPos.y>e.clientY){
                    element.style.transform = `translate3d(-${(elementCenterPosition.x - e.clientX)/ratio}px,-${(elementCenterPosition.y - e.clientY)/ratio}px,0)`;
                }else{
                    element.style.transform = `translate3d(-${(elementCenterPosition.x - e.clientX)/ratio}px,${(e.clientY - elementCenterPosition.y)/ratio}px,0)`;
                }
            }else{ //if divX < clientX
                    if(elementPos.y>e.clientY){
                        element.style.transform = `translate3d(${(e.clientX - elementCenterPosition.x)/ratio}px,-${(elementCenterPosition.y - e.clientY)/ratio}px,0)`;
                    }else{
                        element.style.transform = `translate3d(${(e.clientX - elementCenterPosition.x)/ratio}px,${(e.clientY - elementCenterPosition.y)/ratio}px,0)`;
                    }
            }
            
        })

        element.addEventListener('transitionend' , function(e){
            console.log('Transition has ended')
        })

        //if screen is resized
        
    } //end of factory

    

   const parallax = function(elementToBeAnimated, ratio){
        if(!elementToBeAnimated)return parallax;

        //if string is passed
        if(typeof elementToBeAnimated === 'string'){
            if(!document.querySelector(elementToBeAnimated)){
                return
            }else{
                return factory(document.querySelector(elementToBeAnimated), ratio);
            }
        }
        //if node is passed
        if(typeof elementToBeAnimated === 'object'){
            return factory(elementToBeAnimated, ratio)
        }
       
   }
   global.parallax = parallax;
   return parallax
})(window);
