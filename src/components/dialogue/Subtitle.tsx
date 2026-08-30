import * as React from 'react';

import { useDialogueSync } from '../../hooks/useDialogueSync';
import { cn } from '../../internal/cn';
import { Box } from '../primitives/Box';
import { Text } from '../primitives/Text';
import type { Speaker } from '../../types';

/**
 * Simplified, choice-free dialogue/subtitle view for cutscenes, distinct from
 * `Dialogue`'s full choice-tree UI (COMPONENTS.md § Component: Subtitle).
 */
export type SubtitleVariant = 'bottom-bar' | 'fullscreen-centered';

export interface SubtitleProps {
  speaker?: string | Pick<Speaker, 'name' | 'color'>;
  text: string;
  pcEntity?: string;
  duration?: number;
  autoAdvance?: boolean;
  readingSpeed?: number;
  variant?: SubtitleVariant;
  className?: string;
  onComplete?: () => void;
  onSkip?: () => void;
  showSpeakerName?: boolean;
  'aria-label'?: string;
  fadeTransition?: boolean;
}

function estimateDuration(text: string, wpm: number): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1000, (words / wpm) * 60 * 1000);
}

export function Subtitle({
  speaker,
  text,
  pcEntity,
  duration,
  autoAdvance = true,
  readingSpeed = 200,
  variant = 'bottom-bar',
  className,
  onComplete,
  onSkip,
  showSpeakerName = true,
  'aria-label': ariaLabel,
  fadeTransition = true,
}: SubtitleProps): React.JSX.Element {
  useDialogueSync({ pcEntity });
  const resolvedSpeaker = typeof speaker === 'string' ? { name: speaker } : speaker;
  const effectiveDuration = duration ?? estimateDuration(text, readingSpeed);

  React.useEffect(() => {
    if (!autoAdvance) return;
    const id = setTimeout(() => onComplete?.(), effectiveDuration);
    return () => clearTimeout(id);
  }, [text, autoAdvance, effectiveDuration, onComplete]);

  return (
    <Box
      role="status"
      aria-live="polite"
      aria-label={ariaLabel ?? 'Subtitle'}
      className={cn(
        'bg-black/70 text-white text-center p-3',
        fadeTransition && 'transition-opacity duration-300',
        variant === 'bottom-bar' && 'fixed bottom-8 left-1/2 -translate-x-1/2',
        variant === 'fullscreen-centered' &&
          'fixed inset-0 flex items-center justify-center bg-black',
        className,
      )}
      onClick={onSkip}
    >
      {showSpeakerName && resolvedSpeaker?.name && (
        <Text
          weight="semibold"
          style={resolvedSpeaker.color ? { color: resolvedSpeaker.color } : undefined}
        >
          {resolvedSpeaker.name}
        </Text>
      )}
      <Text>{text}</Text>
    </Box>
  );
}

Subtitle.displayName = 'Subtitle';
