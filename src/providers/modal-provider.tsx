import type { ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProviderProps {
  children: ReactNode;
}

const ModalProvider = ({ children }: ModalProviderProps) => {
  return (
    <>
      {createPortal(<></>, document.getElementById("modal-root")!)}
      {children}
    </>
  );
};

export default ModalProvider;
