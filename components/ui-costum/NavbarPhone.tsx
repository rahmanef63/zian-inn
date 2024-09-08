import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { CalendarIcon, HomeIcon, Inspect, MailIcon } from "lucide-react";

import { cn } from "../../lib/utils";
import { buttonVariants } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Dock, DockIcon } from "../magicui/dock";
import { ModeToggle } from "./ModeToggle";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

export type IconProps = React.HTMLAttributes<SVGElement>;

const Icons = {
  calendar: (props: IconProps) => <CalendarIcon {...props} />,
  email: (props: IconProps) => <MailIcon {...props} />,
  instagram: ( ) => (
    <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    strokeWidth="1" 
    stroke="currentColor" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
        <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
        <path d="M16.5 7.5l0 .01" />
    </svg>
  ),
};

const DATA = {
  navbar: [
    { href: "/", icon: HomeIcon, label: "Beranda" },
    { href: "#tentang-kami", icon: Inspect, label: "Tentang Kami" },
    { href: "#", icon: Icons.calendar, label: "Booking" },
    { href: "#", icon: Icons.instagram, label: "Instagram" },
  ],
  contact: {
    social: {
      Instagram: {
        name: "Instagram",
        url: "https://www.instagram.com/zian_inn.properties",
        icon: Icons.instagram,
      },
    },
  },
};

export function NavbarPhone() {
  const router = useRouter();
  const pathname = usePathname();
  const [showModal, setShowModal] = React.useState(false);

  const isHomePage = pathname === "/";

  const handleNavigation = (href: string, label: string) => {
    if (isHomePage && href.startsWith("#") && href !== "#") {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    } else if (href === "#tentang-kami" && !isHomePage) {
      setShowModal(true);
    } else if (label === "Instagram") {
      window.open(DATA.contact.social.Instagram.url, "_blank");
    } else if (label === "Booking") {
      // Tambahkan logika untuk menangani booking di sini
      console.log("Booking clicked");
    } else {
      router.push(href);
    }
  };

  return (
    <TooltipProvider>
      <Dock direction="middle">
        {DATA.navbar.map((item) => (
          <DockIcon key={item.label}>
            <Tooltip>
              <TooltipTrigger asChild>
                {item.href === "#tentang-kami" && !isHomePage ? (
                  <Dialog open={showModal} onOpenChange={setShowModal}>
                    <DialogTrigger asChild>
                      <button
                        className={cn(
                          buttonVariants({ variant: "ghost", size: "icon" }),
                          "size-12 rounded-full"
                        )}
                      >
                        <item.icon className="size-4" />
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      {/* Isi konten modal tentang kami di sini */}
                      <h2>Tentang Kami</h2>
                      <p>Informasi tentang Zian Inn Properties...</p>
                    </DialogContent>
                  </Dialog>
                ) : (
                  <button
                    onClick={() => handleNavigation(item.href, item.label)}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12 rounded-full"
                    )}
                  >
                    <item.icon className="size-4" />
                  </button>
                )}
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}
      </Dock>
      <Separator orientation="vertical" className="h-full py-2" />
      <Dock direction="middle">
        <DockIcon>
          <Tooltip>
            <TooltipTrigger asChild>
              <ModeToggle className="rounded-full" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Theme</p>
            </TooltipContent>
          </Tooltip>
        </DockIcon>
      </Dock>
    </TooltipProvider>
  );
}
