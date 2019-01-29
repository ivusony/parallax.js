module.exports = function throttler(delay, cb){
    let lastCall = 0;
    return function(e){
        let now = (new Date).getTime();
        if(now - lastCall < delay)return;
        lastCall = now;
        return cb(e)
    }
}