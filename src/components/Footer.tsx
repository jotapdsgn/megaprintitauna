import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="bg-secondary py-12">
    <div className="container">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="bg-white rounded-lg p-1 inline-flex">
          <img src={logo} alt="Papelaria Megaprint" className="h-9 w-auto block" />
        </div>
        <p className="text-secondary-foreground/60 text-sm">
          © 2026 Megaprint. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
