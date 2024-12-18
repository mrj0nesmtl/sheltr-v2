import { Dialog } from '@headlessui/react';
import React from 'react';
import { Icon } from './Icon';

interface FullContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function FullContentModal({ isOpen, onClose, title, children }: FullContentModalProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-3xl w-full bg-gray-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-xl font-semibold text-white">
              {title}
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <Icon name="x" className="h-5 w-5" />
            </button>
          </div>
          
          <div className="overflow-y-auto max-h-[70vh]">
            {children}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
} 