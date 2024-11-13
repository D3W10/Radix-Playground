---
name: Passagem por referência/valor
validators:
-   check: output
    condition: >-
        s === `{
            "name": "Daniel",
            "age": 20,
            "grades": [
                15,
                12,
                18
            ],
            "mark": 15
        }`
-   check: code
    condition: 'o.func.length >= 1'
-   check: code
    condition: '!c.includes("return")'
output: >-
    {
        "name": "Daniel",
        "age": 20,
        "grades": [
            15,
            12,
            18
        ],
        "mark": 15
    }
---

Em JavaScript, existem duas formas pelas quais um valor pode ser passado para uma função, são elas:
- **Passagem por valor**: Todos os tipos primitivos (*number*, *string*, *boolean*, etc.) são passados por valor, ou seja, quando a função é chamada, é criada uma cópia do valor para o parâmetro da função. Quaisquer alterações feitas ao valor dentro da função **não afetarão** o valor original.

```js
function increment(n) {
    n += 1;
}

let n = 1;
increment(n);
console.log(n); // 1
```
- **Passagem por referência**: Todos os objetos (incluindo *arrays* e funções) são passados por referência, ou seja, quando a função é chamada, é criado uma cópia do endereço de memória atual do objeto para o parâmetro da função. Quaisquer alterações feitas ao valor dentro da função **afetarão** o valor original.

```js
function increment(n) {
    n.num += 1;
}

const obj = { num: 1 };
increment(obj);
console.log(obj.num); // 2
```

Existem formas de alterar o comportamento padrão de passagem de parâmetros para uma função. Para passar tipos primitivos por referência, podemos envolve-los num objeto ou *array*. Já para passar objetos por valor, podemos criar uma cópia desse objeto utilizando um método que será introduzido no próximo exercício.

***

Neste exercício, escreve um programa que define a função `fillStudentMark` que recebe um objeto com informações relativas a um aluno por parâmetro e preenche o valor da chave `mark` com a média das suas notas. Esta função não deve devolver nenhum valor de forma explícita.

Chama a função criada passando o objeto abaixo como parâmetro e imprime na consola o objeto após a chamada da função.

```js
const student = {
    name: "Daniel",
    age: 20,
    grades: [15, 12, 18]
};
```

***

**Objetivo do exercício:**
- Aparecer na consola o aluno com a nota preenchida;
- Declarar pelo menos 1 função;
- Não podes utilizar a *keyword* `return`.