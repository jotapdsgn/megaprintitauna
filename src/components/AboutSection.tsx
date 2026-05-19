import { useEffect, useRef, useState } from "react";
import { Star, Clock, Award, Heart } from "lucide-react";

const stats = [
  { icon: Star, value: "6", label: "Anos de experiência" },
  { icon: Clock, value: "24h", label: "Entrega rápida" },
  { icon: Award, value: "5000+", label: "Clientes satisfeitos" },
  { icon: Heart, value: "100%", label: "Dedicação" },
];

const AboutSection = () => {
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
    <section id="sobre" className="py-24 bg-muted/50" ref={ref}>
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className={`${visible ? "animate-slide-up" : "opacity-0"}`}>
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">
              Sobre Nós
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-6">
              Sua papelaria de{" "}
              <span className="text-primary">confiança</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A Megaprint nasceu da paixão por materiais de qualidade e pelo desejo
              de oferecer uma experiência única aos nossos clientes. Há 6 anos,
              somos referência em papelaria e serviços gráficos em Itaúna.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Trabalhamos com as melhores marcas do mercado e temos uma equipe
              dedicada para ajudar você a encontrar exatamente o que precisa, seja
              para a escola, escritório ou projetos pessoais.
            </p>
            <a
              href="#contato"
              className="gradient-primary text-primary-foreground px-8 py-3.5 rounded-full text-sm font-semibold hover:opacity-90 transition-all duration-300 inline-block hover:scale-105"
            >
              Entre em Contato
            </a>
          </div>

          <div className={`grid grid-cols-2 gap-5 ${visible ? "animate-slide-up-delay-2" : "opacity-0"}`}>
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-card rounded-2xl p-6 shadow-card text-center hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="font-display text-3xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
