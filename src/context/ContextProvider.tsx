import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./CartContext";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const ContextProvider = ({ children }: Props) => {
  return (
    <BrowserRouter>
      <CartProvider>{children}</CartProvider>
    </BrowserRouter>
  );
};
