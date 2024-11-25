import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { auth, db } from './firebaseConfig';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import Header from './components/Header';
import Footer from './components/Footer';

// Define an interface for the tire item
interface TireItem {
    id: string;
    brand: string;
    size: string;
    amount: number;
    image: string;
}

function App() {
    const [user, setUser] = useState<User | null>(null);
    const [items, setItems] = useState<TireItem[]>([]);
    const [newTire, setNewTire] = useState({ brand: '', size: '', amount: 0, image: '' });
    const [editingTire, setEditingTire] = useState<TireItem | null>(null);
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setShowLoginPopup(false); // Close the popup on successful login
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <Router>
            <Header />
            <div style={{ position: 'relative' }}>
                <h1>Tire Inventory</h1>
                {user ? (
                    <div>
                        <h2>Welcome, {user.email}</h2>
                        <button onClick={handleLogout}>Log Out</button>
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
                    </div>
                ) : (
                    <div>
                        <h2>Please log in to manage the inventory.</h2>
                        <button onClick={() => setShowLoginPopup(true)}>Log In</button>
                    </div>
                )}
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
                {showLoginPopup && (
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '20px', border: '1px solid #ccc', zIndex: 1000 }}>
                        <h2>Login</h2>
                        <form onSubmit={handleLogin}>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button type="submit">Log In</button>
                        </form>
                        <button onClick={() => setShowLoginPopup(false)}>Close</button>
                    </div>
                )}
            </div>
            <Footer />
        </Router>
    );
}

export default App;
