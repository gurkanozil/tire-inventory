const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer style={{ 
            width: '100%', 
            padding: '1rem', 
            background: 'linear-gradient(to bottom, #047857, #34d399, #047857)', 
            color: 'white', 
            textAlign: 'center', 
            position: 'relative' 
        }}>
            <p>&copy; {currentYear} G.M. Özil.</p>
        </footer>
    );
};

export default Footer; 