import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface ToastProps {
  isShown: boolean;
  message: string;
}

const Toast: React.FC<ToastProps> = ({ isShown, message }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const isShownRef = useRef<boolean>(false);

  useEffect(() => {
    isShownRef.current = isShown;
  }, [isShown]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isShown) {
      timer = setTimeout(() => {
        if (isShownRef.current) {
          setIsActive(true);
        }
      }, 500);
    }

    return () => {
      clearTimeout(timer);
      setIsActive(false);
    };
  }, [isShown]);

  return isShown
    ? createPortal(
        <div
          className={`flex fixed z-10 bg-white bottom-0 right-0 p-[20px] min-w-[300px] max-w-[300px] rounded-[6px] shadow-lg transition-transform duration-500 ease-in-out transform ${
            isActive ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <p className="font-druk text-[#3d3d3d]">{message}</p>
        </div>,
        document.body
      )
    : null;
};

export default Toast;
