import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ImpactSidebar } from './ImpactSidebar';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface ImpactMobileNavProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function ImpactMobileNav({ sidebarOpen, setSidebarOpen }: ImpactMobileNavProps) {
  return (
    <>
      {/* Top mobile header */}
      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900/50 backdrop-blur-sm px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-300"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex-1 text-sm font-semibold leading-6 text-white">
          Impact Dashboard
        </div>
      </div>

      {/* Mobile sidebar dialog */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          {/* Background overlay */}
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          {/* Sliding sidebar */}
          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 pb-4">
                  {/* Header */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
                    <Dialog.Title className="text-base font-semibold leading-6 text-white">
                      Navigation
                    </Dialog.Title>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-300"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  
                  {/* Sidebar content */}
                  <div className="flex-1">
                    <ImpactSidebar className="!static" />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
} 