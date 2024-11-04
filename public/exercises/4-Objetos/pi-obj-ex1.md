---
name: Introdução aos Objetos
validators:
-   check: output
    condition: 's === "Daniel\n20"'
-   check: code
    condition: 'o.var.length === 1'
output: "Daniel\n20\n21"
---

A programação orientada a objetos (POO) é um paradigma de programação que se baseia no conceito de "objeto", sendo este algo que pode armazenar dados na forma de campos e código na forma de métodos. Muitas linguagens de programação suportam a POO na forma de classes e interfaces, em **JavaScript**, a criação de objetos não precisa de ser feita utilizando classes, pode ser sim feita declarando um objeto arbitrário de forma explícita.

Vejamos o exemplo da criação de um objeto simples:

```js
const student = {
    name: "Daniel",
    age: 20
};
```

A constante `student` foi declarada, em que o seu valor é um objeto com 2 campos, `name` e `age`. Um objeto é um conjunto de pares chave-valor (*key-value pairs*), onde a cada chave corresponde um valor, podendo esse valor ser de qualquer tipo de dados, incluindo *arrays*, funções ou até mesmo outros objetos:

```js
const obj = {
    key1: "value1",
    key2: 10,
    key3: [1, 2, 3],
    key4: () => console.log("Hello!"),
    key5: {
        key6: "value6"
    }
}
```

> É de notar que o valor da chave `key4` é um método. Um método é uma função que é guardada dentro de um objeto. O `console.log` é um método que está armazenado dentro do objeto `console`.

Para obter o valor de um dos campos de um objeto, utilizamos a *dot notation*, ou seja, o operador `.` sobre o nome da variável com o objeto e de seguida o nome do campo a obter:

```js
console.log(obj.key1); // "value1"
console.log(obj.key2); // 10
console.log(obj.key3); // [1, 2, 3]
console.log(obj.key4()); // Imprime na consola: Hello!
console.log(obj.key5.key6); // "value6"
```

Para além de obter o valor, também é possível modifica-los utilizando uma afetação:

```js
obj.key2 = "21";
obj.key5.key6 = "newValue";
console.log(obj.key2); // "21"
console.log(obj.key5.key6); // "newValue"
```

Voltando um bocadinho atrás, uma chave de um objeto tem de ser sempre do tipo *string*, as aspas da chave são opcionais **se** não conter nenhum caractere inválido (segue as mesmas regras de nomes de variáveis), eis um exemplo:

```js
const obj = {
    key1: "value1", // Válido
    "key2": "value2", // Válido
    'key3': "value3", // Válido
    key-4: "value4", // Inválido
    5key: "value5", // Inválido
    <key6>: "value6" // Inválido
};
```

No exemplo acima, as chaves `key-4`, `5key` e `<key6>` são inválidas se não forem utilizadas com aspas. A forma correta seria:

```js
const obj = {
    "key-4": "value4", // Válido
    "5key": "value5", // Válido
    "<key6>": "value6" // Válido
};
```

Existe ainda um problema com o acesso a estas chaves utilizando a *dot notation*, isto porque `obj.key-4` seria inválido e poderia até ser interpretado como uma subtração. Para evitar este problema, podemos utilizar uma outra forma de aceder aos campos de um objeto, esta sendo a *bracket notation*, semelhante aos *arrays*:

```js
console.log(obj.key1); // "value1"
console.log(obj["key1"]); // "value1"

console.log(obj.key-4); // Inválido
console.log(obj["key-4"]); // "value4"
```

> Em **JavaScript**, tudo o que não é um tipo primitivo (número, string, boolean, etc.) é considerado um objeto, isto inclui arrays, funções, classes e objetos explícitos.

***

Neste exercício, escreve um programa que declara o objeto abaixo e escreve na consola o nome e a idade do aluno:

```js
const student = {
    name: "Daniel",
    age: 20
};
```

Depois de escritos na consola, a idade deve ser alterada para um outro valor numérico e deverá ser impresso na consola a nova idade do aluno.

***

**Objetivo do exercício:**
- Aparecer na consola o nome e a idade do aluno, antes e depois de ser atualizada;
- Apenas declarar 1 variável.