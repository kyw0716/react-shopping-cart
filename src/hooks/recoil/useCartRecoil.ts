import { useRecoilState } from 'recoil';
import { cartItemsState } from '../../atoms/cartAtom';
import { useProductFetch } from '../fetch/useProductFetch';

export const useCartRecoil = () => {
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);
  const { getProductDetailById } = useProductFetch();

  const addRecoilCartById = async (id: number) => {
    const product = await getProductDetailById(id);

    if (cartItems.some((cartItem) => cartItem.id === id)) return;

    setCartItems((current) => {
      return [...current, { id: id, quantity: 1, product: product }];
    });
  };

  const deleteRecoilCartById = (id: number) => {
    setCartItems((current) => current.filter((cartItem) => cartItem.id !== id));
  };

  const patchRecoilCartItemQuantity = (id: number, quantity: number) => {
    setCartItems((current) =>
      current.map((cartItem) => {
        if (cartItem.id === id) return { ...cartItem, quantity };
        return cartItem;
      })
    );
  };

  return {
    addRecoilCartById,
    deleteRecoilCartById,
    patchRecoilCartItemQuantity,
    cartItems,
  };
};
