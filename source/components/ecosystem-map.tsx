"use client";

/* Brand media is pre-optimized locally and intentionally rendered without a runtime image service. */
/* eslint-disable @next/next/no-img-element */

import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { ArrowUpRight, Droplets, ShoppingBasket, Sprout } from "lucide-react";
import { useState, type PointerEvent } from "react";

const systems = [
  {
    id: "garden",
    name: "Garden",
    index: "01",
    href: "https://garden.bb610.com.ua/",
    image: "/media/garden.jpg",
    accent: "#75f243",
    icon: Sprout,
    label: "Системи контейнерного вирощування",
  },
  {
    id: "water",
    name: "Water",
    index: "02",
    href: "https://water.bb610.com.ua/",
    image: "/media/water.jpg",
    accent: "#2ac8ff",
    icon: Droplets,
    label: "Автоматичний полив і фертигація",
  },
  {
    id: "market",
    name: "Market",
    index: "03",
    href: "https://market.bb610.com.ua/",
    image: "/media/market.jpg",
    accent: "#ff7a1b",
    icon: ShoppingBasket,
    label: "Професійні товари та обладнання",
  },
  {
    id: "berry",
    name: "Berry",
    index: "04",
    href: "https://bb610.com.ua/berry/",
    image: "/media/berry.jpg",
    accent: "#bb6bff",
    icon: Sprout,
    label: "Саджанці, вирощування та ягода",
  },
] as const;

export function EcosystemMap() {
  const [activeId, setActiveId] = useState<(typeof systems)[number]["id"]>("garden");
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 90, damping: 20 });
  const springY = useSpring(pointerY, { stiffness: 90, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [4.5, -4.5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-4.5, 4.5]);
  const active = systems.find((item) => item.id === activeId) ?? systems[0];

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <div className="ecosystem-shell" onPointerMove={handlePointerMove} onPointerLeave={() => {
      pointerX.set(0);
      pointerY.set(0);
    }}>
      <motion.div
        className="ecosystem-stage"
        style={reduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 1100 }}
      >
        <AnimatePresence mode="popLayout">
          <motion.img
            key={active.image}
            src={active.image}
            alt=""
            aria-hidden="true"
            className="ecosystem-backdrop"
            initial={reduceMotion ? false : { opacity: 0, scale: 1.06 }}
            animate={{ opacity: 0.33, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>

        <div className="ecosystem-grid" aria-hidden="true" />
        <div className="orbit orbit-one" aria-hidden="true" />
        <div className="orbit orbit-two" aria-hidden="true" />

        <svg className="connection-lines" viewBox="0 0 600 600" aria-hidden="true">
          <path d="M300 300 L115 124 M300 300 L492 140 M300 300 L125 468 M300 300 L478 476" />
        </svg>

        <div className="system-core">
          <span className="core-pulse" aria-hidden="true" />
          <img src="/media/bb610-systems.webp" alt="BB610" />
          <small>ecosystem</small>
        </div>

        {systems.map((item) => {
          const Icon = item.icon;
          const selected = item.id === activeId;
          return (
            <a
              key={item.id}
              href={item.href}
              className={`system-node node-${item.id}${selected ? " is-active" : ""}`}
              style={{ "--node-accent": item.accent } as React.CSSProperties}
              onMouseEnter={() => setActiveId(item.id)}
              onFocus={() => setActiveId(item.id)}
              aria-label={`${item.name}: ${item.label}`}
            >
              <span className="node-index">{item.index}</span>
              <Icon aria-hidden="true" />
              <strong>{item.name}</strong>
              <ArrowUpRight className="node-arrow" aria-hidden="true" />
            </a>
          );
        })}

        <div className="active-system" style={{ "--node-accent": active.accent } as React.CSSProperties}>
          <span>{active.index} / 04</span>
          <p>{active.label}</p>
        </div>
      </motion.div>
      <p className="stage-hint">Наведіть курсор, щоб дослідити систему</p>
    </div>
  );
}
