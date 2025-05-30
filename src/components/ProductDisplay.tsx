// src/components/ProductDisplay.tsx
"use client";

import { useState, useEffect, useCallback } from 'react';
import ProductCard from './ProductCard';
import Cart from './Cart';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { Product, CartItem } from '../types'; // Importamos los tipos

interface ProductDisplayProps {
  initialProducts: Product[];
}

export default function ProductDisplay({ initialProducts }: ProductDisplayProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('simpleCart');
    if (storedCart) {
      try {
        const parsedCart: CartItem[] = JSON.parse(storedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
        localStorage.removeItem('simpleCart'); // Clear corrupted data
      }
    }
  }, []);

  useEffect(() => {
    if (cartItems.length > 0 || localStorage.getItem('simpleCart') !== null) {
        localStorage.setItem('simpleCart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = useCallback((product: Product) => {
    setCartItems((prevItems) => {
      const itemInCart = prevItems.find((item) => item.id === product.id);
      if (itemInCart) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, quantityStr: string) => {
    const quantity = parseInt(quantityStr, 10);
    if (isNaN(quantity) || quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  return (
    <div className={styles.mainContent}>
      <div className={styles.productsGrid}>
        <h2>Nuestros Productos</h2>
        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      </div>

      <div className={styles.cartSection}>
        <Cart
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
        />
        {cartItems.length > 0 && (
          <Link href="/checkout" className={styles.checkoutButton}>
            Ir a Pagar
          </Link>
        )}
      </div>
    </div>
  );
}