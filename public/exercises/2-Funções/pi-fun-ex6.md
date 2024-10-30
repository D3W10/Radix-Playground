---
name: Funções como parâmetro
validators:
-   check: output
    condition: 's === "14\n61"'
-   check: code
    condition: 'o.func.length >= 3'
-   check: code
    condition: 'o.var.length === 0'
output: "14\n61"
---

Até agora, os valores que passamos por parâmetro têm sido valores primitivos desde *strings*, números e booleanos. No entanto, é possível também passar funções como parâmetros para outras funções. Vejamos um exemplo:

```js
function calcAndPrint(a, b, print) {
    print(a + b);
}

function myPrint(val) {
    console.log(val);
}

calcAndPrint(5, 10, myPrint);
```

Neste exemplo temos duas funções `calcAndPrint` e `myPrint`. A primeira função recebe dois números e passa o resultado da sua soma à função passada pelo terceiro parâmetro. Para testar a função, chamamos a função passando dois números e uma referência para a função que vai receber o resultado da soma, no caso do exemplo acima será a função `myPrint`.

> Nota: Para obter a referência de uma função, é utilizado o nome da função (sem `()`). Para chamar uma função, utiliza-se o nome da função seguido de parênteses (e os devidos parâmetros).

***

Neste exercício, escreve um programa que defina a função `sumWithModifier` que recebe dois números e uma função como parâmetro. Esta função deve chamar a função `modifier` por cada um dos números e calcular a sua soma. Para testar a função, iremos chamar a função 2 vezes:
- Na primeira, calcule a soma de 3 e 4 e passe a função `double` como modificador.
```js
function double(num) {
    return num * 2;
}
```

- Na segunda, calcule a soma de 5 e 6 e passe a função `power` como modificador.
```js
function power(num) {
    return num * num;
}
```

***

**Objetivo do exercício:**
- Aparecer na consola o resultado das somas após aplicação do modificador;
- Declarar pelo menos 3 funções (`sumWithModifier`, `double` e `power`);
- Não podes declarar nenhuma variável.