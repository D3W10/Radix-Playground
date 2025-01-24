---
name: Introduction to functions
validators:
-   check: output
    condition: 's === Math.pow(+(c.match(/(?<=power\()\d+(?=\))/) ?? [])[0], 2).toString()'
-   check: code
    condition: '!c.includes("Math")'
-   check: code
    condition: 'o.func.length >= 1'
-   check: code
    condition: 'o.line <= 5'
output: "16"
solution: |-
    function power(num) {
        return num * num;
    }

    console.log(power(4));
---

Often, writing code sequentially can lead to confusing code, or code that is repeated in several places. To avoid this, you can use functions that define modular and reusable code throughout the program.

To define a function in **JavaScript**, you use the *keyword* `function` followed by the name of the function, unlike other languages which specify the type of data to be returned.

```js
function foo() {
    console.log("Hey, I'm foo");
}
```

> It is considered good practice in **JavaScript** to use function names that follow the *lowerCamelCase* practice (as in Java), unlike other languages that use the *UpperCamelCase* (as in C#) or the *snake_case* (as in C/C++).

To “call” a function that has been defined, simply “call it by name”, followed by a pair of parentheses:

```js
foo();
```

Functions can receive parameters to make their behavior more dynamic. These parameters are defined in the function signature (the line of code containing the `function` keyword) and *should* be passed as soon as the function is called, reinforced by the word *should*. Here's an example:

```js
function printName(name) {
    console.log("Hey, " + name);
}

printName("Anna");
```

As mentioned several times, **JavaScript** does not define data types explicitly, which is why it is possible to call the `printName` function with any data type other than *string* or even not pass any parameters at all.

```js
printName(12); // Hey, 12
printName(true); // Hey, true
printName(null); // Hey, null
printName([1, 2, 3, 4, 5]); // Hey, 1,2,3,4,5
printName(); // Hey, undefined
```

> All of the above calls are valid and do not cause any kinds of errors.

To limit or handle the parameters passed to a function, that function must evaluate the content and type of the parameters using conditions and the `typeof` operator.

Functions can also return values back to the code that called it using the *keyword* `return`, these values can be picked up by affecting a variable to the function call:

```js
function sum(a, b) {
    return a + b;
}

const result = sum(5, 10); // 15
```

> Functions declared with the *keyword* `function` can be called before their declaration, unlike languages like C.
 
***

In this exercise, write a small program that declares a function that returns the square of a number passed in as a parameter, this function should be called `power`. To test the function, call it with a numerical value and print its result on the console. It is not necessary for the function to validate the data type of the parameters.

***

**Exercise objectives:**
- Print to the console the squared number;
- Declare at least one function;
- The program should not exceed 5 lines of code.