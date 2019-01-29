

    
    module.exports = function(originalProto){

        //setting the returned method object parent in prototype chain to be the original parent of the element
        //basically inserting this object between the element (the instance of the parent object) and the parent object linking 
        // the element back to original parent again, making all the built in methods available

        //SETTING PROTOTYPE STEP 2
        const customMethods = Object.create(originalProto);
 
        customMethods.pull = function(ratio, duration, ease, push){
                                var element = this;

                                if(!ratio || typeof ratio == 'string'){
                                    ratio = 20
                                }
                                if(!duration || typeof duration == 'string' || duration>10){
                                    duration = 0.3
                                }
                                if(!ease){
                                    // ease = " cubic-bezier(0.000, 0.0, 0.7, 1.000)";
                                    ease = " ease-out"
                                }
                                //returns the css text string
                                element.style.cssText = (function returnCSSText (){
                                    return  "-webkit-transition: all " + duration + "s "+ ease + "; -webkit-transition: all " + duration +"s "+ ease +";-moz-transition: all "+ duration +"s " + ease +";-o-transition: all "+ duration +"s "+ ease +";transition: all "+ duration +"s "+ ease +", 1.195);transform-origin: 60%;-webkit-backface-visibility: hidden;-webkit-transform: translateZ(0) scale(1.0, 1.0);transform: translateZ(0);"
                                })()

                                        //returning original X and Y
                                        var elementPos = element.getBoundingClientRect();
                                        //recalculating X and Y
                                        var elementCenterPosition = (function(currentPos){
                                            return {
                                                x   :   currentPos.left + (currentPos.width/2),
                                                y   :   currentPos.top + (currentPos.height/2)
                                            }
                                        })(elementPos)

                                        console.log(elementCenterPosition);
                                
                                        
                                        var animator = function(e){
                                            //if pointer is left from element
                                            if(elementPos.x>e.clientX){ 
                                                if(elementPos.y>e.clientY){//if element is under mouse position //top left 
                                                    element.style.transform =  push ?  `translate3d(${Math.floor((elementCenterPosition.x - e.clientX)/ratio)}px,${Math.floor((elementCenterPosition.y - e.clientY)/(ratio/2))}px,0)` : `translate3d(-${Math.floor((elementCenterPosition.x - e.clientX)/ratio)}px,-${Math.floor((elementCenterPosition.y - e.clientY)/(ratio/2))}px,0)`;
                                                }else{//if mouse is under element position //bottom left 
                                                    element.style.transform = push ? `translate3d(${Math.floor((elementCenterPosition.x - e.clientX)/ratio)}px,-${Math.floor((e.clientY - elementCenterPosition.y)/(ratio/2))}px,0)` : `translate3d(-${Math.floor((elementCenterPosition.x - e.clientX)/ratio)}px,${Math.floor((e.clientY - elementCenterPosition.y)/(ratio/2))}px,0)`;
                                                }
                                            }else{ //if pointer is right from element
                                                    if(elementPos.y>e.clientY){//top right
                                                        element.style.transform = push ? `translate3d(-${Math.floor((e.clientX - elementCenterPosition.x)/ratio)}px,${Math.floor((elementCenterPosition.y - e.clientY)/(ratio/2))}px,0)` : `translate3d(${Math.floor((e.clientX - elementCenterPosition.x)/ratio)}px,-${Math.floor((elementCenterPosition.y - e.clientY)/(ratio/2))}px,0)`;
                                                    }else{//bottom right
                                                        element.style.transform = push ? `translate3d(-${Math.floor((e.clientX - elementCenterPosition.x)/ratio)}px,-${Math.floor((e.clientY - elementCenterPosition.y)/(ratio/2))}px,0)` : `translate3d(${Math.floor((e.clientX - elementCenterPosition.x)/ratio)}px,${Math.floor((e.clientY - elementCenterPosition.y)/(ratio/2))}px,0)`;
                                                    }
                                            }
                                        }

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

                                        window.addEventListener('mousemove', throttler(40, animator)); //don't run animator unless X amount of time has passed from the last call

                                        return element;
                }, //end of pull

                customMethods.push = function(ratio, duration, ease){
                    if(!ratio)ratio=20;
                    if(!duration)duration=0.3;
                    if(!ease)ease="ease-out";
                    this.pull(ratio, duration, ease, true)
                }
        
                return customMethods;
    } 

   
   


   
