---
name: Ciclos e condições
validators:
    - check: output
      condition: '(c.match(/(?<=(const |let )n=)-?\d+/g) || []).length > 0 && s === Array(20).fill(null).map((_, i) => ((i + 1) % +(c.match(/(?<=(const |let )n=)-?\d+/g) || [])[0] === 0 ? i + 1 + "\n" : "")).join("").trimEnd()'
    - check: code
      condition: '(c.match(/(?<!do{(.*)})while\(/g) || []).length > 0'
    - check: code
      condition: '(c.match(/const |let /g) || []).length <= 2'
    - check: code
      condition: '(c.match(/if\(/g) || []).length !== 0'
output: "3\n6\n9\n12\n15\n18"
---

Neste exercício pretende-se pôr em prática os conhecimentos sobre condições e ciclos aprendidos nos exercícios anteriores. Faz um programa que escreva todos os número até 20 que são divisíveis por `n`.

***

**Objetivo do exercício:**
- Aparecer na consola os números divisíveis por `n` até 20;
- Só é permitido utilizar o ciclo `while`;
- Criar menos de 2 variáveis.