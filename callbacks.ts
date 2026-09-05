// 1. Hello Callback

type helloFunction = (message: string) => void;

const greeting = (greet: helloFunction) => {
  const msg: string = "Hello from callback!";
  greet(msg);
};

const greet = (message: string) => {
  console.log(message);
};
greeting(greet);

// 2.  Delayed Greeting

type greetingFunction = (greet: string) => void;

const sayHelloLater = (delay: greetingFunction) => {
  setTimeout(() => {
    const msg: string = "Hi, I am late!";
    delay(msg);
  }, 2000);
};

const delay = (greet: string) => {
  console.log(greet);
};

sayHelloLater(delay);

// 3. Math Callback

type mathFunction = (count: number) => void;

const increaseNumber = (a: number, b: number, mathNumber: mathFunction) => {
  const addNumber = a + b;
  mathNumber(addNumber);
};

const mathNumber = (count: number) => {
  console.log(`New number is`, count);
};

increaseNumber(20, 10, mathNumber);

// 4. Uppercase Callback

type upperFunction = (letter: string) => void;

const lowerCase = (upperLetter: upperFunction) => {
  const lowerletter = `Jag älskar att leka med koder`;
  upperLetter(lowerletter.toUpperCase());
};

const upperLetter = (letter: string) => {
  console.log(letter);
};

lowerCase(upperLetter);

// 5. Pizza Order

type orderStatusFunction = (order: string) => void;

const orderPizza = (ready: orderStatusFunction) => {
  setTimeout(() => {
    const msg = `Your pizza is ready!`;
    ready(msg);
  }, 3000);
};

const ready = (order: string) => {
  console.log(order);
};

orderPizza(ready);

// 6. Multiple Messages

type multimessage = (message: string) => void;

const createMessage = (msg: multimessage) => {
  const a = `Hi Im Achini`;
  const b = `I live in Perstorp`;
  const c = `I love coding`;
  msg(a);
  msg(b);
  msg(c);
};

const sendMessage = (message: string) => {
  console.log(message);
};
createMessage(sendMessage);

// 7. Download Simulation

type downloadFunction = (download: string) => void;

const download = (url: string, showDownload: downloadFunction) => {
  setTimeout(() => {
    const msg = `Downloaded data
from ${url}`;
    showDownload(msg);
  }, 2000);
};

const showDownload = (download: string) => {
  console.log(`download is ready.....`, download);
};

download(
  "https://github.com/achiniishani1993/Typescript-Exercises/tree/week3/typescript",
  showDownload,
);

// 8. Success and Error Callback

type succesFunction = (sucess: string) => void;
type errorFunction = (erro: string) => void;

const showResults = (a: succesFunction, b: errorFunction) => {
  const number = Math.floor(Math.random() * 10);
  if (number >= 5) {
    a(`Result is sucess`);
  } else {
    b(`results is failed`);
  }
};

const sucess = (sucess: string) => {
  console.log(sucess);
};

const erro = (erro: string) => {
  console.log(erro);
};

showResults(sucess, erro);

// 9. Math with Different Operations

type result = (input: number) => void;

enum Operation {
  Subtraction = "subtraction",
  Addition = "addition",
  Multiplication = "multiplication",
  Division = "division",
}

const calculate = (
  num1: number,
  num2: number,
  operation: Operation,
  operationFun: result,
) => {
//   console.log(
//     "Result for num1 " + num1 + " num2 " + num2 + " for operation " + operation,
//   );
  let output = 0;
  switch (operation) {
    case Operation.Subtraction:
      output = num1 - num2;
      break;
    case Operation.Division:
      output = num1 / num2;
      break;
    case Operation.Multiplication:
      output = num1 * num2;
      break;
    case Operation.Addition:
      output = num1 + num2;
      break;
  }
  operationFun(output);
};

const getRandomOperation = (): Operation => {
  const operations = Object.values(Operation);
  //console.log(operations)
  const randomIndex = Math.floor(Math.random() * operations.length);
  return operations[randomIndex]!;
};

const getRandomPositiveNumber = (max: number = 100): number => {
  return Math.floor(Math.random() * max) + 1;
};
const operationType = getRandomOperation();
const num1 = getRandomPositiveNumber();
const num2 = getRandomPositiveNumber();
calculate(num1, num2, operationType, (input) =>
  console.log(
    "Result is " +
      input +
      " for num1 " +
      num1 +
      " num2 " +
      num2 +
      " operation " +
      operationType,
  ),
);


// 10. Chained Callbacks

type signal = (msg:string)=>void;

const chained1 = (steps:signal) =>{
setTimeout(()=>{
    const step1 = `Step 1 done`;
   steps(step1);
}, 1000);
};

const chained2 = (steps:signal) =>{
setTimeout(()=>{
    const step2 = `Step 2 done`;
   steps(step2);
}, 1000);
};

const chained3 = (steps:signal) =>{
setTimeout(()=>{
    const step3 = `Step 3 done`;
   steps(step3);
}, 1000);
};

//console.log(chained1,chained2,chained3);

chained1((msg) => {
  console.log(msg);

  chained2((msg) => {
    console.log(msg);

    chained3((msg) => {
      console.log(msg);
    });
  });
});



// 10. Chained Callbacks another way

type signal1 = (msg:string)=>void;

const chainedStep = (msg: string, callback: signal1) => {
    setTimeout(() => {
        callback(msg);
    }, 1000);
};


chainedStep('Step 1 done', (msg) => {
    console.log(msg);

    chainedStep('Step 2 done', (msg) => {
        console.log(msg);

        chainedStep('Step 3 done', (msg) => {
            console.log(msg);
        });
    });
});

