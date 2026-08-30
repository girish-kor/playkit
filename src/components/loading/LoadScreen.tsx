import * as React from 'react';
import { useStore } from 'zustand';

import { useLoadingProgress } from '../../hooks/useLoadingProgress';
import { usePCStore } from '../../internal/pcContext';
import { cn } from '../../internal/cn';
import { useLatest } from '../../internal/useLatest';
import { Box } from '../primitives/Box';
import { Flex } from '../primitives/Flex';
import { Image } from '../primitives/Image';
import { Progress } from '../feedback/Progress';
import { Text } from '../primitives/Text';

/** Game loading screen with progress, tips, and background (COMPONENTS.md § Component: LoadScreen). */
export type LoadScreenVariant = 'full' | 'minimal' | 'with-logo' | 'with-tips';

export interface LoadScreenProps {
  minLoadTime?: number;
  pcEntity?: string;
  background?: string;
  tips?: string[];
  variant?: LoadScreenVariant;
  onLoadStart?: () => void;
  onLoadComplete: (data?: { duration: number }) => void;
  className?: string;
  onTipChange?: (tip: string) => void;
  onProgress?: (progress: number) => void;
  onLoadProgress?: (progress: number) => void;
  'aria-label'?: string;
  logo?: string;
  onSkip?: (data: { progressAtSkip: number }) => void;
  showProgress?: boolean;
}

export const LoadScreen = React.forwardRef<HTMLDivElement, LoadScreenProps>(function LoadScreen(
  {
    minLoadTime = 1000,
    background,
    tips,
    variant = 'full',
    onLoadStart,
    onLoadComplete,
    className,
    onTipChange,
    onProgress,
    onLoadProgress,
    'aria-label': ariaLabel = 'Loading',
    logo,
    onSkip,
    showProgress = true,
  },
  ref,
) {
  const store = usePCStore();
  const pcApp = useStore(store, (s) => s.app);
  const { progress, isComplete } = useLoadingProgress({ pcApp });

  const [tipIndex, setTipIndex] = React.useState(0);
  const [minTimeElapsed, setMinTimeElapsed] = React.useState(minLoadTime <= 0);
  const [done, setDone] = React.useState(false);
  const startRef = React.useRef<number>(Date.now());
  const onLoadStartRef = useLatest(onLoadStart);
  const onLoadCompleteRef = useLatest(onLoadComplete);

  React.useEffect(() => {
    onLoadStartRef.current?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (minLoadTime <= 0) return;
    const timer = setTimeout(() => setMinTimeElapsed(true), minLoadTime);
    return () => clearTimeout(timer);
  }, [minLoadTime]);

  React.useEffect(() => {
    onProgress?.(progress);
    onLoadProgress?.(progress);
  }, [progress, onProgress, onLoadProgress]);

  React.useEffect(() => {
    if (isComplete && minTimeElapsed && !done) {
      setDone(true);
      onLoadCompleteRef.current(
        pcApp || minLoadTime > 0 ? { duration: Date.now() - startRef.current } : undefined,
      );
    }
  }, [isComplete, minTimeElapsed, done, pcApp, minLoadTime, onLoadCompleteRef]);

  React.useEffect(() => {
    if (!tips || tips.length === 0) return;
    const timer = setInterval(() => {
      setTipIndex((prev) => {
        const next = (prev + 1) % tips.length;
        const nextTip = tips[next];
        if (nextTip !== undefined) onTipChange?.(nextTip);
        return next;
      });
    }, 4000);
    return () => clearInterval(timer);
  }, [tips, onTipChange]);

  if (done) return null;

  const showTips = (variant === 'with-tips' || variant === 'full') && tips && tips.length > 0;
  const currentTip = tips?.[tipIndex];

  const handleSkip = () => {
    onSkip?.({ progressAtSkip: progress });
  };

  return (
    <Box
      ref={ref}
      role="progressbar"
      aria-label={ariaLabel}
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        'fixed inset-0 z-[9999] bg-black flex items-center justify-center',
        background && 'bg-cover bg-center',
        className,
      )}
      style={background ? { backgroundImage: `url(${background})` } : undefined}
      onClick={onSkip ? handleSkip : undefined}
    >
      <Flex direction="col" align="center" gap={4}>
        {variant === 'with-logo' && logo && <Image src={logo} alt="" width={120} />}
        {variant !== 'minimal' && showProgress && (
          <Progress value={progress * 100} max={100} aria-label="Loading progress" />
        )}
        {showTips && currentTip && (
          <Text size="sm" color="text-gray-400">
            {currentTip}
          </Text>
        )}
      </Flex>
    </Box>
  );
});

LoadScreen.displayName = 'LoadScreen';
