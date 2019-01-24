;
(function (global) {

    
    function factory(element, ratio, duration, ease){
        
        //returns the css text string
        function returnCSSText (){
            return  "-webkit-transition: all " + duration + "s "+ ease + "; -webkit-transition: all " + duration +"s "+ ease +";-moz-transition: all "+ duration +"s " + ease +";-o-transition: all "+ duration +"s "+ ease +";transition: all "+ duration +"s "+ ease +", 1.195);transform-origin: cemter;-webkit-backface-visibility: hidden;"
        }


        var elementPos = element.getBoundingClientRect();
        //calculate new x and y of the element, so that the calculations can be made from the elements center
        var elementCenterPosition = (function(currentPos){
            return {
                x   :   currentPos.left + (currentPos.width/2),
                y   :   currentPos.top + (currentPos.height/2)
            }
        })(elementPos)
     

        element.style.cssText = returnCSSText();

        window.addEventListener('mousemove', function(e){
           (function(e){
               setTimeout(function(){
                    if(elementPos.x>e.clientX){ //
                        if(elementPos.y>e.clientY){
                            element.style.transform = `translate3d(-${(elementCenterPosition.x - e.clientX)/ratio}px,-${(elementCenterPosition.y - e.clientY)/(ratio/2)}px,0)`;
                        }else{
                            element.style.transform = `translate3d(-${(elementCenterPosition.x - e.clientX)/ratio}px,${(e.clientY - elementCenterPosition.y)/(ratio/2)}px,0)`;
                        }
                    }else{ //if divX < clientX
                            if(elementPos.y>e.clientY){
                                element.style.transform = `translate3d(${(e.clientX - elementCenterPosition.x)/ratio}px,-${(elementCenterPosition.y - e.clientY)/(ratio/2)}px,0)`;
                            }else{
                                element.style.transform = `translate3d(${(e.clientX - elementCenterPosition.x)/ratio}px,${(e.clientY - elementCenterPosition.y)/(ratio/2)}px,0)`;
                            }
                    }
                },1)
           })(e)
        })

        // as long as it continues to be invoked, raise on every interval
        function throttle (event, func, interval) {
            console.log(event);
            var timeout;
            return function() {
                var later = function () {
                    timeout = false;
                };
                if (!timeout) {
                    func(event)
                    timeout = true;
                    setTimeout(later, interval)
                }
            }
        }

        

        element.addEventListener('transitionend' , function(e){
            console.log('Transition has ended')
        })

        //if screen is resized
        
    } //end of factory

    

   const parallax = function(elementToBeAnimated, ratio, duration, ease){

        //checking passed parameters, setting default values
        if(!elementToBeAnimated)return parallax;

        if(!ratio || typeof ratio == 'string'){
            ratio = 20
        }
        if(!duration || typeof duration == 'string' || duration>10){
            duration = 3
        }
        if(!ease){
            ease = " cubic-bezier(0.000, 0.000, 0.460, 1.1)"
        }

        //if string is passed
        if(typeof elementToBeAnimated === 'string'){
            if(!document.querySelector(elementToBeAnimated)){
                return
            }else{
                return factory(document.querySelector(elementToBeAnimated), ratio, duration, ease);
            }
        }
        //if node is passed
        if(typeof elementToBeAnimated === 'object'){
            return factory(elementToBeAnimated, ratio, duration, ease)
        }
       
   }

   

   global.parallax = parallax;
   return parallax
})(window);
