import React from 'react';
import { Offcanvas, Stack } from 'react-bootstrap';
import { CartItem } from './CartItem';
import { useSelector } from 'react-redux';
import dataItems from '../../data/items.json';
import { TCartItem } from '../../redux/cartReducer';
import { formatCurrency } from '../../helpers/formatCurrency';
import { IStoreItem } from './StoreItem';

interface IShoppingCart {
  isOpen: boolean;
  closeCart: () => void; 
}

export const ShoppingCart = (props: IShoppingCart): JSX.Element => {
  const {
    isOpen,
    closeCart 
  } = props;

  const cartItems = useSelector((state: any) => {
    const { cartReducer } = state;
    return cartReducer.cartItems;
  });

  const storeItems = dataItems.reduce((container: any, obj: any) => [...container, ...Object.values(obj)].flat(), []);
  
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Корзина</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item: TCartItem) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Всего{" "}
            {formatCurrency(
              cartItems.reduce((total: number, cartItem: TCartItem) => {
                const item = storeItems.find((i: IStoreItem) => i.id === cartItem.id)
                return total + (item?.price || 0) * cartItem.quantity
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  )
}
