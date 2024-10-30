---
name: Funções recursivas
validators:
-   check: output
    condition: 's === "1\n2\n6\n24\n120"'
-   check: code
    condition: 'o.func.length >= 1'
-   check: code
    condition: '(c.match(/factorial\(/g) ?? []).length === 3'
-   check: code
    condition: 'o.var.length === 1'
output: "1\n2\n6\n24\n120"
---

Uma função recursiva é uma função que chama a si mesma. O conceito de recursividade é muito potente e ajuda na resolução de problemas que envolvem a repetição de operações. Para evitar um erro de *stack overflow* (erro gerado quando o limite de memória do computador é excedido devido a uma chamada infinita de funções) é importante definir uma condição que limite a quantidade de chamadas da função.

***

Neste exercício, escreve um programa que calcule o fatorial dos números de 1 a 5. Para resolver o problema, deve ser definida a função `factorial` que recebe um número e devolve o fatorial desse mesmo número, esta função deve usar recursividade para resolver o problema.

***

**Objetivo do exercício:**
- Aparecer na consola o fatorial dos números de 1 a 5;
- Declarar pelo menos 1 função (que utiliza recursividade);
- Cria apenas 1 variável.