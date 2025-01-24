---
name: Math object
validators:
-   check: output
    condition: 's === Math.pow(v.n, v.p).toString()'
-   check: code
    condition: 'o.func.length >= 1'
output: "8"
varParse: true
solution: |-
    const n = 2;
    const p = 3;

    function power(num, pow) {
        return Math.pow(num, pow);
    }

    console.log(power(n, p));
---

In this exercise, rewrite the function made on the last exercise so it calculates a number to the power of another, you may use the native `Math` object. To test the function, create two constants (`n` and `p`) with numeric values and call the function with those 2 values as parameters.

***

**Exercise objectives:**
- Print to the console the powered number;
- Declare at least one function.