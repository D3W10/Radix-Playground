export interface Exercise {
    name: string;
    description: string;
    validators: {
        check: string;
        value: string;
        count?: number;
    }[];
    content: string;
}