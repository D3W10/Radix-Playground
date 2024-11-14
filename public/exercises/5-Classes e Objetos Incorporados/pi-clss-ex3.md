---
name: Math
validators:
-   check: output
    condition: s === `[4, 2]`
-   check: code
    condition: 'o.func.length >= 1'
output: "[4, 2]"
---

O objeto `Math` fornece constantes e funções matemáticas. Aqui estão uma lista de alguns dos métodos e constantes mais comuns:

- `Math.PI`: Representa a constante π (pi), com uma precisão de 15 dígitos;
- `Math.abs(x)`: Devolve o valor absoluto de um número;
- `Math.ceil(x)`: Arredonda um número para o maior inteiro mais próximo;
- `Math.floor(x)`: Arredonda um número para o menor inteiro mais próximo;
- `Math.round(x)`: Arredonda um número para o inteiro mais próximo;
- `Math.random()`: Devolve um número pseudo-aleatório entre 0 e 1;
- `Math.max(...values)`: Devolve o maior valor entre os argumentos passados;
- `Math.min(...values)`: Devolve o menor valor entre os argumentos passados;
- `Math.pow(base, exponent)`: Devolve a potência de um número elevado a um expoente;
- `Math.sqrt(x)`: Devolve a raiz quadrada de um número.

> As funções trigonométricas esperam receber ângulos em **radianos**!

***

Neste exercício, escreve um programa que define a função `quadratic`, esta função deve devolver um *array* com os resultados da fórmula resolvente correspondentes à equação de segundo grau passada pelos parâmetros `a`, `b` e `c`.

Para testar a função desenvolvida, passe os valores `1`, `-6` e `8` para a função.

***

**Objetivo do exercício:**
- Aparecer na consola os resultados da fórmula resolvente;
- Declarar pelo menos 1 função.