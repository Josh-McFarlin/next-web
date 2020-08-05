export interface CartItemType {
  id: string;
  title: string;
  productHandle: string;
  productImage: string;
  variantId: string;
  quantity: number;
  price: string;
  available: boolean;
  variantTitle: string;
  selectedOptions: Record<string, string>;
}

export interface CartState {
  isOpen: boolean;
  checkoutId: string | null;
  items: Record<string, CartItemType>;
  subtotal: string | null;
  totalTax: string | null;
  total: string | null;
  checkoutUrl: string | null;
}

export interface SetCartAction {
  checkoutId: CartState["checkoutId"];
  items: CartState["items"];
  subtotal: CartState["subtotal"];
  totalTax: CartState["totalTax"];
  total: CartState["total"];
  checkoutUrl: CartState["checkoutUrl"];
}

export interface SetCartOpenAction {
  isOpen: CartState["isOpen"];
}
