// app/checkout/page.js
'use client'; // Necesario para usar hooks como useSearchParams y useState/useEffect

import { useSearchParams } from 'next/navigation';
import React, {useEffect, useState } from 'react';
import Link from 'next/link';

export default function OrderStatus() {
    const searchParams = useSearchParams();
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        const status = searchParams.get('status');
        const payment_id = searchParams.get('payment_id');
        const preference_id = searchParams.get('preference_id');

        if (status === 'approved') {
            setMessage(`¡Tu pago fue exitoso! Gracias por tu compra.`);
            setIsSuccess(true);
            console.log('Payment ID:', payment_id);
            console.log('Preference ID:', preference_id);
        } else if (status === 'failure' || status === 'cancelled') {
            setMessage('El pago falló o fue cancelado. Por favor, intenta nuevamente o contacta a soporte.');
            setIsSuccess(false);
        } else if (status === 'pending') {
            setMessage('Tu pago está pendiente. Te notificaremos cuando se apruebe.');
            setIsSuccess(false);
        } else {
            setMessage('Bienvenido al checkout. Si esperabas un estado de pago, no se encontró.');
            setIsSuccess(false);
        }
        setIsLoading(false);
    }, [searchParams]);

    if (isLoading) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <p>Verificando estado del pago...</p>
            </div>
        );
    }
    // ... (resto del JSX igual que en el ejemplo del pages router) ...
    return (
        <div style={{ textAlign: 'center', padding: '50px', color: isSuccess ? 'green' : 'red' }}>
            <h1>Resultado del Pago</h1>
            <p>{message}</p>
            {isSuccess && (
                <div>
                    <p>Recibirás una confirmación por correo electrónico pronto.</p>
                </div>
            )}
            <div style={{ marginTop: '30px' }}>
                <Link href="/">
                    Volver a la página principal
                </Link>
            </div>
        </div>
    );
}