// src/components/CheckoutForm.tsx
"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../styles/CheckoutPage.module.css';
import { CartItem, FormData, CartSummary } from '../types'; // Importamos los tipos
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
initMercadoPago('APP_USR-cba204e1-7b94-4924-84d9-19ac36b5a2b2');

export default function CheckoutForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    address: '',
  });
  const [cartSummary, setCartSummary] = useState<CartSummary | null>(null);
  const [isOrderPlaced, setIsOrderPlaced] = useState<boolean>(false);
  const [preferenceId,setPreferenceId] = useState<string>('');


  useEffect(() => {
    const storedCart = localStorage.getItem('simpleCart');
    if (storedCart) {
      try {
        const items: CartItem[] = JSON.parse(storedCart);
        if (items && items.length > 0) {
          const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
          setCartSummary({ items, total });
        } else {
          setCartSummary(null); // Carrito vacío o inválido
        }
      } catch (error) {
        console.error("Error parsing cart for checkout:", error);
        setCartSummary(null);
        localStorage.removeItem('simpleCart');
      }
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
/*
export interface Product {
    id: number;
    name: string;
    price: number;
    image: string; // Ruta a la imagen
}

export interface CartItem extends Product {
    quantity: number;
}
*/
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Procesando pedido:', formData, cartSummary);
    const items = cartSummary?.items.map((product)=>(
        {
            id: product.id,
            title: product.name, // Hazlo más dinámico
            description: product.name,
            currency_id: 'COP',
            quantity: product.quantity,
            unit_price: product.price
        }
    ))
    fetch('https://server-shop-744707667126.europe-west1.run.app/createPreference',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // <-- Added this header
        },
        body: JSON.stringify({'items':items,'name':formData.name})
    }).then(async(response)=>{
        if (response.ok) {
            const data = await response.json();
            setPreferenceId(data.id)
            console.log('respuesta: '+data.id)
            setIsOrderPlaced(true);
        }
    })
    //localStorage.removeItem('simpleCart');
    
    /*setTimeout(() => {
      router.push('/');
    }, 3000);*/
  };

  /*if (isOrderPlaced) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>¡Pedido Realizado! 🎉</h2>
        <p>Gracias por tu compra. Serás redirigido a la página principal en breve.</p>
      </div>
    );
  }*/
/*
                        id: req.body.id,
                        title: req.body.title || 'Mi producto', // Hazlo más dinámico
                        description: req.body.description,
                        currency_id: 'ARS',
                        quantity: parseInt(req.body.quantity) || 1,
                        unit_price: parseFloat(req.body.unit_price) || 2000
*/
  return (
    <>
      {cartSummary && cartSummary.items.length > 0 ? (
        <div className={styles.cartSummary}>
          <h3>Resumen del Pedido</h3>
          <ul>
            {cartSummary.items.map(item => (
              <li key={item.id}>
                {item.name} (x{item.quantity}) - ${(item.price * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
          <p><strong>Total: {new Intl.NumberFormat('es-ES').format(cartSummary.total)} COP</strong></p>
        </div>
      ) : (
        !isOrderPlaced && <p>Tu carrito está vacío. <Link href="/">Vuelve a la tienda</Link> para añadir productos.</p>
      )}

      {cartSummary && cartSummary.items.length > 0 && (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nombre Completo:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="address">Dirección de Envío:</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          {!isOrderPlaced && (<button type="submit" className={styles.submitButton}>
            Realizar Pedido (Simulado)
          </button>)}
        </form>
      )}
      {!isOrderPlaced && (
        <button type="button" onClick={() => router.back()} className={styles.backButton}>
          Volver
        </button>
      )}
      {
        isOrderPlaced && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
                <h1>Botón de Pago</h1>
                <p>Haz clic en el botón para realizar el pago.</p>
                {/* Renderiza el botón de pago */}
                <div style={{ width: '300px' }}>
                    <Wallet initialization={{ preferenceId: preferenceId }} />
                </div>
            </div>
        )
      }
    </>
  );
}