import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Film } from 'lucide-react';

interface ScriptInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const ScriptInput = ({ value, onChange }: ScriptInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Film className="w-4 h-4 text-accent" />
        <Label className="font-display text-lg text-cream">Script Input</Label>
      </div>
      <p className="text-sm text-muted-foreground">
        Paste your movie script or scene text below for cinematic analysis.
      </p>
      <div 
        className={`relative transition-all duration-300 ${
          isFocused ? 'border-glow' : ''
        }`}
      >
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="INT. LIVING ROOM - NIGHT

A dimly lit room. SARAH (30s) sits alone on a worn couch, staring at a photograph. The silence is heavy.

SARAH
(whispering)
I thought we had more time...

She sets the photo face-down on the coffee table. Her hand trembles slightly."
          className="min-h-[300px] bg-card border-border text-foreground placeholder:text-muted-foreground/50 font-mono text-sm resize-none focus:border-accent/50 transition-colors"
        />
        <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
          {value.length} characters
        </div>
      </div>
    </div>
  );
};
