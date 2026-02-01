import { Shot } from '@/types/scene';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download, FileSpreadsheet } from 'lucide-react';

interface ShotListTableProps {
  shots: Shot[];
}

export const ShotListTable = ({ shots }: ShotListTableProps) => {
  const handleExport = () => {
    const headers = ['Shot #', 'Type', 'Camera Movement', 'Emotional Purpose', 'POV Reference', 'Lighting', 'Duration'];
    const rows = shots.map(shot => [
      shot.number,
      shot.type,
      shot.cameraMovement,
      shot.emotionalPurpose,
      shot.povReference,
      shot.lightingNote,
      shot.duration
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'shot-list.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (shots.length === 0) {
    return (
      <div className="text-center py-8">
        <FileSpreadsheet className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
        <p className="text-sm text-muted-foreground">
          Shot list will be generated after analysis.
        </p>
      </div>
    );
  }

  const getDurationBadge = (duration: string) => {
    const colors = {
      short: 'bg-dusty/20 text-dusty',
      medium: 'bg-accent/20 text-accent',
      long: 'bg-mauve/20 text-mauve'
    };
    return colors[duration as keyof typeof colors] || colors.medium;
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg text-cream flex items-center gap-2">
          <FileSpreadsheet className="w-4 h-4 text-accent" />
          Shot List
        </h3>
        <Button variant="scene" size="sm" onClick={handleExport}>
          <Download className="w-3.5 h-3.5 mr-1.5" />
          Export CSV
        </Button>
      </div>

      <div className="border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30">
              <TableHead className="text-cream/60 font-display">Shot</TableHead>
              <TableHead className="text-cream/60 font-display">Type</TableHead>
              <TableHead className="text-cream/60 font-display">Camera</TableHead>
              <TableHead className="text-cream/60 font-display">Purpose</TableHead>
              <TableHead className="text-cream/60 font-display">Lighting</TableHead>
              <TableHead className="text-cream/60 font-display text-center">Duration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shots.map((shot, index) => (
              <TableRow 
                key={shot.number} 
                className="hover:bg-muted/20 transition-colors"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <TableCell className="font-medium text-cream">{shot.number}</TableCell>
                <TableCell className="text-muted-foreground">{shot.type}</TableCell>
                <TableCell className="text-muted-foreground text-xs max-w-[150px] truncate">
                  {shot.cameraMovement}
                </TableCell>
                <TableCell className="text-muted-foreground text-xs max-w-[180px]">
                  {shot.emotionalPurpose}
                </TableCell>
                <TableCell className="text-muted-foreground text-xs">{shot.lightingNote}</TableCell>
                <TableCell className="text-center">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getDurationBadge(shot.duration)}`}>
                    {shot.duration}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
