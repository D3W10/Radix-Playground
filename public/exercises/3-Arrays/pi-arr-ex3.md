---
name: Métodos em Arrays
validators:
    - check: output
      condition: 's === "Dança Decisão Destino Diamante"'
    - check: code
      condition: 'o.loop.every(l => l === "for of")'
    - check: code
      condition: 'o.loop.length >= 1'
    - check: code
      condition: 'o.func.length >= 1'
output: "Dança Decisão Destino Diamante"
---

Tal como mencionado no primeiro exercício sobre *arrays*, existem vários métodos e propriedades disponíveis para a manipulação do seu conteúdo. Para além do `length`, os dois principais métodos são:
- `push(value)`: Adiciona um novo valor ao fim do *array*;
- `pop()`: Remove o último valor do *array* e devolve-o.

Para além dos principais, existem também:
- `fill(value)`: Preenche todas as posições com um valor;
- `concat(value)`: Devolve um novo *array* com a junção do *array* atual com o *array* passado como parâmetro;
- `includes(value)`: Verifica se o *array* contém um certo valor;
- `join(value)`: Junta todos os valores do *array* separados com o valor passado;
- `reverse()`: Inverte a ordem dos valores do *array*;
- `indexOf(value)`: Retorna o primeiro índice do valor passado ou -1 se não existir;
- `lastIndexOf(value)`: Retorna o último índice do valor passado ou -1 se não existir;
- `slice(start, end)`: Retorna um novo *array* com o conteúdo do *array* original entre os índices `start` e `end` (se não informado o índice `end`, o valor padrão é o tamanho do *array*);
- `splice(start, deleteCount, newValue)`: Remove os elementos do *array* entre os índices `start` e `start + deleteCount` e, opcionalmente, substituí-los por `newValue`;
- `shift()`: Remove o primeiro valor do *array*e devolve-o;
- `unshift(value)`: Adiciona um novo valor ao início do *array*.

Existem ainda métodos que recebem funções como parâmetros, como por exemplo:
- `forEach(callback)`: Chama a função `callback` por cada elemento do *array*, fornece informações sobre o valor e o indice do elemento atual;
- `sort(callback)`: Ordena o *array* de acordo com a função `callback`;
- `find(callback)`: Retorna o primeiro elemento do *array* que satisfaz a condição da função `callback`;
- `findIndex(callback)`: Retorna o índice do primeiro elemento do *array* que satisfaz a condição da função `callback`.

> Existem mais métodos sobre *arrays* que só serão abordados no capítulo da programação funcional.

Um pequeno exemplo dos métodos mais comuns em *arrays*:

```js
const data = [1, 2, 3, 4, 5];

data.push(6);
console.log(data); // [1, 2, 3, 4, 5, 6]
console.log(data.length); // 6

const removed = data.pop(); // 6
console.log(data); // [1, 2, 3, 4, 5]
console.log(data.length); // 5
```

> É de notar que mesmo o *array* estando declarado como `const`, o mesmo pode ser alterado mas apenas utilizando os seus métodos e não utilizando o `=`.

***

Neste exercício, escreve um programa que consiste numa função `joinWordsWith` que recebe um array de *strings* como parâmetro e uma outra *string* que equivale aos caracteres iniciais da palavra a filtrar. Em síntese, a função pega no *array* de palavras inicial, percorre-o e verifica se a palavra começa com o valor passado por parâmetro, armazenando essas palavras num outro *array* temporário. A função deverá devolver uma *string* com as palavras do *array* separadas por espaços de forma inversa.

Para testar a função, chame-a passando o *array* `["Diamante", "Destino", "Estrela", "Horizonte", "Decisão", "Relógio", "Conquista", "Labirinto", "Dança", "Sabedoria"]` e a *string* `D`.

***

**Objetivo do exercício:**
- Aparecer na consola as palavras começadas pela *string* passada por parâmetro, de forma inversa e separadas por espaço;
- Utilizar apenas cíclos *for of*;
- Utilizar pelo menos um 1 ciclo;
- Declarar pelo menos 1 função.