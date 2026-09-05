# TypeScript Callback Exercises

This project contains 10 simple TypeScript exercises to practice **callbacks**, **functions**, **setTimeout**, **enums**, and **chained callbacks**.

## 1. Hello Callback

* Creates a callback function called `helloFunction`.
* `greeting()` receives a callback.
* The callback prints `"Hello from callback!"`.
* **Purpose:** Learn the basic idea of passing a function as an argument.

## 2. Delayed Greeting

* Uses a callback function with `setTimeout`.
* The greeting is printed after **2 seconds**.
* **Purpose:** Practice callbacks with delayed execution.

## 3. Math Callback

* Takes two numbers and adds them together.
* Sends the result to a callback function.
* Prints the new number.
* **Purpose:** Learn how to return a calculation result through a callback.

## 4. Uppercase Callback

* Starts with a lowercase sentence.
* Converts the sentence to uppercase.
* Sends the result to a callback.
* **Purpose:** Practice using callbacks with string operations.

## 5. Pizza Order

* Simulates a pizza order.
* Uses `setTimeout` to wait **3 seconds**.
* Calls the callback when the pizza is ready.
* **Purpose:** Understand asynchronous callbacks.

## 6. Multiple Messages

* Creates three different messages.
* Sends each message to the same callback.
* Prints all three messages.
* **Purpose:** Learn how a callback can be called multiple times.

## 7. Download Simulation

* Simulates downloading data from a URL.
* Waits **2 seconds** using `setTimeout`.
* Sends the downloaded message to a callback.
* **Purpose:** Practice callbacks with an asynchronous operation.

## 8. Success and Error Callback

* Generates a random number.
* If the number is **5 or higher**, the success callback runs.
* Otherwise, the error callback runs.
* **Purpose:** Learn how to use separate success and error callbacks.

## 9. Math with Different Operations

* Uses an `enum` to define:

  * Addition
  * Subtraction
  * Multiplication
  * Division
* Selects a random operation.
* Calculates the result.
* Sends the result to a callback.
* **Purpose:** Practice callbacks together with enums, random values, and calculations.

## 10. Chained Callbacks

* Runs three steps one after another.
* Each step waits **1 second**.
* `Step 2` starts after `Step 1` is finished.
* `Step 3` starts after `Step 2` is finished.
* **Purpose:** Learn how callbacks can be chained together.

### Alternative Chained Callback

The last part shows another way to create the same three-step process using one reusable function:

```ts
chainedStep(message, callback)
```

This makes the code shorter and avoids creating three separate functions.

## What I Practiced

* TypeScript function types
* Callback functions
* Passing functions as arguments
* `setTimeout`
* Asynchronous code
* Multiple callbacks
* Success and error handling
* Enums
* Random numbers
* Chained callbacks
* Nested callbacks
