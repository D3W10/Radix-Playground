---
name: Date
validators:
-   check: output
    condition: |-
        +s === (() => {
            const now = new Date();
            const born = new Date("1990-01-01");
            return now.getFullYear() - born.getFullYear() - ((now.getMonth() < born.getMonth() || (now.getMonth() === born.getMonth() && now.getDate() < born.getDate())) ? 1 : 0);
        })()
-   check: code
    condition: 'o.func.length >= 1'
output: "34"
---

A classe `Date` é a classe que representa datas e tempos em **JavaScript**. Aqui estão uma lista de alguns dos métodos e constantes mais comuns:

- Construtores:
    - `new Date()`: Cria um objeto `Date` com a data e hora atuais;
    - `new Date(dateString)`: Cria um objeto `Date` a partir de uma *string* que representa uma data;
    - `new Date(year, month, day, hours, minutes, seconds, milliseconds)`: Cria um objeto `Date` a partir de uma data especificada pelos parâmetros;

- Métodos estáticos:
    - `Date.now()`: Devolve o número de milissegundos que se passaram desde 1 de Janeiro de 1970;

- Métodos de instância:
    - `Date.getDay()`: Devolve o dia da semana (0-6) de uma data;
    - `Date.getDate()`: Devolve o dia do mês (1-31) de uma data;
    - `Date.getMonth()`: Devolve o mês (0-11) de uma data;
    - `Date.getFullYear()`: Devolve o ano de uma data;
    - `Date.getHours()`: Devolve a hora (0-23) de uma data;
    - `Date.getMinutes()`: Devolve os minutos (0-59) de uma data;
    - `Date.getSeconds()`: Devolve os segundos (0-59) de uma data;
    - `Date.toDateString()`: Devolve uma *string* que representa a data;
    - `Date.toTimeString()`: Devolve uma *string* que representa o tempo;
    - `Date.toLocaleDateString()`: Devolve uma *string* que representa a data no formato local;
    - `Date.toLocaleTimeString()`: Devolve uma *string* que representa o tempo no formato local;

> A classe `Date` tem uma particularidade especial que outras classes não têm, é permitido subtrair duas datas usando o operador `-`, obtendo assim o **número de milissegundos** que se passaram entre as duas.
> ```js
> new Date() - new Date(2024, 0, 1)
> ```

***

Neste exercício, escreve um programa que define a função `calcAge`, esta função recebe uma *string* com a data de nascimento e devolve a idade atual da pessoa, em anos.

Para testar a função desenvolvida, passe a data `1990-01-01` para a função.

***

**Objetivo do exercício:**
- Aparecer na consola a idade atual de uma dada pessoa;
- Declarar pelo menos 1 função.