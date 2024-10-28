---
name: Múltiplas funções
validators:
    - check: output
      condition: 's === (Math.pow(+(c.match(/hipotQuad\((\d+),\s*(\d+)\)/) ?? [])[1], 2) + Math.pow(+(c.match(/hipotQuad\((\d+),\s*(\d+)\)/) ?? [])[2], 2)).toString()'
    - check: code
      condition: '!c.includes("Math")'
    - check: code
      condition: 'o.func.length >= 2'
    - check: code
      condition: 'o.var.length === 0'
output: "20"
---

Neste exercício, escreve um programa que calcule a hipotenusa quadrada de dois catetos. Este programa será dividido em 2 funções:
- A primeira função `hipotQuad` deve receber os dois catetos por parâmetro e devolver a hipotenusa quadrada.
- A segunda função `quadrado` recebe um número e devolve o quadrado desse número (função desenvolvida anteriormente).

O programa deverá mostrar na consola o valor da hipotenusa quadrada de dois catetos à escolha para questões de teste.

***

**Objetivo do exercício:**
- Aparecer na consola a hipotenusa quadrada de dois catetos;
- Declarar pelo menos 2 funções;
- Não podes declarar nenhuma variável.