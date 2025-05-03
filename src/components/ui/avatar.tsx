import * as React from 'react';

import { cn } from '@/lib/utils';

// AvatarProps is used for type consistency and potential future extensions
export type AvatarProps = React.HTMLAttributes<HTMLDivElement>;

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)}
    {...props}
  />
));
Avatar.displayName = 'Avatar';

export { Avatar };
