---
name: Variable creation
validators:
-   check: output
    condition: '/^\d+$/g.test(s)'
-   check: code
    condition: 'o.var.filter(v => v === "const").length >= 2'
output: "10"
solution: |-
    const a = 2;
    const b = 5;

    console.log(a + b);
---

**JavaScript** is a high-level programming language that is [*Weakly typed*](https://en.wikipedia.org/wiki/Strong_and_weak_typing) and has Just-in-time (JIT) compilation, with syntax similar to C and Java.

It is a popular programming language for web development, however, with the introduction of **Node.JS**, it has also been used on the server-side.

In this set of exercises, we will be using the **Node.JS** development environment, which allows reading files, accessing system APIs, among other things.

***

Starting with the basics, in **JavaScript** there are 3 ways to declare variables:
1. Using `var` which creates a variable that persists after scopes (*not recommended*);
2. Using `let` which creates a variable in the current scope;
3. Using `const` which creates a constant whose value cannot be changed by mutation (using the `=`).

Good practice dictates that `const` should be used **always when possible** to avoid possible unintended mutations.

> Scope refers to any pair of braces (a function creates a scope, an if creates another, etc.), variables `let` and `const` are only valid within the scope that encloses them.

Check the following example of declaring a variable `num` with value `15`:

```js
let num = 15;
```

***

In **JavaScript**, it is possible to write to the console using the `console` object globally available. This object contains the methods `log`, `info`, `warn` and `error` that will be useful throughout the exercises.

***

In this first exercise, write a program that declares two constants with values of your choice and prints the result of their sum to the console.

***

**Exercise objectives:**
- Only print a single number to the console;
- Declare at least two variables.