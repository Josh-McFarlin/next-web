import * as React from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import Portal from "../../Portal";
import CartItem from "./CartItem";
import { setCartOpen } from "../../../utils/store/cart/cartSlice";
import {
  selectCartOpen,
  selectInfo,
  selectItems,
} from "../../../utils/store/cart/selectors";
import { CartItemType } from "../../../utils/store/cart/types";
import urls from "../../../utils/urls";
import classes from "./CartMenu.module.scss";

const CartMenu = () => {
  const dispatch = useDispatch();
  const open = useSelector(selectCartOpen);
  const items = useSelector(selectItems);
  const info = useSelector(selectInfo);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const handleClose = (): void => {
    dispatch(
      setCartOpen({
        isOpen: false,
      })
    );
  };

  if (!open) return null;

  return (
    <Portal className={classes.root}>
      <div className={classes.paper} onMouseLeave={handleClose}>
        <div className={classes.header}>
          <p className={classes.title}>Cart</p>
          <div className={classes.splitText}>
            <div className={classes.titles}>
              <p>Subtotal:</p>
            </div>
            <div className={classes.costs}>
              <p>$ {info.subtotal}</p>
            </div>
          </div>
        </div>
        <div className={classes.itemSection}>
          <div className={classes.itemHeader}>
            <p className={classes.itemTitle}>Item</p>
            <p className={classes.priceTitle}>Price</p>
            <p className={classes.quantityTitle}>Qty</p>
          </div>
          {items.map((lineItem: CartItemType) => (
            <CartItem key={lineItem.id} lineItem={lineItem} />
          ))}
        </div>
        <Link href={urls.pages.shop.cart()}>
          <button className={classes.checkoutButton} onClick={handleClose}>
            Checkout
          </button>
        </Link>
      </div>
    </Portal>
  );
};

export default CartMenu;
