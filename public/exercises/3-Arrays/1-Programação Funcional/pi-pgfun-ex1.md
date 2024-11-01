---
name: Os métodos map e filter
validators:
-   check: output
    condition: 's === "Destino,Decisão,Dança"'
-   check: code
    condition: 'o.loop.length === 0'
-   check: code
    condition: 'o.func.length >= 1'
output: "Destino,Decisão,Dança"
---

**JavaScript** oferece um conjunto de métodos para trabalhar com **arrays** que facilitam a manipulação dos seus dados, estes métodos seguem o paradigma da [programação funcional](https://en.wikipedia.org/wiki/Functional_programming).

A programação funcional é um estilo de programação onde funções são tratadas como "entidades de primeira classe", ou seja, dá-se preferência ao uso de funções puras (ou imutáveis), que não produzem efeitos colaterais.

> Uma função pura (ou imutável) é uma função que não altera os dados que utiliza e produz sempre o mesmo resultado para as mesmas entradas.

As primeira duass funções que iremos abordar são:

- `map`: Aplica uma transformação a cada um dos elementos do *array*;
- `filter`: Filtra os elementos do *array* que não satisfazem uma determinada condição.

Vejamos agora um exemplo de como obter os números pares de um *array* e múltiplica-los por 2 utilizando a programação imperativa:

```js
const arr = [1, 2, 3, 4, 5, 6];
const result = [];

for (const element of arr) {
    if (element % 2 === 0)
        result.push(element * 2);
}
```

O mesmo resultado pode ser obtido utilizando as funções `map` e `filter` com programação funcional:

```js
const arr = [1, 2, 3, 4, 5, 6];
const result = arr
                .filter(element => element % 2 === 0)
                .map(element => element * 2);
```

> De uma forma geral, a programação funcional torna mais fácil a leitura de código e de entender o que realmente está a acontecer.

Ambas as funções `map` e `filter` recebem uma função como parâmetro que normalmente é uma expressão lambda. Essa lambda descreve a transformação a ser feita, no caso do `map`, ou os elementos a filtrar, no caso do `filter`.

Enquanto que normalmente as transformações são coisas simples que podem ser descritas em uma única linha, é possível também fazer uma transformação mais complexa desde que a função devolve o valor com o `return`.

```js
const arr = [1, 2, 3, 4, 5, 6];
const result = arr.map(element => {
    const novoValor = element * 2 + 1;

    // ... uma operação mais complexa ...

    return novoValor;
});
```

> O primeiro parâmetro da função passada para o `map` e para o `filter` é, como vimos anteriormente, o elemento do *array* que está a ser mapeado ou filtrado. Mas existem mais parâmetros que podem ser obtidos, sendo um deles o indice do elemento atual.
> ```js
> const arr = [1, 2, 3, 4, 5];
> const result = arr.map((element, index) => element * index);
> // result -> [0, 2, 6, 12, 20]
> ```

***

Neste exercício pretende-se reescrever e modificar a função `joinWordsWith` que foi desenvolvida num exercício anterior. Esta nova versão da função irá chamar-se `getSmallWordsWith` e, tal como a anterior, recebe um *array* de *strings* como parâmetro e uma outra *string* que equivale aos caracteres iniciais da palavra a filtrar.

A função deve filtrar todas as palavras que começam pela string passada por parâmetro e que sejam menores que 8 caracteres. Ao contrário da função original, esta versão deverá devolver o *array* transformado sem inverter a ordem dos elementos.

Para testar a função `getSmallWordsWith`, chame-a passando o *array* `["Diamante", "Destino", "Estrela", "Horizonte", "Decisão", "Relógio", "Conquista", "Labirinto", "Dança", "Sabedoria"]` e a *string* `D`.

***

**Objetivo do exercício:**
- Aparecer na consola as palavras começadas pela *string* passada por parâmetro;
- Não podes utilizar nenhum tipo de ciclo;
- Declarar pelo menos 1 função.