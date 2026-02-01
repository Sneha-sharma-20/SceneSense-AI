import { DirectorNotes } from '@/types/scene';
import { Camera, Eye, Lightbulb, Music, Timer, Heart, User, Clapperboard } from 'lucide-react';

interface DirectorNotesOutputProps {
  notes: DirectorNotes | null;
}

export const DirectorNotesOutput = ({ notes }: DirectorNotesOutputProps) => {
  if (!notes) {
    return (
      <div className="h-full flex items-center justify-center text-center p-8">
        <div className="space-y-4 animate-pulse-soft">
          <Clapperboard className="w-12 h-12 text-muted-foreground/30 mx-auto" />
          <p className="text-muted-foreground text-sm">
            Director's Notes will appear here after analysis.
          </p>
        </div>
      </div>
    );
  }

  const Section = ({ icon: Icon, title, children, iconColor = 'text-accent' }: { 
    icon: React.ElementType; 
    title: string; 
    children: React.ReactNode;
    iconColor?: string;
  }) => (
    <div className="space-y-2 pb-4 border-b border-border/50 last:border-0">
      <div className="flex items-center gap-2">
        <Icon className={`w-4 h-4 ${iconColor}`} />
        <h4 className="font-display text-cream">{title}</h4>
      </div>
      <div className="text-sm text-muted-foreground pl-6">
        {children}
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <Section icon={Eye} title="Scene Overview" iconColor="text-dusty">
        <p>{notes.sceneOverview}</p>
        <div className="grid grid-cols-2 gap-4 mt-3">
          <div>
            <span className="text-xs text-cream/60">Primary Emotion</span>
            <p className="text-cream">{notes.primaryEmotion}</p>
          </div>
          <div>
            <span className="text-xs text-cream/60">Intensity</span>
            <p className="text-cream">{notes.emotionalIntensity}</p>
          </div>
          <div>
            <span className="text-xs text-cream/60">Overall Mood</span>
            <p className="text-cream">{notes.overallMood}</p>
          </div>
          <div>
            <span className="text-xs text-cream/60">Scene Intent</span>
            <p className="text-cream">{notes.sceneIntent}</p>
          </div>
        </div>
      </Section>

      <Section icon={User} title="Character Emotional Analysis" iconColor="text-mauve">
        <div className="space-y-2">
          <p><span className="text-cream/60">Focus:</span> {notes.characterAnalysis.name}</p>
          <p><span className="text-cream/60">Internal Emotion:</span> {notes.characterAnalysis.internalEmotion}</p>
          <p><span className="text-cream/60">External Expression:</span> {notes.characterAnalysis.externalExpression}</p>
          <p><span className="text-cream/60">Emotional Arc:</span> {notes.characterAnalysis.emotionalArc}</p>
        </div>
      </Section>

      <Section icon={Camera} title="Camera & Shot Plan" iconColor="text-accent">
        <div className="space-y-3">
          {notes.cameraAndShotPlan.map((shot, index) => (
            <div key={index} className="bg-muted/30 p-3 rounded-md space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-cream font-medium">Shot {shot.number}</span>
                <span className="text-xs px-2 py-0.5 bg-accent/20 text-accent rounded">
                  {shot.type}
                </span>
              </div>
              <p className="text-xs">{shot.cameraMovement}</p>
              <p className="text-xs text-cream/80">Purpose: {shot.emotionalPurpose}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section icon={Lightbulb} title="Visual Style & Technical Direction" iconColor="text-cream">
        <div className="space-y-2">
          <p><span className="text-cream/60">Lighting:</span> {notes.lighting}</p>
          <p><span className="text-cream/60">Color Palette:</span> {notes.colorPalette}</p>
          <p><span className="text-cream/60">Pacing:</span> {notes.pacing}</p>
        </div>
      </Section>

      <Section icon={Music} title="Sound Design" iconColor="text-dusty">
        <p>{notes.soundDesign}</p>
      </Section>

      <Section icon={Timer} title="Emotional Timeline" iconColor="text-mauve">
        <p>{notes.emotionalTimeline}</p>
      </Section>
    </div>
  );
};
