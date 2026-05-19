import { Pencil, Pen, BookOpen, Printer, Scissors, Palette, Ruler, Stamp, Paperclip, FileText, PenTool, Highlighter, NotebookPen, Sparkles, Eraser, Brush } from "lucide-react";

const PATTERN_ICONS = [
  Pencil, Pen, BookOpen, Printer, Scissors, Palette, Ruler, Stamp,
  Paperclip, FileText, PenTool, Highlighter, NotebookPen, Sparkles, Eraser, Brush,
];

// Build a scattered grid of icons with varied colors / rotations
const buildPattern = () => {
  const cols = 8;
  const rows = 7;
  const palette = [
    "text-primary",       // pink
    "text-accent",        // yellow
    "text-[hsl(var(--brand-blue))]", // blue
    "text-secondary-foreground/40",
  ];
  const items: { Icon: typeof Pencil; top: string; left: string; size: number; rotate: number; color: string; opacity: number }[] = [];
  let i = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const Icon = PATTERN_ICONS[i % PATTERN_ICONS.length];
      const jitterX = ((i * 37) % 40) - 20;
      const jitterY = ((i * 53) % 40) - 20;
      const top = `${(r / (rows - 1)) * 100}%`;
      const left = `calc(${(c / (cols - 1)) * 100}% + ${jitterX}px)`;
      const size = 28 + ((i * 7) % 18);
      const rotate = ((i * 41) % 60) - 30;
      const color = palette[i % palette.length];
      const opacity = 0.28 + ((i * 13) % 22) / 100;
      items.push({ Icon, top, left, size, rotate, color, opacity });
      i++;
    }
  }
  return items;
};

const pattern = buildPattern();

const HeroSection = () => {
  return (
    <section id="início" className="relative min-h-screen flex items-center overflow-hidden bg-secondary">
      {/* Dark layered background */}
      <div className="absolute inset-0 gradient-hero" />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, hsl(330 85% 52% / 0.25), transparent 45%), radial-gradient(circle at 80% 70%, hsl(205 85% 52% / 0.22), transparent 50%), radial-gradient(circle at 60% 20%, hsl(45 95% 55% / 0.15), transparent 40%)",
        }}
      />

      {/* Stationery icon pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {pattern.map((p, idx) => {
          const Icon = p.Icon;
          return (
            <Icon
              key={idx}
              className={`absolute ${p.color}`}
              style={{
                top: p.top,
                left: p.left,
                width: p.size,
                height: p.size,
                opacity: p.opacity,
                transform: `translate(-50%, -50%) rotate(${p.rotate}deg)`,
                strokeWidth: 1.5,
              }}
            />
          );
        })}
        {/* Vignette + readability gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/85 via-secondary/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-transparent to-secondary/20" />
      </div>

      {/* Content */}
      <div className="container relative z-10 py-32">
        <div className="max-w-2xl">
          <div className="animate-slide-up">
            <span className="inline-block gradient-primary text-primary-foreground text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 shadow-lg">
              Papelaria & Impressão em Itaúna
            </span>
          </div>

          <h1 className="animate-slide-up-delay-1 text-5xl md:text-7xl font-display font-bold text-secondary-foreground leading-tight mb-6">
            Sua papelaria{" "}
            <span className="text-primary">completa</span>
          </h1>

          <p className="animate-slide-up-delay-2 text-lg text-secondary-foreground/85 mb-10 max-w-lg leading-relaxed">
            Tudo o que você precisa para escola, escritório e projetos criativos:
            cadernos, canetas, impressões, cópias e muito mais — com qualidade e preço justo.
          </p>

          <div className="animate-slide-up-delay-3 flex flex-wrap gap-4">
            <a
              href="#produtos"
              className="gradient-primary text-primary-foreground px-8 py-3.5 rounded-full text-sm font-semibold hover:opacity-90 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Ver Produtos
            </a>
            <a
              href="#sobre"
              className="border-2 border-secondary-foreground/30 text-secondary-foreground px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-secondary-foreground/10 transition-all duration-300"
            >
              Conheça a Megaprint
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float z-10">
        <div className="w-6 h-10 rounded-full border-2 border-secondary-foreground/40 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-3 bg-secondary-foreground/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
