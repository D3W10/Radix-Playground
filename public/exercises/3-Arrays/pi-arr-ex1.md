---
name: Introdução aos Arrays
validators:
    - check: output
      condition: 's === v.data.join("\n") + "\n" + v.data.length'
    - check: code
      condition: 'o.loop.length === 1'
    - check: code
      condition: 'o.var.length === 2'
output: "Valor 1\nValor 2\nValor 3\nValor 4\nValor 5\n5"
---

Com o objetivo de agrupar conjuntos de dados com o mesmo significado, tal como em outras linguagens, **JavaScript** permite a criação de *arrays* para armazenar esses dados.

Embora, ao contrário de outras linguagens, os *arrays* em **JavaScript** não possuem tamanho definido (assemelham-se às listas em Java) nem um tipos de dados pré-definido (aceitanto tipos de dados diferentes nas suas posições).

Criar um *array* é tão simples como utilizar `[]`, opcionalmente definindo o seu conteúdo inicial:

```js
const array = [];
const array2 = [1, 2, 3];
const array3 = [45, "Um dia a vida será bela", false];
```

Para aceder a uma posição desse *array*, é utilizado também os `[]` à frente do nome da variável ou literal.

```js
array[0]; // undefined
array2[1]; // 2
array3[2]; // false
```

> É de notar que os *arrays* não têm um tamanho definido, isso significa que o seu tamanho aumenta e diminui conforme são adicionados ou removidos elementos do *array*.

> Nos exercícios anteriores foi aprendido o cíclo `for`, com os arrays, este cíclo pode ser bastante útil para iterar sobre os seus elementos.

Ao criar um array, tal como nas *strings* o mesmo vem com métodos e propriedades que podem ser utilizados para manipular o seu conteúdo. Para este primeiro exercício falaremos apenas do `length` que devolve o tamanho atual do *array*.

```js
array2.length; // 3
```

***

Neste exercício, escreve um programa que, de uma variável `data` cujo valor é um *array* com elementos à escolha, imprima na consola cada um dos seus elementos e, por fim, o seu comprimento.

***

**Objetivo do exercício:**
- Aparecer na consola o conteúdo do *array*, seguido do seu comprimento;
- Utilizar apenas 1 ciclo;
- Cria apenas 2 variáveis.