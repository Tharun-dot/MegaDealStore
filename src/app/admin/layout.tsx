
'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Package, Power } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth, useUser } from '@/firebase';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

function LogoutButton() {
    const auth = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        if (auth) {
            await auth.signOut();
            router.push('/admin/login');
        }
    };

    return (
        <Button variant="ghost" onClick={handleLogout} className="w-full justify-start">
            <Power className="mr-2 h-4 w-4" />
            Logout
        </Button>
    );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Only redirect if loading is complete AND there's no user.
    // This prevents redirecting before Firebase has a chance to check auth state.
    if (!isUserLoading && !user) {
      router.push('/admin/login');
    }
  }, [user, isUserLoading, router]);

  // Don't render the full layout (including children) if we are still loading and don't have a user.
  // This prevents a flash of the admin UI before the redirect.
  // However, we no longer show a skeleton, which speeds up perceived load time.
  if (isUserLoading && !user) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center justify-between p-2">
              <SidebarTrigger />
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/admin/products" passHref>
                  <SidebarMenuButton
                    tooltip="Products"
                    isActive={pathname.startsWith('/admin/products')}
                  >
                    <Package />
                    <span>Products</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
             <div className="mt-auto p-2">
                <LogoutButton />
            </div>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </SidebarProvider>
  );
}
