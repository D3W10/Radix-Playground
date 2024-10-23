export interface Exercise {
    id: string;
    name: string;
    validators: {
        check: string;
        condition: string;
    }[];
    output: string;
    content: string;
}