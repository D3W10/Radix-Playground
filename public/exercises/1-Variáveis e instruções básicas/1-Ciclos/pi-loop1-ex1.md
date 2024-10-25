---
name: While, Do While e For
validators:
    - check: output
      condition: 's === "0\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10"'
    - check: code
      condition: '(c.match(/while|for/g) || []).length > 0'
output: "0\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10"
---

Em programação, muitas vezes é necessário repetir um certo bloco de código várias vezes para realizar determinadas ações e em JavaScript não é excepção. **JavaScript** possui vários tipos de ciclos, inicialmente vamos apenas falar sobre os 3 mais conhecidos, o `while`, o `do while` e o `for`.

O `while` é um ciclo que executa um bloco de código enquanto uma determinada condição for verdadeira.

```js
let i = 0;

while (i < 5) {
    console.log(i);
    i++;
}
```

O `do while` é um ciclo que executa o bloco de código pelo menos uma vez, e repete-o enquanto uma determinada condição for verdadeira.

```js
let i = 0;

do {
    console.log(i);
    i++;
}
while (i < 5);
```

O `for` é o tipo de ciclo mais dinâmico já que na sua sintaxe permite realizar 3 operações: inicialização, condição e incremento (todas opcionais).

```js
for (let i = 0; i < 5; i++) {
    console.log(i);
}
```

***

Neste exercício, escreve um programa que escreva na consola todos os números de 0 a 10 utilizando qualquer um dos ciclos apresentados.

***

**Objetivo do exercício:**
- Aparecer na consola os números de 0 a 10;
- Usa um dos 3 ciclos apresentados (`while`, `do while` ou `for`).