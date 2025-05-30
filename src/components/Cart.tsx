// src/components/Cart.tsx
"use client";

import styles from '../styles/Cart.module.css';
import { CartItem } from '../types'; // Importamos el tipo

interface CartProps {
  cartItems: CartItem[];
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: string) => void;
}

export default function Cart({ cartItems, removeFromCart, updateQuantity }: CartProps) {
  const getTotalPrice = (): number => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className={styles.cart}>
        <h2>Carrito de Compras 🛒</h2>
        <p>Tu carrito está vacío.</p>
      </div>
    );
  }

  return (
    <div className={styles.cart}>
      <h2>Carrito de Compras 🛒</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id} className={styles.cartItem}>
            <div>
              <span>{item.name} (x{item.quantity})</span>
              <span className={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
            <div className={styles.itemControls}>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateQuantity(item.id, e.target.value)}
                className={styles.quantityInput}
              />
              <button onClick={() => removeFromCart(item.id)} className={styles.removeButton}>
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
      <h3 className={styles.totalPrice}>Total: ${getTotalPrice().toFixed(2)}</h3>
    </div>
  );
}