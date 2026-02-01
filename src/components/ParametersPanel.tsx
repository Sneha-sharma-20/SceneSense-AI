import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sliders, Sparkles, Palette, Drama, User } from 'lucide-react';
import { CreativeParameters } from '@/types/scene';

interface ParametersPanelProps {
  parameters: CreativeParameters;
  onChange: (parameters: CreativeParameters) => void;
}

const scenarios = ['None', 'Confrontation', 'Revelation', 'Departure', 'Reunion', 'Discovery', 'Loss', 'Triumph'];
const tones = ['None', 'Dramatic', 'Suspenseful', 'Melancholic', 'Hopeful', 'Tense', 'Intimate', 'Epic'];
const moods = ['None', 'Dark', 'Warm', 'Cold', 'Nostalgic', 'Ominous', 'Serene', 'Chaotic'];
const genres = ['None', 'Drama', 'Thriller', 'Romance', 'Horror', 'Sci-Fi', 'Comedy', 'Action'];

export const ParametersPanel = ({ parameters, onChange }: ParametersPanelProps) => {
  const updateParameter = (key: keyof CreativeParameters, value: string) => {
    onChange({ ...parameters, [key]: value });
  };

  const ParameterSelect = ({ 
    icon: Icon, 
    label, 
    value, 
    options, 
    paramKey 
  }: { 
    icon: React.ElementType; 
    label: string; 
    value: string; 
    options: string[]; 
    paramKey: keyof CreativeParameters;
  }) => (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Icon className="w-3.5 h-3.5 text-dusty" />
        <Label className="text-sm text-muted-foreground">{label}</Label>
      </div>
      <Select value={value} onValueChange={(v) => updateParameter(paramKey, v)}>
        <SelectTrigger className="bg-card border-border hover:border-accent/30 transition-colors">
          <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent className="bg-popover border-border">
          {options.map((option) => (
            <SelectItem 
              key={option} 
              value={option}
              className="hover:bg-accent/10 focus:bg-accent/10"
            >
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 pb-2 border-b border-border">
        <Sliders className="w-4 h-4 text-accent" />
        <h3 className="font-display text-lg text-cream">Creative Parameters</h3>
      </div>
      
      <p className="text-xs text-muted-foreground">
        Optional filters to reinterpret the scene through specific creative lenses.
      </p>

      <div className="space-y-4">
        <ParameterSelect
          icon={Sparkles}
          label="Scenario"
          value={parameters.scenario}
          options={scenarios}
          paramKey="scenario"
        />
        
        <ParameterSelect
          icon={Drama}
          label="Tone"
          value={parameters.tone}
          options={tones}
          paramKey="tone"
        />
        
        <ParameterSelect
          icon={Palette}
          label="Mood"
          value={parameters.mood}
          options={moods}
          paramKey="mood"
        />
        
        <ParameterSelect
          icon={Drama}
          label="Genre"
          value={parameters.genre}
          options={genres}
          paramKey="genre"
        />
      </div>

      <div className="pt-4 border-t border-border space-y-2">
        <div className="flex items-center gap-2">
          <User className="w-3.5 h-3.5 text-mauve" />
          <Label className="text-sm text-muted-foreground">Character POV</Label>
        </div>
        <p className="text-xs text-muted-foreground mb-2">
          Shift all analysis to this character's perspective.
        </p>
        <input
          type="text"
          value={parameters.characterPOV}
          onChange={(e) => updateParameter('characterPOV', e.target.value)}
          placeholder="Enter character name..."
          className="w-full px-3 py-2 bg-card border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent/50 transition-colors"
        />
      </div>
    </div>
  );
};
