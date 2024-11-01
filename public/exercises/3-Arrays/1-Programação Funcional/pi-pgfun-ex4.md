---
name: Os métodos every e some
validators:
-   check: output
    condition: 's === "true"'
-   check: code
    condition: 'o.loop.length === 0'
-   check: code
    condition: 'c.includes("every") && c.includes("some")'
-   check: code
    condition: 'o.func.length >= 1'
output: "true"
---

Os métodos `every` e `reduce` são utilizados para verificar se todos ou algum dos elementos do *array* satisfazem uma determinada condição.

```js
const arr = [1, 2, 3, 4, 5];

arr.every(e => e % 2 === 0); // false
arr.some(e => e % 2 === 0); // true

arr.every(e => e > 10); // false
arr.some(e => e > 10); // false

arr.every(e => e < 10); // true´
arr.some(e => e < 10); // true
```

> Tal como o `map`, o `flatMap` e o `filter`, a função passada ao `every` ou ao `some` recebe o valor do elemento atual como primeiro parâmetro e o índice do elemento atual como segundo parâmetro.

***

Neste exercício, escreve um programa que define a função `containsValid` que recebe um *array* multidimensional de números e uma função como parâmetro e verifica se **todos** os *sub-arrays* têm **pelo menos um** número que satisfaz a condição passada. Para testar a função, chame-a passando o *array* abaixo e a função `n => n % 5 === 0`:

```js
const arr = [
    [1, 3, 5],
    [8, 9, 10],
    [15, 12, 11]
];
```

***

**Objetivo do exercício:**
- Aparecer na consola o valor `true` se todos os *sub-arrays* têm pelo menos um número que satisfaz a condição passada, `false` caso contrário;
- Não podes utilizar nenhum tipo de ciclo;
- Apenas podes utilizar os métodos `every` e `some`;
- Declarar pelo menos 1 função.