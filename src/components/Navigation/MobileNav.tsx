import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';
import { useNavigation } from '@/hooks/useNavigation';
import { cn } from '@/lib/utils';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const { t } = useTranslation();
  const { publicNavItems, roleNavItems, isAuthenticated, isActiveRoute } = useNavigation();

  const getLabel = (label: string) => {
    return label === 'Home' ? label : t(label);
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/80" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 flex">
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-300"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-300"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-gray-900 pb-12 shadow-xl">
              <div className="flex px-4 pb-2 pt-5">
                <button
                  type="button"
                  className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-gray-500"
                  onClick={onClose}
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="space-y-6 px-4 py-6">
                {publicNavItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center space-x-2 text-base font-medium",
                      isActiveRoute(item.path)
                        ? "text-white"
                        : "text-gray-300 hover:text-white"
                    )}
                    onClick={onClose}
                  >
                    {item.icon && <item.icon className="h-5 w-5" />}
                    <span>{getLabel(item.label)}</span>
                  </Link>
                ))}

                {isAuthenticated && (
                  <div className="border-t border-gray-800 pt-6">
                    {roleNavItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={cn(
                          "flex items-center space-x-2 text-base font-medium mb-4",
                          isActiveRoute(item.path)
                            ? "text-white"
                            : "text-gray-300 hover:text-white"
                        )}
                        onClick={onClose}
                      >
                        {item.icon && <item.icon className="h-5 w-5" />}
                        <span>{t(item.label)}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
} 