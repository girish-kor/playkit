// Auto-derived from docs/FOLDER-STRUCTURE.md's category taxonomy and docs/API.md's
// hook list. This is a scaffold-level smoke test: it asserts the export SURFACE matches
// the documented taxonomy exactly (right names, right entry point) — it intentionally
// does not render anything or assert behavior, since every component/hook here is still
// a "not implemented" stub (see docs/REBUILD-GUIDE.md for the real implementation order).
//
// This test is also the mechanical check behind docs/CI-CD.md gate #4 at the source
// level (see scripts/verify-devtools-excluded.mjs for the equivalent check against the
// built artifact).
import { describe, expect, it } from 'vitest';

import * as Library from '../index';
import * as DevTools from '../devtools';

const ALL_COMPONENTS = [
  'Box',
  'Flex',
  'Grid',
  'Text',
  'Button',
  'Icon',
  'Slot',
  'Input',
  'Label',
  'Checkbox',
  'ScrollArea',
  'Card',
  'Image',
  'Tabs',
  'TreeView',
  'Overlay',
  'Joystick',
  'RadioGroup',
  'Badge',
  'Avatar',
  'Popover',
  'Divider',
  'Accordion',
  'HUD',
  'Health',
  'Energy',
  'Crosshair',
  'Compass',
  'Minimap',
  'AmmoIndicator',
  'InteractionPrompt',
  'DamageNumbers',
  'StatusEffects',
  'Inventory',
  'ItemSlot',
  'ItemTip',
  'EquipmentSlots',
  'ItemComparison',
  'CraftingPanel',
  'LootContainer',
  'Puzzle',
  'CodePuzzle',
  'SequencePuzzle',
  'SliderPuzzle',
  'ObjectPuzzle',
  'MathPuzzle',
  'WordPuzzle',
  'MemoryMatch',
  'CombinationLock',
  'PatternLock',
  'Dialogue',
  'Choice',
  'History',
  'Subtitle',
  'Objectives',
  'Objective',
  'Timer',
  'Stopwatch',
  'NavMenu',
  'Back',
  'Breadcrumb',
  'SidebarMenu',
  'Toast',
  'Spinner',
  'Progress',
  'AlertBanner',
  'Confetti',
  'LoadingDots',
  'Modal',
  'Confirm',
  'Tooltip',
  'ContextMenu',
  'HoverCard',
  'DropdownMenu',
  'Settings',
  'Toggle',
  'Slider',
  'Select',
  'Keybinds',
  'ColorPicker',
  'AccessibilitySlider',
  'Editor',
  'Palette',
  'TerrainPainter',
  'LightingControls',
  'LoadScreen',
  'Skeleton',
  'ErrorBoundary',
  'ErrorMsg',
  'Responsive',
  'Touch',
  'OrientationLock',
  'A11y',
  'FocusTrap',
  'SkipLink',
  'ScreenReader',
  'LiveRegion',
  'Stepper',
  'Rating',
  'Tag',
  'PCProvider',
] as const;

const DEVTOOLS_COMPONENTS = [
  'DevTools',
  'Inspector',
  'Property',
  'Console',
  'PerformanceMonitor',
  'AssetViewer',
] as const;

const ALL_HOOKS = [
  'useEntity',
  'useScript',
  'useEvent',
  'useSync',
  'useTransition',
  'useInput',
  'useNetwork',
  'useTimerSync',
  'useStopwatchSync',
  'useSettingSync',
  'useSettingsSync',
  'useKeybindSync',
  'useObjectiveSync',
  'useObjectiveProgress',
  'useDialogueSync',
  'useDialogueChoice',
  'useDialogueHistory',
  'useInventorySync',
  'useSlotSync',
  'useHealthSync',
  'useEnergySync',
  'useLoadingSync',
  'useProgressSync',
  'useTextSync',
  'useIconSync',
  'useTextureSync',
  'useBadgeSync',
  'useAvatarSync',
  'useAccordionSync',
  'useMinimapSync',
  'useAmmoSync',
  'useInteractionPromptSync',
  'useStatusEffectSync',
  'useEquipmentSync',
  'useCraftingSync',
  'useLootSync',
  'useStepperSync',
  'useModalSync',
  'useA11ySync',
  'useViewportSync',
  'useTooltipSync',
  'useObjectPuzzleSync',
  'useSliderSync',
  'useSequenceSubmit',
  'usePuzzleSubmit',
  'usePuzzleBridge',
  'useTouchBridge',
  'useNotificationListener',
  'useErrorReporter',
  'useConfirm',
  'useRaycaster',
  'usePlayerRotation',
  'useCameraProjection',
  'useAction',
  'useItemData',
  'useHoverData',
  'useAnimation',
  'useTypewriter',
  'useScrollToBottom',
  'useSkeleton',
  'useViewport',
  'useIsTouchDevice',
  'useKeyboardListener',
  'useContextMenu',
  'useTimer',
  'useStopwatch',
  'useToast',
  'useAnnounce',
  'useLoadingProgress',
  'useDevAPI',
  'useSceneInspector',
  'usePropertyEditor',
  'useEditorBridge',
  'usePrefabLibrary',
  'useConsoleBridge',
] as const;

describe('package entry point (src/index.ts)', () => {
  it.each(ALL_COMPONENTS)('exports %s', (name) => {
    expect(typeof (Library as Record<string, unknown>)[name]).toBe('object'); // React.forwardRef result
  });

  it.each(ALL_HOOKS)('exports %s', (name) => {
    expect(typeof (Library as Record<string, unknown>)[name]).toBe('function');
  });

  it.each(DEVTOOLS_COMPONENTS)(
    'does NOT export Debug/DevTools component %s (docs/BUILD.md, docs/LOGGING.md)',
    (name) => {
      expect((Library as Record<string, unknown>)[name]).toBeUndefined();
    },
  );

  it('exports exactly the documented non-DevTools component count', () => {
    const exportedComponentNames = ALL_COMPONENTS.filter(
      (name) => (Library as Record<string, unknown>)[name] !== undefined,
    );
    expect(exportedComponentNames).toHaveLength(101);
  });
});

describe('devtools entry point (src/devtools.ts)', () => {
  it.each(DEVTOOLS_COMPONENTS)('exports %s', (name) => {
    expect(typeof (DevTools as Record<string, unknown>)[name]).toBe('object');
  });
});
