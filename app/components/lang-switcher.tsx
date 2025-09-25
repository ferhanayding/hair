"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import * as React from "react";

type Loc = "ru" | "en" | "az" | "tr";

function RUFlag(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 60 40" width="28" height="18" {...props} aria-hidden>
      <rect width="60" height="40" fill="#fff" />
      <rect width="60" height="26.67" y="13.33" fill="#0039A6" />
      <rect width="60" height="13.33" y="26.67" fill="#D52B1E" />
    </svg>
  );
}

function GBFlag(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 60 40" width="28" height="18" {...props} aria-hidden>
      <clipPath id="c">
        <rect width="60" height="40" rx="3" />
      </clipPath>
      <g clipPath="url(#c)">
        <rect width="60" height="40" fill="#012169" />
        <path d="M0,0 60,40 M60,0 0,40" stroke="#fff" strokeWidth="8" />
        <path d="M0,0 60,40 M60,0 0,40" stroke="#C8102E" strokeWidth="4" />
        <rect x="26" width="8" height="40" fill="#fff" />
        <rect y="16" width="60" height="8" fill="#fff" />
        <rect x="28" width="4" height="40" fill="#C8102E" />
        <rect y="18" width="60" height="4" fill="#C8102E" />
      </g>
    </svg>
  );
}

function AZFlag(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 60 40" width="28" height="18" {...props} aria-hidden>
      <rect width="60" height="40" fill="#3F9C35" />
      <rect width="60" height="26.67" y="0" fill="#00B5E2" />
      <rect width="60" height="13.33" y="13.33" fill="#ED2939" />
      <g transform="translate(28,20)">
        <circle r="6" fill="#fff" />
        <circle r="4.5" cx="1.6" fill="#ED2939" />
        <g transform="translate(6.8,0) scale(0.7)">
          <g fill="#fff">
            <polygon points="0,-4 0.9,-1.2 3.8,-1.2 1.4,0.5 2.3,3.2 0,1.6 -2.3,3.2 -1.4,0.5 -3.8,-1.2 -0.9,-1.2" />
          </g>
        </g>
      </g>
    </svg>
  );
}

function TRFlag(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 60 40" width="28" height="18" {...props} aria-hidden>
      <rect width="60" height="40" fill="#E30A17" />
      <circle cx="25" cy="20" r="9" fill="#fff" />
      <circle cx="28" cy="20" r="7" fill="#E30A17" />
      <path
        d="M35.5 20l6.5 2.1-4-5.6v7l4-5.6-6.5 2.1z"
        fill="#fff"
        transform="translate(-2,0)"
      />
    </svg>
  );
}

type Item = {
  code: Loc;
  label: string;
  Flag: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const ALL_ITEMS: Item[] = [
  { code: "en", label: "English", Flag: GBFlag },
  { code: "ru", label: "Русский", Flag: RUFlag },
  { code: "az", label: "Azərbaycanca", Flag: AZFlag },
  { code: "tr", label: "Türkçe", Flag: TRFlag },
];

export default function LocaleSwitcher({ current }: { current?: Loc }) {
  const localeFromHook = useLocale() as Loc;
  const active = (current ?? localeFromHook) as Loc;

  const pathname = usePathname() || "/";
  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const btnRef = React.useRef<HTMLButtonElement | null>(null);
  const menuRef = React.useRef<HTMLDivElement | null>(null);
  const itemRefs = React.useRef<Array<HTMLButtonElement | null>>([]);

  const items = React.useMemo(() => {
    const cur = ALL_ITEMS.find((i) => i.code === active);
    const rest = ALL_ITEMS.filter((i) => i.code !== active);
    return cur ? [cur, ...rest] : ALL_ITEMS;
  }, [active]);

  const CurrentFlag = (items[0]?.Flag ?? GBFlag) as Item["Flag"];

  const onSelect = (code: Loc) => {
    if (code === active) return setOpen(false);
    router.replace(pathname, { locale: code });
    setOpen(false);
  };

  React.useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!open) return;
      const t = e.target as Node;
      if (!menuRef.current?.contains(t) && !btnRef.current?.contains(t)) {
        setOpen(false);
      }
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  const onMenuKeyDown = (e: React.KeyboardEvent) => {
    const els = itemRefs.current.filter(Boolean) as HTMLButtonElement[];
    const idx = els.findIndex((el) => el === document.activeElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      els[(idx + 1) % els.length]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      els[(idx - 1 + els.length) % els.length]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      els[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      els[els.length - 1]?.focus();
    }
  };

  return (
    <>
      <div className="relative inline-block text-left">
        <button
          ref={btnRef}
          type="button"
          aria-haspopup="menu"
          aria-expanded={open}
          aria-label="Change language"
          onClick={() => setOpen((o) => !o)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setOpen(true);
              requestAnimationFrame(() => itemRefs.current[0]?.focus());
            }
          }}
          className={[
            "cursor-pointer inline-flex items-center justify-center rounded-2xl px-2.5 py-1.5 text-white",
            "bg-white/5 hover:bg-white/10 transition",
            open
              ? "ring-1 ring-white/30 shadow-[0_0_24px_-10px_rgba(255,255,255,0.5)]"
              : "",
          ].join(" ")}
        >
          <span
            className="grid place-items-center rounded-md overflow-hidden flag-wave"
            aria-hidden
          >
            <CurrentFlag />
          </span>
          <svg
            className={`ml-1 h-3 w-3 transition-transform ${
              open ? "rotate-180" : ""
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden
          >
            <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.17l3.71-2.94a.75.75 0 111.04 1.08l-4.24 3.36a.75.75 0 01-.94 0L5.21 8.31a.75.75 0 01.02-1.1z" />
          </svg>
        </button>

        <div
          ref={menuRef}
          role="menu"
          aria-label="Languages"
          tabIndex={-1}
          onKeyDown={onMenuKeyDown}
          className={[
            "absolute right-0 mt-2 w-20 origin-top-right",
            "rounded-2xl border border-white/10 bg-[hsl(var(--color-forest))] text-white shadow-lg",
            "ring-1 ring-black/5 backdrop-blur transition will-change-transform",
            open
              ? "scale-100 opacity-100"
              : "pointer-events-none scale-95 opacity-0",
          ].join(" ")}
          style={{ transformOrigin: "90% 0%" }}
        >
          <ul className="p-1.5">
            {items.map(({ code, label, Flag }, i) => (
              <li key={code} className={i > 0 ? "mt-1" : ""}>
                <button
                  // ref={(el) => (itemRefs.current[i] = el)}
                  role="menuitem"
                  aria-label={label}
                  onClick={() => onSelect(code)}
                  className={[
                    "w-full flex items-center justify-center gap-1 rounded-xl p-2 cursor-pointer",
                    "hover:bg-white/10 focus:bg-white/10 focus:outline-none",
                    code === active ? "ring-1 ring-white/40" : "",
                  ].join(" ")}
                >
                  <Flag />
                  {code === active && (
                    <span className="sr-only">(current)</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style jsx>{`
        @keyframes wave {
          0% {
            transform: rotate(0deg) translateZ(0);
          }
          25% {
            transform: rotate(2deg) translateY(-0.5px);
          }
          50% {
            transform: rotate(0deg) translateY(0);
          }
          75% {
            transform: rotate(-2deg) translateY(0.5px);
          }
          100% {
            transform: rotate(0deg) translateY(0);
          }
        }
        .flag-wave {
          animation: wave 1.8s ease-in-out infinite;
          transform-origin: 10% 90%;
        }
        button[disabled] {
          cursor: default;
          opacity: 0.9;
        }
      `}</style>
    </>
  );
}
