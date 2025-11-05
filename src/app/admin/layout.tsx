
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
import { Skeleton } from '@/components/ui/skeleton';

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

const AdminSkeleton = () => (
  <div className="flex min-h-screen">
    <div className="hidden md:block">
      <div className="w-64 p-2">
        <div className="p-2">
          <Skeleton className="h-7 w-7" />
        </div>
        <div className="flex flex-col gap-1 p-2">
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
    </div>
    <main className="flex-1 p-4 md:p-6">
      <Skeleton className="h-32 w-full" />
    </main>
  </div>
);


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

  // Show a skeleton loader while auth state is being determined.
  if (isUserLoading || !user) {
    return <AdminSkeleton />;
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
