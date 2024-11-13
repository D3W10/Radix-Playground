---
name: Métodos sobre Strings
validators:
-   check: output
    condition: 's === `"A VIDA É BELA"\n13`'
-   check: code
    condition: 'c.includes("original.substring(8).replace(\"será\",\"é\").toUpperCase()") || c.includes("original.substring(8).toUpperCase().replace(\"SERÁ\",\"É\")")'
-   check: code
    condition: 'o.var.length === 2'
output: |-
    "A VIDA É BELA"
    13
---

As *strings*, tem por padrão alguns métodos e propriedades que podem ser usados para a sua manipulação. Esses métodos podem ser acedidos utilizando a notação `.`, tal como é feito no `console.log`:

```js
"Hello World".length; // 11

let str = "Hello Again";
str.length; // 11
```

> Esses métodos e propriedades podem ser acedidos tanto em variáveis como em literais.

Alguns dos métodos e propriedades mais comuns são:

- `length`: Devolve o tamanho da *string*;
- `toUpperCase()`: Converte a *string* para maiúsculas;
- `toLowerCase()`: Converte a *string* para minúsculas;
- `substring(start, end)`: Retorna uma nova *string* com o conteúdo da *string* original entre os índices `start` e `end` (se não informado o índice `end`, o valor padrão é o tamanho da *string*);
- `includes(value)`: Verifica se a *string* contém o valor `value`;
- `replace(value, newValue)`: Substitui o valor `value` pelo valor `newValue` na *string*;
- `split(value)`: Divide a *string* em partes, separando-as pelo valor `value`;
- `trim()`: Remove espaços em branco no início e no final da *string*;
- `startsWith(value)`: Verifica se a *string* começa com o valor `value`;
- `endsWith(value)`: Verifica se a *string* termina com o valor `value`.

***

Neste exercício, escreve um programa que, de uma variável `original` com o valor "Um dia, a vida será bela", imprima na consola a *string* "A VIDA É BELA", seguida do seu comprimento. Utiliza apenas métodos e propriedades sobre *strings* e resolve o problema **da forma mais eficiente possível**!

***

**Objetivo do exercício:**
- Aparecer na consola "A VIDA É BELA", seguido do comprimento da *string*;
- Devem apenas ser utilizados apenas métodos sobre *strings*;
- Devem ser utilizadas 2 variáveis.