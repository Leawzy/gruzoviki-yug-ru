export interface OrderTypeIF {
    title: string;
    products: {
        id: number;
        title: string;
        map(element: (item: OrderTypeIF) => JSX.Element): string;
    };
    id: number;
    date: number;
    total: string;
    status: string;
    delivery: string;
    paymentMethod: string;
}
