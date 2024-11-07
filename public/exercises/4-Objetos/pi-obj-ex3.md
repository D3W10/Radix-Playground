---
name: Métodos e Objetos em objetos
validators:
-   check: output
    condition: 's === "true"'
-   check: code
    condition: 'o.func.length >= 1'
output: "true"
---

Neste exercício, escreve um programa que define a função `verifyObj` que recebe um objeto por parâmetro e chama o método na chave `test` com o objeto na chave `data`. A função deve devolver o resultado da chamada do método. Para testar a função, chame-a passando o objeto abaixo como parâmetro:

```js
const obj = {
    data: {
        name: "Daniel",
        age: 20,
        marks: [15, 12, 18]
    },
    test: o => typeof o.name === "string" && typeof o.age === "number" && typeof o.marks === "object" && o.marks.every(m => typeof m === "number")
};
```

***

**Objetivo do exercício:**
- Aparecer na consola o resultado da chamada do método `test`;
- Declarar pelo menos 1 função.