---
name: Criação de variáveis
validators:
    - check: output
      condition: '/^\d+$/g.test(s)'
    - check: code
      condition: 'o.var.filter(v => v === "const").length >= 2'
output: "10"
---

**JavaScript** é uma linguagem de alto nível orientada a objetos, [*Weakly typed*](https://en.wikipedia.org/wiki/Strong_and_weak_typing) e com compilação Just-in-time (a compilação é feita no momento de execução), com sintaxe semelhante ao C e Java.

É uma linguagem de programação maioritáriamente conhecida para o desenvolvimento de aplicações web, no entanto, com o aparecimento do **Node.JS**, passou a ser utilizada também por servidores.

Neste conjunto de exercícios será utilizado o ambiente de desenvolvimento **Node.JS**, o que permite a leitura de ficheiros, acesso a APIs de sistema, entre outros.

***

Começando pelo básico, em **JavaScript** existem 3 formas de declarar variáveis:
1. Usando `var` que cria uma variável que persiste após scopes (*não recomendada*);
2. Usando `let` que cria uma variável no scope atual;
3. Usando `const` que cria uma constante cujo o valor não pode ser alterado por afetação (utilizando o `=`).

Por questões de boa prática, deve ser utilizado `const` **sempre que possível** para evitar a possível afetação indesejada.

> Entende-se por "scope" qualquer par de chavetas (uma função é um scope, um if é outro, etc.), variáveis `let` e `const` apenas são válidas dentro do par de chavetas que as engloba.

Eis um breve exemplo de declaração de uma variável `num` com valor `15`:

```js
let num = 15;
```

***

Em **JavaScript**, é possível escrever na consola utilizando o objeto `console` disponível no globalmente. Neste objeto é possível encontrar os métodos `log`, `info`, `warn` e `error` que irão ser úteis ao longo dos exercícios.

***

Neste primeiro exercício, escreve um programa que declare duas constantes com valores à escolha e imprima o resultado da sua soma na consola.

***

**Objetivo do exercício:**
- Aparecer apenas um número na consola;
- Criar pelo menos 2 variáveis.