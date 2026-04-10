"use client";

import React, { Fragment } from "react";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface StrategyTextProps {
  content: string;
  abilities?: Record<string, { name: string; icon: string }>;
}

export function StrategyText({ content, abilities }: StrategyTextProps) {
  if (!abilities) {
    return <span className="whitespace-pre-wrap">{content}</span>;
  }

  // Find all words that exactly match Q, W, E, R, or P.
  // The regex splits the text into tokens.
  const parts = content.split(/(\b[QWERP]\b)/g);

  return (
    <span className="whitespace-pre-wrap leading-relaxed">
      {parts.map((part, i) => {
        const ability = abilities[part];
        if (ability) {
          return (
            <TooltipProvider key={i} delay={0}>
              <Tooltip>
                <TooltipTrigger className="inline-flex align-middle mx-1 outline-none focus:outline-none">
                  <Image
                    src={ability.icon}
                    alt={ability.name}
                    width={20}
                    height={20}
                    className="rounded-md border border-white/20 shadow-sm object-contain"
                  />
                </TooltipTrigger>
                <TooltipContent 
                  side="top" 
                  sideOffset={4}
                  className="bg-[#09090B] border border-white/10 px-2 py-1.5 rounded-md shadow-2xl z-50 font-sans"
                >
                  <p className="text-[#3b82f6] text-[12px] font-medium leading-none">{ability.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </span>
  );
}
