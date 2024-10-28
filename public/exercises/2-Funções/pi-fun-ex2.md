---
name: Valores padrão
validators:
    - check: output
      condition: 's === "5.5€\n8.61€"'
    - check: code
      condition: 'o.func.length >= 1'
    - check: code
      condition: 'o.var.length === 0'
output: "5.5€\n8.61€"
---

Devido à liberdade das funções na passagem de parâmetros, especialmente pelos mesmos não serem obrigatórios, é possível definir valores *default* quando os mesmos não são expecificados:

```js
function printProd(name, available = true) {
    console.log("Name: " + name + " | Available: " + (available ? "Yes" : "No"))
}

printProd("Pão Integral", true); // Name: Pão Integral | Available: Yes
printProd("Pão de arroz"); // Name: Pão de arroz | Available: Yes
printProd("Pão de trigo", false); // Name: Pão de trigo | Available: No
```

> Quando a função é chamada e o parâmetro não é expecificado, o valor *default* é utilizado.

Existe também um outro tipo de parâmetros de funções que são os parâmetros rest, este tipo de parâmetros permitem que uma função obtenha um conjunto indeterminado de parâmetros. Este assunto será melhor abordado na parte de *arrays*.
 
***

Neste exercício, escreve um programa que declare uma função que calcula o preço final de um produto, esse preço é calculado através do preço base passado por parâmetro e uma taxa (0 a 1) também recebida por parâmetro. Se não for expecificada nenhuma taxa, deve ser considerado o valor de 23%. Para fins de teste, a função deve ser chamada duas vezes, uma com o preço base de `5`€ e a taxa de `10%` e outra apenas com o preço de `7`€. Mostra o resultado de ambas as chamadas na consola.

***

**Objetivo do exercício:**
- Aparecer na consola os preços com a taxa aplicada;
- Declarar pelo menos 1 função;
- Não podes declarar nenhuma variável.