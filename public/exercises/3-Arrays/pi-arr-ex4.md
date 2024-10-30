---
name: Arrays e Strings
validators:
-   check: output
    condition: 's === "44 10 2"'
-   check: code
    condition: 'o.func.length >= 2'
output: "44 10 2"
---

Neste exercício, escreve um programa que conte os caracteres, as palavras e os parágrafos de uma *string*. Este programa será dividido em 2 funções:
- Pretende-se que a função `getSplitLength` divida a string recebida como parâmetro utilizando o divisor que também é passado como parâmetro:
```ts
// Assinatura de getSplitLength
getSplitLength(str: string, splitter: string): number
```

- A função `statCount` irá utilizar a função descrita acima e obter a quantidade de caracteres, palavras e parágrafos de acordo com os respetivos separadores.
```ts
// Assinatura de statCount
statCount(str: string): number[]
```

A função `statCount` deverá devolver um *array* com os 3 valores pedidos. Para testar a função, chame a função `statCount` passando a *string* "Um dia a vida será bela\n Esse dia será hoje!".

> Nota: Quando numa *string* é chamada a função `split`, se não forem passados parâmetros a função devolve a *string* original, mas se for passada uma string vazia (`""`) é devolvido um *array* com todos os caracteres da *string*.

***

**Objetivo do exercício:**
- Aparecer na consola as quantidades de caracteres, palavras e parágrafos da *string* passada, **respetivamente**;
- Declarar pelo menos 2 funções.