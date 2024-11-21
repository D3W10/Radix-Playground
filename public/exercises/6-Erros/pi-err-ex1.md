---
name: Tratamento de erros
validators:
-   check: output
    condition: '/^"[\s\S]+"$/gm.test(s)'
-   check: code
    condition: '/try{(.*)oddCharacters\(\d\)(.*)}catch/g.test(c)'
output: "Ocorreu um erro"
---

Em **JavaScript**, devido à liberdade oferecida pela linguagem, muitas vezes podem ocorrer erros na execução do programa. Como o código **não é compilado**, os erros apenas ocorrem em *runtime*. Quando um erro ocorre, a execução do programa é terminada imediatamente mostrando na consola a razão do mesmo.

Para tratar/evitar estes erros, podemos usar os blocos `try/catch` para instruir o programa a lidar com certos erros. A sintaxe básica destes blocos é a seguinte:

```js
try {
    // Código que pode causar erros
}
catch (error) { // (opcional) Nome da variável que recebe informação sobre o erro
    // Código que é executado caso ocorra um erro
}
```

Um "erro" muitas vezes representado como uma classe que estende a classe base `Error`, as classes de erro mais comuns são:

- `TypeError`: Ocorre quando uma operação é realizada num tipo de dados incorreto;
```js
"123".invalidMethod(); // Uncaught TypeError: "123".invalidMethod is not a function
```
- `SyntaxError`: Ocorre quando há um erro na sintaxe do código.
```js
const a = ; // Uncaught SyntaxError: Unexpected token ';'
```
- `ReferenceError`: Ocorre quando se tenta aceder a uma variável que não existe
```js
console.log(x); // Uncaught ReferenceError: x is not defined
```
- Entre outros...

Se tratarmos o exemplo de erro do `TypeError` com o bloco `try/catch`, o código seria:

```js
try {
    "123".invalidMethod();
}
catch (error) {
    console.log(error);
}
```

> Este bloco `try/catch` apanha qualquer tipo de erro que ocorra dentro do bloco `try`.

Consideremos agora o seguinte exemplo:

```js
const ref = false;

try {
    if (!ref)
        "123".invalidMethod(); // TypeError
    else
        k; // ReferenceError
}
catch (e) {
    console.log("Ocorreu um erro: ", e);
}
```

Neste exemplo, caso ocorra um `TypeError` ou um `ReferenceError`, o bloco `catch` trata esse erro da mesma forma, mas às vezes queremos tratar erros de forma diferente dependendo do seu tipo.

O operador `instanceof` é um operador que verifica se uma variável é uma instância de uma classe:

```js
const e = new TypeError();
console.log(e instanceof TypeError); // true
```

Quando combinado com o bloco `catch`, é possível diferenciar o tipo de erro que ocorreu:

```js
const ref = false;

try {
    if (!ref)
        "123".invalidMethod(); // TypeError
    else
        k; // ReferenceError
}
catch (e) {
    if (e instanceof TypeError)
        console.log("Ocorreu um TypeError: ", e);
    else
        console.log("Ocorreu um ReferenceError: ", e);
}
```

Existe ainda o bloco `finally` que é um bloco que é executado independentemente de ter ocorrido um erro ou não, normalmente usado para limpar recursos:

```js
try {
    // Código que pode causar erros
}
catch {
    // Código que é executado caso ocorra um erro
}
finally {
    // Código que é executado independentemente de ter ocorrido um erro ou não
}
```

> O bloco `finally` é opcional!

***

Considera a função `oddCharacters` com a seguinte implementação:

```js
function oddCharacters(str) {
    return str.split("").filter((_, i) => i % 2 === 0).join("");
}
```

Neste exercício, chama a função `oddCharacters` com um **valor numérico**, o que deverá causar um erro na execução do programa. Utiliza o bloco `try/catch` para capturar esse erro e devolve uma mensagem de erro.

***

**Objetivo do exercício:**
- Aparecer na consola uma mensagem de erro;
- Chamar a função `oddCharacters` com um valor numérico;
- Utilizar um bloco `try/catch` para capturar o erro.