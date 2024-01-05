import { AppShell, AppShellMain } from '@mantine/core';

export default function Layout({ children }: { children: React.ReactNode[] }) {
  return (
    <AppShell>
      <AppShellMain>{children}</AppShellMain>
    </AppShell>
  );
}
