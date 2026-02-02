"use client";

import { ReactNode } from "react";
import { IoIosClose } from "react-icons/io";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/1 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#020617] w-full max-w-md rounded-xl 
        border border-gray-700 shadow-2xl p-6 relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white tracking-wide">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl leading-none transition"
          >
            <IoIosClose />
          </button>
        </div>
        <div className="text-gray-200">
          {children}
        </div>
      </div>
    </div>
  );
}
