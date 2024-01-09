import { useEffect } from "react";
import CartContext from "./CartContext";

const CartProvider = (props) => {
     
    const [items, setItems] = useState([]);
    const [totalAmount, setTotalAmount]= useState(0);
    
    useEffect(() => {
      let amount = 0;
      items.forEach((item)=> {
        amount = item.price * item.quantity;
      });
      setTotalAmount(amount);
    }, [items]);


    const addItemHandler = (item, quantity) => {
        setItems((prevItems) => {
            const existingItem = prevItems.find((prevItem) => prevItem.id === item.id );

            if(existingItem){
                return prevItems.map((prevItem) => prevItem.id === item.id ? {...prevItem, quantity: prevItem.quantity + quantity} : prevItem );
            }

            try{
                const response = fetch.post('https://crudcrud.com/api/cb6ce74db0474bc3b76d1dc41e7c4e17/Cart',...prevItems, {...item, quantity: quantity})
                if(!response.ok){
                    console.log("something went wrong");
                } else {
                    console.log("successful");
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
            const response = await fetch.get('https://crudcrud.com/api/cb6ce74db0474bc3b76d1dc41e7c4e17/Cart')
            if(!response.ok){
                console.log("something went wrong");
            }
            const data = await response.json()

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