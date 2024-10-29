---
name: Funções anónimas e lambdas
validators:
    - check: output
      condition: 's === "14\n61"'
    - check: code
      condition: 'o.func.toString() == "function sumWithModifier,=>,=>"'
    - check: code
      condition: 'o.var.length === 0'
output: "14\n61"
---

Como observado no exercício anterior, para passar a referência de uma função para outra é utilizado o seu nome (sem `()`). Também é de salientar que a função `double` e a função `power` foram declaradas mas o seu único propósito era o de serem passadas como parâmetro à função `sumWithModifier`. Para que não seja necessário declarar uma função global apenas para ser passada como parâmetro a outra, surgem as funções anônimas e as funções lambda (*arrow functions*).

Uma função anônima é uma função normal como as outras, distinguindo-se pelo facto de não ter um nome, ou seja não pode ser chamada da mesma forma que as funções normais. Vejamos a sintaxe da declaração de uma função anônima:

```js
function () {
    /* código */
}
```

Se executarmos o código acima, iremos obter um erro a dizer que a função precisa de um nome, isto porque na verdade as funções anónimas não foram criadas para serem declaradas fora de uma chamada de uma função, ou sem estarem igualadas a uma variável.

Analisemos o seguinte código que afeta a variável `func` com uma função anónima que devolve a soma de dois números:

```js
const func = function (a, b) {
    return a + b;
};
```

Neste caso, a função anónima passou a estar acessível utilizando a variável `func`:

```js
console.log(func(3, 4)); // 7
```

A questão agora seria, porquê usar funções anónimas ao invés de funções normais? Com o exemplo anterior é dificil perceber as vantagens, mas antes disso, qual é a grande diferença entre declarar uma função usando `function` e declarar uma função anónima numa variável?

A grande diferença encontra-se no momento em que essa função pode ser chamada e no seu ciclo de vida. Uma função criada com `function` está sempre disponível no *scope* que é criada, pode até mesmo ser declarada no fim desse *scope* e ser chamada no início, resumidamente a ordem é indiferente. Já uma função dentro de uma variável está limitada ao tempo de vida dessa variável e, no caso de ter sido usado `let`, essa variável pode ser afetada com um novo valor, substituindo a referência para a função por completo.

Vejamos o exemplo da função `calcAndPrint` do exercício passado, a mesma pode ser reescrita declarando a função a passa de forma implícita:

```js
function calcAndPrint(a, b, print) {
    print(a + b);
}

calcAndPrint(5, 10, function (val) {
    console.log(val);
});
```

> A função `myPrint` foi substituída por uma função anónima declarada na própria chamada da função `calcAndPrint`, reduzindo assim a declaração de uma função adicional.

***

Mas e se dissessem que seria possível reduzir ainda mais o código necessário para resolver este problema, será que acreditavas? Pois bem é aqui que entram as *arrow functions*, ou mais conhecidas como funções *lambda*.

```js
// Função anónima
const func = function (a, b) {
    return a + b;
};

// Função lambda (Arrow function)
const func = (a, b) => {
    return a + b;
}
```

> A sintaxe de uma função *lambda* caracteriza-se por remover a *keyword* `function` e adicionar uma seta (`=>`) seguido dos parênteses dos argumentos.

Dependendo do corpo e da quantidade de argumentos de uma *arrow function*, a sua sintaxe pode ser simplificada:
- No caso de uma função *lambda* com 0, 2 ou mais argumentos é obrigatório o uso de parênteses nos argumentos, mas podem ser omitidos com 1 argumento:
```js
const func = () => { return 2; };
const func2 = a => { return a; };
const func3 = (a, b) => { return a + b; };
```

- No caso da função *lambda* não ter mais nenhuma instrução sem ser o valor a retornar, a função deixa de precisar de chavetas e a keyword `return`:
```js
const func = () => 2;
const func2 = a => {
    a += 1;
    return a;
};
const func3 = (a, b) => a + b;
```

> Existe apenas uma diferença entre o uso de uma função anónima e uma função lambda, essa diferença encontra-se no contexto do `this` que só será importante nos exercícios sobre substituição de funções.

De uma forma geral, as funções *lambda* permitem descrever de uma forma clara o que uma função recebe e o que vai devolver. Eis um exemplo final do código da função `calcAndPrint`:

```js
function calcAndPrint(a, b, print) {
    print(a + b);
}

calcAndPrint(5, 10, val => console.log(val));
```

Este tipo de funções vão ser úteis nos exercícios dos capítulos seguintes.

***

Neste exercício pretende-se reescrever o programa do exercício anterior para que, ao chamar a função `sumWithModifier`, não seja necessário a criação de uma função separada. Deves utilizar funções *lambda* para resolver o problema (e tentar minimizar o seu código ao máximo).

***

**Objetivo do exercício:**
- Aparecer na consola o resultado das somas após aplicação do modificador;
- Declarar apenas 1 função, as outras duas devem ser passadas como funções *lambda*;
- Não podes declarar nenhuma variável.