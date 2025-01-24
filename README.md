<br />
<br />
<div align="center">
    <a href="https://github.com/D3W10/Radix-Playground">
        <img src="https://raw.githubusercontent.com/D3W10/Radix-Playground/main/public/logo.svg" alt="Logo" width="60" height="60">
    </a>
    <br />
    <br />
    <h2 align="center">Radix Playground</h2>
    <h3 align="center">Run Node.JS scripts in the browser</h3>
    <br />
    <p align="center">
        <a href="https://github.com/D3W10/Radix-Playground/issues">Report Bug</a>
        ·
        <a href="https://github.com/D3W10/Radix-Playground/issues">Request Feature</a>
    </p>
</div>
<br />

### Table of Contents
1. [About](#about)
    - [Built With](#built-with)
2. [Development](#development)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
3. [Building Exercises](#building-exercises)
    - [Basics](#basics)
    - [Grouping](#grouping)
    - [Structure](#structure)
    - [Validation](#validation)
4. [License](#license)
5. [Credits](#credits)

<br />
<br />

## About

Radix Playground is a JavaScript/TypeScript playground that lets you run simple Node.JS code on the browser. It can be loaded with content and exercises that the users can try to solve and get insights on what went wrong and how to fix it.

The editor offers a way for the users to compare the output they got with the expected output and an option to see the exercise solution is the user so desires.

When an exercise is solved successfully, it will be marked with a green check mark on the exercises list so you never lose track of what you have already done.

All exercises offer a save button that will save the code on the browser's local storage, so you can come back and finish the exercise later.

<br />

### Built With

- [TypeScript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/)

<br />
<br />

## Development

In case you wanna deploy a copy of Radix Playground on your device, follow the steps below to get started.

<br />

### Prerequisites

In order to run the application, you will need the following tools:
- Node.JS (`18.0.0` or higher)
- npm
- git (*optional*)

<br />

### Installation

1. Clone the repository
    ```sh
    git clone https://github.com/D3W10/Radix-Playground.git
    ```
2. Open the project folder using your prefered code editor (ex: VS Code)
3. Install the npm packages
    ```sh
    npm i
    ```
4. Run the application
    ```sh
    npm run dev
    ```

<br />
<br />

## Building Exercises

### Basics

Exercises consist of a markdown file (`.md`) that incorporates both the exercise itself and its info (validations, output, etc.).

To create a new exercise, create a new file under the `public/exercises` folder. The name of the file **should be unique** from all other exercises, it will be used to identify the exercise. Here is a suggested naming convention:
```xml
<namespace>-<subject>-<exercise-number>-<keypoint>.md
```

Here is some examples of names:
- `js-obj-1-introduction.md`;
- `js-arr-2-forof.md`;
- `js-arr-3-methods.md`.

<br />

### Grouping

Exercises can be grouped together in folders, this can be useful to organize exercises by subject or by topic. This can be achieved by creating a folder under `public/exercises` and adding the exercises to it.

Folders are identified by their name (like exercises) but have a specific naming system that should be followed:
```xml
<order-id>-<name>.md
```

The `order-id` is a number that should be different from all the other folders on the same directory. It dictates the order in which the folders will be displayed in the exercise list.

The `name` is the name of the folder and can contain any character.

Here is some examples of names:
- `1-Arrays`;
- `3-Errors`;
- `5-Advanced Concepts`.

<br />

### Structure

As mentioned before, exercises consist of a markdown file (`.md`) that incorporates all the data about the exercise.

The markdown file is divided into two parts:
- The exercise data (validations, output, etc.);
- The exercise description.

#### Exercise Data

The exercise data is present in the top of the markdown file and it's where you can configure how your exercise will behave. It uses YAML syntax so it should be formatted like the example below:
```yaml
---
key: value
key2:
  - value1
  - value2
---
```

Below is a table containing all the possible keys:

| Key | Required | Default Value | Description |
| --- | --- | --- | --- |
| `name` | **Yes** | - | The name of the exercise. |
| `validators` | **Yes** | - | An array of validators that will be used to validate the output of the exercise. Each validator has a `check` key that specifies the type of validation to be performed and a `condition` key that contains the condition to be checked. Check [Validation](#validation) for more details |
| `output` | **Yes** | - | The expected output of the exercise (or a similar value). |
| `solution` | **Yes** | - | One possible solution for the exercise. |
| `varParse` | No | `false` | Whether the editor should try and obtain the values of the variables, used alongside `validators`. |
| `run` | No | `true` | Whether the exercise is "runnable", or it should only be verified. |

#### Exercise Description

The exercise description is the rest of the markdown file and it's where you can write the description of the exercise. You may use any basic markdown syntax like links, code blocks, etc.

You can check some example exercises in the `public/exercises` folder.

<br />

### Validation

Every validator is made of two fields:
- `check`: The type of validation to be performed (only used by the editor to display the correct validation error);
    - Can be `output` or `code`.
- `condition`: The condition to be checked.
    - A JavaScript expression to be evaluated, note that this **will be passed** to the `Function` constructor as a return value.

The `condition` field, when being executed by the app, will receive the following parameters:
- `s`: The console output of the exercise;
- `c`: The code of the exercise;
- `v`: An object containing the variables declared in the exercise;
    - `varParse` must be set to `true` to be able to access the variables (note that this **might break the editor** when the code logic is too complex!).
- `o`: An object containing useful information about the exercise:
    - `line`: The amount of code lines used;
    - `var`: An array containing the keywords used for variable declaration, the possible values are "let", "const" or "var";
    - `if`: An array of the `if` statements used in the exercise;
    - `loop`: An array with the names of the loops used in the exercise ("while", "do while", "for", "for of", "for in", "for each");
    - `func`: An array of the functions declared in the exercise:
        - Named functions ("function foo");
        - Anonymous functions ("function");
        - Arrow functions ("=>");

Here is an example of a validators array:

```yaml
validators:
    # Check if the output is the square of the variable n
-   check: output
    condition: 's === v.n * v.n'
    # Check if only while loops are present
-   check: code
    condition: 'o.loop.filter(l => l !== "while").length === 0'
    # Check if only less than 2 variables are declared
-   check: code
    condition: 'o.var.length <= 2'
    # Check if there are no if statements
-   check: code
    condition: 'o.if.length === 0'
```

> [!NOTE]
> The user code goes by a minification process before it gets evaluated and consequently, your condition will obtain that minified version!

<br />
<br />

## License

Distributed under the Mozilla Public License 2.0 license. Check `LICENSE` for more details.

<br />
<br />

## Credits

- Made by [D3W10](https://d3w10.netlify.app/)