// src/app/checkout/page.tsx
import CheckoutForm from '@/components/CheckoutForm';
import styles from '../../styles/CheckoutPage.module.css';

export default function CheckoutPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Página de Pago 💳</h1>
      <CheckoutForm />
    </div>
  );
}