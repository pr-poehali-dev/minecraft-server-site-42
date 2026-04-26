import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/56aa37fc-3d76-4f88-88cc-3925f48dc50e/files/5dc6e888-b6b8-4147-95d4-82e50d2686bd.jpg";
const SERVER_IP = "play.imunns.ru";
const SERVER_VERSION = "1.20.1";
const SERVER_PORT = "25565";

const stars = Array.from({ length: 55 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 2.5 + 1,
  duration: `${Math.random() * 4 + 2}s`,
  delay: `${Math.random() * 4}s`,
  opacity: Math.random() * 0.5 + 0.2,
}));

const particles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  bottom: `${Math.random() * 40}%`,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 4 + 2,
  duration: `${Math.random() * 8 + 5}s`,
  delay: `${Math.random() * 6}s`,
}));

const BIOMES: { x: number; y: number; w: number; h: number; color: string; label: string; emoji: string }[] = [
  { x: 5, y: 5, w: 28, h: 22, color: "rgba(34,100,50,0.75)", label: "Дремучий лес", emoji: "🌲" },
  { x: 35, y: 5, w: 20, h: 18, color: "rgba(200,170,80,0.7)", label: "Пустыня Забытых", emoji: "🏜️" },
  { x: 57, y: 5, w: 18, h: 14, color: "rgba(100,160,220,0.65)", label: "Морской берег", emoji: "🌊" },
  { x: 77, y: 5, w: 18, h: 30, color: "rgba(160,80,60,0.65)", label: "Вулкан", emoji: "🌋" },
  { x: 5, y: 30, w: 20, h: 25, color: "rgba(100,140,200,0.6)", label: "Ледяные пики", emoji: "❄️" },
  { x: 27, y: 26, w: 28, h: 20, color: "rgba(90,60,140,0.7)", label: "Тёмные земли", emoji: "🔮" },
  { x: 57, y: 21, w: 18, h: 22, color: "rgba(60,140,100,0.65)", label: "Болото духов", emoji: "🌿" },
  { x: 5, y: 57, w: 22, h: 20, color: "rgba(200,140,60,0.65)", label: "Саванна", emoji: "🦁" },
  { x: 29, y: 48, w: 24, h: 20, color: "rgba(160,100,200,0.65)", label: "Кристальные пещеры", emoji: "💎" },
  { x: 55, y: 45, w: 22, h: 22, color: "rgba(80,120,60,0.7)", label: "Древний лес", emoji: "🌳" },
  { x: 79, y: 37, w: 16, h: 30, color: "rgba(220,180,100,0.6)", label: "Золотые луга", emoji: "🌾" },
  { x: 5, y: 79, w: 30, h: 16, color: "rgba(60,100,180,0.7)", label: "Океан", emoji: "🐋" },
  { x: 37, y: 70, w: 20, h: 25, color: "rgba(140,120,80,0.7)", label: "Горное ущелье", emoji: "⛰️" },
  { x: 59, y: 69, w: 18, h: 26, color: "rgba(200,80,80,0.6)", label: "Руины", emoji: "🏚️" },
  { x: 79, y: 69, w: 16, h: 26, color: "rgba(70,70,140,0.7)", label: "Пустоши", emoji: "🌑" },
];

const POI = [
  { x: 18, y: 16, label: "Спавн", icon: "Home", color: "#f0d080" },
  { x: 42, y: 14, label: "Рынок", icon: "ShoppingBag", color: "#80d0f0" },
  { x: 65, y: 30, label: "Арена", icon: "Swords", color: "#f08080" },
  { x: 35, y: 55, label: "Шахта", icon: "Gem", color: "#c080f0" },
  { x: 72, y: 75, label: "Замок", icon: "Castle", color: "#f0a060" },
];

