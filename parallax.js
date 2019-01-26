;
(function (global) {

    
    function factory(){

        return{
            follow : function(ratio, duration, ease){
                var element = this;

                if(!ratio || typeof ratio == 'string'){
                    ratio = 20
                }
                if(!duration || typeof duration == 'string' || duration>10){
                    duration = 3
                }
                if(!ease){
                    ease = " cubic-bezier(0.000, 0.0, 0.7, 1.000)"
                }
                 //returns the css text string
                        function returnCSSText (){
                            // return  "-webkit-transition: all " + duration + "s "+ ease + "; -webkit-transition: all " + duration +"s "+ ease +";-moz-transition: all "+ duration +"s " + ease +";-o-transition: all "+ duration +"s "+ ease +";transition: all "+ duration +"s "+ ease +", 1.195);transform-origin: cemter;-webkit-backface-visibility: hidden;"
                            return "-webkit-transition: all 0.5s ease-out"
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

                        


                        //throtler function

                        var throttler = function(delay, cb){
                            let lastCall = 0;
                            return function(e){
                                let now = (new Date).getTime();
                                if(now - lastCall < delay)return;
                                lastCall = now;
                                return cb(e)
                            }
                        }


                        var animator = function(e){
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
                        }

                        window.addEventListener('mousemove', throttler(10, animator)); //don't run animator unless 5ms has passed from the last call
                }//end of follow

                
        }//end of object
        
       
       
        
    } //end of factory

   
    

   const init = function(elementToBeAnimated){

        //checking passed parameters
        if(!elementToBeAnimated)return init;

        //if string is passed
        if(typeof elementToBeAnimated === 'string'){
            if(!document.querySelector(elementToBeAnimated)){
                return
            }else{
                //return current proto of element
                let currentPrototype = document.querySelector(elementToBeAnimated).__proto__;
                // Object.setPrototypeOf(document.querySelector(elementToBeAnimated), factory());
                currentPrototype.follow = factory().follow;
                return  document.querySelector(elementToBeAnimated)
            }
        }
        //if node is passed
        if(typeof elementToBeAnimated === 'object'){
            let currentPrototype = elementToBeAnimated.__proto__;
            currentPrototype.follow = factory().follow;
            return elementToBeAnimated;
        }
       
   }

   

   global.parallax = init;
   return init
})(window);
