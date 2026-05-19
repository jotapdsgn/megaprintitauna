import { useMemo } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { categories, getCategoryBySlug } from "@/data/categories";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const initial = slug ? getCategoryBySlug(slug) : undefined;
  
  // Optional: keep local state for category switching if we want to change categories without navigating via Router
  // But standard way is just to use the param if we can. Wait, previous implementation had a local category state.
  // We can just redirect on change.
  
  if (slug && !initial) return <Navigate to="/" replace />;

  const selectedCategory = initial ?? categories[0];
  const { addToCart } = useCart();

  const handleCategoryChange = (newSlug: string) => {
    window.location.href = `/categoria/${newSlug}`;
  };

  const Icon = selectedCategory.icon;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-32 pb-20 bg-muted/30">
        <div className="container max-w-5xl">
          <Link to="/#produtos" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Voltar para categorias
          </Link>

          <div className="bg-card rounded-3xl shadow-card overflow-hidden animate-slide-up">
            <div className="gradient-hero p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-[-40px] right-[-40px] w-32 h-32 rounded-full bg-primary/20 animate-float" />
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shrink-0">
                    <Icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <div>
                    <span className="text-primary text-xs font-semibold uppercase tracking-widest">Nossos Produtos</span>
                    <h1 className="font-display text-3xl md:text-4xl font-bold text-secondary-foreground">
                      {selectedCategory.title}
                    </h1>
                  </div>
                </div>
                <div className="w-full md:w-64">
                  <select
                    value={selectedCategory.slug}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {categories.map((c) => (
                      <option key={c.slug} value={c.slug}>{c.title}</option>
                    ))}
                  </select>
                </div>
              </div>
              <p className="text-secondary-foreground/80 mt-4 max-w-xl relative z-10">
                {selectedCategory.desc}. Selecione os produtos e adicione ao seu carrinho.
              </p>
            </div>

            <div className="p-6 md:p-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {selectedCategory.products.map((p) => (
                  <div key={p.name} className="group rounded-2xl border bg-card text-card-foreground shadow-sm overflow-hidden flex flex-col transition-all hover:shadow-md">
                    <div className="aspect-square relative overflow-hidden bg-muted flex items-center justify-center">
                      {p.image ? (
                        <img 
                          src={p.image} 
                          alt={p.name} 
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : p.icon ? (
                        <p.icon className="w-16 h-16 text-primary opacity-50 group-hover:scale-110 group-hover:opacity-100 transition-all duration-500" />
                      ) : null}
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-semibold text-sm mb-4 flex-1">{p.name}</h3>
                      <Button 
                        onClick={() => addToCart({
                          categorySlug: selectedCategory.slug,
                          categoryTitle: selectedCategory.title,
                          productName: p.name,
                          quantity: 1
                        })} 
                        variant="secondary" 
                        className="w-full gap-2 transition-all hover:bg-primary hover:text-primary-foreground"
                      >
                        <Plus className="w-4 h-4" /> Adicionar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
