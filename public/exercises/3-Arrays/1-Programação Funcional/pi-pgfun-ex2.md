---
name: O método flatMap
validators:
-   check: output
    condition: 's === "[2, 4, 6, 8, 10, 12, 14, 16, 18]"'
-   check: code
    condition: 'o.loop.length === 0'
-   check: code
    condition: '!c.includes("flat(")'
-   check: code
    condition: 'o.func.length >= 1'
output: "[2, 4, 6, 8, 10, 12, 14, 16, 18]"
---

O método `flatMap` é um método que aplica uma transformação a cada elemento de um *array* e, em seguida, aplica o método `flat` com nível 1. É identico à utilização de `map` e `flat` logo de seguida mas mais eficiente.

Alguns exemplos de utilização do método `flatMap` quando comparado com o `map`:

```js
const arr = [1, 2, 3, 4, 5];
const result = arr.map(e => [e, e * 10]);
// result -> [[1, 10], [2, 20], [3, 30], [4, 40], [5, 50]]
const result2 = arr.flatMap(e => [e, e * 10]);
// result2 -> [1, 10, 2, 20, 3, 30, 4, 40, 5, 50]
```

```js
const names = ["Daniel Nunes", "Tiago Dias", "Joana Marques"];
const individual = names.flatMap(n => n.split(" "));
// individual -> ["Daniel", "Nunes", "Tiago", "Dias", "Joana", "Marques"]
```

***

Neste exercício, define a função `multiplyMatrix` que recebe um *array* multidimensional e um número inteiro `factor` como parâmetro. Esta função deve multiplicar cada número existente no *array* por `factor` e devolver um *array* único com os resultados das multiplicações.

Para testar a função, chame-a passando o *array* abaixo e o número `2` como parâmetro:

```js
const nums = [
    [1, 2, 3],
    [4, 5],
    [6, 7, 8, 9]
];
```

***

**Objetivo do exercício:**
- Aparecer na consola um *array* com os resultados das multiplicações efetuadas;
- Não podes utilizar nenhum tipo de ciclo;
- Não podes utilizar o método `flat`;
- Declarar pelo menos 1 função.