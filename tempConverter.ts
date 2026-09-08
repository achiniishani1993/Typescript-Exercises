// Temperature Converter

type ConvertCallback = (celsius: number) => number;

function convertTemperature(celsius: number, callback: ConvertCallback) {
  return callback(celsius);
}

const fahrenheit = convertTemperature(65, (celsius) => {
  if (celsius) {
    return (celsius * 9) / 5 + 32;
  }
  return 0;
});

const kelvin = convertTemperature(25, (celsius) => {
  if (celsius) {
    return celsius + 273;
  }
  return 0;
});

console.log(fahrenheit);
console.log(kelvin);
