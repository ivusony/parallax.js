function timer(cb, delay, totalDistance){
    //seting the starting time in miliseconds
    var startTime = Date.now();
    //total distance allready passed
    var distancePassed = 0;
    //step is calculated as the result of the division of the desired location and time 
    //to finish the animation in miliseconds
    var step = totalDistance/1000;

    function inner(){
        //set stop to true if true the passed distandce is greather or equal to desired location
        var stop = distancePassed<totalDistance ? false : true;
        //if true, return
        if(stop)return;
        
        setTimeout(function(){
            distancePassed+=step;
            var passed = Date.now() - startTime;
            cb(passed, inner);
        },delay)
    }
    inner()
}


timer(function(pass, cb){
    console.log('Delayed by ' + pass + ' miliseconds');
    cb();
}, 8, 1000)