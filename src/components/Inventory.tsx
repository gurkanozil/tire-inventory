import { useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, getDocs, addDoc } from 'firebase/firestore';

// Define an interface for the tire item
interface TireItem {
    id: string;
    brand: string;
    size: string;
    amount: number;
    image: string;
}

const Inventory = () => {
    const [items, setItems] = useState<TireItem[]>([]);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        const fetchItems = async () => {
            const querySnapshot = await getDocs(collection(db, "tires"));
            const itemsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as TireItem[];
            console.log("Fetched items:", itemsList);
            setItems(itemsList);
        };

        fetchItems();

        return () => unsubscribe();
    }, []);

    const addSampleTires = async () => {
        const sampleTires = [
            { brand: 'Michelin', size: '205/55R16', amount: 10, image: 'https://example.com/michelin.jpg' },
            { brand: 'Goodyear', size: '215/60R16', amount: 5, image: 'https://example.com/goodyear.jpg' },
            { brand: 'Bridgestone', size: '225/65R17', amount: 8, image: 'https://example.com/bridgestone.jpg' },
        ];

        for (const tire of sampleTires) {
            console.log("Adding tire:", tire);
            await addDoc(collection(db, "tires"), tire);
        }

        // Fetch updated items after adding
        const querySnapshot = await getDocs(collection(db, "tires"));
        const itemsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as TireItem[];
        setItems(itemsList);
    };

    return (
        <div>
            <h1>Tire Inventory</h1>
            {user ? (
                <div>
                    <h2>Welcome, {user.email}</h2>
                    <button onClick={addSampleTires}>Add Sample Tires</button>
                    <table>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Brand</th>
                                <th>Size</th>
                                <th>Amount in Stock</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(item => (
                                <tr key={item.id}>
                                    <td><img src={item.image} alt={item.brand} style={{ width: '100px' }} /></td>
                                    <td>{item.brand}</td>
                                    <td>{item.size}</td>
                                    <td>{item.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div>
                    <h2>Please log in to manage the inventory.</h2>
                </div>
            )}
        </div>
    );
};

export default Inventory; 