import { 
  Pencil, Printer, BookOpen, Backpack, Scissors, Package, Palette, Sparkles, Globe,
  PenTool, Briefcase, Contact, FileImage, Presentation, Utensils, Mail,
  Monitor, LayoutTemplate, ShoppingCart, Code,
  type LucideIcon 
} from "lucide-react";
import canetaEsferograficaImg from "@/assets/canetaesferiografica.png";
import canetaGelImg from "@/assets/canetagel.png";
import lapisGrafiteImg from "@/assets/lapisgrafite.jpg";
import lapiseiraImg from "@/assets/lapiseira.jpg";
import marcadorPermanenteImg from "@/assets/marcadorpermanente.png";
import marcaTextoImg from "@/assets/marcatexto.png";
import borrachaImg from "@/assets/borracha.png";
import apontadorImg from "@/assets/apontador.png";
import impressaoA3Img from "@/assets/impressaoa3.png";
import impressaoColoridaImg from "@/assets/impressaocolorida.png";
import impressaoPebImg from "@/assets/impressaopeb.png";
import copiaXeroxImg from "@/assets/copiaxerox.png";
import encadernamentoImg from "@/assets/encadernamento.png";
import digitalizacaoImg from "@/assets/digitalizacao.png";
import postitImg from "@/assets/postit.png";
import cadernoBrochuraImg from "@/assets/cadernobrochura.png";
import agendaImg from "@/assets/agenda.png";
import blocoDeNotasImg from "@/assets/blocodenotas.png";
import cadernosImg from "@/assets/cadernos.png";
import cadernoDeDesenhoImg from "@/assets/cadernodedesenho.png";
import mochilasImg from "@/assets/mochilas.png";
import ficharioImg from "@/assets/fichario.png";
import papelDecoradoImg from "@/assets/papeldecorado.png";
import tesouraImg from "@/assets/tesoura.png";
import colaBrancaImg from "@/assets/colabranca.png";
import colaQuenteImg from "@/assets/colaquente.png";
import evaImg from "@/assets/eva.png";
import fitasImg from "@/assets/fitas.png";
import celofaneImg from "@/assets/celofane.png";
import caixasImg from "@/assets/caixas.png";
import fitaImg from "@/assets/fita.png";
import gizDeCeraImg from "@/assets/gizdecera.png";
import lapisDeCorImg from "@/assets/lapisdecor.png";
import tintaImg from "@/assets/tinta.png";

export type Product = {
  name: string;
  image?: string;
  icon?: LucideIcon;
};

export type Category = {
  slug: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  products: Product[];
};

export const categories: Category[] = [
  {
    slug: "escrita",
    icon: Pencil,
    title: "Escrita",
    desc: "Canetas, lápis, marcadores e muito mais",
    products: [
      { name: "Caneta esferográfica", image: canetaEsferograficaImg },
      { name: "Caneta gel", image: canetaGelImg },
      { name: "Lápis grafite", image: lapisGrafiteImg },
      { name: "Lapiseira", image: lapiseiraImg },
      { name: "Marcador permanente", image: marcadorPermanenteImg },
      { name: "Marca-texto", image: marcaTextoImg },
      { name: "Borracha", image: borrachaImg },
      { name: "Apontador", image: apontadorImg }
    ],
  },
  {
    slug: "impressao",
    icon: Printer,
    title: "Impressão",
    desc: "Cópias, impressões coloridas e encadernação",
    products: [
      { name: "Impressão preto e branco", image: impressaoPebImg },
      { name: "Impressão colorida", image: impressaoColoridaImg },
      { name: "Cópia xerox", image: copiaXeroxImg },
      { name: "Impressão A3", image: impressaoA3Img },
      { name: "Encadernação", image: encadernamentoImg },
      { name: "Digitalização", image: digitalizacaoImg }
    ],
  },
  {
    slug: "cadernos",
    icon: BookOpen,
    title: "Cadernos",
    desc: "Cadernos, agendas e fichários",
    products: [
      { name: "Cadernos em geral", image: cadernosImg },
      { name: "Caderno brochura", image: cadernoBrochuraImg },
      { name: "Agenda", image: agendaImg },
      { name: "Fichário", image: ficharioImg },
      { name: "Caderno de desenho", image: cadernoDeDesenhoImg },
      { name: "Bloco de notas", image: blocoDeNotasImg },
      { name: "Post-it", image: postitImg }
    ],
  },
  {
    slug: "mochilas",
    icon: Backpack,
    title: "Mochilas",
    desc: "Mochilas escolares e para o dia a dia",
    products: [
      { name: "Mochila", image: mochilasImg },
    ],
  },
  {
    slug: "artesanato",
    icon: Scissors,
    title: "Artesanato",
    desc: "Papéis decorados, tesouras e colas",
    products: [
      { name: "Papel decorado", image: papelDecoradoImg },
      { name: "Tesoura", image: tesouraImg },
      { name: "Cola branca", image: colaBrancaImg },
      { name: "Cola quente", image: colaQuenteImg },
      { name: "EVA", image: evaImg },
      { name: "Fitas decorativas", image: fitasImg }
    ],
  },
  {
    slug: "embalagens",
    icon: Package,
    title: "Embalagens",
    desc: "Caixas, sacolas e papel presente",
    products: [
      { name: "Caixa de presente", image: caixasImg },
      { name: "Papel presente", image: papelDecoradoImg },
      { name: "Fita adesiva", image: fitaImg },
      { name: "Saco celofane", image: celofaneImg }
    ],
  },
  {
    slug: "arte",
    icon: Palette,
    title: "Arte",
    desc: "Tintas, pincéis e telas para pintura",
    products: [
      { name: "Tinta", image: tintaImg },
      { name: "Lápis de cor", image: lapisDeCorImg },
      { name: "Giz de cera", image: gizDeCeraImg }
    ],
  },
  {
    slug: "design-grafico",
    icon: Sparkles,
    title: "Design Gráfico",
    desc: "Criação de logos, identidade visual e artes personalizadas",
    products: [
      { name: "Criação de logo", icon: PenTool },
      { name: "Identidade visual", icon: Briefcase },
      { name: "Cartão de visita", icon: Contact },
      { name: "Flyer / Panfleto", icon: FileImage },
      { name: "Banner", icon: Presentation },
      { name: "Cardápio", icon: Utensils },
      { name: "Convite digital", icon: Mail }
    ],
  },
  {
    slug: "criacao-de-sites",
    icon: Globe,
    title: "Criação de Sites",
    desc: "Sites institucionais, landing pages e lojas virtuais",
    products: [
      { name: "Site institucional", icon: Monitor },
      { name: "Landing page", icon: LayoutTemplate },
      { name: "Loja virtual", icon: ShoppingCart },
      { name: "Portfólio online", icon: Briefcase },
      { name: "Site para restaurante", icon: Utensils },
      { name: "Manutenção de site", icon: Code }
    ],
  },
];

export const getCategoryBySlug = (slug: string) => categories.find((c) => c.slug === slug);

export const WHATSAPP_NUMBER = "5537998623827";