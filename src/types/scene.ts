export interface CreativeParameters {
  scenario: string;
  tone: string;
  mood: string;
  genre: string;
  characterPOV: string;
}

export interface Shot {
  number: number;
  type: string;
  cameraMovement: string;
  emotionalPurpose: string;
  povReference: string;
  lightingNote: string;
  duration: 'short' | 'medium' | 'long';
}

export interface CharacterAnalysis {
  name: string;
  internalEmotion: string;
  externalExpression: string;
  emotionalArc: string;
}

export interface DirectorNotes {
  sceneOverview: string;
  primaryEmotion: string;
  emotionalIntensity: string;
  overallMood: string;
  sceneIntent: string;
  characterAnalysis: CharacterAnalysis;
  cameraAndShotPlan: Shot[];
  lighting: string;
  colorPalette: string;
  pacing: string;
  soundDesign: string;
  emotionalTimeline: string;
}

export interface StoryboardFrame {
  shotNumber: number;
  title: string;
  emotionalPurpose: string;
  povInfluence: string;
  cameraBehavior: string;
  subjectFraming: string;
  spatialComposition: string;
  lightingMood: string;
  colorTone: string;
  atmosphericTexture: string;
  justification: string;
  imageUrl?: string;
  isGenerating?: boolean;
}

export interface AnalysisResult {
  directorNotes: DirectorNotes;
  storyboardFrames: StoryboardFrame[];
  shotList: Shot[];
}
