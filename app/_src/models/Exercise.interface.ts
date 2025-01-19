export interface Exercise {
    id: string;
    name: string;
    validators: {
        check: string;
        condition: string;
    }[];
    output: string;
    varParse?: boolean;
    run?: boolean;
    solution: string;
    content: string;
}