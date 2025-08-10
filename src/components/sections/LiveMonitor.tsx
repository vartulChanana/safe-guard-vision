import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface Box {
  id: string;
  x: number; // 0..1
  y: number; // 0..1
  w: number; // 0..1
  h: number; // 0..1
  type: "missing_helmet" | "missing_vest" | "zone_violation";
}

const randomBox = (): Box => {
  const types: Box["type"][] = ["missing_helmet", "missing_vest", "zone_violation"];
  return {
    id: crypto.randomUUID(),
    x: Math.random() * 0.7,
    y: Math.random() * 0.6,
    w: 0.2 + Math.random() * 0.15,
    h: 0.25 + Math.random() * 0.15,
    type: types[Math.floor(Math.random() * types.length)],
  };
};

const typeLabel: Record<Box["type"], string> = {
  missing_helmet: "Missing Helmet",
  missing_vest: "Missing Vest",
  zone_violation: "Zone Violation",
};

const typeColor: Record<Box["type"], string> = {
  missing_helmet: "border-destructive",
  missing_vest: "border-[hsl(var(--brand))]",
  zone_violation: "border-primary",
};

const LiveMonitor = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [ready, setReady] = useState(false);
  const [simulate, setSimulate] = useState(true);
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [alerts, setAlerts] = useState({ email: true, slack: true, whatsapp: false });

  useEffect(() => {
    const start = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setReady(true);
        }
      } catch (e) {
        console.warn("Camera unavailable, falling back to demo mode.");
        setReady(false);
      }
    };
    start();
    return () => {
      const s = videoRef.current?.srcObject as MediaStream | undefined;
      s?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  useEffect(() => {
    if (!simulate) return;
    const id = setInterval(() => {
      const box = randomBox();
      setBoxes((prev) => [box, ...prev].slice(0, 5));
      toast(
        `${typeLabel[box.type]} detected`,
        {
          description: `Alert sent via ${[alerts.email && "Email", alerts.slack && "Slack", alerts.whatsapp && "WhatsApp"].filter(Boolean).join(", ") || "no channel"}`,
        }
      );
    }, 3500);
    return () => clearInterval(id);
  }, [simulate, alerts]);

  return (
    <section id="monitor" className="grid gap-6 md:grid-cols-5">
      <Card className="md:col-span-3 card-surface">
        <CardHeader>
          <CardTitle>Live Camera</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
            {ready ? (
              <video ref={videoRef} className="h-full w-full object-cover" muted />
            ) : (
              <div className="h-full w-full grid place-items-center text-muted-foreground">
                Connect a camera to view live feed. Demo overlays shown.
              </div>
            )}
            {/* Overlays */}
            <div className="pointer-events-none absolute inset-0">
              {boxes.map((b) => (
                <div
                  key={b.id}
                  className={`absolute rounded-md border-2 ${typeColor[b.type]} bg-background/10 backdrop-blur-[1px]`}
                  style={{
                    left: `${b.x * 100}%`,
                    top: `${b.y * 100}%`,
                    width: `${b.w * 100}%`,
                    height: `${b.h * 100}%`,
                  }}
                >
                  <span className="absolute -top-6 left-0 bg-background/90 text-xs px-2 py-1 rounded-md border">
                    {typeLabel[b.type]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 card-surface">
        <CardHeader>
          <CardTitle>Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Simulate detections</div>
              <div className="text-sm text-muted-foreground">Add demo incidents on a timer</div>
            </div>
            <Switch checked={simulate} onCheckedChange={setSimulate} />
          </div>

          <div className="space-y-3">
            <div className="font-medium">Alert channels</div>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Checkbox id="email" checked={alerts.email} onCheckedChange={(v) => setAlerts((a) => ({ ...a, email: Boolean(v) }))} />
                <Label htmlFor="email">Email</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="slack" checked={alerts.slack} onCheckedChange={(v) => setAlerts((a) => ({ ...a, slack: Boolean(v) }))} />
                <Label htmlFor="slack">Slack</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="whatsapp" checked={alerts.whatsapp} onCheckedChange={(v) => setAlerts((a) => ({ ...a, whatsapp: Boolean(v) }))} />
                <Label htmlFor="whatsapp">WhatsApp</Label>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            This is a front-end demo. Connect Supabase and a detection API to send real alerts and store incidents.
          </p>
        </CardContent>
      </Card>
    </section>
  );
};

export default LiveMonitor;
