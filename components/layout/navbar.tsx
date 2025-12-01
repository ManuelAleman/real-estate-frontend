"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, Home, Building2, Tag, ChevronRight, LogIn } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/shadcn/navigation-menu";
import { Button } from "@/components/ui/shadcn/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription
} from "@/components/ui/shadcn/sheet";

export default function NavBarHome() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full border-b bg-white sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="TuVecindario.com"
              width={120}
              height={40}
              className="object-contain"
              priority
            />
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Propiedades</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/estates/rent"
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-linear-to-b from-blue-50 to-blue-100 p-6 no-underline outline-none focus:shadow-md hover:shadow-lg transition-shadow"
                        >
                          <Home className="h-6 w-6 text-blue-600" />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Propiedades en Renta
                          </div>
                          <p className="text-sm leading-tight text-gray-600">
                            Encuentra el hogar perfecto para rentar
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/estates/sale"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100"
                        >
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-green-600" />
                            <div className="text-sm font-medium leading-none">
                              Propiedades en Venta
                            </div>
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-gray-600">
                            Invierte en tu futuro hogar
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/categories"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100"
                        >
                          <div className="flex items-center gap-2">
                            <Tag className="h-4 w-4 text-purple-600" />
                            <div className="text-sm font-medium leading-none">
                              Categorías
                            </div>
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-gray-600">
                            Explora por tipo de propiedad
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/estates/rent" className={navigationMenuTriggerStyle()}>
                    Renta
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/estates/sale" className={navigationMenuTriggerStyle()}>
                    Venta
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="hidden md:block">
            <Button asChild>
              <Link href="/login">
                Iniciar Sesión
              </Link>
            </Button>
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[300px] sm:w-[350px] p-0 flex flex-col h-full bg-white border-l shadow-2xl">

              <nav className="flex-1 overflow-y-auto px-4 py-6">
                <div className="space-y-6">

                  <div className="space-y-3">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2">
                      Explorar
                    </p>

                    <Link
                      href="/estates/rent"
                      className="group flex items-center justify-between p-3 rounded-xl hover:bg-blue-50 transition-all duration-200 border border-transparent hover:border-blue-100"
                      onClick={() => setOpen(false)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <Home className="h-5 w-5" />
                        </div>
                        <span className="font-medium text-gray-700 group-hover:text-blue-700">En Renta</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-blue-400" />
                    </Link>

                    <Link
                      href="/estates/sale"
                      className="group flex items-center justify-between p-3 rounded-xl hover:bg-green-50 transition-all duration-200 border border-transparent hover:border-green-100"
                      onClick={() => setOpen(false)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-colors">
                          <Building2 className="h-5 w-5" />
                        </div>
                        <span className="font-medium text-gray-700 group-hover:text-green-700">En Venta</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-green-400" />
                    </Link>

                    <Link
                      href="/categories"
                      className="group flex items-center justify-between p-3 rounded-xl hover:bg-purple-50 transition-all duration-200 border border-transparent hover:border-purple-100"
                      onClick={() => setOpen(false)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                          <Tag className="h-5 w-5" />
                        </div>
                        <span className="font-medium text-gray-700 group-hover:text-purple-700">Categorías</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-purple-400" />
                    </Link>
                  </div>

                </div>
              </nav>

              <div className="p-6 border-t bg-gray-50">
                <Button asChild className="w-full h-12 text-base font-semibold shadow-sm" size="lg">
                  <Link href="/login" onClick={() => setOpen(false)} className="flex items-center gap-2 justify-center">
                    <LogIn className="h-4 w-4" />
                    Iniciar Sesión
                  </Link>
                </Button>
                <p className="text-center text-xs text-gray-400 mt-4">
                  © 2025 TuVecindario.com
                </p>
              </div>

            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}