import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const demoIncidents = [
  { id: "1", type: "Missing Helmet", severity: "High", time: "09:12", zone: "Line A" },
  { id: "2", type: "Zone Violation", severity: "Medium", time: "09:25", zone: "Loading Dock" },
  { id: "3", type: "Missing Vest", severity: "Low", time: "10:03", zone: "Line B" },
  { id: "4", type: "Missing Helmet", severity: "High", time: "10:14", zone: "Yard" },
];

const chartData = [
  { name: "Helmet", count: 12 },
  { name: "Vest", count: 7 },
  { name: "Zone", count: 9 },
];

const Incidents = () => {
  return (
    <section id="incidents" className="grid gap-6 md:grid-cols-5">
      <Card className="md:col-span-3 card-surface">
        <CardHeader>
          <CardTitle>Incidents by Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="currentColor" tickLine={false} axisLine={false} />
                <YAxis stroke="currentColor" tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip cursor={{ fill: "hsl(var(--muted) / 0.4)" }} />
                <Bar dataKey="count" fill="hsl(var(--brand))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 card-surface">
        <CardHeader>
          <CardTitle>Latest Incidents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Zone</TableHead>
                  <TableHead>Severity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {demoIncidents.map((i) => (
                  <TableRow key={i.id}>
                    <TableCell>{i.time}</TableCell>
                    <TableCell>{i.type}</TableCell>
                    <TableCell>{i.zone}</TableCell>
                    <TableCell>{i.severity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Incidents;
