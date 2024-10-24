---
name: Condições
validators:
    - check: output
      condition: s == "true\nfalse"
    - check: code
      condition: (s.match(/const|let/g) || []).length <= 2
output: "true\nfalse"
---

O `if` é uma estrutura condicional que executa o código dentro do bloco se uma determinada condição for verdadeira, caso contrário executa o código dentro do `else` (se existir).

Em **JavaScript**, uma condição não precisa de resultar necessáriamente num valor booleano, mas sim de um valor considerado como [*verdadeiro*](https://developer.mozilla.org/en-US/docs/Glossary/Truthy).

Alguns dos operadores usados para condições são: `==`, `===`, `!=`, `!==`, `>`, `<`, `>=` e `<=`. Todos devem ser familiares à excepção do *strict equal* (`===`) e do *strict not equal* (`!==`).

Em **JavaScript**, sempre que é feita uma operação entre valores, o mesmos podem ser convertidos automaticamente de acordo com a necessidade e operação. Tomemos como exemplo o seguinte código:

```js
if (3 == "3") {
  console.log("O valor é 3");
}
```

Na maior parte das linguagens, esta condição seria falsa já que mesmo o valor de ambas ser efetivamente 3, os tipos de dados não são iguais e uma *string* não pode ser comparada com um número. Em **JavaScript**, a condição seria verdadeira já que o ambiente de execução iria converter um dos termos para o tipo do outro. Usando agora uma subtração entre valores de tipos diferentes:

```js
if ("7" - 3 == 4) {
  console.log("O resultado é 4");
}
```

Neste exemplo a condição também seria verdadeira, como o operador `-` só pode ser utilizado entre 2 números, a linguagem vai tentar converter a string para um valor numérico que depois será comparado com o número 4.

Por mais que este fenómeno pode parecer útil para algumas situações, pode também resultar em problemas já que a forma de lidar com texto não é a mesma de com números, especialmente às ações que podem ser realizadas com esses valores.

Para evitar este problema, apareceram os operadores strict (`===` e `!==`) que verificam se os valores e o tipo de dados da variável são iguais, reduzindo assim bastante a probabilidade de erros.

[Aqui](https://dorey.github.io/JavaScript-Equality-Table/) é possível ver uma tabela com a comparação entre vários valores utilizando cada um dos operadores.

> É recomendado que se utilize sempre o operador `===` para comparações de igualdade para evitar problemas indesejados.

***

Neste exercício, escreve um programa que declare duas variáveis, uma com um valor `string` (ex: "8") e outra com um valor `number` correspondente (ex: 8). Este programa deve escrever na consola o resultado da sua comparação usando o operador `==` e o operador `===`.

***

**Objetivo do exercício:**
- Aparecer na consola o resultado de ambas as comparações;
- Criar até 2 variáveis.