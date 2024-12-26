import { useContext, createContext, useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/firebase";



const Context = createContext(null)

export const itemsContext = () => useContext(Context)

export const ItemsContextProvider = ({ children }) => {

    let [items, setItems] = useState(null)

    useEffect(() => {
        const fetchItemsFromFireStore = async () => {
            try {
                const productsCollection = collection(firestore, 'products');
                const productsSnapshot = await getDocs(productsCollection);
                const productsList = productsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setItems(productsList)
            } catch (error) {
                console.error("Error fetching products: ", error);
            }
        };
        fetchItemsFromFireStore()
    }, [])

    return (
        <>
            <Context.Provider value={{ items, setItems }}>
                {children}
            </Context.Provider>
        </>
    )
}