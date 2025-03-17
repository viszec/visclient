'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: 'group toast group-[.toaster]:border-none group-[.toaster]:shadow-lg',
          success: 'group-[.toaster]:bg-orange-400 group-[.toaster]:text-white',
          error: 'group-[.toaster]:bg-red-400 group-[.toaster]:text-white',
          title: 'group-[.toast]:font-semibold',
          description: 'group-[.toast]:text-white',
          actionButton: 'group-[.toast]:bg-white group-[.toast]:text-orange-500',
          cancelButton: 'group-[.toast]:bg-orange-600 group-[.toast]:text-white',
          closeButton: 'group-[.toast]:text-white',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
