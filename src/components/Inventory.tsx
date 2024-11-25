import { useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';

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
    const [newTire, setNewTire] = useState({ brand: '', size: '', amount: 0, image: '' });
    const [editingTire, setEditingTire] = useState<TireItem | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        fetchItems(); // Fetch items on mount

        return () => unsubscribe();
    }, []);

    const fetchItems = async () => {
        const querySnapshot = await getDocs(collection(db, "tires"));
        const itemsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as TireItem[];
        setItems(itemsList);
    };

    const addOrUpdateTire = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingTire) {
            // Update existing tire
            const tireRef = doc(db, "tires", editingTire.id);
            await updateDoc(tireRef, newTire);
            setEditingTire(null);
        } else {
            // Add new tire
            await addDoc(collection(db, "tires"), newTire);
        }
        setNewTire({ brand: '', size: '', amount: 0, image: '' }); // Reset form
        fetchItems(); // Refresh the list
    };

    const editTire = (tire: TireItem) => {
        setEditingTire(tire);
        setNewTire({ brand: tire.brand, size: tire.size, amount: tire.amount, image: tire.image });
    };

    return (
        <div>
            <h1>Tire Inventory</h1>
            {user ? (
                <div>
                    <h2>Welcome, {user.email}</h2>
                    <form onSubmit={addOrUpdateTire}>
                        <input
                            type="text"
                            placeholder="Brand"
                            value={newTire.brand}
                            onChange={(e) => setNewTire({ ...newTire, brand: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Size"
                            value={newTire.size}
                            onChange={(e) => setNewTire({ ...newTire, size: e.target.value })}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Amount"
                            value={newTire.amount}
                            onChange={(e) => setNewTire({ ...newTire, amount: Number(e.target.value) })}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Image URL"
                            value={newTire.image}
                            onChange={(e) => setNewTire({ ...newTire, image: e.target.value })}
                            required
                        />
                        <button type="submit">{editingTire ? 'Update Tire' : 'Add Tire'}</button>
                    </form>
                    <table>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Brand</th>
                                <th>Size</th>
                                <th>Amount in Stock</th>
                                {user && <th>Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(item => (
                                <tr key={item.id}>
                                    <td><img src={item.image} alt={item.brand} style={{ width: '100px' }} /></td>
                                    <td>{item.brand}</td>
                                    <td>{item.size}</td>
                                    <td>{item.amount}</td>
                                    {user && (
                                        <td>
                                            <button onClick={() => editTire(item)}>Edit</button>
                                        </td>
                                    )}
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