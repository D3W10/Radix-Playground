---
name: Referências para funções
validators:
-   check: output
    condition: 's === `"Nome: Ana, Idade: 25"`'
-   check: code
    condition: 'c.includes("console.log)")'
-   check: code
    condition: 'o.func.toString() === "function printUserToFunction"'
-   check: code
    condition: 'o.var.length === 0'
output: |-
    "Nome: Ana, Idade: 25"
---

Neste exercício, escreve um programa simples que consiste numa função `printUserToFunction` que recebe como parâmetro o nome e a idade de um utilizador e uma função para onde deve ser enviada a seguinte string: "Nome: {nome}, Idade: {idade}". Para testar o programa, chame a função passando o nome "Ana", idade 25 e que o resultado seja impresso na consola. Não podes utilizar mais que uma função, nem utilizar funções anónimas e funções *lambda*. Deverás resolver o problema utilizando apenas referências para funções.

> Lembra-te que é possível passar como referência funções/métodos já existentes na linguagem, incluíndo o `console.log`.

***

**Objetivo do exercício:**
- Aparecer na consola o nome e a idade do utilizador;
- Declarar apenas 1 função;
- Não podes declarar nenhuma variável.