import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import RemoveIcon from '../icons/RemoveIcon';

interface ModalProps {
  title?: string;
  onClose?: () => void;
  isOpen?: boolean;
  isFullWidth?: boolean;
}

const Modal: React.FC<ModalProps> = ({ title, onClose, isOpen, isFullWidth, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose && onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef, onClose]);

  const modalWidthClasses = isFullWidth ? 'w-full sm:max-w-lg' : 'sm:w-full max-w-lg';

  return isOpen
    ? createPortal(
        <div
          className="fixed top-0 left-0 z-10 w-screen h-screen grid items-center justify-center overflow-x-hidden overflow-y-scroll bg-background-dark outline-none animate-fadein"
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
        >
          <div
            ref={modalRef}
            className={`min-w-[320px] modal-dialog h-fit relative transform rounded-[30px] bg-white text-left shadow-xl transition-all sm:my-8 ${modalWidthClasses} max-h-[90%]`}
          >
            <button
              onClick={onClose}
              type="button"
              className="absolute top-0 right-0 mt-3 inline-flex justify-end w-full px-4 py-2 text-base font-medium text-gray-700 hover:opacity-50 outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              <RemoveIcon />
            </button>
            <div className="bg-white p-[35px] rounded-[30px]">
              {title && <h3 className="text-2xl font-medium leading-6 text-gray-900">{title}</h3>}
              <div className="text-center sm:text-left">{children}</div>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;
};

export default Modal;
