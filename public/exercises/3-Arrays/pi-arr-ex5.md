---
name: Arrays Multidimensionais
validators:
-   check: output
    condition: 's === "true"'
-   check: code
    condition: 'o.func.length >= 1'
-   check: code
    condition: 'o.loop.length === 1'
output: "true"
---

Para além de terem valores primitivos, os *arrays* podem também conter outros *arrays* (semelhante a matrizes matemáticas), ou até mesmo referências para funções:

```js
const arr = [
    [1, 2, 3],
    [4, 5, 6, 7, 8],
    () => 3
];
```

O *array* acima é composto por 3 elementos, 2 *arrays* e uma função que devolve `3`. Para aceder a um certo elemento de um *sub-array*, utilizamos a seguinte sintaxe:

```js
arr[0][1] // 2
```

Vamos agora considerar um outro *array* apenas composto por outros *arrays*:

```js
const arr = [
    [1, 2, 3],
    [4, 5],
    [6, 7, 8, 9, [10, 11, 12]]
];

let flatArr = arr.flat();
// flatArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, [10, 11, 12]]
flatArr = arr.flat(2);
// flatArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
```

A função `flat` (já presente em *arrays*) devolve um novo *array* com todos os elementos dos *sub-arrays* concatenadosde forma recursíva até ao nível especificado (caso contrário, apenas o primeiro nível é concatenado).

***

Para este exercício, considera o seguinte *array* de valores:

```js
const data = [
    ["Diamante", 140, false, "JavaScript"],
    [
        v => v.startsWith("D"),
        v => v % 2 == 0,
        v => !v,
        v => v.includes("Script")
    ]
];
```

A variável `data` é um *array* com 2 posições em que na sua primeira posição contém outro *array* com um conjunto diversificado de valores. A segunda posição contém um outro *array* de funções com o mesmo número de elementos que o primeiro. Estas funções irão servir como validadores para os valores do primeiro *array* (cada validador para cada valor do *array*, por ordem).

Deverás realizar a função `validateData` que recebe um *array* deste género por parâmetro e devolver `true` se todos os valores forem válidos, ou `false` caso contrário. Para testar a função, chame-a passando o *array* `data` como parâmetro.

***

**Objetivo do exercício:**
- Aparecer na consola o valor `true`;
- Declarar pelo menos 1 função;
- Utilizar apenas 1 ciclo.