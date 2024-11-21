---
name: Lançar erros
validators:
-   check: output
    condition: |-
        s === '"The argument \'str\' must be of type string"'
-   check: code
    condition: '/try{(.*)oddCharacters\(\d\)(.*)}catch/g.test(c)'
-   check: code
    condition: '/throw new /g.test(c)'
output: "The argument 'str' must be of type string"
---

No exercício anterior, aprendemos a tratar erros que ocorrem durante a execução de um programa, evitando que o mesmo seja interrompido. Neste exercício, iremos ver como podemos lançar um erro personalizado utilizando a *keyword* `throw`.

A keyword `throw` lança um erro, interrompendo a execução naquele ponto e pode (ou não) ser capturada pelo bloco `try` mais próximo na *call stack*. O valor que segue o `throw` pode ser de qualquer tipo, no entanto, é comum que seja uma instância de uma classe que estende `Error` (ex: `SyntaxError`, `TypeError`, etc.).

```js
throw "Ocorreu um erro";
throw { message: "Ocorreu um erro" };

throw new Error("Ocorreu um erro");
throw new TypeError("Ocorreu um erro");
```

> Quando usando classes com o `throw`, **é importante não esquecer de instanciar a classe com o operador `new`**!

Quando o erro é lançado, o programa procura o bloco `try` superior mais próximo e executa o código no bloco `catch`, passando o valor seguido do `throw` como argumento de erro:

```js
try {
    throw false;
}
catch (e) {
    console.log(e); // false
}

try {
    throw new Error("Ocorreu um erro");
}
catch (e) {
    console.log(e.message); // Ocorreu um erro
}
```

É possível ainda criar uma classe personalizada que estende `Error` e lançar uma instância dessa nova classe. Esse tema não será o alvo deste exercício.

***

Considera a função `oddCharacters` do exercício anterior, com a seguinte implementação:

```js
function oddCharacters(str) {
    return str.split("").filter((_, i) => i % 2 === 0).join("");
}
```

Neste exercício, modifica a função `oddCharacters` de forma a verificar se o parâmetro `str` é do tipo *string*, caso contrário deverá lançar um erro com a mensagem `"The argument 'str' must be of type string"`.

Chama a função passando um valor numérico como parâmetro e, tal como no exercício anterior, esta chamada deverá causar um erro na execução do programa. Utiliza o bloco `try/catch` para capturar esse erro e devolve a mensagem do erro (utilizando o `e.message`).

***

**Objetivo do exercício:**
- Aparecer na consola a mensagem de erro `"The argument 'str' must be of type string"`;
- Chamar a função `oddCharacters` com um valor numérico;
- Deves utilizar pelo menos um `throw` para lançar o erro;
- Utilizar um bloco `try/catch` para capturar o erro.
