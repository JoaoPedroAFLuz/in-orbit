import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export function Label({ htmlFor, ...props }: ComponentProps<'label'>) {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl:
    <label
      htmlFor={htmlFor}
      {...props}
      className={twMerge(
        'font-medium text-sm tracking-tight leading-normal',
        props.className
      )}
    />
  );
}
