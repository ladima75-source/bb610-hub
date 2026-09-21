"use client";

import { motion, useReducedMotion } from "motion/react";
import type { HTMLMotionProps } from "motion/react";

type BlurFadeProps = HTMLMotionProps<"div"> & {
  delay?: number;
  inView?: boolean;
};

export function BlurFade({
  children,
  delay = 0,
  inView = true,
  ...props
}: BlurFadeProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, filter: "blur(10px)", y: 18 }}
      animate={!inView && !reduceMotion ? { opacity: 1, filter: "blur(0px)", y: 0 } : undefined}
      whileInView={inView && !reduceMotion ? { opacity: 1, filter: "blur(0px)", y: 0 } : undefined}
      viewport={inView ? { once: true, margin: "-80px" } : undefined}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
