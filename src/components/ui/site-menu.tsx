import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";

export type PageName = "home" | "blog" | "portfolio";

interface SiteMenuProps {
  activePage: PageName;
  onNavigate: (page: PageName) => void;
}

const icons = {
  home: "M3 11.5 12 4l9 7.5M5.5 10v10h13V10M9 20v-6h6v6",
  blog: "M5 4h14v16H5zM8 8h8M8 12h8M8 16h5",
  portfolio: "M4 7h16v12H4zM9 7V5h6v2M4 12h16M10 12v2h4v-2",
};

const Icon = ({ name }: { name: keyof typeof icons }) => (
  <svg aria-hidden="true" className="menu-icon" viewBox="0 0 24 24">
    <path d={icons[name]} />
  </svg>
);

const menuItems: { icon: keyof typeof icons; label: string; page: PageName }[] = [
  { icon: "home", label: "Home", page: "home" },
  { icon: "blog", label: "Blog", page: "blog" },
  { icon: "portfolio", label: "Portfolio", page: "portfolio" },
];

export default function SiteMenu({ activePage, onNavigate }: SiteMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dragX = useMotionValue(0);
  const dragOpacity = useTransform(dragX, [-200, 0], [0, 1]);

  const navigate = (page: PageName) => {
    onNavigate(page);
    setIsOpen(false);
  };

  return (
    <>
      <header className="site-header">
        <motion.button
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="menu-trigger"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
        >
          <span />
          <span />
          <span />
        </motion.button>
        <button className="brand" onClick={() => navigate("home")}>
          <img src={`${import.meta.env.BASE_URL}polkalady-logo.svg`} alt="" />
          <strong><span>Polka</span>Lady</strong>
        </button>
        <span className="header-mark">PL / 01</span>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.button
            aria-label="Close menu overlay"
            className="menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.nav
        aria-label="Main navigation"
        className="side-menu"
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ type: "spring", stiffness: 200, damping: 30, mass: 0.8 }}
        drag="x"
        dragConstraints={{ left: -320, right: 0 }}
        dragElastic={0.2}
        onDragEnd={(_, info) => {
          if (info.offset.x < -100) setIsOpen(false);
          dragX.set(0);
        }}
        style={{ x: dragX }}
      >
        <button
          aria-label="Close menu"
          className="menu-close"
          onClick={() => setIsOpen(false)}
        >
          &times;
        </button>
        <motion.span className="drag-indicator" style={{ opacity: dragOpacity }}>
          &lsaquo;
        </motion.span>

        <div className="menu-content">
          <p className="section-label">Navigate</p>
          <div className="menu-brand">
            <img src={`${import.meta.env.BASE_URL}polkalady-logo.svg`} alt="" />
            <h2>Polka<span>Lady</span></h2>
          </div>
          <div className="menu-line" />

          <ul>
            {menuItems.map((item, index) => (
              <motion.li
                key={item.page}
                initial={{ x: -40, opacity: 0 }}
                animate={isOpen ? { x: 0, opacity: 1 } : { x: -40, opacity: 0 }}
                transition={{ delay: 0.1 + index * 0.08 }}
              >
                <button
                  className={activePage === item.page ? "active" : ""}
                  onClick={() => navigate(item.page)}
                >
                  <span className="icon-frame">
                    <Icon name={item.icon} />
                  </span>
                  {item.label}
                </button>
              </motion.li>
            ))}
          </ul>

          <p className="menu-note">Drag left to close</p>
        </div>
      </motion.nav>
    </>
  );
}
