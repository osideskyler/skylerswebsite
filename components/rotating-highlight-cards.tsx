"use client";

import type { LucideIcon } from "lucide-react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import {
  BadgePercent,
  BriefcaseBusiness,
  Clock3,
  Headset,
  Languages,
  LayoutDashboard,
  Megaphone,
  Trophy,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

import type {
  ResumeHighlightCard,
  ResumeHighlightIcon,
} from "@/content/site-data";

type RotatingHighlightCardsProps = {
  cards: ResumeHighlightCard[];
  visibleCount?: number;
  intervalMs?: number;
};

const iconMap: Record<ResumeHighlightIcon, LucideIcon> = {
  badgePercent: BadgePercent,
  briefcaseBusiness: BriefcaseBusiness,
  headset: Headset,
  trophy: Trophy,
  clock3: Clock3,
  layoutDashboard: LayoutDashboard,
  megaphone: Megaphone,
  users: Users,
  languages: Languages,
};

function getInitialVisibleCards(
  cards: ResumeHighlightCard[],
  visibleCount: number,
) {
  if (cards.length <= visibleCount) {
    return cards;
  }

  return cards.slice(0, visibleCount);
}

function getRandomIndex(length: number) {
  return Math.floor(Math.random() * length);
}

function getSlotIndex(step: number, visibleLength: number): number {
  if (visibleLength === 0) return 0;

  if (visibleLength >= 4) {
    const sequence = [0, 2, 1, 3];
    return sequence[step % sequence.length];
  }

  return step % visibleLength;
}

function getDetailClassName(detail: string): string {
  if (detail.length > 70) return "mt-3 text-[0.7rem] leading-[1.35rem] text-white/68";
  if (detail.length > 55) return "mt-3 text-xs leading-5 text-white/68";
  return "mt-3 text-sm leading-6 text-white/68";
}

export function RotatingHighlightCards({
  cards,
  visibleCount = 4,
  intervalMs = 5000,
}: RotatingHighlightCardsProps) {
  const slots = Math.min(visibleCount, cards.length);
  const [rotationState, setRotationState] = useState(() => {
    const initialVisibleCards = getInitialVisibleCards(cards, slots);

    return {
      visibleCards: initialVisibleCards,
      queue: cards.slice(initialVisibleCards.length),
      completedCards: [] as ResumeHighlightCard[],
      slotStep: 0,
    };
  });

  useEffect(() => {
    const initialVisibleCards = getInitialVisibleCards(cards, slots);
    setRotationState({
      visibleCards: initialVisibleCards,
      queue: cards.slice(initialVisibleCards.length),
      completedCards: [] as ResumeHighlightCard[],
      slotStep: 0,
    });
  }, [cards, slots]);

  useEffect(() => {
    if (cards.length <= visibleCount) {
      return;
    }

    const interval = window.setInterval(() => {
      setRotationState((currentState) => {
        const { visibleCards, queue, completedCards, slotStep } = currentState;

        if (visibleCards.length === 0) {
          return currentState;
        }

        let nextQueue = queue;
        let nextCompleted = completedCards;

        // If we've shown every card this cycle, start a new cycle from all
        if (nextQueue.length === 0 && nextCompleted.length > 0) {
          nextQueue = nextCompleted;
          nextCompleted = [];
        }

        if (nextQueue.length === 0) {
          return currentState;
        }

        const slotIndex = getSlotIndex(slotStep, visibleCards.length);
        const replacementCard = nextQueue[0];
        const outgoingCard = visibleCards[slotIndex];

        return {
          visibleCards: visibleCards.map((card, index) =>
            index === slotIndex ? replacementCard : card,
          ),
          queue: nextQueue.slice(1),
          completedCards: [...nextCompleted, outgoingCard],
          slotStep: slotStep + 1,
        };
      });
    }, intervalMs);

    return () => window.clearInterval(interval);
  }, [cards.length, intervalMs, visibleCount]);

  const { visibleCards } = rotationState;

  if (visibleCards.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {visibleCards.map((card, index) => {
          const Icon = iconMap[card.icon];

          return (
            <div
              key={index}
              className="relative flex h-44 flex-col overflow-hidden border-t-2 border-[rgba(148,213,174,0.2)] bg-white/[0.02] p-5"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={card.label}
                  className="flex h-full flex-col"
                  initial={{ opacity: 0, y: -16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <p className="text-xs uppercase tracking-[0.28em] text-white/45">
                    {card.label}
                  </p>
                  <div className="mt-2 flex items-center justify-between gap-3">
                    <p className="font-display text-4xl font-semibold text-white">
                      {card.value}
                    </p>
                    <Icon className="h-5 w-5 text-[rgba(148,213,174,0.65)]" />
                  </div>
                  <p className={getDetailClassName(card.detail)}>
                    {card.detail}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          );
        })}
    </div>
  );
}
