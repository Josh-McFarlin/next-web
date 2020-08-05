import * as React from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import MobileModal from "../../../components/MobileModal";
import {
  updateCartItem,
  removeCartItem,
} from "../../../utils/store/cart/actions";
import { CartItemType } from "../../../utils/store/cart/types";
import urls from "../../../utils/urls";
import classes from "./CartItem.module.scss";

interface PropTypes {
  lineItem: CartItemType;
}

const CartItem = ({ lineItem }: PropTypes) => {
  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = React.useState<boolean>(false);

  const toggleMobileEdit = (): void => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleQuantityIncrease = (): void => {
    dispatch(
      updateCartItem({
        id: lineItem.id,
        quantity: lineItem.quantity + 1,
      })
    );
  };

  const handleQuantityDecrease = (): void => {
    dispatch(
      updateCartItem({
        id: lineItem.id,
        quantity: lineItem.quantity + 1,
      })
    );
  };

  const handleDelete = (): void => {
    dispatch(
      removeCartItem({
        id: lineItem.id,
      })
    );
  };

  const mobileActions = [
    {
      title: "Edit Quantity",
      component: (
        <div className={classes.mobileQuantityContainer}>
          <p className={classes.title}>Quantity</p>
          <div className={classes.content}>
            <button onClick={handleQuantityDecrease}>-</button>
            <p>{lineItem.quantity}</p>
            <button onClick={handleQuantityIncrease}>+</button>
          </div>
        </div>
      ),
    },
    {
      title: "Remove From Cart",
      action: handleDelete,
    },
  ];

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        {lineItem.productImage ? (
          <img
            className={classes.image}
            src={lineItem.productImage}
            alt={`${lineItem.productHandle} product`}
          />
        ) : (
          <div className={classes.image} />
        )}
        <div className={classes.infoContainer}>
          <Link
            href={urls.pages.shop.products.product()}
            as={urls.pages.shop.products.product(lineItem.productHandle)}
          >
            <a className={classes.details}>
              <p className={classes.title}>{lineItem.title}</p>
              {Object.entries(lineItem.selectedOptions).map(([key, value]) => (
                <p key={`${key}-${value}`} className={classes.option}>
                  {key}: {value}
                </p>
              ))}
            </a>
          </Link>
          <p className={classes.price}>${lineItem.price}</p>
          <div className={classes.quantityContainer}>
            <button onClick={handleQuantityDecrease}>-</button>
            <p>{lineItem.quantity}</p>
            <button onClick={handleQuantityIncrease}>+</button>
          </div>
        </div>
      </div>
      <MobileModal
        open={mobileOpen}
        actions={mobileActions}
        closable
        closeModal={toggleMobileEdit}
      />
      <div className={classes.actionContainer}>
        <button className={classes.editButton} onClick={toggleMobileEdit}>
          Edit
        </button>
        <button className={classes.removeButton} onClick={handleDelete}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
