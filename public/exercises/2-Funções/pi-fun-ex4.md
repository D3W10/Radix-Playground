---
name: Funções dentro de funções
validators:
-   check: output
    condition: 's === (Math.pow(+(c.match(/hipotQuad\((\d+),\s*(\d+)\)/) ?? [])[1], 2) + Math.pow(+(c.match(/hipotQuad\((\d+),\s*(\d+)\)/) ?? [])[2], 2)).toString()'
-   check: code
    condition: '!c.includes("Math")'
-   check: code
    condition: 'o.func.length >= 2'
-   check: code
    condition: '(c.match(/function\shipotQuad\([\w,]*\){function\squadrado\([\w,]*\){/) ?? []).length !== 0'
-   check: code
    condition: 'o.var.length === 0'
output: "20"
---

Em **JavaScript**, é possível definir funções dentro de outras funções. Isto é útil se precisarmos de uma função auxiliar para resolver uma operação complexa mas não expor essa função para o *scope* principal do programa (limitando assim o acesso à função auxiliar).

***

Neste exercício pretende-se reescrever o programa do exercício anterior para que a função `quadrado` apenas esteja disponível dentro da função `hipotQuad`. Não devem ser necessárias muitas alterações ao código do exercício anterior.

***

**Objetivo do exercício:**
- Aparecer na consola a hipotenusa quadrada de dois catetos;
- Declarar pelo menos 2 funções (uma dentro da outra);
- Não podes declarar nenhuma variável.