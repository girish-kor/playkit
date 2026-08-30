import * as React from 'react';

import { useDialogueChoice } from '../../hooks/useDialogueChoice';
import { useDialogueSync } from '../../hooks/useDialogueSync';
import { useTypewriter } from '../../hooks/useTypewriter';
import { cn } from '../../internal/cn';
import { Box } from '../primitives/Box';
import { Button } from '../primitives/Button';
import { Text } from '../primitives/Text';
import type { Speaker } from '../../types';

/**
 * Character dialogue display with typewriter effect and choice handling
 * (COMPONENTS.md § Component: Dialogue). COMPONENTS.md names
 * `@radix-ui/react-focus-trap` as a dependency (see docs/DEPENDENCIES.md's
 * "Unresolvable dependency" entry) -- uses a minimal self-contained focus-on-open
 * instead until the real `FocusTrap` component (Accessibility category) exists.
 */
export type DialogueVariant = 'standard' | 'cinematic' | 'minimal' | 'with-avatar';

export interface DialogueChoiceOption {
  id?: string;
  text: string;
}

export interface DialogueProps {
  speaker?: string | Speaker;
  avatar?: string;
  text: string;
  pcEntity?: string;
  typingSpeed?: number;
  autoAdvance?: boolean;
  autoAdvanceDelay?: number;
  className?: string;
  variant?: DialogueVariant;
  onOpen?: () => void;
  onComplete?: () => void;
  onSkip?: () => void;
  onAdvance?: () => void;
  onChoice?: (choice: string) => void;
  onChoiceSelect?: (choice: DialogueChoiceOption) => void;
  onChoiceHover?: (choice: string) => void;
  onChoiceFocus?: (choice: string) => void;
  onClose?: () => void;
  'aria-label'?: string;
  voiceOver?: boolean;
  onTypingStart?: () => void;
  onTextStart?: () => void;
  onTypingEnd?: () => void;
  onTextEnd?: () => void;
  showSkip?: boolean;
  choices?: DialogueChoiceOption[];
  role?: 'dialog' | 'alertdialog';
}

function resolveSpeaker(speaker?: string | Speaker): Speaker | undefined {
  if (!speaker) return undefined;
  return typeof speaker === 'string' ? { name: speaker } : speaker;
}

export function Dialogue({
  speaker,
  avatar,
  text,
  pcEntity,
  typingSpeed = 30,
  autoAdvance = false,
  autoAdvanceDelay = 2000,
  className,
  variant = 'standard',
  onOpen,
  onComplete,
  onSkip,
  onAdvance,
  onChoice,
  onChoiceSelect,
  onChoiceHover,
  onChoiceFocus,
  'aria-label': ariaLabel = 'Dialogue',
  voiceOver = false,
  onTypingStart,
  onTextStart,
  onTypingEnd,
  onTextEnd,
  showSkip = true,
  choices = [],
  role = 'dialog',
}: DialogueProps): React.JSX.Element {
  useDialogueSync({ pcEntity });
  const { selectChoice } = useDialogueChoice();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const resolvedSpeaker = resolveSpeaker(speaker);
  const resolvedAvatar = resolvedSpeaker?.avatar ?? avatar;

  const { displayed, isComplete, skip } = useTypewriter({ text, speed: typingSpeed });

  const startedRef = React.useRef(false);
  React.useEffect(() => {
    onOpen?.();
    containerRef.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fire once on mount only.
  }, []);

  React.useEffect(() => {
    if (!startedRef.current) {
      startedRef.current = true;
      onTypingStart?.();
      onTextStart?.();
      if (voiceOver && typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
      }
    }
  }, [text, onTypingStart, onTextStart, voiceOver]);

  React.useEffect(() => {
    if (isComplete) {
      onComplete?.();
      onTypingEnd?.();
      onTextEnd?.();
      if (autoAdvance) {
        const id = setTimeout(() => onAdvance?.(), autoAdvanceDelay);
        return () => clearTimeout(id);
      }
    }
    return undefined;
  }, [isComplete, onComplete, onTypingEnd, onTextEnd, autoAdvance, autoAdvanceDelay, onAdvance]);

  const chooseOption = (choice: DialogueChoiceOption) => {
    onChoice?.(choice.text);
    onChoiceSelect?.(choice);
    selectChoice(choice.id ?? choice.text);
  };

  return (
    <Box
      ref={containerRef}
      role={role}
      aria-label={ariaLabel}
      aria-live="polite"
      tabIndex={-1}
      className={cn(
        'bg-black/80 text-white p-4 rounded-lg border-2 max-w-2xl backdrop-blur',
        variant === 'cinematic' && 'text-lg',
        variant === 'minimal' && 'border-0 bg-black/60',
        className,
      )}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onSkip?.();
      }}
    >
      {(variant === 'with-avatar' || resolvedAvatar) && resolvedAvatar && (
        <img src={resolvedAvatar} alt="" className="w-10 h-10 rounded-full mb-2" />
      )}
      {resolvedSpeaker?.name && (
        <Text
          weight="semibold"
          style={resolvedSpeaker.color ? { color: resolvedSpeaker.color } : undefined}
        >
          {resolvedSpeaker.name}
        </Text>
      )}
      <Text>{displayed}</Text>
      <div className="flex items-center justify-between mt-2">
        {showSkip && !isComplete && (
          <Button
            variant="ghost"
            size="sm"
            onPress={() => {
              skip();
              onSkip?.();
            }}
          >
            Skip
          </Button>
        )}
        {isComplete && !autoAdvance && choices.length === 0 && (
          <Button size="sm" onPress={() => onAdvance?.()}>
            Continue
          </Button>
        )}
      </div>
      {isComplete && choices.length > 0 && (
        <div role="menu" aria-label="Choices" className="flex flex-col gap-2 mt-2">
          {choices.map((choice, i) => (
            <button
              key={choice.id ?? i}
              type="button"
              role="menuitem"
              onClick={() => chooseOption(choice)}
              onMouseEnter={() => onChoiceHover?.(choice.text)}
              onFocus={() => onChoiceFocus?.(choice.text)}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md text-left"
            >
              {choice.text}
            </button>
          ))}
        </div>
      )}
    </Box>
  );
}

Dialogue.displayName = 'Dialogue';
