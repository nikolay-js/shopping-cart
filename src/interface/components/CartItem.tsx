import React from 'react';
import { Stack, Button } from 'react-bootstrap';
import storeItems from '../../data/items.json';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../redux/cartReducer';
import { formatCurrency } from '../../helpers/formatCurrency';

interface ICartItem {
  id: number;
  quantity: number;
}

export const CartItem = (props: ICartItem): JSX.Element | null => {
  const {
    id,
    quantity
  } = props;

  const dispatch = useDispatch();

  const item = storeItems.reduce((container: any, obj: any) => [...container, ...Object.values(obj)].flat(), []).find(i => i.id === id);

  if (item == null) return null;

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item.imgUrl}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
        alt={item.name}
      />
      <div className="me-auto">
        <div>
          {item.name}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div> {formatCurrency(item.price * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => dispatch(removeFromCart(item.id))}
      >
        &times;
    </Button>
    </Stack>
  )
}
