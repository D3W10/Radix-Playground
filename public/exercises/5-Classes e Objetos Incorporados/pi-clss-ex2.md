---
name: JSON
validators:
-   check: output
    condition: |-
        s === `"{
            name: "Huracan",
            brand: "Lamborghini",
            available: true
        }"`
-   check: code
    condition: 'o.func.length >= 1'
-   check: code
    condition: 'c.includes("JSON.parse(") && c.includes("JSON.stringify(")'
output: |-
    "{
        name: "Huracan",
        brand: "Lamborghini",
        available: true
    }"
---

O objeto `JSON` em **JavaScript** fornece métodos para converter objetos JavaScript em *string*s JSON (*JavaScript Object Notation*) e vice-versa. Esta classe tem apenas dois métodos:

- `JSON.stringify(value[, replacer[, space]])`: Converte um valor JavaScript para uma *string* JSON
  - `value`: O objeto a ser convertido
  - `replacer` (*opcional*): Uma função ou *array* que transforma o resultado
  - `space` (*opcional*): Número de espaços a adicionar para fins de identação

- `JSON.parse(text[, reviver])`: Analisa uma *string* JSON e converte-a num objeto JavaScript
  - `text`: A *string* JSON a ser analisada  
  - `reviver` (*opcional*): Uma função que transforma o resultado

O valor devolvido pelo método `JSON.parse` é um objeto com as mesmas chaves e valores da *string* JSON.

> É possível indentar o resultado do método `JSON.stringify` sem fornecer um `replacer` passando `null` ao mesmo.

***

Neste exercício, escreve um programa que define a função `markAsAvailable` que recebe uma *string* JSON por parâmetro, adiciona a chave `available` com o valor `true` e devolve a nova *string* JSON com **identação de 4 espaços**. Passa a *string* abaixo para testar a função desenvolvida.

```js
const car = `{"name": "Huracan","brand": "Lamborghini"}`;
```

***

**Objetivo do exercício:**
- Aparecer na consola a *string* JSON resultante, formatada com identação de 4 espaços;
- Declarar pelo menos 1 função;
- Utilizar ambos os métodos introduzidos neste exercício.