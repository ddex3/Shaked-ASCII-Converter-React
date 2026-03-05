import { useState, useCallback, useEffect, useRef, createContext, useContext } from "react";

type Mode = "text-to-ascii" | "ascii-to-text";
type Theme = "dark" | "light";

const ToastContext = createContext<(msg: string) => void>(() => {});

function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const show = useCallback((msg: string) => {
    setToast(msg);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setToast(null), 1800);
  }, []);

  return (
    <ToastContext.Provider value={show}>
      {children}
      {toast && (
        <div className="toast">
          <i className="fa-solid fa-check" />
          {toast}
        </div>
      )}
    </ToastContext.Provider>
  );
}

function textToAscii(text: string): string {
  if (!text) return "";
  return Array.from(text)
    .map((ch) => ch.charCodeAt(0))
    .join(",");
}

function asciiToText(ascii: string): string {
  if (!ascii.trim()) return "";
  const parts = ascii.split(/[\s,]+/).filter(Boolean);
  return parts
    .map((part) => {
      const code = Number(part);
      if (isNaN(code) || code < 0 || code > 65535) return "";
      return String.fromCharCode(code);
    })
    .join("");
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

function Header({
  theme,
  onCycleTheme,
}: {
  theme: Theme;
  onCycleTheme: () => void;
}) {
  return (
    <header className="header">
      <div className="header-left">
        <div>
          <h1 className="header-title">ASCII Converter</h1>
          <p className="header-subtitle">
            Convert text to ASCII and ASCII to text instantly.
          </p>
        </div>
      </div>
      <button
        className="theme-toggle"
        onClick={onCycleTheme}
        aria-label="Toggle theme"
      >
        <i
          className={`fa-solid ${theme === "dark" ? "fa-moon" : "fa-sun"}`}
        />
      </button>
    </header>
  );
}

function TextareaField({
  label,
  icon,
  placeholder,
  value,
  readOnly,
  onChange,
}: {
  label: string;
  icon: string;
  placeholder: string;
  value: string;
  readOnly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  const showToast = useContext(ToastContext);

  const handleCopy = () => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    showToast("Copied to clipboard");
  };

  const handleClear = () => {
    if (onChange) {
      const synth = {
        target: { value: "" },
      } as React.ChangeEvent<HTMLTextAreaElement>;
      onChange(synth);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "c") {
      const textarea = e.currentTarget;
      const selected = textarea.value.substring(
        textarea.selectionStart,
        textarea.selectionEnd
      );
      if (selected) {
        showToast("Copied to clipboard");
      }
    }
  };

  return (
    <div className="field">
      <div className="field-header">
        <span className="field-label">
          <i className={`fa-solid ${icon}`} />
          {label}
        </span>
        <div className="field-actions">
          {!readOnly && value && (
            <button
              className="action-btn"
              onClick={handleClear}
              aria-label="Clear"
            >
              <i className="fa-solid fa-trash" />
            </button>
          )}
          <button
            className="action-btn"
            onClick={handleCopy}
            aria-label="Copy"
          >
            <i className="fa-solid fa-copy" />
          </button>
        </div>
      </div>
      <textarea
        className="textarea"
        placeholder={placeholder}
        value={value}
        readOnly={readOnly}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        spellCheck={false}
      />
    </div>
  );
}

function SwapButton({ onClick }: { onClick: () => void }) {
  const [rotating, setRotating] = useState(false);

  const handleClick = () => {
    setRotating(true);
    onClick();
    setTimeout(() => setRotating(false), 400);
  };

  return (
    <div className="swap-wrapper">
      <button
        className={`swap-btn${rotating ? " rotating" : ""}`}
        onClick={handleClick}
        aria-label="Swap conversion direction"
      >
        <i className="fa-solid fa-right-left" />
      </button>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>
        Built by <strong>Shaked Angel</strong>
      </p>
      <a
        href="https://github.com/ddex3"
        target="_blank"
        rel="noopener noreferrer"
        className="footer-link"
      >
        <i className="fa-brands fa-github" />
        github.com/ddex3
      </a>
    </footer>
  );
}

export default function App() {
  const [mode, setMode] = useState<Mode>("text-to-ascii");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem("theme") as Theme) || "dark";
  });

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const convert = useCallback(
    (value: string, currentMode: Mode) => {
      setInput(value);
      setOutput(
        currentMode === "text-to-ascii"
          ? textToAscii(value)
          : asciiToText(value)
      );
    },
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    convert(e.target.value, mode);
  };

  const handleSwap = () => {
    const newMode: Mode =
      mode === "text-to-ascii" ? "ascii-to-text" : "text-to-ascii";
    setMode(newMode);
    setInput("");
    setOutput("");
  };

  const topLabel = mode === "text-to-ascii" ? "Text" : "ASCII";
  const topIcon = mode === "text-to-ascii" ? "fa-font" : "fa-hashtag";
  const bottomLabel = mode === "text-to-ascii" ? "ASCII" : "Text";
  const bottomIcon = mode === "text-to-ascii" ? "fa-hashtag" : "fa-font";

  return (
    <ToastProvider>
      <div className="page">
        <div className="card">
          <Header theme={theme} onCycleTheme={toggleTheme} />

          <div className="converter">
            <TextareaField
              label={topLabel}
              icon={topIcon}
              placeholder={
                mode === "text-to-ascii"
                  ? "Type text here..."
                  : "Enter ASCII codes (e.g. 72,101,108,108,111)"
              }
              value={input}
              onChange={handleInputChange}
            />

            <SwapButton onClick={handleSwap} />

            <TextareaField
              label={bottomLabel}
              icon={bottomIcon}
              placeholder="Output"
              value={output}
              readOnly
            />
          </div>

          <Footer />
        </div>
      </div>
    </ToastProvider>
  );
}
