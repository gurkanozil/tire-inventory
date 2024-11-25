import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer style={{ 
            padding: '1rem', 
            background: 'linear-gradient(to bottom, #047857, #34d399, #047857)', 
            color: 'white', 
            textAlign: 'center' 
        }}>
            <p>&copy; {currentYear} G.M. Özil.</p>
        </footer>
    );
};

export default Footer; 