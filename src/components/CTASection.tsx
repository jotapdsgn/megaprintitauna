import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

const ADDRESS = "R. Altair Gonçalves Franco, 521 - Aeroporto, Itaúna - MG, 35681-029";
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;

const items = [
  {
    icon: MapPin,
    title: "Endereço",
    info: "R. Altair Gonçalves Franco, 521 - Aeroporto, Itaúna - MG",
    href: MAPS_URL,
    external: true,
  },
  {
    icon: Phone,
    title: "WhatsApp (Pedidos)",
    info: "(37) 99862-3827",
    href: "https://wa.me/5537998623827",
    external: true,
  },
  {
    icon: MessageCircle,
    title: "WhatsApp (Dúvidas)",
    info: "(37) 99918-7628",
    href: "https://wa.me/5537999187628",
    external: true,
  },
  {
    icon: Mail,
    title: "E-mail",
    info: "megaprintitauna@gmail.com",
    href: "mailto:megaprintitauna@gmail.com",
    external: false,
  },
  {
    icon: Clock,
    title: "Horário",
    info: "Seg-Sex: 8h às 19h · Sáb: 8h às 12h",
    href: null,
    external: false,
  },
];

const CTASection = () => {
  return (
    <section id="contato" className="py-24 bg-background">
      <div className="container">
        <div className="gradient-hero rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-[-60px] right-[-60px] w-40 h-40 rounded-full bg-primary/20 animate-float" />
          <div className="absolute bottom-[-40px] left-[-40px] w-28 h-28 rounded-full bg-accent/20 animate-float" style={{ animationDelay: "2s" }} />

          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary-foreground mb-4 relative z-10">
            Pronto para começar?
          </h2>
          <p className="text-secondary-foreground/80 text-lg max-w-lg mx-auto mb-10 relative z-10">
            Venha nos visitar ou entre em contato. Estamos prontos para atender você!
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
            {items.map((item) => {
              const content = (
                <>
                  <item.icon className="w-6 h-6 text-primary mx-auto mb-3" />
                  <div className="text-secondary-foreground font-semibold text-sm">{item.title}</div>
                  <div className="text-secondary-foreground/70 text-sm mt-1 break-words">{item.info}</div>
                </>
              );
              const className =
                "bg-secondary-foreground/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-secondary-foreground/15 transition-all duration-300 block";
              return item.href ? (
                <a
                  key={item.title}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className={className + " hover:-translate-y-1"}
                >
                  {content}
                </a>
              ) : (
                <div key={item.title} className={className}>{content}</div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
