// Sum with a Named Type

type SumCallback = (result: number)=> void; 

const sumNumbers = (a:number, b:number, callback:SumCallback) => {
    const result = a + b;
    callback(result);
};

sumNumbers (10, 30, (result) => {
console.log(result);
});

