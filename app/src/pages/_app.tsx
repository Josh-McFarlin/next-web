import * as React from "react";
import { AppProps } from "next/app";
import { Provider, useDispatch } from "react-redux";
import CartMenu from "../components/shop/CartMenu";
import { useStore } from "../utils/store";
import { setupCart } from "../utils/store/cart/actions";
import "focus-visible/dist/focus-visible.min.js";
import "normalize.css";
import "../styles/App.scss";

const Shopify = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setupCart());
  }, []);

  return <React.Fragment />;
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Shopify />
      <CartMenu />
      <Component {...pageProps} />
      <div id="portalRoot" />
    </Provider>
  );
};

export default MyApp;
