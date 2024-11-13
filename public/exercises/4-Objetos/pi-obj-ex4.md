---
name: Arrays em objetos
validators:
-   check: output
    condition: 's === "15"'
-   check: code
    condition: 'o.func.length >= 1'
-   check: code
    condition: 'c.includes("reduce")'
-   check: code
    condition: 'o.loop.length === 0'
output: "15"
---

Neste exercício, escreve um programa que define a função `calcAvg` que recebe um objeto com informações relativas a um aluno por parâmetro e devolve a sua média. O objeto que representa um estudante é composto da seguinte forma:

```js
const student = {
    name: "Daniel",
    age: 20,
    grades: [15, 12, 18]
};
```

Para testar a função, chame-a passando o objeto acima como parâmetro.

***

**Objetivo do exercício:**
- Aparecer na consola a média do aluno;
- Declarar pelo menos 1 função;
- Utilizar programação funcional;
- Não podes utilizar ciclos.