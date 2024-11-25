import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = async () => {
        const email = prompt("Enter your email:");
        const password = prompt("Enter your password:");

        if (email && password) {
            try {
                await signInWithEmailAndPassword(auth, email, password);
                navigate('/'); // Redirect to the inventory page after successful login
            } catch (error) {
                console.error("Error logging in:", error);
                alert("Login failed. Please check your credentials.");
            }
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <button onClick={handleLogin}>Log In</button>
        </div>
    );
};

export default Login; 