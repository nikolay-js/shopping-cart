import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { increaseCartQuantity, decreaseCartQuantity, removeFromCart, TCartItem } from '../../redux/cartReducer';
import { formatCurrency } from '../../helpers/formatCurrency';

export interface IStoreItem {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
}

export const StoreItem = (props: IStoreItem): JSX.Element => {
  const {
    id,
    name,
    price,
    imgUrl,
  } = props;

  const cartItems = useSelector((state: any) => {
    const { cartReducer } = state;
    return cartReducer.cartItems;
  });

  const getItemQuantity = (id: number) => {
    return cartItems?.find((item: TCartItem) => item.id === id)?.quantity || 0
  };

  const quantity = getItemQuantity(id);

  const dispatch = useDispatch();

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imgUrl}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button className="w-100" onClick={() => dispatch(increaseCartQuantity(id))}>
              + Добавить в Корзину
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button onClick={() => dispatch(decreaseCartQuantity(id))}>-</Button>
                <div>
                  <span className="fs-3">{quantity}</span> в корзине
                </div>
                <Button onClick={() => dispatch(increaseCartQuantity(id))}>+</Button>
              </div>
              <Button
                onClick={() => dispatch(removeFromCart(id))}
                variant="danger"
                size="sm"
              >
                Удалить
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  )
}
