// src/components/ProductCard.tsx
"use client";

import Image from 'next/image';
import styles from '../styles/ProductCard.module.css';
import { Product } from '../types'; // Importamos el tipo

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
}

export default function ProductCard({ product, addToCart }: ProductCardProps) {
  return (
    <div className={styles.card}>
      {product.image && (
        <div className={styles.imageContainer}>
          <Image
            src={product.image}
            alt={product.name}
            width={200}
            height={200}
            style={{ objectFit: "cover" }}
            priority // Considera si todos deben ser priority, o solo los visibles inicialmente
          />
        </div>
      )}
      <h3>{product.name}</h3>
      <p className={styles.price}>{new Intl.NumberFormat('es-ES').format(product.price)} COP</p>
      <button className={styles.addButton} onClick={() => addToCart(product)}>
        Añadir al Carrito
      </button>
    </div>
  );
}