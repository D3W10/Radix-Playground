---
name: Introdução às funções
validators:
-   check: output
    condition: 's === Math.pow(+(c.match(/(?<=power\()\d+(?=\))/) ?? [])[0], 2).toString()'
-   check: code
    condition: '!c.includes("Math")'
-   check: code
    condition: 'o.func.length >= 1'
-   check: code
    condition: 'o.line <= 5'
output: "16"
---

Muitas das vezes, escrever código de forma sequencial pode gerar código confuso, ou que se repita em vários lugares. Para eviter isso, é possível utiliza funções que definem código modular e reutilizável em todo o programa.

Para definir uma função em **JavaScript**, é utilizado a *keyword* `function` seguida do nome da função, ao contrário de outras linguagens que especificam o tipo de dados a devolver (será abordado mais à frente).

```js
function nomeDaFuncao() {
    console.log("Olá, sou a nomeDaFuncao");
}
```

> É considerado boa prática em **JavaScript** o uso de nomes de funções que sigam a prática *lowerCamelCase* (como em Java), ao contrário de outras linguagens que utilizam o *UpperCamelCase* (como em C#) ou o *snake_case* (como em C/C++).

Para "chamar" uma função que tenha sido definida, basta "chama-la pelo nome", seguido de um par de parênteses:

```js
nomeDaFuncao();
```

As funções podem receber parâmetros para dinamizar o seu comportamento. Esses parâmetros são definidos na assinatura da função (a linha de código que contem o `function`) e *devem* ser passado assim que a função é chamada, reforço na palavra *devem*. Eis um exemplo:

```js
function printName(name) {
    console.log("Olá, " + name);
}

printName("Ana");
```

Como já foi mencionado várias vezes ao longo dos exercícios, **JavaScript** não define os tipos de dados de forma explicita, por isso mesmo, é possível chamar a função `printName` com qualquer tipo de dados que não seja *string* ou até mesmo não passar nenhum parâmetro.

```js
printName(12); // Olá, 12
printName(true); // Olá, true
printName(null); // Olá, null
printName([1, 2, 3, 4, 5]); // Olá, 1,2,3,4,5
printName(); // Olá, undefined
```

> Todas as chamadas acima são válidas e não causam nenhum tipo de erro.

Para limitar ou tratar os parâmetros passados para uma função, essa mesma função terá de avaliar o conteúdo e o tipo dos parâmetros usando condições e o operador `typeof`.

As funções podem ainda devolver valores devolta ao código que a chamou utilizando a *keyword* `return`, esses valores podem ser apanhados igualando uma variável à chamada da função:

```js
function soma(a, b) {
    return a + b;
}

const resultado = soma(5, 10); // 15
```

> Funções declaradas com a *keyword* `function` podem ser chamadas antes da sua declaração, ao contrário de linguagens como C.
 
***

Neste exercício, escreve um pequeno programa que declare uma função que devolva o quadrado de um número passado por parâmetro, essa função deve chamar-se `power`. Para fins de teste à função, a mesma deve ser chamada com um valor numérico e imprimir o seu resultado na consola. Não é necessário que a função valide o tipo de dados dos parâmetros.

***

**Objetivo do exercício:**
- Aparecer na consola o resultado do número ao quadrado;
- Declarar pelo menos 1 função;
- O programa não deve exceder 5 linhas de código.