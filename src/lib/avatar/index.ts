import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import { type VariantProps, tv } from 'tailwind-variants';
import Avatar from './Avatar.svelte';

const avatarVariants = tv({
  base: 'relative flex items-center justify-center bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300',
  variants: {
    rounded: {
      true: 'rounded',
      false: 'rounded-full'
    },
    border: {
      true: 'p-1 ring-2 ring-gray-300 dark:ring-gray-500',
      false: ''
    },
    stacked: {
      true: 'border-2 -ms-4 border-white dark:border-gray-800',
      false: ''
    },
    size: {
      xs: 'w-6 h-6',
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-20 h-20',
      xl: 'w-36 h-36',
      none: ''
    }
  },
  defaultVariants: {
    rounded: false,
    border: false,
    stacked: false,
    size: 'md'
  }
});

type AvatarVariants = VariantProps<typeof avatarVariants>;

interface AvatarProps extends HTMLAttributes<HTMLDivElement>, AvatarVariants {
  children?: Snippet;
  href?: string | undefined | null;
  src?: string | undefined | null;
  rounded?: boolean;
  border?: boolean;
  stacked?: boolean;
  dot?: object | undefined;
  alt?: string | undefined | null;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none';
  onclick?: () => void;
}

export { Avatar, avatarVariants, type AvatarProps };