function MapSection() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; label: string; emoji: string } | null>(null);
  const [scanLine, setScanLine] = useState(0);

  return (
    <section className="relative z-10 py-20 px-6 max-w-5xl mx-auto">
      <div className="section-divider mb-20 max-w-xl mx-auto" />
      <div className="text-center mb-12">
        <p className="font-cinzel text-xs tracking-widest mb-3" style={{ color: "var(--purple-mid)" }}>
          МИР СЕРВЕРА
        </p>
        <h2
          className="font-cinzel"
          style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 700, color: "var(--purple-light)" }}
        >
          Карта Imunns
        </h2>
        <p className="font-rubik text-sm mt-3" style={{ color: "rgba(180,140,220,0.6)" }}>
          Наведи на биом, чтобы узнать о нём
        </p>
      </div>

      <div
        className="glass-card relative overflow-hidden mx-auto"
        style={{
          maxWidth: 760,
          aspectRatio: "4/3",
          cursor: "crosshair",
          background: "rgba(10, 6, 20, 0.85)",
          border: "1px solid rgba(180,120,255,0.3)",
          boxShadow: "0 0 60px rgba(140,80,220,0.2), inset 0 0 40px rgba(80,40,140,0.15)",
        }}
        onMouseLeave={() => setTooltip(null)}
      >
        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.07 }}>
          {Array.from({ length: 11 }, (_, i) => (
            <line key={`v${i}`} x1={`${i * 10}%`} y1="0" x2={`${i * 10}%`} y2="100%" stroke="rgba(180,120,255,1)" strokeWidth="0.5" />
          ))}
          {Array.from({ length: 11 }, (_, i) => (
            <line key={`h${i}`} x1="0" y1={`${i * 10}%`} x2="100%" y2={`${i * 10}%`} stroke="rgba(180,120,255,1)" strokeWidth="0.5" />
          ))}
        </svg>

        {/* Biomes */}
        <svg className="absolute inset-0 w-full h-full">
          {BIOMES.map((b) => (
            <rect
              key={b.label}
              x={`${b.x}%`} y={`${b.y}%`} width={`${b.w}%`} height={`${b.h}%`}
              fill={b.color}
              rx="3"
              stroke={hovered === b.label ? "rgba(220,180,255,0.9)" : "rgba(180,120,255,0.15)"}
              strokeWidth={hovered === b.label ? "2" : "1"}
              style={{ transition: "all 0.2s ease", filter: hovered === b.label ? "brightness(1.3)" : "none" }}
              onMouseEnter={(e) => {
                setHovered(b.label);
                const rect = (e.currentTarget as SVGRectElement).closest("svg")!.getBoundingClientRect();
                const parent = (e.currentTarget as SVGRectElement).closest(".glass-card")!.getBoundingClientRect();
                setTooltip({ x: b.x + b.w / 2, y: b.y + b.h / 2, label: b.label, emoji: b.emoji });
              }}
              onMouseLeave={() => { setHovered(null); }}
            />
          ))}

          {/* Scan line animation */}
          <line
            x1="0" y1={`${scanLine}%`} x2="100%" y2={`${scanLine}%`}
            stroke="rgba(180,120,255,0.4)"
            strokeWidth="1"
            style={{ filter: "blur(1px)" }}
          />

          {/* POI markers */}
          {POI.map((p) => (
            <g key={p.label}>
              <circle cx={`${p.x}%`} cy={`${p.y}%`} r="6" fill="rgba(10,6,20,0.8)" stroke={p.color} strokeWidth="1.5" />
              <circle cx={`${p.x}%`} cy={`${p.y}%`} r="2.5" fill={p.color} />
              <circle cx={`${p.x}%`} cy={`${p.y}%`} r="9" fill="none" stroke={p.color} strokeWidth="0.8" strokeOpacity="0.4" />
            </g>
          ))}

          {/* Tooltip inside SVG */}
          {tooltip && (
            <g>
              <rect
                x={`${Math.min(Math.max(tooltip.x - 10, 2), 62)}%`}
                y={`${Math.min(tooltip.y + 3, 78)}%`}
                width="120" height="32" rx="6"
                fill="rgba(20,10,38,0.95)"
                stroke="rgba(180,120,255,0.5)"
                strokeWidth="1"
              />
              <text
                x={`${Math.min(Math.max(tooltip.x - 10, 2), 62)}%`}
                y={`${Math.min(tooltip.y + 3, 78)}%`}
                dx="10" dy="14"
                fill="rgba(220,190,255,0.95)"
                fontSize="11"
                fontFamily="Rubik, sans-serif"
              >
                {tooltip.emoji} {tooltip.label}
              </text>
            </g>
          )}
        </svg>

        {/* Scan line via CSS animation */}
        <div
          className="absolute left-0 right-0 pointer-events-none"
          style={{
            height: "2px",
            background: "linear-gradient(90deg, transparent, rgba(180,120,255,0.6), transparent)",
            animation: "map-scan 6s linear infinite",
            top: 0,
          }}
        />

        {/* Corner decorations */}
        {[
          { top: 8, left: 8 }, { top: 8, right: 8 },
          { bottom: 8, left: 8 }, { bottom: 8, right: 8 },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 pointer-events-none"
            style={{
              ...pos,
              borderTop: i < 2 ? "2px solid rgba(180,120,255,0.5)" : "none",
              borderBottom: i >= 2 ? "2px solid rgba(180,120,255,0.5)" : "none",
              borderLeft: i % 2 === 0 ? "2px solid rgba(180,120,255,0.5)" : "none",
              borderRight: i % 2 === 1 ? "2px solid rgba(180,120,255,0.5)" : "none",
            }}
          />
        ))}

        {/* Legend */}
        <div
          className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-4 pointer-events-none"
        >
          {POI.slice(0, 3).map((p) => (
            <div key={p.label} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
              <span className="font-rubik text-xs" style={{ color: "rgba(180,140,220,0.7)" }}>{p.label}</span>
            </div>
          ))}
        </div>

        {/* Coords display */}
        <div
          className="absolute top-3 right-3 font-rubik text-xs pointer-events-none"
          style={{ color: "rgba(155,108,212,0.7)", fontVariantNumeric: "tabular-nums" }}
        >
          10000 × 10000
        </div>
      </div>
    </section>
  );
}

