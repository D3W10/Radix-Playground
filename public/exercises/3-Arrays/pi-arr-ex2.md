---
name: Ciclo For Of
validators:
-   check: output
    condition: 's === "20"'
-   check: code
    condition: '!c.includes(".includes") && !c.includes(".every")'
-   check: code
    condition: 'o.loop.every(l => l === "for of")'
-   check: code
    condition: 'o.loop.length >= 1'
-   check: code
    condition: 'o.func.length >= 1'
-   check: code
    condition: 'o.var.length <= 4'
output: "20"
---

No exercício anterior, utilizamos um ciclo `for` para iterar sobre cada elemento do *array*. Esse ciclo corria `n` vezes (sendo `n` o tamanho do *array*) e por cada iteração, o valor do indice atual (`i`) era incrementado. Por exemplo num array de 5 elementos, o ciclo `for` corria 5 vezes com valores de `i` de 0 a 4.

Depois de ter o ciclo criado, acediamos ao valor do *array* pegando na sua variável e obter os dados na posição `i`, tornando esse `i` apenas necessário para questões de indexação do *array*.

Em outras linguagens, existe um outro tipo de ciclos chamado de *for each*. Em **JavaScript**, existe um ciclo equivalente chamado *for of* que, ao contrário do ciclo `for`, não itera o índice do *array* mas sim sobre os próprios elementos desse *array*. Eis uma pequena comparação dos dois:

```js
const data = [1, 2, 3, 4, 5];

for (let i = 0; i < data.length; i++)
    console.log(data[i]); // 1 2 3 4 5

for (const num of data)
    console.log(num); // 1 2 3 4 5
```

Para além de percorrer valores de um *array*, o ciclo *for of* permite também iterar sobre cada caractere de uma *string*:

```js
const data = "hello";

for (const char of data)
    console.log(char); // h e l l o
```

> É também possível obter um caractere expecífico de uma *string* através de seu índice, por exemplo `data[0]` iria devolver o caractere "h".

***

Neste exercício, escreve um programa que conte as vogais de uma *string* e imprima na consola a contagem total. O programa deve recorrer a uma função `countVowels` que recebe como parâmetro a *string* a analisar e devolve o número de vogais encontradas. Para testar a função, chama-a passando o valor *string* "pneumoultramicroscopicossilicovulcanoconiótico".

***

**Objetivo do exercício:**
- Aparecer na consola a quantidade de vogais da *string* passada;
- Utilizar apenas cíclos *for of*;
- Utilizar pelo menos um 1 ciclo;
- Declarar pelo menos 1 função;
- Criar até 4 variáveis.