import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { Dialog, DialogContent } from "../ui/dialog";

interface NavbarPhonePageIdProps {
  onOpenBooking: () => void;
}

interface NavItem {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

interface SocialItem {
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

const DATA = {
  navbar: [
    { href: "/", icon: HomeIcon, label: "Beranda" },
    { href: "#tentang-kami", icon: Inspect, label: "Tentang Kami" },
    { href: "#", icon: CalendarIcon, label: "Booking" },
  ] as NavItem[],
  contact: {
    social: {
      Instagram: {
        name: "Instagram",
        url: "https://www.instagram.com/zian_inn.properties",
        icon: MailIcon, // Ganti dengan ikon Instagram yang sesuai
      },
    } as Record<string, SocialItem>,
  },
};

export function NavbarPhonePageId({ onOpenBooking }: NavbarPhonePageIdProps) {
  const router = useRouter();
  const [showModal, setShowModal] = React.useState(false);

  const handleNavigation = (href: string, label: string) => {
    if (href === "#tentang-kami") {
      setShowModal(true);
    } else if (label === "Booking") {
      onOpenBooking();
    } else if (href === "/") {
      router.push(href);
    }
  };

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg  bg-background-50 ">
      <TooltipProvider>
        <Dock direction="middle">
          <>
            {DATA.navbar.map((item) => (
              <DockIcon key={item.label}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => handleNavigation(item.href, item.label)}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "size-12 rounded-full"
                      )}
                    >
                      <item.icon className="size-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            ))}
            <Separator orientation="vertical" className="h-full" />
            {Object.entries(DATA.contact.social).map(([name, social]) => (
              <DockIcon key={name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "size-12 rounded-full"
                      )}
                    >
                      <social.icon className="size-4" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{name}</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            ))}
            <Separator orientation="vertical" className="h-full py-2" />
            <DockIcon>
              <Tooltip>
                <TooltipTrigger asChild>
                  <ModeToggle className="rounded-full" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Tema</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          </>
        </Dock>
      </TooltipProvider>
      {/* Modal untuk "Tentang Kami" */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <h2>Tentang Kami</h2>
          <p>
            Zian inn adalah platform yang menghubungkan pemilik properti syariah dengan penyewa yang mencari hunian sesuai dengan prinsip-prinsip Islam. Kami berkomitmen untuk menyediakan pilihan hunian yang aman, nyaman, dan sesuai syariat bagi umat Muslim di seluruh Indonesia.
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}

