"use client";

import { usePathname, useRouter } from "next/navigation";
import * as React from "react";
import { useMemo, useRef, useState, useTransition, useEffect } from "react";

type Loc = "ru" | "en" | "az";

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
      {/* hilal ve yıldız */}
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

const LOCALE_ITEMS: Array<{
  code: Loc;
  label: string;
  Flag: React.FC<React.SVGProps<SVGSVGElement>>;
}> = [
  { code: "ru", label: "Русский", Flag: RUFlag },
  { code: "en", label: "English", Flag: GBFlag },
  { code: "az", label: "Azərbaycanca", Flag: AZFlag },
];

export default function LocaleSwitcher({ current }: { current: Loc }) {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const [pending, start] = useTransition();

  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // aktif bayrak
  const CurrentFlag = useMemo(() => {
    const found = LOCALE_ITEMS.find((x) => x.code === current);
    return (found?.Flag ?? GBFlag) as React.FC<React.SVGProps<SVGSVGElement>>;
  }, [current]);

  const go = (next: Loc) => {
    if (next === current) return;
    start(() => {
      const parts = pathname.split("/");
      // ['', 'en', '...'] bekliyoruz; ama root'ta isek güvene al
      if (parts.length < 2 || parts[1].length === 0) {
        parts[1] = next; // ['', 'en']
      } else {
        parts[1] = next; // dili değiştir
      }
      const nextPath = parts.join("/") || `/${next}`;
      router.replace(nextPath);
      setOpen(false);
    });
  };

  // dışarı tıklama & ESC
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    window.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onEsc);
    return () => {
      window.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  // açılınca odak
  useEffect(() => {
    if (open) {
      const idx = LOCALE_ITEMS.findIndex((x) => x.code !== current); // şimdiki olmayan ilkine odak
      (itemRefs.current[idx] ?? itemRefs.current[0])?.focus();
    }
  }, [open, current]);

  const onMenuKeyDown = (e: React.KeyboardEvent) => {
    const items = itemRefs.current.filter(Boolean) as HTMLButtonElement[];
    const idx = items.findIndex((el) => el === document.activeElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      items[(idx + 1) % items.length]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      items[(idx - 1 + items.length) % items.length]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      items[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      items[items.length - 1]?.focus();
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
          disabled={pending}
          onClick={() => setOpen((o) => !o)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setOpen(true);
            }
          }}
          className={[
            "inline-flex items-center justify-center rounded-2xl px-2.5 py-1.5",
            "bg-transparent hover:bg-white/10 transition",
            pending ? "opacity-80" : "",
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
            "absolute right-0 mt-2 w-18 origin-top-right",
            "rounded-2xl border border-white/10 backdrop-blur",
            "bg-mainColor shadow-lg ring-1 ring-black/5",
            "transition will-change-transform",
            open
              ? "scale-100 opacity-100"
              : "pointer-events-none scale-95 opacity-0",
          ].join(" ")}
          style={{ transformOrigin: "90% 0%" }}
        >
          <ul className="p-1.5">
            {LOCALE_ITEMS.map(({ code, label, Flag }, i) => (
              <li key={code} className={i > 0 ? "mt-1" : ""}>
                <button
                  ref={(el: any) => (itemRefs.current[i] = el)}
                  role="menuitem"
                  aria-label={label}
                  onClick={() => go(code)}
                  className={[
                    "w-full flex items-center justify-center rounded-xl p-2",
                    "hover:bg-white/15 focus:bg-white/15 focus:outline-none",
                    current === code ? "ring-1 ring-white/30" : "",
                  ].join(" ")}
                >
                  <Flag />
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
