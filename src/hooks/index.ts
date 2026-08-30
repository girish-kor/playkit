// 75 hooks, grouped and ordered exactly as in docs/API.md.
// Note: docs/API.md's own opening line states "76 hooks total" but individually names
// only 75 across its sections and docs/FOLDER-STRUCTURE.md's flat hook list — this is a
// pre-existing discrepancy in the source docs, preserved here rather than silently
// papered over (see docs/API.md's own note on preserving documented inconsistencies).
// react-aria's useMenu/useButton are used directly from react-aria, not re-implemented here.

// PlayCanvas-integration hooks (foundational)
export * from './useEntity';
export * from './useScript';
export * from './useEvent';
export * from './useSync';
export * from './useTransition';
export * from './useInput';
export * from './useNetwork';

// Domain sync hooks (one use<Domain>Sync per state domain)
export * from './useTimerSync';
export * from './useStopwatchSync';
export * from './useSettingSync';
export * from './useSettingsSync';
export * from './useKeybindSync';
export * from './useObjectiveSync';
export * from './useObjectiveProgress';
export * from './useDialogueSync';
export * from './useDialogueChoice';
export * from './useDialogueHistory';
export * from './useInventorySync';
export * from './useSlotSync';
export * from './useHealthSync';
export * from './useEnergySync';
export * from './useLoadingSync';
export * from './useProgressSync';
export * from './useTextSync';
export * from './useIconSync';
export * from './useTextureSync';
export * from './useBadgeSync';
export * from './useAvatarSync';
export * from './useAccordionSync';
export * from './useMinimapSync';
export * from './useAmmoSync';
export * from './useInteractionPromptSync';
export * from './useStatusEffectSync';
export * from './useEquipmentSync';
export * from './useCraftingSync';
export * from './useLootSync';
export * from './useStepperSync';
export * from './useModalSync';
export * from './useA11ySync';
export * from './useViewportSync';
export * from './useTooltipSync';
export * from './useObjectPuzzleSync';
export * from './useSliderSync';
export * from './useSequenceSubmit';
export * from './usePuzzleSubmit';
export * from './usePuzzleBridge';
export * from './useTouchBridge';
export * from './useNotificationListener';
export * from './useErrorReporter';
export * from './useConfirm';

// Rendering/utility hooks
export * from './useRaycaster';
export * from './usePlayerRotation';
export * from './useCameraProjection';
export * from './useAction';
export * from './useItemData';
export * from './useHoverData';
export * from './useAnimation';
export * from './useTypewriter';
export * from './useScrollToBottom';
export * from './useSkeleton';
export * from './useViewport';
export * from './useIsTouchDevice';
export * from './useKeyboardListener';
export * from './useContextMenu';
export * from './useTimer';
export * from './useStopwatch';
export * from './useToast';
export * from './useAnnounce';
export * from './useLoadingProgress';

// Dev-tooling hooks (DevMode only — see docs/LOGGING.md)
export * from './useDevAPI';
export * from './useSceneInspector';
export * from './usePropertyEditor';
export * from './useEditorBridge';
export * from './usePrefabLibrary';
export * from './useConsoleBridge';
