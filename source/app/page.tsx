"use client";

/* Brand media is pre-optimized locally and intentionally rendered without a runtime image service. */
/* eslint-disable @next/next/no-img-element */

import { BlurFade } from "@/components/magicui/blur-fade";
import { EcosystemMap } from "@/components/ecosystem-map";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Droplets,
  Menu,
  ShoppingBasket,
  Sprout,
} from "lucide-react";

const directions = [
  {
    id: "garden",
    number: "01",
    name: "Garden",
    eyebrow: "Сучасний сад і система вирощування",
    title: "Професійні системи контейнерного вирощування",
    text: "Контейнери та спеціалізовані рішення для дренажу, аерації кореневої зони й організації поливу.",
    action: "Підібрати рішення",
    href: "https://garden.bb610.com.ua/",
    image: "/media/garden.jpg",
    logo: "/media/bb610-garden.webp",
    color: "#75f243",
    icon: Sprout,
  },
  {
    id: "water",
    number: "02",
    name: "Water",
    eyebrow: "Вода та система точного поливу",
    title: "Контроль води. Точний полив",
    text: "Автоматичний полив і фертигація — від простого поливу до контролю pH та EC.",
    action: "Підібрати систему",
    href: "https://water.bb610.com.ua/",
    image: "/media/water.jpg",
    logo: "/media/bb610-water.webp",
    color: "#2ac8ff",
    icon: Droplets,
  },
  {
    id: "market",
    number: "03",
    name: "Market",
    eyebrow: "Професійні товари та обладнання",
    title: "Те, що обираємо для себе",
    text: "Професійні товари та обладнання, відібрані BB610.",
    action: "До магазину",
    href: "https://market.bb610.com.ua/",
    image: "/media/market.jpg",
    logo: "/media/bb610-market.webp",
    color: "#ff7a1b",
    icon: ShoppingBasket,
  },
  {
    id: "berry",
    number: "04",
    name: "Berry",
    eyebrow: "Лохина та рослини BB610 Berry",
    title: "Лохина: від рослини до ягоди",
    text: "Саджанці, вирощування та ягода.",
    action: "Дізнатися більше",
    href: "https://bb610.com.ua/berry/",
    image: "/media/berry.jpg",
    logo: "/media/bb610-berry.webp",
    color: "#bb6bff",
    icon: Sprout,
  },
] as const;

const navItems = [
  { label: "Екосистема", href: "#ecosystem" },
  { label: "Напрямки", href: "#directions" },
  { label: "Обрати", href: "#choose" },
];

function BrandMark() {
  return (
    <a href="#top" className="brand-mark" aria-label="BB610 — на головну">
      <img src="/media/bb610-systems.webp" alt="BB610" />
      <span>systems</span>
    </a>
  );
}

