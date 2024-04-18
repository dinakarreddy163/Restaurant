// Footer.js
import React from 'react';
import { Menubar } from 'primereact/menubar';
import  './Footer.css'

const Footer = () => {
  const items = [
    { label: 'Veg Starters', icon: 'pi pi-fw pi-utensils' },
    { label: 'Non-Veg Starters', icon: 'pi pi-fw pi-utensils' },
    { label: 'Drinks', icon: 'pi pi-fw pi-glass-mug' },
  ];

  return (
    <footer className="footer-menu">
      <Menubar model={items} />
    </footer>
  );
};

export default Footer;