import { useState, useCallback } from 'react';
import { StoryboardFrame } from '@/types/scene';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useStoryboardImages = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateImages = useCallback(async (
    frames: StoryboardFrame[],
    onFrameUpdate: (index: number, update: Partial<StoryboardFrame>) => void
  ) => {
    setIsGenerating(true);

    // Mark all frames as generating
    frames.forEach((_, index) => {
      onFrameUpdate(index, { isGenerating: true });
    });

    // Generate images sequentially to avoid rate limits
    for (let i = 0; i < frames.length; i++) {
      const frame = frames[i];
      
      try {
        const { data, error } = await supabase.functions.invoke('generate-storyboard-image', {
          body: { frame }
        });

        if (error) {
          console.error('Error generating image for frame', i + 1, error);
          toast.error(`Failed to generate image for Shot ${frame.shotNumber}`);
          onFrameUpdate(i, { isGenerating: false });
          continue;
        }

        if (data?.imageUrl) {
          onFrameUpdate(i, { 
            imageUrl: data.imageUrl, 
            isGenerating: false 
          });
          toast.success(`Shot ${frame.shotNumber} generated`);
        } else if (data?.error) {
          toast.error(data.error);
          onFrameUpdate(i, { isGenerating: false });
        }
      } catch (err) {
        console.error('Error generating image:', err);
        onFrameUpdate(i, { isGenerating: false });
      }
    }

    setIsGenerating(false);
  }, []);

  return { generateImages, isGenerating };
};
