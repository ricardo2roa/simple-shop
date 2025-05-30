// app/checkout/page.js
import React, {Suspense} from 'react';
import OrderStatus from '@/components/OrderStatus';

export default function CheckoutStatusPage() {
    return (
        <Suspense>
            <OrderStatus />
        </Suspense>
    );
}