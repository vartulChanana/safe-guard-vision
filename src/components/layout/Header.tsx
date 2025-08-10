import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="w-full">
      <nav className="flex items-center justify-between py-4">
        <a href="#" className="flex items-center gap-2">
          <span className="inline-block h-8 w-8 rounded-md bg-gradient-to-br from-[hsl(var(--brand))] to-primary/80" aria-hidden="true" />
          <span className="font-semibold tracking-tight">SafeWatch AI</span>
        </a>
        <div className="hidden md:flex items-center gap-6 text-sm">
          <a href="#monitor" className="hover:text-primary transition-colors">Live Monitor</a>
          <a href="#incidents" className="hover:text-primary transition-colors">Incidents</a>
          <a href="#features" className="hover:text-primary transition-colors">Features</a>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" asChild>
            <a href="#incidents">View Demo</a>
          </Button>
          <Button asChild>
            <a href="#monitor">Start Monitoring</a>
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