const rules = [
  { num: "01", text: "Уважай других игроков. Оскорбления и токсичность — бан без предупреждения." },
  { num: "02", text: "Запрещены читы, макросы и любые модификации, дающие преимущество." },
  { num: "03", text: "Гриферство и уничтожение чужих построек строго запрещено." },
  { num: "04", text: "Реклама других серверов в чате карается немедленным баном." },
  { num: "05", text: "Не злоупотребляй багами. Найди — сообщи администрации." },
  { num: "06", text: "Следуй указаниям администраторов. Их слово — закон." },
];

export default function Index() {
  const [copied, setCopied] = useState(false);

  const copyIP = () => {
    navigator.clipboard.writeText(SERVER_IP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: "var(--bg-deep)" }}>
      {/* Stars */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {stars.map((s) => (
          <div
            key={s.id}
            className="star"
            style={{
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              opacity: s.opacity,
              "--duration": s.duration,
              "--delay": s.delay,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${HERO_IMG})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            opacity: 0.35,
          }}
        />
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "linear-gradient(to bottom, rgba(14,8,22,0.3) 0%, rgba(14,8,22,0.5) 60%, rgba(14,8,22,1) 100%)",
          }}
        />

        {particles.map((p) => (
          <div
            key={p.id}
            className="particle z-10"
            style={{
              bottom: p.bottom,
              left: p.left,
              width: p.size,
              height: p.size,
              "--duration": p.duration,
              "--delay": p.delay,
            } as React.CSSProperties}
          />
        ))}

        <div className="relative z-20 flex flex-col items-center text-center px-6 gap-6">
          <div className="version-badge animate-fade-in-up">
            <span style={{ color: "rgba(200,160,255,0.8)" }}>⚔</span>
            Minecraft {SERVER_VERSION}
          </div>

          <h1
            className="font-cinzel shimmer-text animate-fade-in-up-delay-1"
            style={{
              fontSize: "clamp(3rem, 10vw, 7rem)",
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "0.08em",
              textShadow: "0 0 60px rgba(180,120,255,0.5)",
            }}
          >
            IMUNNS
          </h1>

          <p
            className="font-rubik animate-fade-in-up-delay-2"
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
              color: "rgba(200,170,240,0.85)",
              fontWeight: 300,
              maxWidth: 520,
              lineHeight: 1.7,
              letterSpacing: "0.02em",
            }}
          >
            Погрузись в магический мир, где каждый блок — часть легенды.
            Строй, сражайся, властвуй.
          </p>

          <button
            onClick={copyIP}
            className="ip-badge animate-fade-in-up-delay-3 glow-pulse flex items-center gap-3 px-8 py-4 mt-2"
          >
            <Icon name="Server" size={18} style={{ color: "var(--purple-soft)" }} />
            <span className="font-cinzel text-lg" style={{ color: "var(--purple-light)", letterSpacing: "0.12em" }}>
              {SERVER_IP}
            </span>
            <div className="w-px h-5 mx-1" style={{ background: "rgba(180,120,255,0.3)" }} />
            <div className="flex items-center gap-1.5" style={{ color: "rgba(180,140,230,0.7)", fontSize: "0.8rem" }}>
              <Icon name={copied ? "Check" : "Copy"} size={14} />
              <span className="font-rubik">{copied ? "Скопировано!" : "Нажми, чтобы скопировать"}</span>
            </div>
          </button>

          <button className="hero-btn animate-fade-in-up-delay-4">
            <Icon name="Zap" size={18} />
            Начать играть
          </button>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-50">
          <div className="w-px h-12" style={{ background: "linear-gradient(to bottom, transparent, rgba(180,120,255,0.6))" }} />
          <Icon name="ChevronDown" size={16} style={{ color: "var(--purple-soft)" }} />
        </div>
      </section>

      {/* ABOUT */}
      <section className="relative z-10 py-24 px-6 max-w-5xl mx-auto">
        <div className="section-divider mb-20 max-w-xl" />

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="font-cinzel text-xs tracking-widest mb-4" style={{ color: "var(--purple-mid)" }}>
              О СЕРВЕРЕ
            </p>
            <h2
              className="font-cinzel mb-6"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 700,
                color: "var(--purple-light)",
                lineHeight: 1.2,
              }}
            >
              Место, где рождаются легенды
            </h2>
            <p className="font-rubik leading-relaxed mb-4" style={{ color: "rgba(200,170,240,0.75)", fontSize: "1rem" }}>
              Imunns — это выживание нового поколения. Уникальная экономика,
              кланы и ивенты каждую неделю. Здесь правила написаны игроками,
              а история сервера — тобой.
            </p>
            <p className="font-rubik leading-relaxed" style={{ color: "rgba(200,170,240,0.75)", fontSize: "1rem" }}>
              Сотни игроков уже строят свои империи. Присоединяйся — твой
              квартал ждёт хозяина.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: "Users", label: "Игроков онлайн", value: "300+" },
              { icon: "Clock", label: "Онлайн", value: "24/7" },
              { icon: "Globe", label: "Версия", value: SERVER_VERSION },
              { icon: "Zap", label: "Пинг", value: "< 20ms" },
            ].map((stat) => (
              <div key={stat.label} className="glass-card p-5 text-center">
                <Icon name={stat.icon as "Users"} size={22} style={{ color: "var(--purple-soft)", margin: "0 auto 8px" }} />
                <div className="font-cinzel text-2xl font-bold mb-1" style={{ color: "var(--purple-light)" }}>
                  {stat.value}
                </div>
                <div className="font-rubik text-xs" style={{ color: "rgba(180,140,220,0.6)" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONNECT */}
      <section className="relative z-10 py-16 px-6 max-w-5xl mx-auto">
        <div className="section-divider mb-20 max-w-xl mx-auto" />
        <div className="text-center mb-12">
          <p className="font-cinzel text-xs tracking-widest mb-3" style={{ color: "var(--purple-mid)" }}>
            ПОДКЛЮЧЕНИЕ
          </p>
          <h2
            className="font-cinzel"
            style={{
              fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
              fontWeight: 700,
              color: "var(--purple-light)",
            }}
          >
            Зайди прямо сейчас
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5 max-w-3xl mx-auto">
          {[
            {
              icon: "Monitor",
              title: "Адрес сервера",
              value: SERVER_IP,
              hint: "Вставь в поле «Адрес сервера»",
              action: "Скопировать",
              onClick: copyIP,
            },
            {
              icon: "Hash",
              title: "Порт",
              value: SERVER_PORT,
              hint: "Стандартный порт Minecraft",
              action: null,
              onClick: undefined,
            },
            {
              icon: "Gamepad2",
              title: "Версия",
              value: SERVER_VERSION,
              hint: "Java Edition",
              action: null,
              onClick: undefined,
            },
          ].map((item) => (
            <div
              key={item.title}
              className="glass-card p-6 flex flex-col gap-3"
              style={{ cursor: item.onClick ? "pointer" : "default" }}
              onClick={item.onClick}
            >
              <Icon name={item.icon as "Monitor"} size={20} style={{ color: "var(--purple-soft)" }} />
              <div>
                <div className="font-rubik text-xs mb-1" style={{ color: "rgba(180,140,220,0.6)" }}>
                  {item.title}
                </div>
                <div className="font-cinzel text-lg font-semibold" style={{ color: "var(--purple-light)" }}>
                  {item.value}
                </div>
              </div>
              <div className="font-rubik text-xs mt-auto" style={{ color: "rgba(160,120,210,0.6)" }}>
                {item.hint}
              </div>
              {item.action && (
                <div
                  className="flex items-center gap-1.5 text-xs font-rubik mt-1"
                  style={{ color: "var(--purple-soft)" }}
                >
                  <Icon name={copied ? "Check" : "Copy"} size={13} />
                  {copied ? "Скопировано!" : item.action}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* MAP */}
      <MapSection />

      {/* RULES */}
      <section className="relative z-10 py-20 px-6 max-w-5xl mx-auto pb-32">
        <div className="section-divider mb-20 max-w-xl mx-auto" />
        <div className="text-center mb-14">
          <p className="font-cinzel text-xs tracking-widest mb-3" style={{ color: "var(--purple-mid)" }}>
            ПРАВИЛА СЕРВЕРА
          </p>
          <h2
            className="font-cinzel"
            style={{
              fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
              fontWeight: 700,
              color: "var(--purple-light)",
            }}
          >
            Кодекс Imunns
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {rules.map((rule) => (
            <div
              key={rule.num}
              className="glass-card rule-item pl-6 pr-6 py-5 flex gap-4 items-start"
            >
              <span
                className="font-cinzel text-3xl font-black shrink-0"
                style={{
                  color: "rgba(155, 108, 212, 0.25)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                {rule.num}
              </span>
              <p
                className="font-rubik leading-relaxed text-sm"
                style={{ color: "rgba(210, 180, 250, 0.8)", paddingTop: "2px" }}
              >
                {rule.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="relative z-10 text-center py-10 px-6"
        style={{
          borderTop: "1px solid rgba(180,120,255,0.1)",
          color: "rgba(160,130,210,0.45)",
        }}
      >
        <p className="font-cinzel text-sm tracking-widest mb-2" style={{ color: "rgba(180,140,230,0.5)" }}>
          IMUNNS
        </p>
        <p className="font-rubik text-xs">
          © 2024 Imunns Minecraft Server · {SERVER_IP}
        </p>
      </footer>
    </div>
  );
}