// Two Timers, One Order

const delayMessage = (message: string, delay: number, callback: () => void) =>{
    setTimeout(()=>{
        console.log(message);
        callback();
    },delay);
};

delayMessage(`delay of 1s` , 1000, () => {
  console.log("I think delay of 1s will print first")});

delayMessage(`delay of 3s` , 3000, () => {
  console.log("delay of 3s will print second")});

// Same prediction as in console log happend. I think 1000s < 3000s, so delay of 1s printed first as predicted