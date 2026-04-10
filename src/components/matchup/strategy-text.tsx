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
  enemyAbilities?: Record<string, { name: string; icon: string }>;
  enemyName?: string;
}

export function StrategyText({ content, abilities, enemyAbilities, enemyName }: StrategyTextProps) {
  if (!abilities && !enemyAbilities) {
    return <span className="whitespace-pre-wrap">{content}</span>;
  }

  // Split by the exact ability keys: Q, W, E, R, P
  const parts = content.split(/(\b[QWERP]\b)/g);

  // Common keywords that indicate an enemy's ability is being referenced
  const enemyKeywords = ["her", "his", "enemy", "enemy's", "opponent", "opponent's"];
  if (enemyName) {
    enemyKeywords.push(enemyName.toLowerCase());
    enemyKeywords.push(`${enemyName.toLowerCase()}'s`);
  }

  const getAbilityContext = (index: number, abilityKey: string) => {
    // Look at the text immediately preceding this ability key
    const prevText = parts[index - 1] || "";
    
    // Extract the last word
    const lastWordMatch = prevText.match(/([A-Za-z]+(?:'s)?)\s*$/);
    const lastWord = lastWordMatch ? lastWordMatch[1].toLowerCase() : "";

    let isEnemy = false;

    if (enemyKeywords.includes(lastWord)) {
      isEnemy = true;
    } else if (lastWord === "the" || lastWord === "their") {
      // If it's "the Q", look one word further back for action verbs
      const prevWords = prevText.trim().split(/\s+/);
      if (prevWords.length >= 2) {
        const actionWord = prevWords[prevWords.length - 2].toLowerCase();
        if (["dodge", "bait", "avoid", "block", "windwall", "sidestep"].includes(actionWord)) {
          isEnemy = true;
        }
      }
    } else if (["dodge", "bait", "avoid", "block", "windwall", "sidestep"].includes(lastWord)) {
      isEnemy = true;
    }

    // Attempt to resolve the ability from the correct pool
    if (isEnemy && enemyAbilities?.[abilityKey]) {
      return { ability: enemyAbilities[abilityKey], isEnemy: true };
    } else if (!isEnemy && abilities?.[abilityKey]) {
      return { ability: abilities[abilityKey], isEnemy: false };
    }
    
    // Fallbacks if strictly not found in one pool but available in the other
    if (abilities?.[abilityKey]) return { ability: abilities[abilityKey], isEnemy: false };
    if (enemyAbilities?.[abilityKey]) return { ability: enemyAbilities[abilityKey], isEnemy: true };
    
    return null;
  };

  return (
    <span className="whitespace-pre-wrap leading-relaxed">
      {parts.map((part, i) => {
        // Even indices are regular text, odd indices are the matched ability keys
        if (i % 2 === 1) {
          const match = getAbilityContext(i, part);
          if (match && match.ability) {
            const { ability, isEnemy } = match;
            const borderColor = isEnemy ? "border-[#C9082A]/50" : "border-[#3b82f6]/50";
            const textColor = isEnemy ? "text-[#C9082A]" : "text-[#3b82f6]";
            
            return (
              <TooltipProvider key={i} delay={0}>
                <Tooltip>
                  <TooltipTrigger className="inline-flex align-middle mx-[2px] outline-none focus:outline-none translate-y-[-1px]">
                    <Image
                      src={ability.icon}
                      alt={ability.name}
                      width={20}
                      height={20}
                      className={`rounded-md border ${borderColor} shadow-sm object-contain hover:scale-110 transition-transform duration-200`}
                    />
                  </TooltipTrigger>
                  <TooltipContent 
                    side="top" 
                    sideOffset={4}
                    className="bg-[#09090B] border border-white/10 px-2 py-1.5 rounded-md shadow-2xl z-50 font-sans"
                  >
                    <p className={`${textColor} text-[12px] font-bold leading-none tracking-wide`}>
                      {isEnemy && enemyName ? `${enemyName} ` : ""}{part} - {ability.name}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          }
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </span>
  );
}
