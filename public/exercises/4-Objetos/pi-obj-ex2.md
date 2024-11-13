---
name: Ciclo For In
validators:
-   check: output
    condition: 's === `"a: 2"\n"b: 4"\n"c: 6"\n"d: 8"\n"e: 10"`'
-   check: code
    condition: 'o.loop.every(l => l === "for in")'
-   check: code
    condition: 'o.loop.length >= 1'
output: |-
    "a: 2"
    "b: 4"
    "c: 6"
    "d: 8"
    "e: 10"
---

Até agora vimos vários tipos de ciclos, cada um deles com as suas características:
- `while`: Útil para repetir código enquanto uma condição seja verdadeira;
- `do while`: Útil para repetir código pelo menos uma vez e enquanto uma condição seja verdadeira;
- `for`: Útil para repetir código um determinado número de vezes;
- `for of`: Útil para percorrer os elementos de um *array*.

Existe ainda outro ciclo em JavaScript chamado *for in* que itera sobre *todas* as propriedades de um objeto (apenas as propriedades que são enumeráveis). Vejamos um exemplo deste ciclo:

```js
const obj = { a: 1, b: 2, c: 3 };

for (const key in obj) {
    console.log(key); // a b c
}
```

> O cíclo `for in` não é um cicllo muito utilizado já que existem [vários detalhes que devem ser levados em consideração](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in#examples)!

Para obter o valor da chave atual no ciclo `for in`, utilizamos a referência original para o objeto e acedemos ao valor da chave atual, utilizando `[]`:

```js
const obj = { a: 1, b: 2, c: 3 };

for (const key in obj) {
    console.log(obj[key]); // 1 2 3
}
```

***

Neste exercício, escreve um programa que percorra todas as propriedades do objeto abaixo e imprima na consola a *string* `<key>: <value>` por cada chave (*value* é o valor do objeto multiplicado por 2):

```js
const keys = { a: 1, b: 2, c: 3, d: 4, e: 5 };
```

***

**Objetivo do exercício:**
- Aparecer na consola todas as chaves do objeto e os valores das mesmas multiplicados por 2;
- Utilizar apenas cíclos *for in*;
- Utilizar pelo menos um 1 ciclo.