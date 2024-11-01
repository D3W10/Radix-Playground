---
name: O método reduce
validators:
-   check: output
    condition: 's === "ACEFBDGH"'
-   check: code
    condition: 'o.loop.length === 0'
-   check: code
    condition: 'o.func.length >= 1'
output: "ACEFBDGH"
---

O método `reduce` reduz todos os elementos do *array* para um único valor. Esta função recebe uma função com 2 parâmetros, o primeiro sendo o acumulado das iterações anteriores e o segundo sendo o elemento atual do *array*. O `reduce` recebe ainda o valor inicial do acumulado. Vejamos um exemplo prático:

```js
const arr = [1, 2, 3, 4, 5];

const func = (total, current) => total + current;
const result = arr.reduce(func, 0);
// result -> 15
```

> O acumulador pode ter qualquer tipo, cabe á função passada ao `reduce` manusear o valor acumulado e o valor atual e devolver o novo valor para ser usado na próxima iteração.

***

Neste exercício, escreve um programa que define a função `getInitialsOfNames` que recebe um *array* de nomes e devolve uma string com as iniciais dos nomes. Para testar a função, chame-a passando o *array* `["Ana", "Catarina", "Edgar", "Filipe", "Bruna", "Diogo", "Gustavo", "Hugo"]`.

***

**Objetivo do exercício:**
- Aparecer na consola as iniciais dos nomes passados por parâmetro;
- Não podes utilizar nenhum tipo de ciclo;
- Declarar pelo menos 1 função.