---
name: Tipos de dados
validators:
    - check: output
      condition: s === 'boolean\nobject'
    - check: code
      condition: (s.match(/let/g) || []).length === 1
output: "boolean\nobject"
---

Como referido no exercício anterior, JavaScript é uma linguagem *weakly typed* e *dynamicly typed*, isto é, as variáveis não têm um tipo de dados pré-definido e constante durante o decorrer do programa. Tomemos como exemplo o seguinte código:

```js
let num = 15;
num = "Um dia a vida será bela";
```

Este código pode ser estranho para quem está habituado a liguagens como C ou Java mas em **JavaScript** este código executa sem problemas.
Mesmo as variáveis não tendo um tipo de dados estabelecido, as mesmas tem um tipo de dados associado de acordo com o seu valor atual.

Existem 8 tipos de dados:
- `Number`: Guarda números inteiros ou reais;
- `String`: Permite guardar sequencias de caracteres;
- `Boolean`: Guarda valores lógicos (`true` ou `false`);
- `null`: Onde apenas o valor `null` é permitido;
- `undefined`: Onde apenas o valor `undefined` é permitido;
- `Object`: O tipo de dados onde os arrays, objetos, datas, maps, sets, etc. pertencem;
- `BigInt`: Permite guardar números inteiros de magnitude arbitrária;
- `Symbol`: Um valor único e imutável.

> Todos estes tipos de dados, excepto o `Object`, são tipos primitivos, ou seja, a sua estrutura não é modificada porque são representados diretamente no nível mais baixo da linguagem.

Para os exercícios seguintes, serão apenas utilizados os primeiros 6 tipos de dados que são os mais usados de forma geral. De entre esses 6, destacam-se os tipos `null` e `undefined` que podem parecer semelhantes mas tem propósitos distintos.

O tipo de dados `null` que está presente em outras linguagens, em JavaScript representa a "ausência de um objeto", enquanto que o `undefined` representa a "ausência de um valor". Este tipos serão utilizados e explicados com mais detalhes quando os objetos forem introduzidos.

***

Para obter o valor atual de uma variável, utiliza-se o operador `typeof` que devolve uma string com o tipo de dados dessa variável:

```js
let num = 15;
console.log(typeof num); // "number"

num = "Um dia a vida será bela";
console.log(typeof num); // "string"
```

> Todos os tipos primitivos excepto o `null` podem ser testados usando o operador `typeof`. O código `typeof null` irá devolver "object".

***

Neste exercício, escreve um programa que declare uma variável com um valor booleano inicial e de seguida afetar essa variável com um valor do tipo `null`, imprimindo o tipo da variável depois de cada um dos estados (antes e depois da afetação).

***

**Objetivo do exercício:**
- Aparecer na consola o tipo da variável antes e depois da afetação;
- Criar apenas 1 variável.