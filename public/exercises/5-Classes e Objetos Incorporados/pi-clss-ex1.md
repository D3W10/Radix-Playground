---
name: Number, Array e Object
validators:
-   check: output
    condition: |-
        s === `[{
            "name": "Huracan",
            "brand": "Lamborghini",
            "price": [
                52642
            ],
            "wheels": 4,
            "windows": 4
        }, {
            "name": "XC90",
            "brand": "Volvo",
            "price": [
                29000
            ],
            "color": "red",
            "wheels": 4,
            "windows": 4
        }, {
            "name": "C-Class",
            "brand": "Mercedes",
            "price": [
                35000,
                37000
            ],
            "wheels": 4,
            "windows": 4
        }, {
            "name": "S90",
            "brand": "Volvo",
            "price": [
                37000
            ],
            "autopilot": true,
            "wheels": 4,
            "windows": 4
        }]
        ["name", "brand", "price", "wheels", "windows"]`
-   check: code
    condition: 'o.func.length >= 1'
-   check: code
    condition: '!c.includes("return")'
-   check: code
    condition: 'c.includes("isNaN(") && c.includes("Object.keys(") && c.includes("Object.assign(")'
output: |-
    [{
        "name": "Huracan",
        "brand": "Lamborghini",
        "price": [
            52642
        ],
        "wheels": 4,
        "windows": 4
    }, {
        "name": "XC90",
        "brand": "Volvo",
        "price": [
            29000
        ],
        "color": "red",
        "wheels": 4,
        "windows": 4
    }, {
        "name": "C-Class",
        "brand": "Mercedes",
        "price": [
            35000,
            37000
        ],
        "wheels": 4,
        "windows": 4
    }, {
        "name": "S90",
        "brand": "Volvo",
        "price": [
            37000
        ],
        "autopilot": true,
        "wheels": 4,
        "windows": 4
    }]
    ["name", "brand", "price", "wheels", "windows"]
---

Em **JavaScript**, tal como em muitas linguagens orientadas a objetos, possibilita a criação de classes (mesmo que muitas vezes não necessário). Neste conjunto de exercícios não será abordado o tema da criação de classes, no entanto, para os curiosos, a [MDN tem um resumo](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) bastante claro de como funcionam.

Para instanciar uma classe, utiliza-se o operador `new`:

```js
const obj = new MyClass();
```

Existem várias classes predefinidas na linguagem que serão o alvo do conjunto de exercícios seguintes. As primeiras classes que vamos abordar são as classes correspondem aos tipos existentes em **JavaScript**, estas classes fornecem métodos relativos a cada um dos tipos associados e podem ser úteis para manipular valores. As classes que vamos abordar são:
- `Number`;
- `Array`;
- `Object`.

> Todas as classes permitem criar valores dos tipos que representam, enquanto que criar um valor utilizando um *literal* ou utilizando o construtor é praticamente o mesmo, ambos diferem quando estritamente comparados.

Na classe `Number`, estão presentes alguns métodos sobre número e constantes correspondentes aos valores máximos e mínimos que podem ser representados:
- `Number.MAX_VALUE`: Representa o maior valor numérico que pode ser representado;
- `Number.MIN_VALUE`: Representa o menor valor numérico que pode ser representado;
- `Number.isFinite(value)`: Devolve `true` se o valor for um número finito, caso contrário, devolve `false`;
- `Number.isInteger(value)`: Devolve `true` se o valor for um número inteiro, caso contrário, devolve `false`;
- `Number.isNaN(value)`: Devolve `true` se o valor for `NaN`, caso contrário, devolve `false`;
- `Number.parseInt(value)`: Converte o valor para um número inteiro;
- `Number.parseFloat(value)`: Converte o valor para um número de vírgula flutuante.

> Alguns destes métodos estão disponíveis globalmente e não precisam de ser chamados a partir de `Number` (como o `isNaN`, `parseInt` e `parseFloat`).
> ```js
> // Ambos são válidos
> Number.isNaN(NaN);
> isNaN(NaN);
> ```
> É de notar também que `NaN == NaN` e `NaN === NaN` resolvem **sempre** para `false` e deve ser utilizado o método `isNaN` para verificar esta comparação.

Na classe `Array`, os únicos métodos que vamos abordar são:
- `Array.isArray(value)`: Devolve `true` se o valor for um *array*, caso contrário, devolve `false`;
- `Array.of(...value)`: Cria um novo *array* a partir dos elementos passados por parâmetro.

Na classe `Object`, temos os métodos:
- `Object.assign(target, ...sources)`: Copia todas as propriedades de `sources` para o objecto `target` e devolve o objecto `target`;
- `Object.keys(obj)`: Devolve um *array* com todas as chaves de um objeto;
- `Object.values(obj)`: Devolve um *array* com todos os valores de um objeto;
- `Object.seal(obj)`: Sela um objeto, impedindo que sejam adicionadas ou removidas novas propriedades;
- `Object.isSealed(obj)`: Devolve `true` se o objeto estiver selado, caso contrário, devolve `false`;
- `Object.freeze(obj)`: Congela um objeto, impedindo que ele seja alterado de forma alguma;
- `Object.isFrozen(obj)`: Devolve `true` se o objeto estiver congelado, caso contrário, devolve `false`.

***

Neste exercício, escreve um programa que define a função `assignNewDataToCars` que recebe dois parâmetros, um *array* de objetos com várias informações relativas a carros e um objeto com novas informações a serem adicionadas a todos os carros:

```js
const cars = [
    {
        name: "Huracan",
        brand: "Lamborghini",
        price: [52642]
    },
    {
        name: "XC90",
        brand: "Volvo",
        price: 29000,
        color: "red"
    },
    {
        name: "C-Class",
        brand: "Mercedes",
        price: [35000, 37000]
    },
    {
        name: "S90",
        brand: "Volvo",
        price: [37000, "oops"],
        autopilot: true
    }
];

const newData = {
    wheels: 4,
    windows: 4
};
```

Alguns pontos a considerar:
- O objeto relativo a cada carro pode ter chaves únicas a si próprio que outros carros não possuem;
- Um carro pode ter mais de um preço associado (podendo ser ou não um *array*), esse valor pode não ser válido.

A função deve modificar o *array* passado por parâmetro, pôr todos os preços dentro de um *array* (se não estiverem já dentro de um), remover quaisquer preços inválidos (tentando convertê-los para número primeiro e verificar se são válidos) e juntar as novas informações a cada um dos carros. **Não deve devolver nenhum valor de forma explícita.**
Chama a função criada passando os dois objetos definidos acima como parâmetros e imprime na consola o *array* resultante após a chamada da função e os nomes das chaves do primeiro elemento desse *array*.

***

**Objetivo do exercício:**
- Aparecer na consola o *array* com as informações sobre os carros e as chaves do objeto do primeiro carro;
- Declarar pelo menos 1 função;
- Não podes utilizar a *keyword* `return`;
- Utilizar métodos introduzidos neste exercício.