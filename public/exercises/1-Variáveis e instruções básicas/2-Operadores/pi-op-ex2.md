---
name: Ternário e Concatenação
validators:
-   check: output
    condition: 's === `"1 é ímpar"\n"2 é par"\n"3 é ímpar"\n"4 é par"\n"5 é ímpar"\n"6 é par"\n"7 é ímpar"\n"8 é par"\n"9 é ímpar"\n"10 é par"`'
-   check: code
    condition: 'o.if.length === 0'
-   check: code
    condition: 'o.var.length <= 2'
output: |-
    "1 é ímpar"
    "2 é par"
    "3 é ímpar"
    "4 é par"
    "5 é ímpar"
    "6 é par"
    "7 é ímpar"
    "8 é par"
    "9 é ímpar"
    "10 é par"
---

Á medida que o código vai ganhando mais complexidade, as vezes podemo-nos deparar com condições que definem o valor de uma variável, vejamos o seguinte exemplo:

```js
let res;

if (condition)
    res = "Verdadeiro";
else
    res = "Falso";
```

Mesmo que o código tenha uma leitura mais clara, temos 6 linhas de código apenas para determinar o valor da variável `res`. Para evitar isso, podemos utilizar o operador ternário quem tem a seguinte sintaxe:

```js
condição ? valor_caso_verdadeiro : valor_caso_falso
```

No caso do exemplo acima, se utilizarmos o operador ternário, teremos o seguinte código:

```js
let res = condition ? "Verdadeiro" : "Falso";
```

***

O último operador que vamos ver é o operador de concatenação (`+`), que permite concatenar duas *strings*. Vejamos um exemplo de uso:

```js
const name = "Ana";

console.log("O meu nome é " + name); // O meu nome é Ana
```

> Como visto até agora, o `+` pode ser utilizado tanto para somas como para concatenação de *strings*. O ambiente de execução determina qual operação utilizar de acordo com os tipos de dados dos valores. Se houver pelo menos um valor do tipo *string*, a concatenação será usada, caso contrário fará a soma.
> ```js
> 1 + 2 // 3
> "1" + 2 // "12"
> "1" + "2" // "12"
> ```

***

Neste exercício, escreve um programa que imprima na consola o seguinte resultado:

```
1 é ímpar
2 é par
3 é ímpar
4 é par
5 é ímpar
6 é par
7 é ímpar
8 é par
9 é ímpar
10 é par
```

***

**Objetivo do exercício:**
- Aparecer na consola o resultado anteriormente apresentado;
- Utilizar o operador ternário e o operador de concatenação;
- Criar no máximo 2 variáveis.