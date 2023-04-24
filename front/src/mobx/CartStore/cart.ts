import { action, observable } from 'mobx';

type CartItem = {
    id: number;
    title: string;
    price: number;
    quantity: number;
};

export class CartStore {
    @observable items: CartItem[] = [];

    constructor() {
        if (typeof window !== 'undefined') {
            const storedItems = localStorage.getItem('cartItems');
            if (storedItems) {
                // @ts-ignore
                this.items = JSON.parse(storedItems);
            }
        }
    }

    @action addItem(item: CartItem) {
        const existingItem = this.items.find(i => i.id === item.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push(item);
        }
        localStorage.setItem('cartItems', JSON.stringify(this.items));
    }

    @action removeItem(itemId: number) {
        this.items = this.items.filter(item => item.id !== itemId);
        localStorage.setItem('cartItems', JSON.stringify(this.items));
    }

    @action getItemStore(): CartItem[] {
        if (typeof window !== 'undefined') {
            const storedItems = localStorage.getItem('cartItems');
            if (storedItems) {
                // @ts-ignore
                return JSON.parse(storedItems);
            }
        }
        return [];
    }

    @action clear() {
        this.items = [];
        localStorage.removeItem('cartItems');
    }
}
