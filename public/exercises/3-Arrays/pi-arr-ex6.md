---
name: Parâmetros rest
validators:
-   check: output
    condition: 's === "208"'
-   check: code
    condition: 'o.func.length >= 1'
-   check: code
    condition: 'o.loop.length === 1'
output: "208"
---

Em **JavaScript**, é possível que uma função receba um número indefinido de parâmetros utilizando os *rest parameters*. A sintaxe é a seguinte:

```js
function func(...args) {
    console.log(args[2]);
}

func(1, 2); // undefined
func(1, 2, 3, 4, 5); // 3
```

A função acima recebe um número indefinido de parâmetros, e imprime o valor do terceiro parâmetro. O parâmetro `...args` é um *array* que contém todos os parâmetros passados para a função. Para além disso, a função pode receber ainda parâmetros explícitos junto com um parâmetro *rest*, existem umas regras para que isso seja possível:

- Apenas pode haver 1 parâmetro *rest*; 
- O parâmetro *rest* deve ser o último parâmetro da função.

```js
// Assinaturas válidas
function func(...a) {}
function func(a, b, ...c) {}

// Assinaturas inválidas
function func(...a, b) {}
function func(...a, ...b) {}
```

***

Neste exercício, escreve um programa que define a função `sumWithFactor` que recebe um fator e um conjunto indefinido de números por parâmetro. A função deve multiplicar o fator por cada um dos números e, por fim, devolver a soma de todos os valores. Para testar a função, utilize a seguinte linha de código:

```js
sumWithFactor(4, 2, 5, 30, 15);
```

***

**Objetivo do exercício:**
- Aparecer na consola o valor `208`;
- Declarar pelo menos 1 função;
- Utilizar apenas 1 ciclo.