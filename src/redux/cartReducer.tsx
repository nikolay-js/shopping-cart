const INCREASE_CART_QUANTITY = 'INCREASE_CART_QUANTITY';
const DECREASE_CART_QUANTITY = 'DECREASE_CART_QUANTITY';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export type TCartItem = {
  id: number;
  quantity: number;
}

interface ICartItemState {
  cartItems: Array<TCartItem>;
}

const intialState: ICartItemState = {
  cartItems: []
};

export function increaseCartQuantity(id: number) {
  return {
    type: INCREASE_CART_QUANTITY,
    id
  }
};

export function decreaseCartQuantity(id: number) {
  return {
    type: DECREASE_CART_QUANTITY,
    id
  }
};

export function removeFromCart(id: number) {
  return {
    type: REMOVE_FROM_CART,
    id
  }
};

export const cartReducer = (state = intialState, action: any): ICartItemState => {
  switch (action.type) {

    case INCREASE_CART_QUANTITY:
      const { id } = action;
      const { cartItems } = state;
      const currItems = () => {
        if (cartItems?.find((item: TCartItem) => item.id === id) == null) {
          return [...cartItems, { id, quantity: 1 }]
        } else {
          return cartItems.map((item: TCartItem) => {
            if (item.id === id) {
              return { ...item, quantity: item.quantity + 1 }
            } else {
              return item
            }
          })
        }
      }
      return {
        ...state,
        cartItems: currItems()
      }

    case DECREASE_CART_QUANTITY:
      return (() => {
      const { id } = action;
      const { cartItems } = state;
      const currItems = () => {
        if (cartItems.find((item: TCartItem) => item.id === id)?.quantity === 1) {
          return cartItems.filter((item: TCartItem) => item.id !== id)
        } else {
          return cartItems.map((item: TCartItem) => {
            if (item.id === id) {
              return { ...item, quantity: item.quantity - 1 }
            } else {
              return item
            }
          })
        }
      }
      return {
        ...state,
        cartItems: currItems()
      }
    })();

    case REMOVE_FROM_CART:
      return (() => {
      const { id } = action;
      const { cartItems } = state;
      const currItems = () => {
        return cartItems.filter((item: TCartItem) => item.id !== id)
      }
      return {
        ...state,
        cartItems: currItems()
      }
    })();

    default:
      return state;
  }
};
