"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-4 md:auto-rows-[20rem]",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  href,
}: {
  className?: string;
  title?: string | ReactNode;
  description?: string | ReactNode;
  header?: ReactNode;
  icon?: ReactNode;
  href?: string;
}) => {
  const Wrapper = href ? "a" : "div";
  return (
    <Wrapper
      {...(href ? { href } : {})}
      className={cn(
        "row-span-1 rounded-3xl group/bento hover:shadow-xl transition-all duration-500 shadow-input dark:shadow-none p-6 bg-surface border border-hairline relative overflow-hidden",
        className
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-500">
        {icon}
        <div className="font-sans font-semibold text-ink mb-2 mt-2 text-xl">
          {title}
        </div>
        <div className="font-sans font-normal text-ink-soft text-sm leading-relaxed">
          {description}
        </div>
      </div>
    </Wrapper>
  );
};
