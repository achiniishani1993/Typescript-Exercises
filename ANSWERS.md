# Excersice 1 

question 03 -  Eventhough vegetarian pizza type was accepted by PizzaTypeSchema, but the menu did not contain a price for vegetarian pizza. As a result, menu[pizzaType] returned undefined.
The red line shows a TypeScript error. TypeScript checks types, while Zod checks data when the code runs. Vitest can still run tests without checking all TypeScript types. 


question 05 - pizzashop.integration.test.ts why?? Because orderPizza("vegetarian") tests the ordering process, which may involve orderPizza(), createPizza() and other functions. 

# Exercise 2

Question: This bug would never have been found without a test. What was it, and what does that tell you about testing error messages?

Expected: "Cannot charge the customer without a valid order ID!"
Received: "Cannot charge the cutomer without a valid order ID!"

The spelling is different in "customer"

Tests can catch mistakes and ensures that error messages are correct and consistent.

# Exercise 3

Question: Why use toEqual and not toBe when you compare objects?

toEqual compares the contents and values of objects, including properties but toBe checks whether two values are exactly the same in memory. 

# Exercise 5
Question: Your "between 1000 and 9999" test uses a random number. Could it pass by luck even if the
code were wrong? What could you do to make it more trustworthy?

Yes. Math.random() generates different number. To make it trustworthy can mock Math.random() using Vitest's vi.spyOn(). References - https://main.vitest.dev/guide/mocking/functions?utm_source