export default function Home() {
  return (
    <main id="top">
      <a className="skip-link" href="#content">Перейти до основного вмісту</a>

      <header className="site-header">
        <BrandMark />
        <nav className="desktop-nav" aria-label="Головна навігація">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>
        <a className="header-cta" href="#directions">
          Обрати напрямок
          <ArrowDown aria-hidden="true" />
        </a>

        <Sheet>
          <SheetTrigger asChild>
            <Button className="menu-trigger" variant="ghost" size="icon" aria-label="Відкрити меню">
              <Menu aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent className="mobile-sheet" side="right">
            <SheetTitle className="mobile-sheet-title">BB610 / Навігація</SheetTitle>
            <nav aria-label="Мобільна навігація">
              {navItems.map((item, index) => (
                <SheetClose key={item.href} asChild>
                  <a href={item.href}><span>0{index + 1}</span>{item.label}</a>
                </SheetClose>
              ))}
            </nav>
            <div className="sheet-directions">
              {directions.map((item) => (
                <a key={item.id} href={item.href} style={{ "--direction-color": item.color } as React.CSSProperties}>
                  {item.name}<ArrowUpRight aria-hidden="true" />
                </a>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </header>

      <section className="hero" id="content" aria-labelledby="hero-title">
        <div className="hero-noise" aria-hidden="true" />
        <div className="hero-glow glow-green" aria-hidden="true" />
        <div className="hero-glow glow-blue" aria-hidden="true" />

        <div className="hero-layout">
          <div className="hero-copy">
            <BlurFade inView={false}>
              <p className="eyebrow"><span /> BB610 / Система сучасного вирощування</p>
            </BlurFade>
            <BlurFade inView={false} delay={0.08}>
              <h1 id="hero-title">
                <span>Вирощуємо.</span>
                <span>Автоматизуємо.</span>
                <span className="hero-outline">Постачаємо.</span>
              </h1>
            </BlurFade>
            <BlurFade inView={false} delay={0.17} className="hero-intro-wrap">
              <p className="hero-intro">
                Рішення, технології та професійні товари для сучасного вирощування — в одній екосистемі.
              </p>
              <a className="primary-button" href="#ecosystem">
                Дослідити BB610
                <ArrowDown aria-hidden="true" />
              </a>
            </BlurFade>
          </div>

          <BlurFade inView={false} delay={0.2} className="hero-map-wrap">
            <EcosystemMap />
          </BlurFade>
        </div>

        <div className="hero-rail" aria-label="Напрямки BB610">
          {directions.map((item) => (
            <a key={item.id} href={`#${item.id}`}>
              <span>{item.number}</span>{item.name}
            </a>
          ))}
        </div>
      </section>

      <section className="manifesto" id="ecosystem" aria-labelledby="ecosystem-title">
        <div className="section-kicker"><span>00</span><p>Екосистема</p></div>
        <BlurFade className="manifesto-title">
          <p>Один фокус</p>
          <h2 id="ecosystem-title">Усе необхідне для сучасного вирощування — від рослини до керованої системи.</h2>
        </BlurFade>
        <BlurFade delay={0.08} className="manifesto-aside">
          <p>Кожен напрямок BB610 має власну спеціалізацію. Разом вони створюють зрозумілий маршрут: виростити, автоматизувати, укомплектувати.</p>
          <a href="#directions">Переглянути напрямки <ArrowDown aria-hidden="true" /></a>
        </BlurFade>
      </section>

      <div className="kinetic-strip" aria-hidden="true">
        <div>
          <span>Garden</span><i>•</i><span>Water</span><i>•</i><span>Market</span><i>•</i><span>Berry</span><i>•</i>
          <span>Garden</span><i>•</i><span>Water</span><i>•</i><span>Market</span><i>•</i><span>Berry</span><i>•</i>
        </div>
      </div>

      <section className="directions" id="directions" aria-labelledby="directions-title">
        <div className="directions-heading">
          <div className="section-kicker"><span>01—04</span><p>Напрямки BB610</p></div>
          <BlurFade>
            <h2 id="directions-title">Оберіть точку входу</h2>
          </BlurFade>
          <p>Чотири спеціалізовані напрямки. Кожен веде на окремий сайт з відповідними рішеннями й товарами.</p>
        </div>

        <div className="direction-grid">
          {directions.map((item, index) => {
            const Icon = item.icon;
            return (
              <BlurFade key={item.id} delay={index * 0.06}>
                <a
                  id={item.id}
                  href={item.href}
                  className="direction-card"
                  style={{ "--direction-color": item.color } as React.CSSProperties}
                  aria-label={`${item.name}: ${item.action}`}
                >
                  <img className="direction-image" src={item.image} alt="" aria-hidden="true" />
                  <span className="direction-shade" aria-hidden="true" />
                  <div className="direction-topline">
                    <span>{item.number} / 04</span>
                    <Icon aria-hidden="true" />
                  </div>
                  <img className="direction-logo" src={item.logo} alt={item.name} />
                  <div className="direction-content">
                    <p className="direction-eyebrow">{item.eyebrow}</p>
                    <h3>{item.title}</h3>
                    <p className="direction-text">{item.text}</p>
                  </div>
                  <div className="direction-action">
                    <span>{item.action}</span>
                    <span className="round-arrow"><ArrowUpRight aria-hidden="true" /></span>
                  </div>
                </a>
              </BlurFade>
            );
          })}
        </div>
      </section>

      <section className="route-section" id="choose" aria-labelledby="route-title">
        <div className="route-intro">
          <div className="section-kicker"><span>05</span><p>Навігація</p></div>
          <BlurFade>
            <h2 id="route-title">Ваш запит.<br />Ваш напрямок.</h2>
            <p>Оберіть задачу — система підкаже, куди перейти далі.</p>
          </BlurFade>
        </div>

        <div className="route-list">
          {directions.map((item, index) => (
            <BlurFade key={item.id} delay={index * 0.05}>
              <a href={item.href} className="route-row" style={{ "--direction-color": item.color } as React.CSSProperties}>
                <span className="route-number">{item.number}</span>
                <div>
                  <p>{item.eyebrow}</p>
                  <h3>{item.name}</h3>
                </div>
                <span className="route-answer">{item.action}</span>
                <ArrowRight className="route-arrow" aria-hidden="true" />
              </a>
            </BlurFade>
          ))}
        </div>
      </section>

      <section className="closing" aria-labelledby="closing-title">
        <div className="closing-grid" aria-hidden="true" />
        <BlurFade>
          <p>BB610 / Системи для сучасного вирощування</p>
          <h2 id="closing-title">Почніть з напрямку, який відповідає вашій задачі.</h2>
          <a className="primary-button light" href="#directions">
            Обрати напрямок
            <ArrowUpRight aria-hidden="true" />
          </a>
        </BlurFade>
      </section>

      <footer>
        <BrandMark />
        <p>Вирощуємо · Автоматизуємо · Постачаємо</p>
        <a href="#top">До початку <ArrowUpRight aria-hidden="true" /></a>
      </footer>
    </main>
  );
}
