import { useEffect } from "react";
import { useState } from "react";
import Bottle from "../Bottle/Bottle";
import './Bottles.css'
import { addToLS, getStoreCartFromLS, removeFromLS } from "../../Utils/Localstorage";

const Bottles = () => {

    const [bottles, setBottles] = useState([]);

    useEffect(() => {
        fetch('bottles.json')
            .then(res => res.json())
            .then(data => setBottles(data))
    }, []);

    useEffect(() => {
        console.log('load data', bottles.length)
        if (bottles.length) {
            const storeCart = getStoreCartFromLS();
            console.log(storeCart);
            const savedCart  = [];
            for(const id of storeCart){
               const bottle = bottles.find(bottle => bottle.id === id);
               if(bottle){
                savedCart.push(bottle);
               }
            }
            console.log(savedCart)
            setCart(savedCart);
        }
    }, [bottles])


    const [cart, setCart] = useState([]);

    const handleAddToCart = (bottle) => {
        const newCart = [...cart, bottle];
        setCart(newCart);

        addToLS(bottle.id)
    }


    const handleRemoveFromCart = id => {  

        // visual remove
        const remainCart = cart.filter(item => item.id !== id);
        setCart(remainCart);
        // remove from LS
        removeFromLS(id)
      }

    return (
        <div>
            <h3>Bottle Here : {bottles.length}</h3>
            <h3>cart : {cart.length}</h3>
            <ul style={{listStyle: 'none'}}>
                {
                    cart.map(item => <li key={item.id}>{item.name} <span>- ${item.price}</span></li>)
                }
            </ul>
            <div className="selected-img-container">
                {
                    cart.map(item => <div key={item.id}>
                        <img src={item.img}></img>
                        <br />
                        <button onClick={() => {handleRemoveFromCart(item.id)}}>Remove</button>
                    </div>)
                }
            </div>
            <div className="bottles">
                {
                    bottles.map(bottle => <Bottle key={bottle.id} bottle={bottle} handleAddToCart={handleAddToCart}></Bottle>)
                }
            </div>
        </div>
    );
};

export default Bottles;