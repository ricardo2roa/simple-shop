// src/app/page.tsx

import ProductDisplay from '@/components/ProductDisplay';
import styles from '../styles/Home.module.css';
import { Product } from '../types'; // Importamos el tipo Product

const initialProducts: Product[] = [
  { id: 1, name: 'Bateria', price: 700000, image: '/images/batery.webp' },
  { id: 2, name: 'Disco de Frenos', price: 150000, image: '/images/disco-de-freno.png' },
  { id: 3, name: 'Pastillas de Freno', price: 750000, image: '/images/pastillas-de-freno.jpg' },
];

export default function HomePage() {
  return (
    <div className={styles.container}>
      <ProductDisplay initialProducts={initialProducts} />
    </div>
  );
}