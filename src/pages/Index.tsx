import Header from "@/components/layout/Header";
import SEO from "@/components/SEO";
import Hero from "@/components/sections/Hero";
import LiveMonitor from "@/components/sections/LiveMonitor";
import Incidents from "@/components/sections/Incidents";

const Index = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SafeWatch AI",
    applicationCategory: "SecurityApplication",
    description: "AI workplace safety monitoring with PPE detection and zone alerts.",
    operatingSystem: "Web",
  };

  return (
    <main className="min-h-screen container mx-auto py-8 space-y-10" onMouseMove={(e) => {
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    }}>
      <SEO
        title="AI Workplace Safety Monitoring | SafeWatch AI"
        description="Real-time PPE detection and zone violation alerts with an analytics dashboard."
        canonical="/"
        image="/opengraph.png"
        jsonLd={jsonLd}
      />
      <Header />
      <Hero />
      <section id="features" className="grid gap-6 md:grid-cols-3">
        <div className="p-6 card-surface">
          <h3 className="font-semibold text-lg">PPE Detection</h3>
          <p className="text-muted-foreground mt-2">Identify missing helmets, gloves, and safety vests instantly.</p>
        </div>
        <div className="p-6 card-surface">
          <h3 className="font-semibold text-lg">Zone Monitoring</h3>
          <p className="text-muted-foreground mt-2">Detect restricted-area violations with line/region tracking.</p>
        </div>
        <div className="p-6 card-surface">
          <h3 className="font-semibold text-lg">Instant Alerts</h3>
          <p className="text-muted-foreground mt-2">Send email, Slack, or WhatsApp alerts the moment incidents occur.</p>
        </div>
      </section>
      <LiveMonitor />
      <Incidents />
    </main>
  );
};

export default Index;
