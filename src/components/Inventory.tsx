import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';

const Inventory = () => {
    const [items, setItems] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        const fetchItems = async () => {
            const querySnapshot = await getDocs(collection(db, "tires"));
            const itemsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setItems(itemsList);
        };

        fetchItems();
    }, []);

    return (
        <div>
            <h1>Tire Inventory</h1>
            {user ? (
                <div>
                    {/* Render inventory management options */}
                </div>
            ) : (
                <div>
                    <h2>Please log in to manage the inventory.</h2>
                </div>
            )}
            <ul>
                {items.map(item => (
                    <li key={item.id}>{item.brand} - {item.size} - {item.amount}</li>
                ))}
            </ul>
        </div>
    );
};

export default Inventory; 