import React, { Fragment, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './App.css';
import { StoreItems } from './interface/components/StoreItems';
import { Navbar } from './interface/components/Navbar';
import { ShoppingCart } from './interface/components/ShoppingCart';
import storeItems from './data/items.json';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const foodItems = (storeItems[0] as any).food;
  const clothesItems = (storeItems[1] as any).clothes;
  const electronicsItems = (storeItems[2] as any).electronics;

  return (
    <Fragment>
      <Navbar openCart={openCart} />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<StoreItems storeItems={foodItems} title="Еда" />} />
          <Route path="/clothes" element={<StoreItems storeItems={clothesItems} title="Одежда" />} />
          <Route path="/electronics" element={<StoreItems storeItems={electronicsItems} title="Электроника" />} />
        </Routes>
      </Container>
      <ShoppingCart isOpen={isOpen} closeCart={closeCart} />
    </Fragment>
  );
}

export default App;
