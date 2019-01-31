module.exports = function timer(cb, currentYPosition, delay, totalDistance){
    //seting the starting time in miliseconds
    var startTime = Date.now();
    //total distance allready passed
    var distancePassed = currentYPosition;
    //step is calculated as the result of the division of the desired location and time 
    //to finish the animation in miliseconds
    var step = totalDistance/100;

    function inner(){
        //set stop to true if true the passed distandce is greather or equal to desired location
        var stop;
        if(distancePassed<totalDistance){
            stop = distancePassed<totalDistance ? false : true;
        }else{
            stop = distancePassed>totalDistance ? false : true;
        }
        
        //if true, return
        if(stop)return;
        
        setTimeout(function(){
            if(distancePassed<totalDistance){
                distancePassed+=step;
            }else{
                distancePassed-=step;
            }
            
            // var passed = Date.now() - startTime;
            
            //passing inner to callbacka
            cb(distancePassed, inner);
        },delay)
    }
    inner()
}
