import { StoryboardFrame as FrameType } from '@/types/scene';
import { Frame, Info, Loader2, ImageIcon } from 'lucide-react';

interface StoryboardFrameProps {
  frame: FrameType;
  index: number;
}

export const StoryboardFrame = ({ frame, index }: StoryboardFrameProps) => {
  return (
    <div 
      className="group scene-panel rounded-lg overflow-hidden animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Frame Visual Area */}
      <div className="aspect-video bg-gradient-to-br from-muted/50 to-background relative overflow-hidden">
        {/* Generated Image */}
        {frame.imageUrl ? (
          <img 
            src={frame.imageUrl} 
            alt={frame.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <>
            {/* Frame composition hints (rule of thirds grid) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <div className="w-full h-full grid grid-cols-3 grid-rows-3">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="border border-cream/10" />
                ))}
              </div>
            </div>

            {/* Placeholder or Loading State */}
            <div className="absolute inset-0 flex items-center justify-center">
              {frame.isGenerating ? (
                <div className="text-center space-y-3">
                  <Loader2 className="w-8 h-8 text-accent animate-spin mx-auto" />
                  <p className="text-xs text-muted-foreground">Generating frame...</p>
                </div>
              ) : (
                <div className="text-center space-y-2 p-4">
                  <ImageIcon className="w-8 h-8 text-muted-foreground/50 mx-auto" />
                  <p className="text-xs text-dusty font-medium">{frame.cameraBehavior}</p>
                  <p className="text-sm text-cream/80">{frame.subjectFraming}</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Cinematic frame border overlay */}
        <div className="absolute inset-2 border border-border/50 rounded-sm pointer-events-none" />
        
        {/* Shot number badge */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs">
          <Frame className="w-3 h-3 text-accent" />
          <span className="text-cream font-medium">Shot {frame.shotNumber}</span>
        </div>

        {/* Atmospheric overlay */}
        <div 
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, transparent 40%, hsl(var(--background)) 100%)`
          }}
        />
      </div>

      {/* Frame Details */}
      <div className="p-4 space-y-3">
        <div>
          <h4 className="font-display text-cream text-sm">{frame.title}</h4>
          <p className="text-xs text-muted-foreground mt-1">{frame.emotionalPurpose}</p>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-cream/50">Lighting</span>
            <p className="text-muted-foreground">{frame.lightingMood}</p>
          </div>
          <div>
            <span className="text-cream/50">Color Tone</span>
            <p className="text-muted-foreground">{frame.colorTone}</p>
          </div>
        </div>

        {/* Justification overlay on hover */}
        <div className="pt-2 border-t border-border/50">
          <div className="flex items-start gap-2">
            <Info className="w-3 h-3 text-mauve mt-0.5 flex-shrink-0" />
            <p className="text-xs text-muted-foreground italic leading-relaxed">
              "{frame.justification}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
