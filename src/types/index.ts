// src/types/index.ts
export interface Product {
    id: number;
    name: string;
    price: number;
    image: string; // Ruta a la imagen
}

export interface CartItem extends Product {
    quantity: number;
}

export interface FormData {
    name: string;
    email: string;
    address: string;
}

export interface CartSummary {
    items: CartItem[];
    total: number;
}