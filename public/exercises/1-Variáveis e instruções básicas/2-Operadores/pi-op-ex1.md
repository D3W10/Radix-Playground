---
name: Introdução aos Operadores
validators:
    - check: output
      condition: 's === Math.pow(v.n, v.m).toString()'
    - check: code
      condition: 'c.includes("*=")'
    - check: code
      condition: '!c.includes("Math.pow")'
    - check: code
      condition: 'o.var.length === 4'
output: "6"
---

Existem vários tipos de operadores em **JavaScript**:
- Operadores aritméticos;
- Operadores de comparação;
- Operadores lógicos;
- Operadores bit a bit;
- Operadores de afetação;
- etc.

Os operadores aritméticos são utilizados para realizar operações matemáticas, são eles:
1. `+` Soma;
2. `-` Subtração;
3. `*` Multiplicação;
4. `/` Divisão (**Nota:** Ao contrário de outras linguagens, `1 / 2` é igual a 0.5, portanto `1 / 2 === 1.0 / 2.0`);
5. `%` Resto da divisão inteira;
6. `++` Incremento;
7. `--` Decremento;
8. `**` Exponenciação;
9. `-` Negação unária (Quando usado antes de um número ou variável, devolve o seu simétrico);
10. `+` Mais unário (Quando usado antes de um valor ou variável, *tenta converter-lo* para um número).

> O *mais unário* vai ser bastante útil para converter valores do tipo *string* para números, por exemplo `+"8"` devolveria o valor `8`.

Os operadores de comparação são usados para comparar 2 valores e devolvem um valor booleano correspondente a essa comparação. Como visto anteriormente são eles o `==`, `===`, `!=`, `!==`, `>`, `<`, `>=` e `<=`.

Extendendo as capacidades dos operadores de comparação, existem também os operadores lógicos que permitem manipular valores booleanos, são eles:
1. `&&` AND lógico (Devolve verdadeiro se ambos os operandos forem verdadeiros);
2. `||` OR lógico (Devolve verdadeiro se pelo menos um dos operandos for verdadeiro);
3. `!` NOT lógico (Devolve verdadeiro se o operando for falso e vice-versa);
4. `??` Operador de coalescência nulo.

Para além das suas aplicações em condições, os operadores `&&`, `||` e `??` também podem ser utilizados para realizar operações de atribuição, como:

```js
let res, val1 = 10, val2 = 5, val3 = 0, val4 = null;

res = val1 && val2; // res ficará com o valor de val2 já que val1 tem um valor considerado verdadeiro
res = val3 && val2; // res ficará com o valor de val3 já que val3 tem um valor considerado falso
res = val1 || val2; // res ficará com o valor de val1 já que val1 tem um valor considerado verdadeiro
res = val3 || val2; // res ficará com o valor de val2 já que val3 tem um valor considerado falso

res = val1 ?? val2; // res ficará com o valor de val1 já que val1 tem um valor que não é null nem undefined
res = val4 ?? val2; // res ficará com o valor de val2 já que val4 tem um valor que é null
```

Os operadores bit a bit realizam operações binárias tratando os seus operandos como um conjunto de 32 bits. Estes operadores não vão ser utilizados nos próximos exercícios e estão aqui apenas como extra. São eles:
1. `&` AND bit a bit;
2. `|` OR bit a bit;
3. `^` XOR bit a bit;
3. `~` NOT bit a bit;
4. `<<` Left shift;
5. `>>` Right shift (Desloca os bits para a direita, o bit mais à esquerda é repetido para manter o sinal do número);
6. `>>>` Unsigned right shift (Desloca os bits para a direita, adicionado 0s à esquerda tornando o número sempre positivo).

Alguns exemplos do seu uso:

```js
2 << 1; // 4 (0010 deslocado 1 posição para a esquerda 0100)
6 & 2 // 2
-5 >>> 2 // 1073741822
```

Os operadores de afetação são utilizados para atribuir valores a uma variável. Para além do `=`, existem diversas mais operações de afetação baseadas nos outros operadores anteriormente falados, são eles: `+=`, `-=`, `*=`, `/=`, `%=`, `**=`, `<<=`, `>>=`, `>>>=`, `&=`, `^=`, `|=`, `&&=`, `||=` e `??=`. Cada uma afeta a variável de acordo com a operação entre essa mesma variável e o valor à direita.

```js
let num1 = 10;
let num2 = 5;

num1 += num2; // num1 = 15
num1 -= num2; // num1 = 10 (num1 tinha valor 15)
num1 *= num2; // num1 = 50 (num1 tinha valor 10)
num1 /= num2; // num1 = 10 (num1 tinha valor 50)
```

***

Neste exercício, escreva um programa que calcule a potência de um número `n` elevado a um expoente `m`. Deves utilizar os operadores que permitem resolver este problema da forma mais compacta e simples possível.

***

**Objetivo do exercício:**
- Aparecer na consola o resultado de `n` elevado a `m`;
- Escolher os operadores que melhor se adequam ao problema;
- Apenas utilizar os conhecimentos aprendidos até agora;
- Criar apenas 4 variáveis.