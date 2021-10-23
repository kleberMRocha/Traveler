import React, { useMemo } from "react";

const Footer:React.FC = () => {

   const fullYear = useMemo(() => new Date().getFullYear() , []);

    return (
        <footer className="footer-traveler">
            <img src="images/Logo.svg" alt="logo footer" />
            <p>Viva uma grande aventura</p>
            <small>{fullYear} ®</small>
        </footer>
    );

};

export default Footer;