import heroImage from "@/assets/hero-safety.jpg";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section aria-label="AI Workplace Safety" className="relative overflow-hidden rounded-xl border card-surface">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Factory floor with workers wearing PPE and CCTV viewpoint"
          className="h-full w-full object-cover opacity-80"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
      </div>
      <div className="relative z-10 p-8 md:p-12 lg:p-16">
        <div className="max-w-3xl text-left">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Real-time AI Workplace Safety Monitoring
          </h1>
          <p className="mt-4 text-muted-foreground text-lg md:text-xl">
            Detect missing helmets, gloves, and vests. Track zone violations. Trigger instant alerts. All in one beautiful dashboard.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <a href="#monitor">Start Live Monitor</a>
            </Button>
            <Button variant="secondary" asChild>
              <a href="#incidents">View Demo Incidents</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
