import "../styles/global.css";

import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { SignedIn, SignedOut, UserButton } from "@clerk/astro/react";

export const Navbar = () => {

  return (
    <section className="py-4 container mx-auto sticky top-0 z-50">
      <div className="bg-primary p-4 m-2 rounded-2xl">
        <nav className="flex items-center justify-between">
          <a href="/">
            <img
              src="/mainWhiteLogo.svg"
              className="max-h-8"
              alt="Gearhwan"
            />
          </a>
          <NavigationMenu className="hidden lg:block text-accent font-medium">
            <NavigationMenuList className="gap-16">
              <NavigationMenuItem>
                <NavigationMenuLink href="/about" className="hover:text-secondary">
                  About
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/buyacar" className="hover:text-secondary">
                  Buy a Car
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/rentacar" className="hover:text-secondary">
                  Rent a Car
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/guides" className="hover:text-secondary">
                  Guides
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="hidden items-center gap-4 lg:flex">
            <SignedOut>
            <a href="/signin">
            <Button className="border rounded-md border-primary bg-accent font-semibold uppercase text-primary hover:bg-secondary hover:text-primary-foreground">Sign in</Button>
            </a>
            <a href="/register">
            <Button className="rounded-md p-2 bg-secondary text-destructive font-semibold uppercase hover:bg-primary hover:text-primary-foreground hover:border-primary-foreground hover:border">Start for free</Button>
            </a>
            </SignedOut>
            <SignedIn>
            <UserButton />
            </SignedIn>
          </div>
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button size="icon">
                <MenuIcon className="h-8 w-8" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="max-h-screen overflow-auto bg-primary">
              <SheetHeader>
                <SheetTitle>
                  <a
                    href="/"
                    className="flex items-center gap-2 justify-center"
                  >
                    <img
                      src="/mainWhiteLogo.svg"
                      className="max-h-8 flex justify-center"
                      alt="Gearhwan"
                    />
                  </a>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col p-4 bg-primary text-accent">
                <div className="flex flex-col gap-6 text-center mt-20">
                  <a href="/about" className="font-medium">
                    About
                  </a>
                  <a href="/buyacar" className="font-medium">
                    Buy a Car
                  </a>
                  <a href="/rentacar" className="font-medium">
                    Rent a Car
                  </a>
                  <a href="/guides" className="font-medium">
                    Guides
                  </a>
                </div>
                <div className="mt-6 flex flex-col gap-4">
                  <a href="/signin">
                  <Button className="flex justify-center items-center mx-auto border rounded-md border-primary bg-accent font-semibold uppercase text-primary hover:bg-secondary hover:text-primary-foreground">Sign in</Button>
                  </a>
                  <a href="/register">
                  <Button className="flex justify-center items-center mx-auto rounded-md p-2 bg-secondary font-semibold uppercase text-secondary-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary-foreground hover:border">Start for free</Button>
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </section>
  );
};
