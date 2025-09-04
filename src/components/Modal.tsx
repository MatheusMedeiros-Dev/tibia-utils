import { useEffect } from "react";
import { createPortal } from "react-dom";
import AppButton from "./AppButton";

interface ModalProps {
  modalIsOpen: boolean;
  modalOnClose: () => void;
  modalText: string;
  modalOnClickClose: () => void;
  modalOnClickConfirm: () => void;
}

const modalRoot = document.getElementById("modal-root")!;

export default function Modal({
  modalIsOpen,
  modalOnClose,
  modalText,
  modalOnClickClose,
  modalOnClickConfirm,
}: ModalProps) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") modalOnClose();
    }

    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [modalOnClose]);

  if (!modalIsOpen) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 flex items-center justify-center bg-modal-bg"
      onClick={modalOnClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 rounded-lg"
      >
        <p className="mb-4">{modalText}</p>
        <div className="flex justify-center gap-2">
          <AppButton
            type="button"
            label="Cancelar"
            buttonStyle="default"
            onClick={modalOnClickClose}
          />
          <AppButton
            type="button"
            label="Confirmar"
            buttonStyle="delete"
            onClick={modalOnClickConfirm}
          />
        </div>
      </div>
    </div>,
    modalRoot
  );
}
