import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ProductCart(props) {
    const [value, setValue] = useState(1);
    const { index, deleteItemFromCart, item, title, price, getTotalPrice, id, quantity } = props;
    const [totalPrice, setTotalPrice] = useState(0);
    const cartItems = JSON.parse(localStorage.getItem('cart'));

    useEffect(() => {
        let total = 0;
        for (let i = 0; i < cartItems.length; i++) {
            total += cartItems[i].price * cartItems[i].quantity;
        }
        setTotalPrice(total);
    }, [cartItems]);

    function setPlusValue() {
        setValue(quantity + 1);
        updateCartItemQuantity(quantity + 1);
    }

    function setMinusValue() {
        setValue(quantity - 1);
        updateCartItemQuantity(quantity - 1);
        if (value <= 1) {
            setValue(1);
        }
    }

    function handleChange(e) {
        setValue(e.target.value);
        updateCartItemQuantity(e.target.value);
    }

    function updateCartItemQuantity(newQuantity) {
        const updatedCart = cartItems.map((cartItem) => {
            if (cartItem.id === id) {
                return { ...cartItem, quantity: newQuantity };
            }
            return cartItem;
        });
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        getTotalPrice();
    }

    return (
        <div className="item" key={index}>
            <div className="buttons">
                <button
                    className="delete-btn"
                    onClick={() => {
                        deleteItemFromCart(item);
                    }}
                />
            </div>
            <div className="description">
                <Link to={`/products/${id}`}>{title}</Link>
            </div>
            <div className="price">
                <p>{price}</p>
            </div>
            <div className="quantity">
                <button className="minus-btn" onClick={setMinusValue} />
                <input type="number" value={quantity} onChange={handleChange} />
                <button className="plus-btn" onClick={setPlusValue} />
            </div>
        </div>
    );
}

export default ProductCart;