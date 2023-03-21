import React, {useEffect, useState} from 'react';

function Cart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const items = localStorage.getItem('cart');
        if (items) {
            setCartItems(JSON.parse(items));
        }
    }, []);

    return (
        <div>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <ul>
                    {cartItems.map((item) => (
                        <div key={item.id}>
                            <h1>{item.title}</h1>
                            <p>{item.price}</p>
                            <p>{item.quantity}</p>
                        </div>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Cart;