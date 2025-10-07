"use client";

import { type ReactElement, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

// Custom hook to detect if we're on mobile
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
}

type ModalProps = {
  title: string;
  trigger?: ReactElement;
  children: ReactElement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function Modal({
  title,
  trigger,
  children,
  open,
  onOpenChange,
}: ModalProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (isMobile) {
    return (
      <Drawer direction="bottom" onOpenChange={onOpenChange} open={open}>
        <DrawerTrigger asChild>{trigger}</DrawerTrigger>
        <DrawerContent className="px-6 pb-6 data-[vaul-drawer-direction=bottom]:rounded-t-none">
          <DrawerTitle className="mt-6 mb-6 text-center font-bold text-xl">
            {title}
          </DrawerTitle>
          {children}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent>
        <DialogTitle className="mb-6 font-bold text-xl">{title}</DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  );
}
