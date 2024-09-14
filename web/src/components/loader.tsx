import { tv, type VariantProps } from 'tailwind-variants';

const loader = tv({
  base: 'rounded-full animate-spin',

  variants: {
    variant: {
      primary: 'border-violet-500',
      secondary: 'border-zinc-900',
    },
    size: {
      small: 'w-4 h-4 border-2',
      large: 'w-12 h-12 border-4',
    },
  },

  defaultVariants: {
    variant: 'primary',
    size: 'small',
  },
});

type LoaderProps = VariantProps<typeof loader>;

export function Loader({ variant, size }: LoaderProps) {
  return (
    <div className="flex flex-1 h-full items-center justify-center">
      <div className={`border-t-transparent ${loader({ variant, size })}`} />
    </div>
  );
}
