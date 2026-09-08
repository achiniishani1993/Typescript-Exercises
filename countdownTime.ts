function countDown (seconds: number, callback: () => void) {
    setTimeout(()=>{
        console.log(`times up!`);
         callback();
    }, seconds * 1000);
   
};

console.log(`hi`);
countDown(3, () => console.log("Countdown finished."));
console.log(`Bye`);

// hi
// Bye
// times up!
// Countdown finished.


// why - settimeout set the callback to run later so hi and bye logs are run before callback 