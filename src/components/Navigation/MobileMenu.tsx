import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Icon } from '@/components/ui/Icon';
import { NavigationItems } from './NavigationItems';
import { Logo } from '@/components/ui/Logo';
import { useTranslation } from 'react-i18next';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { t } = useTranslation();

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/80" />
        </Transition.Child>

        <div className="fixed inset-0 flex">
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-300"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-300"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 ring-1 ring-white/10">
                <div className="flex h-16 shrink-0 items-center">
                  <Logo className="h-8 w-auto" />
                </div>
                <nav className="flex flex-1 flex-col">
                  <NavigationItems mobile onClose={onClose} />
                </nav>
              </div>
            </Dialog.Panel>
          </Transition.Child>

          {/* Close button */}
          <div className="absolute right-4 top-4">
            <button
              type="button"
              className="rounded-md text-gray-400 hover:text-gray-300"
              onClick={onClose}
            >
              <span className="sr-only">{t('nav.closeMenu')}</span>
              <Icon name="x" className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}