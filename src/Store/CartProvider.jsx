import { useEffect, useState } from "react";
import CartContext from "./CartContext";
import axios from "axios";

const CartProvider = (props) => {
     
    const [items, setItems] = useState([]);
    const [totalAmount, setTotalAmount]= useState(0);
    
    useEffect(() => {
      let amount = 0;
      items.forEach((item)=> {
        amount += item.price * item.quantity;
      });
      setTotalAmount(amount);
    }, [items]);


    const addItemHandler =  (item, quantity) => {
        setItems((prevItems) => {
            const existingItem = prevItems.find((prevItem) => prevItem.id === item.id );

            if(existingItem){
                return prevItems.map((prevItem) => prevItem.id === item.id ? {...prevItem, quantity: prevItem.quantity + quantity} : prevItem );
            }

            try{
                const response = axios.post('https://crudcrud.com/api/cb6ce74db0474bc3b76d1dc41e7c4e17/Cart',...prevItems, {...item, quantity})
                if(!response.ok){
                    console.log("something went wrong");
                } else {
                    console.log("successful");
                    const updatedItems = [...items, { ...item, quantity }];
                    setItems(updatedItems);
                }
            } catch (error) {
                console.log(error)
            }

            return [...prevItems, {...item, quantity: quantity}];
        });

    };
    

    const clearCartHandler = () => {
        setItems([])
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get('https://crudcrud.com/api/cb6ce74db0474bc3b76d1dc41e7c4e17/Cart')
            if(!response.ok){
                console.log("something went wrong");
            }
            const data = await response.data;

        } catch(error) {
            console.log(error.message);
        }
     
    };

    const cartContext = {
        items: items,
        totalAmount: totalAmount,
        addItem: addItemHandler,
        getItems: fetchProducts
    }


    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartProvider;