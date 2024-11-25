import { useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';

// Define an interface for the tire item
interface TireItem {
    id: string;
    brand: string;
    size: string;
    amount: number;
}

const Inventory = () => {
    const [items, setItems] = useState<TireItem[]>([]); // Use the TireItem type
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        const fetchItems = async () => {
            const querySnapshot = await getDocs(collection(db, "tires"));
            const itemsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as TireItem[]; // Cast to TireItem[]
            setItems(itemsList);
        };

        fetchItems();

        return () => unsubscribe();
    }, []);

    return (
        <div>
            <h1>Tire Inventory</h1>
            {user ? (
                <div>
                    <h2>Welcome, {user.email}</h2>
                    <ul>
                        {items.map(item => (
                            <li key={item.id}>{item.brand} - {item.size} - {item.amount}</li>
                        ))}
                    </ul>
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