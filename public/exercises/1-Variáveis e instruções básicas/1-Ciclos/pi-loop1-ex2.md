---
name: Ciclos e condições
validators:
    - check: output
      condition: 's === Array(20).fill(null).map((_, i) => ((i + 1) % v.n === 0 ? i + 1 + "\n" : "")).join("").trimEnd()'
    - check: code
      condition: 'o.loop.filter(l => l === "while").length > 0'
    - check: code
      condition: 'o.var.length <= 2'
    - check: code
      condition: 'o.if.length !== 0'
output: "3\n6\n9\n12\n15\n18"
---

Neste exercício pretende-se pôr em prática os conhecimentos sobre condições e ciclos aprendidos nos exercícios anteriores. Escreve um programa que imprima todos os número até 20 que são divisíveis por `n`.

***

**Objetivo do exercício:**
- Aparecer na consola os números divisíveis por `n` até 20;
- Só é permitido utilizar o ciclo `while`;
- Criar menos de 2 variáveis.