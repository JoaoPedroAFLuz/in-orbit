import * as PortalRadix from '@radix-ui/react-portal';

export function Portal({ children }: { children: React.ReactNode }) {
  return (
    <PortalRadix.Root className="fixed inset-0 h-full w-full flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
      {children}
    </PortalRadix.Root>
  );
}
