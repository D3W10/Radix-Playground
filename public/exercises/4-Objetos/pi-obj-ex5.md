---
name: Métodos em objetos
validators:
-   check: output
    condition: 's === "true"'
-   check: code
    condition: 'o.func.length >= 1'
-   check: code
    condition: 'c.includes("every")'
-   check: code
    condition: 'o.loop.length === 0'
output: "true"
---

Neste exercício, escreve um programa que define a função `validateElements` que recebe um objeto com um conjunto de valores a ser validados e os respetivos validadores, esta função deverá devolver `true` se todos os valores passados forem válidos e `false` caso contrário (assumir que existirá sempre o mesmo número de valores e validadores). Para testar a função, chame-a passando o objeto abaixo como parâmetro.

```js
const data = {
    values: [
        "Ana",
        45,
        "Has space",
        false
    ],
    validators: [
        v => typeof v === "string",
        v => v % 5 === 0,
        v => v.includes(" "),
        v => !v
    ]
};
```

> Lembra-te que algumas funções da programação funcional (como o `map`, `flatMap`, `filter`, `every` e `some`) recebem funções que podem ter vários parâmetros, o primeiro sendo o elemento atual e o segundo o índice.

***

**Objetivo do exercício:**
- Aparecer na consola o resultado da validação;
- Declarar pelo menos 1 função;
- Utilizar programação funcional;
- Não podes utilizar ciclos.