;
(function (global) {

    
    function factory(originalProto){

        //setting the returned method object parent in prototype chain to be the original parent of the element
        //basically inserting this object between the element (the instance of the parent object) and the parent object linking 
        // the element back to original parent again, making all the built in methods available

        //SETTING PROTOTYPE STEP 2
        const customMethods = Object.create(originalProto);
 
        customMethods.follow = function(ratio, duration, ease){
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
                                            return "-webkit-transition: all 0.5s ease-out; transform-origin: 51%;"
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

                                        return element;
                }//end of follow
        



                return customMethods;
    } //end of factory

   
   const init = function(elementToBeAnimated){

        //checking passed parameters
        if(!elementToBeAnimated)return init;

        //if argument passed is NOT a object (node), then run querySelector and try to find element with give criteria, else if IS an object, assign it to element constant
        //usage: so that parallax() can be used for example in loop
        const element = typeof elementToBeAnimated !== 'object' ? document.querySelector(elementToBeAnimated) : elementToBeAnimated;
        if(element===null){
            return undefined
        }
        //SETTING PROTOTYPE STEP 1
        //return current parent of element in prototype chain
        const currentParentInChain = Object.getPrototypeOf(element);

        //return object which will be set as the new parent prototype of element by passing the current parent to the factory function
        let newParentInChain = factory(currentParentInChain)

        //setting the parent of element to be the object returned  **************** see factory function to understand linking *************
        Object.setPrototypeOf(element, newParentInChain);

        return element;

       
   }

   

   global.parallax = init;
   return init
})(window);
