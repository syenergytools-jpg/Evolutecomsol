"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, createContext, useContext, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const ModalContext = createContext<{ open: boolean; setOpen: (b: boolean) => void } | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  return <ModalContext.Provider value={{ open, setOpen }}>{children}</ModalContext.Provider>;
};

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
};

export const Modal = ({ children }: { children: ReactNode }) => {
  return <ModalProvider>{children}</ModalProvider>;
};

export const ModalTrigger = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { setOpen } = useModal();
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md text-canvas text-center relative overflow-hidden",
        className
      )}
      onClick={() => setOpen(true)}
    >
      {children}
    </button>
  );
};

export const ModalBody = ({ children, className }: { children: ReactNode; className?: string }) => {
  const { open, setOpen } = useModal();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [open]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          className="fixed [perspective:800px] [transform-style:preserve-3d] inset-0 h-full w-full flex items-center justify-center z-50 bg-obsidian/60"
        >
          <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.5, rotateX: 40, y: 40 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateX: 10 }}
            transition={{ type: "spring", stiffness: 260, damping: 15 }}
            className={cn(
              "min-h-[50%] max-h-[90%] md:max-w-[40%] bg-surface border border-hairline md:rounded-2xl relative z-50 flex flex-col flex-1 overflow-hidden",
              className
            )}
          >
            <CloseIcon />
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CloseIcon = () => {
  const { setOpen } = useModal();
  return (
    <button onClick={() => setOpen(false)} className="absolute top-4 right-4 group">
      <svg className="text-ink-soft h-4 w-4 group-hover:scale-125 group-hover:rotate-3 transition duration-200" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
        <path d="M18 6 6 18M6 6l12 12" />
      </svg>
    </button>
  );
};

export const ModalContent = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn("flex flex-col flex-1 p-8 md:p-10", className)}>{children}</div>
);

export const ModalFooter = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn("flex justify-end p-4 bg-canvas-2", className)}>{children}</div>
);
