---
name: Strings em JavaScript
validators:
    - check: output
      condition: 's === `O produto ${v.name} tem um preço ${v.price < 10 ? "baixo" : "alto"} e é fornecido por ${v.supplier || "Continente"}`'
    - check: code
      condition: 'c.includes("`")'
    - check: code
      condition: 'o.if.length === 0 && (c.match(/\?.*?:/g) ?? []).length < 2'
    - check: code
      condition: 'o.line <= 5'
output: "O produto Colgate tem um preço baixo e é fornecido por Auchan"
---

Em **JavaScript**, existem várias formas de representar uma *string*:

```js
"Utilizando aspas"
'Utilizando plicas'
`Utilizando acentos graves`
```

Cada uma destas formas pode ser utilizada de forma intercalar, especialmente se a *string* em si tiver o caractere delimitador.

```js
"Uma vem alguém disse: \"Um dia a vida será bela\""
'Uma vem alguém disse: "Um dia a vida será bela"'
```

> É utilizada a `\` para "escapar" um caractere delimitador. Para que a *string* tenha uma `\` é necessário escrever duas `\\`.
> Para além disso existem vários caracteres que podem ser aceditos utilizando a `\` como `\n` para quebra de linha, `\t` para tabulação, `\0` para o caractere `null`, entre outros.

Enquanto que usar aspas ou plicas a *string* resultante é a mesma, ao utilizar acentos graves criamos o que se chama de *template literal* que permite *strings* com várias linhas, uma fácil interpolação de *strings* e até *tagged templates* (que não serão abordados, para os [curiosos](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates)).

```js
const msg = "Uma vem alguém disse:\n" +
    "Um dia a vida será bela";

const msg2 = `Uma vem alguém disse:
    Um dia a vida será bela`;
```

> *Template literals* permitem que o novas linhas façam parte da *string* sem a utilização do `\n`.

As *Template literals* tornam-se bastante uteis quando precisamos criar *strings* dinâmicas que juntam valores de variáveis com texto pré-definido. Tomemos este exeplo que foi utilizado no exercício anterior:

```js
const name = "Ana";

console.log("O meu nome é " + name); // O meu nome é Ana
```

Em vez de utilizar o operador de concatenação `+`, podemos utilizar *template literals* para tornar o código mais legível:

```js
const name = "Ana";

console.log(`O meu nome é ${name}`); // O meu nome é Ana
```

Ou seja, quando utilizamos *template literals* e queremos inserir o valor de uma **variável** ou **expressão** JavaScript utilizamos `${expressão}`. Eis um exemplo do uso de *template literal* com expressões:

```js
const name = "Ana";
const age = 15;

console.log(`O meu nome é ${name} e sou ${age < 18 ? "menor" : "maior"} de idade`);
// O meu nome é Ana e sou menor de idade
```

***

Neste exercício pretende-se pôr em prática os conhecimentos sobre *template literals* e operadores de forma a conseguir que o código esteja **da forma mais concisa possível**. Escreve um programa que imprima na consola as informações relativas a um produto que estão guardadas em três variáveis a criar:
- Variável `name` que terá o nome do produto;
- Variável `price` que terá o preço do produto;
- Variável `supplier` que terá o nome do fornecedor do produto.

Pretende-se que o programa escreva na consola uma frase com a seguinte estrutura:

```
O produto <name> tem um preço <op1> e é fornecido por <op2>
```

Onde `<op1>` é "baixo" ou "alto" se `price` for menor ou maior a 10€ e `<op2>` é o valor de `supplier` se a *string* não estiver vazia ou então "Continente".

***

**Objetivo do exercício:**
- Aparecer na consola o resultado anteriormente apresentado;
- Deve ser utilizado *template literals*;
- Não podem ser utilizadas condições e só pode ser utilizado 1 operador ternário;
- O programa não pode exceder 5 linhas de código.