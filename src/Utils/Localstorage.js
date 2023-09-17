const getStoreCartFromLS = () => {
    const storeCardString = localStorage.getItem('cart');
    if(storeCardString){
        return JSON.parse(storeCardString);
    }
    return [];
}

const saveCartToLS = cart => {
    const cartStringified = JSON.stringify(cart);
    localStorage.setItem('cart', cartStringified);
}
const addToLS = id => {
    const cart = getStoreCartFromLS();
    cart.push(id);
    saveCartToLS(cart);
}

const removeFromLS = id => {
    const cart = getStoreCartFromLS();
    const remain = cart.filter(idx => idx !== id);

    saveCartToLS(remain);
}

export {addToLS, getStoreCartFromLS, removeFromLS}