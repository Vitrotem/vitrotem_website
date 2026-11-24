"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { NAV } from "@/lib/content";

function NavItem({ item, onNavigate }) {
  const [open, setOpen] = useState(false);
  const itemRef = useRef(null);
  const menuId = useId();
  const hasChildren = Boolean(item.children?.length);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event) {
      if (!itemRef.current?.contains(event.target)) {
        setOpen(false);
      }
    }

    function onKeyDown(event) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!hasChildren) {
    return (
      <li className="top-bar__item">
        <Link href={item.href} onClick={onNavigate}>
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li
      ref={itemRef}
      className={`top-bar__item has-submenu${open ? " is-open" : ""}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href={item.href}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={(event) => {
          if (window.matchMedia("(hover: none)").matches) {
            event.preventDefault();
            setOpen((value) => !value);
          } else {
            onNavigate?.();
          }
        }}
      >
        {item.label}
        <span className="top-bar__caret" aria-hidden="true" />
      </Link>
      <ul id={menuId} className="top-bar__submenu" role="menu">
        {item.children.map((child) => (
          <li key={child.label} role="none">
            {child.external ? (
              <a
                role="menuitem"
                href={child.href}
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  setOpen(false);
                  onNavigate?.();
                }}
              >
                {child.label}
              </a>
            ) : (
              <Link
                role="menuitem"
                href={child.href}
                onClick={() => {
                  setOpen(false);
                  onNavigate?.();
                }}
              >
                {child.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </li>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="top-bar" id="responsive-menu">
        <div className="top-bar__brand">
          <Link className="brand" href="/" aria-label="VitroTEM home">
            <img src="/images/LogoVitroTEM_BM.png" alt="VitroTEM" />
          </Link>
          <button
            type="button"
            className="top-bar__toggle"
            aria-expanded={mobileOpen}
            aria-controls="primary-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <nav
          id="primary-nav"
          className={`top-bar__nav${mobileOpen ? " is-open" : ""}`}
          aria-label="Primary"
        >
          <ul className="top-bar__menu">
            {NAV.map((item) => (
              <NavItem
                key={item.label}
                item={item}
                onNavigate={() => setMobileOpen(false)}
              />
            ))}
          </ul>
        </nav>

        <div className="top-bar__actions">
          <Link href="/contact" className="nav-cta">
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}
