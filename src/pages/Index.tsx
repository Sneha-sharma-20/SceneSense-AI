import { useState, useCallback } from 'react';
import { CreativeParameters, AnalysisResult, DirectorNotes, Shot, StoryboardFrame as FrameType } from '@/types/scene';
import { ScriptInput } from '@/components/ScriptInput';
import { ParametersPanel } from '@/components/ParametersPanel';
import { DirectorNotesOutput } from '@/components/DirectorNotesOutput';
import { StoryboardFrame } from '@/components/StoryboardFrame';
import { ShotListTable } from '@/components/ShotListTable';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clapperboard, Sparkles, Film, LayoutGrid, List, Loader2 } from 'lucide-react';
import { useStoryboardImages } from '@/hooks/useStoryboardImages';

const Index = () => {
  const [script, setScript] = useState('');
  const [parameters, setParameters] = useState<CreativeParameters>({
    scenario: 'None',
    tone: 'None',
    mood: 'None',
    genre: 'None',
    characterPOV: '',
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [imagesGenerated, setImagesGenerated] = useState(false);
  const { generateImages, isGenerating } = useStoryboardImages();

  const handleFrameUpdate = useCallback((index: number, update: Partial<FrameType>) => {
    setResult(prev => {
      if (!prev) return prev;
      const newFrames = [...prev.storyboardFrames];
      newFrames[index] = { ...newFrames[index], ...update };
      return { ...prev, storyboardFrames: newFrames };
    });
  }, []);

  const handleTabChange = useCallback((value: string) => {
    if (value === 'storyboard' && result && !imagesGenerated && !isGenerating) {
      setImagesGenerated(true);
      generateImages(result.storyboardFrames, handleFrameUpdate);
    }
  }, [result, imagesGenerated, isGenerating, generateImages, handleFrameUpdate]);

  const handleAnalyze = async () => {
    if (!script.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis with mock data
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockResult: AnalysisResult = {
      directorNotes: {
        sceneOverview: 'An intimate domestic scene exploring grief and the weight of unspoken loss. The confined space amplifies emotional claustrophobia.',
        primaryEmotion: 'Grief',
        emotionalIntensity: 'High - Restrained but palpable',
        overallMood: 'Somber, intimate, heavy with unspoken weight',
        sceneIntent: 'To externalize internal devastation through physical stillness and environmental isolation',
        characterAnalysis: {
          name: parameters.characterPOV || 'Sarah',
          internalEmotion: 'Overwhelming loss masked by numbness',
          externalExpression: 'Controlled stillness, minimal movement, averted gaze',
          emotionalArc: 'From frozen shock to reluctant acceptance of reality',
        },
        cameraAndShotPlan: [
          {
            number: 1,
            type: 'Wide Establishing',
            cameraMovement: 'Static, locked-off',
            emotionalPurpose: 'Establish isolation within familiar space',
            povReference: 'Neutral observation',
            lightingNote: 'Low-key, practical sources only',
            duration: 'long',
          },
          {
            number: 2,
            type: 'Medium Close-Up',
            cameraMovement: 'Slow push-in',
            emotionalPurpose: 'Draw viewer into character\'s internal state',
            povReference: 'Approaching intimacy',
            lightingNote: 'Side-lit, half-shadow',
            duration: 'medium',
          },
          {
            number: 3,
            type: 'Insert Close-Up',
            cameraMovement: 'Static',
            emotionalPurpose: 'Photograph as symbol of loss',
            povReference: 'Character focus point',
            lightingNote: 'Soft pool of light',
            duration: 'short',
          },
        ],
        lighting: 'Low-key naturalistic. Single practical lamp source creating pools of warm light against deep shadows. Motivated moonlight through window.',
        colorPalette: 'Desaturated warm tones. Amber practicals against cool blue shadows. Muted earth tones in production design.',
        pacing: 'Deliberate and patient. Extended beats between actions. Silence as punctuation.',
        soundDesign: 'Near silence with subtle room tone. Distant ambient sounds emphasize isolation. No score initially - let the weight breathe.',
        emotionalTimeline: 'Opening stillness builds tension. Dialogue breaks silence with vulnerability. Physical action of placing photo down provides cathartic release through restraint.',
      },
      storyboardFrames: [
        {
          shotNumber: 1,
          title: 'Establishing - The Empty Room',
          emotionalPurpose: 'Create spatial and emotional context for isolation',
          povInfluence: 'Objective witness to private moment',
          cameraBehavior: 'Locked-off wide shot',
          subjectFraming: 'Subject small in frame, environment dominant',
          spatialComposition: 'Negative space emphasizes loneliness',
          lightingMood: 'Single practical source, deep shadows',
          colorTone: 'Warm amber against cool darkness',
          atmosphericTexture: 'Dust particles in light beam',
          justification: 'The wide establisher forces the audience to find the character within the space, mimicking the search for meaning in grief.',
        },
        {
          shotNumber: 2,
          title: 'Approach - Reading the Face',
          emotionalPurpose: 'Transition from observation to emotional engagement',
          povInfluence: 'Crossing into intimate space',
          cameraBehavior: 'Gentle push-in over 8 seconds',
          subjectFraming: 'Face filling frame as camera moves',
          spatialComposition: 'Background gradually eliminated',
          lightingMood: 'Half-lit face, one eye in shadow',
          colorTone: 'Skin tones warm, shadows cold',
          atmosphericTexture: 'Subtle catch-light in eyes',
          justification: 'The slow approach mirrors our reluctance to intrude on private grief while the half-shadow face represents the character split between presence and memory.',
        },
        {
          shotNumber: 3,
          title: 'The Photograph',
          emotionalPurpose: 'Symbol of loss given visual weight',
          povInfluence: 'Through character\'s eyes',
          cameraBehavior: 'Static insert',
          subjectFraming: 'Photograph fills frame',
          spatialComposition: 'Shallow depth of field isolates subject',
          lightingMood: 'Soft directional light',
          colorTone: 'Warmer than scene - memory glow',
          atmosphericTexture: 'Slight lens flare suggests emotion',
          justification: 'The insert shot gives the photograph totemic power. Brief duration prevents sentimentality while allowing emotional recognition.',
        },
      ],
      shotList: [
        {
          number: 1,
          type: 'Wide Establishing',
          cameraMovement: 'Static, locked-off',
          emotionalPurpose: 'Establish isolation within familiar space',
          povReference: 'Neutral observation',
          lightingNote: 'Low-key, practical sources only',
          duration: 'long',
        },
        {
          number: 2,
          type: 'Medium Close-Up',
          cameraMovement: 'Slow push-in',
          emotionalPurpose: 'Draw viewer into character\'s internal state',
          povReference: 'Approaching intimacy',
          lightingNote: 'Side-lit, half-shadow',
          duration: 'medium',
        },
        {
          number: 3,
          type: 'Insert Close-Up',
          cameraMovement: 'Static',
          emotionalPurpose: 'Photograph as symbol of loss',
          povReference: 'Character focus point',
          lightingNote: 'Soft pool of light',
          duration: 'short',
        },
      ],
    };
    
    setResult(mockResult);
    setIsAnalyzing(false);
    setImagesGenerated(false); // Reset so new analysis can generate new images
  };

  return (
    <div className="min-h-screen bg-background film-grain">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg border border-accent/20">
                <Film className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h1 className="font-display text-xl text-cream tracking-tight">SceneSense</h1>
                <p className="text-xs text-muted-foreground">Cinematic Analysis & Pre-Production</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="px-2 py-1 bg-muted/30 rounded border border-border">Director's Suite</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-[1fr,320px] gap-8">
          {/* Main Panel */}
          <div className="space-y-8">
            {/* Script Input */}
            <section className="scene-panel rounded-lg p-6">
              <ScriptInput value={script} onChange={setScript} />
              
              <div className="mt-6 flex items-center gap-4">
                <Button 
                  variant="analyze" 
                  size="xl"
                  onClick={handleAnalyze}
                  disabled={!script.trim() || isAnalyzing}
                  className="flex-1 max-w-xs"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analyzing Scene...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Analyze Scene
                    </>
                  )}
                </Button>
                <p className="text-xs text-muted-foreground">
                  Generate director's notes and storyboard
                </p>
              </div>
            </section>

            {/* Results Section */}
            {(result || isAnalyzing) && (
              <section className="space-y-6">
                <Tabs defaultValue="notes" className="w-full" onValueChange={handleTabChange}>
                  <TabsList className="bg-muted/30 border border-border">
                    <TabsTrigger value="notes" className="data-[state=active]:bg-accent/20 data-[state=active]:text-cream">
                      <Clapperboard className="w-4 h-4 mr-2" />
                      Director's Notes
                    </TabsTrigger>
                    <TabsTrigger value="storyboard" className="data-[state=active]:bg-accent/20 data-[state=active]:text-cream">
                      <LayoutGrid className="w-4 h-4 mr-2" />
                      Storyboard
                    </TabsTrigger>
                    <TabsTrigger value="shotlist" className="data-[state=active]:bg-accent/20 data-[state=active]:text-cream">
                      <List className="w-4 h-4 mr-2" />
                      Shot List
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="notes" className="mt-6">
                    <div className="scene-panel rounded-lg p-6">
                      <DirectorNotesOutput notes={result?.directorNotes || null} />
                    </div>
                  </TabsContent>

                  <TabsContent value="storyboard" className="mt-6">
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {result?.storyboardFrames.map((frame, index) => (
                        <StoryboardFrame key={frame.shotNumber} frame={frame} index={index} />
                      ))}
                      {!result && (
                        <div className="col-span-full text-center py-12 text-muted-foreground">
                          Storyboard frames will appear after analysis.
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="shotlist" className="mt-6">
                    <div className="scene-panel rounded-lg p-6">
                      <ShotListTable shots={result?.shotList || []} />
                    </div>
                  </TabsContent>
                </Tabs>
              </section>
            )}
          </div>

          {/* Sidebar - Parameters */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="scene-panel rounded-lg p-6">
              <ParametersPanel parameters={parameters} onChange={setParameters} />
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-6">
        <div className="container max-w-7xl mx-auto px-6">
          <p className="text-xs text-muted-foreground text-center">
            SceneSense AI — Professional Cinematic Analysis & Pre-Production Suite
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
