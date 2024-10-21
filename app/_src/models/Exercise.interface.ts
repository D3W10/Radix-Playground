export interface Exercise {
    id: string;
    name: string;
    description: string;
    validators: {
        check: string;
        value: string;
        count?: number;
    }[];
    content: string;
}