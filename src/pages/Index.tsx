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

const MAP_URL = "http://185.9.145.175:26721/";

function MapSection() {
  const [loaded, setLoaded] = useState(false);

  return (
    <section className="relative z-10 py-20 px-6 max-w-6xl mx-auto">
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
          Живая карта сервера — исследуй мир прямо здесь
        </p>
      </div>

      <div
        className="relative mx-auto"
        style={{
          borderRadius: 16,
          overflow: "hidden",
          border: "1px solid rgba(180,120,255,0.3)",
          boxShadow: "0 0 80px rgba(140,80,220,0.25), 0 0 0 1px rgba(180,120,255,0.1)",
        }}
      >
        {/* Corner decorations */}
        {[
          { top: 0, left: 0, borderTop: "2px solid rgba(180,120,255,0.6)", borderLeft: "2px solid rgba(180,120,255,0.6)" },
          { top: 0, right: 0, borderTop: "2px solid rgba(180,120,255,0.6)", borderRight: "2px solid rgba(180,120,255,0.6)" },
          { bottom: 0, left: 0, borderBottom: "2px solid rgba(180,120,255,0.6)", borderLeft: "2px solid rgba(180,120,255,0.6)" },
          { bottom: 0, right: 0, borderBottom: "2px solid rgba(180,120,255,0.6)", borderRight: "2px solid rgba(180,120,255,0.6)" },
        ].map((s, i) => (
          <div key={i} className="absolute w-5 h-5 z-10 pointer-events-none" style={s} />
        ))}

        {/* Scan line */}
        <div
          className="absolute left-0 right-0 z-10 pointer-events-none"
          style={{
            height: "2px",
            background: "linear-gradient(90deg, transparent, rgba(180,120,255,0.5), transparent)",
            animation: "map-scan 8s linear infinite",
            top: 0,
          }}
        />

        {/* Loading placeholder */}
        {!loaded && (
          <div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4"
            style={{ background: "rgba(10,6,20,0.95)" }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                border: "2px solid rgba(180,120,255,0.2)",
                borderTop: "2px solid rgba(180,120,255,0.8)",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            />
            <p className="font-rubik text-sm" style={{ color: "rgba(180,140,220,0.6)" }}>
              Загрузка карты…
            </p>
          </div>
        )}

        <iframe
          src={MAP_URL}
          title="Карта сервера Imunns"
          onLoad={() => setLoaded(true)}
          style={{
            width: "100%",
            height: "600px",
            border: "none",
            display: "block",
            background: "#0a0614",
          }}
          allowFullScreen
        />

        {/* Bottom bar */}
        <div
          className="flex items-center justify-between px-4 py-2.5"
          style={{
            background: "rgba(10,6,20,0.9)",
            borderTop: "1px solid rgba(180,120,255,0.15)",
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{
                background: loaded ? "#7aefa0" : "rgba(180,120,255,0.5)",
                boxShadow: loaded ? "0 0 6px #7aefa0" : "none",
                animation: loaded ? "glow-pulse 2s ease-in-out infinite" : "none",
              }}
            />
            <span className="font-rubik text-xs" style={{ color: "rgba(180,140,220,0.6)" }}>
              {loaded ? "Карта загружена" : "Подключение…"}
            </span>
          </div>
          <a
            href={MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-rubik text-xs"
            style={{ color: "rgba(180,120,255,0.7)", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "rgba(200,160,255,1)")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(180,120,255,0.7)")}
          >
            <Icon name="ExternalLink" size={12} />
            Открыть на весь экран
          </a>
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