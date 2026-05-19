import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";

const CategoriesSection = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="produtos" className="py-24 bg-background" ref={ref}>
      <div className="container">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            Nossos Produtos
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3">
            Categorias em Destaque
          </h2>
          <p className="text-muted-foreground mt-4 max-w-md mx-auto">
            Escolha uma categoria e faça seu pedido em poucos cliques.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <Link
              key={cat.title}
              to={`/categoria/${cat.slug}`}
              className={`relative group bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-500 cursor-pointer hover:-translate-y-2 block ${
                visible ? "animate-slide-up" : "opacity-0"
              } ${cat.featured ? "border-2 border-primary/40 ring-4 ring-primary/5 shadow-lg shadow-primary/5" : ""}`}
              style={{ animationDelay: `${i * 0.1}s`, animationFillMode: "forwards" }}
            >
              {cat.badge && (
                <span className="absolute top-4 right-4 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm animate-pulse z-10">
                  {cat.badge}
                </span>
              )}
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <cat.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                {cat.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {cat.desc}
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                Faça seu pedido <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
