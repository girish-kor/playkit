import * as React from 'react';

import { useSettingsSync } from '../../hooks/useSettingsSync';
import { cn } from '../../internal/cn';
import { Button } from '../primitives/Button';
import { Flex } from '../primitives/Flex';
import { Tabs } from '../primitives/Tabs';
import { Text } from '../primitives/Text';
import { Modal } from '../modal/Modal';
import { Keybinds } from './Keybinds';
import { Select } from './Select';
import { Slider } from './Slider';
import { Toggle } from './Toggle';
import type { SettingDef, SettingsCategory } from '../../types';

/** Game settings UI container with tabs/sidebar and PlayCanvas sync (COMPONENTS.md § Component: Settings). */
export type SettingsVariant = 'sidebar' | 'tabs' | 'modal';
export type SettingsCloseReason = 'save' | 'cancel' | 'overlay' | 'escape';

export interface SettingsProps {
  categories: SettingsCategory[];
  pcEntity?: string;
  isOpen: boolean;
  onOpen?: () => void;
  onClose: (reason?: SettingsCloseReason) => void;
  variant?: SettingsVariant;
  className?: string;
  onChange?: (key: string, value: unknown) => void;
  onSettingChange?: (setting: SettingDef, value: unknown) => void;
  onSave?: () => void;
  onReset?: () => void;
  onSettingReset?: (setting: SettingDef) => void;
  onCategoryChange?: (categoryId: string) => void;
  'aria-label'?: string;
  onSearch?: (query: string) => void;
  onResetAll?: () => void;
  showResetAll?: boolean;
}

function renderControl(
  setting: SettingDef,
  currentValue: unknown,
  onChange: (key: string, value: unknown) => void,
): React.ReactNode {
  switch (setting.type) {
    case 'toggle':
      return (
        <Toggle
          label={setting.label}
          value={Boolean(currentValue)}
          description={setting.description}
          onChange={(v) => onChange(setting.key, v)}
        />
      );
    case 'slider':
      return (
        <Slider
          label={setting.label}
          value={Number(currentValue)}
          min={setting.min ?? 0}
          max={setting.max ?? 100}
          step={setting.step}
          onChange={(v) => onChange(setting.key, v)}
        />
      );
    case 'select':
      return (
        <Select
          label={setting.label}
          value={(currentValue as string | number | null) ?? null}
          options={
            (setting.options ?? []) as {
              label: string;
              value: string | number;
              disabled?: boolean;
            }[]
          }
          onChange={(v) => onChange(setting.key, v)}
        />
      );
    case 'keybind':
      return (
        <Keybinds
          bindings={[
            {
              action: setting.key,
              key: setting.keybinding?.defaultKey ?? '',
              label: setting.label,
            },
          ]}
          onChange={(bindings) => onChange(setting.key, bindings[0]?.key)}
          onReset={() => onChange(setting.key, setting.keybinding?.defaultKey)}
        />
      );
    default:
      return null;
  }
}

export function Settings({
  categories,
  pcEntity,
  isOpen,
  onOpen,
  onClose,
  variant = 'modal',
  className,
  onChange,
  onSettingChange,
  onSave,
  onReset,
  onSettingReset,
  onCategoryChange,
  'aria-label': ariaLabel = 'Settings',
  onSearch,
  onResetAll,
  showResetAll = true,
}: SettingsProps): React.JSX.Element {
  const { settings: syncedSettings, setSetting, resetAll } = useSettingsSync({ pcEntity });
  const effectiveCategories = pcEntity && syncedSettings.length > 0 ? syncedSettings : categories;

  const [activeCategory, setActiveCategory] = React.useState(effectiveCategories[0]?.id);
  const [isDirty, setIsDirty] = React.useState(false);

  const handleChange = (key: string, value: unknown) => {
    setIsDirty(true);
    onChange?.(key, value);
    const setting = effectiveCategories.flatMap((c) => c.settings).find((s) => s.key === key);
    if (setting) onSettingChange?.(setting, value);
    if (pcEntity && activeCategory) setSetting(activeCategory, key, value);
  };

  const save = () => {
    setIsDirty(false);
    onSave?.();
    onClose('save');
  };

  const resetOne = (setting: SettingDef) => {
    handleChange(setting.key, setting.default);
    onSettingReset?.(setting);
  };

  const resetEverything = () => {
    if (pcEntity) resetAll();
    onReset?.();
    onResetAll?.();
  };

  React.useEffect(() => {
    if (isOpen) onOpen?.();
  }, [isOpen, onOpen]);

  const content = (
    <Flex direction="col" gap={4} className={cn('text-white', className)}>
      {onSearch && (
        <input
          type="search"
          aria-label="Search settings"
          onChange={(e) => onSearch(e.target.value)}
          className="bg-gray-800 rounded px-2 py-1 text-sm"
        />
      )}
      <Tabs
        aria-label="Settings categories"
        tabs={effectiveCategories.map((category) => ({
          id: category.id,
          label: category.label,
          content: (
            <Flex direction="col" gap={3}>
              {category.settings.map((setting) => (
                <div key={setting.key} className="flex flex-col gap-1">
                  {setting.description && (
                    <Text size="sm" className="text-gray-400">
                      {setting.description}
                    </Text>
                  )}
                  {renderControl(setting, setting.default, handleChange)}
                  <Button size="sm" variant="ghost" onPress={() => resetOne(setting)}>
                    Reset
                  </Button>
                </div>
              ))}
            </Flex>
          ),
        }))}
        activeTab={activeCategory}
        onChange={(id) => {
          setActiveCategory(id);
          onCategoryChange?.(id);
        }}
        orientation={variant === 'sidebar' ? 'vertical' : 'horizontal'}
      />
      <Flex justify="between" className="mt-4">
        {showResetAll && (
          <Button variant="ghost" onPress={resetEverything}>
            Reset All
          </Button>
        )}
        <Flex gap={2}>
          <Button variant="secondary" onPress={() => onClose('cancel')}>
            Cancel
          </Button>
          <Button onPress={save} disabled={!isDirty}>
            Save
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );

  if (variant === 'modal') {
    return (
      <Modal
        isOpen={isOpen}
        onClose={(reason) => onClose(reason as SettingsCloseReason)}
        aria-label={ariaLabel}
        className="bg-gray-900/95 p-6"
      >
        {content}
      </Modal>
    );
  }

  return (
    <div
      role="dialog"
      aria-label={ariaLabel}
      aria-hidden={!isOpen}
      className={cn('bg-gray-900/95 p-6 rounded-lg', !isOpen && 'hidden')}
    >
      {content}
    </div>
  );
}

Settings.displayName = 'Settings';
