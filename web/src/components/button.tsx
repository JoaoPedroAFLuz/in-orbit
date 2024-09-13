interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ children, ...rest }: ButtonProps) {
  return (
    <button
      className="flex h-10 w-40 items-center justify-center gap-2 rounded-lg bg-violet-500 font-medium text-sm text-violet-50 tracking-tighter hover:bg-violet-600"
      {...rest}
    >
      {children}
    </button>
  );
}
