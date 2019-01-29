var path = require('path');
const methods = require("./parallax");


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
    let newParentInChain = methods(currentParentInChain)

    //setting the parent of element to be the object returned  **************** see factory function to understand linking *************
    Object.setPrototypeOf(element, newParentInChain);

    return element;

   
}