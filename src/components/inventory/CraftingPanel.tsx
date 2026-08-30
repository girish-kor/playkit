import * as React from 'react';

import { useCraftingSync } from '../../hooks/useCraftingSync';
import { cn } from '../../internal/cn';
import { Box } from '../primitives/Box';
import { Button } from '../primitives/Button';
import { Grid } from '../primitives/Grid';
import { Icon } from '../primitives/Icon';
import { Text } from '../primitives/Text';
import { Progress } from '../feedback/Progress';
import type { Item, Recipe } from '../../types';

/**
 * Recipe list/grid with required ingredients, output preview, and craft action
 * (COMPONENTS.md § Component: CraftingPanel).
 */
export type CraftingPanelVariant = 'grid' | 'list';

export interface CraftingPanelProps {
  recipes: Recipe[];
  inventory: Item[];
  pcEntity?: string;
  selectedRecipe?: string;
  variant?: CraftingPanelVariant;
  className?: string;
  onSelect?: (recipeId: string) => void;
  onCraft: (recipeId: string) => void | Promise<void>;
  craftProgress?: number;
  onCraftComplete?: (recipeId: string) => void;
  onCraftFail?: (recipeId: string, reason: 'missing-ingredients' | 'error') => void;
  'aria-label'?: string;
  searchable?: boolean;
  onSearch?: (query: string) => void;
  categories?: string[];
  showLocked?: boolean;
}

function canCraft(recipe: Recipe, inventory: Item[]): boolean {
  return recipe.ingredients.every((ing) => {
    const owned = inventory.find((item) => item.id === ing.itemId)?.quantity ?? 0;
    return owned >= ing.quantity;
  });
}

export function CraftingPanel({
  recipes,
  inventory,
  pcEntity,
  selectedRecipe: controlledSelected,
  variant = 'grid',
  className,
  onSelect,
  onCraft,
  craftProgress,
  onCraftComplete,
  onCraftFail,
  'aria-label': ariaLabel = 'Crafting',
  searchable = false,
  onSearch,
}: CraftingPanelProps): React.JSX.Element {
  useCraftingSync({ pcEntity });
  const [uncontrolledSelected, setUncontrolledSelected] = React.useState<string | undefined>(
    recipes[0]?.id,
  );
  const selectedRecipe = controlledSelected ?? uncontrolledSelected;
  const [isCrafting, setIsCrafting] = React.useState(false);

  const select = (id: string) => {
    setUncontrolledSelected(id);
    onSelect?.(id);
  };

  const selected = recipes.find((r) => r.id === selectedRecipe);

  const craft = async (recipe: Recipe) => {
    if (!canCraft(recipe, inventory)) {
      onCraftFail?.(recipe.id, 'missing-ingredients');
      return;
    }
    setIsCrafting(true);
    try {
      await onCraft(recipe.id);
      onCraftComplete?.(recipe.id);
    } catch {
      onCraftFail?.(recipe.id, 'error');
    } finally {
      setIsCrafting(false);
    }
  };

  return (
    <Box aria-label={ariaLabel} className={cn('grid grid-cols-2 gap-4', className)}>
      <div
        role="list"
        className={cn(variant === 'grid' ? 'grid grid-cols-3 gap-2' : 'flex flex-col gap-1')}
      >
        {searchable && (
          <input
            type="search"
            aria-label="Search recipes"
            onChange={(e) => onSearch?.(e.target.value)}
            className="col-span-full bg-gray-800 rounded px-2 py-1 text-white text-sm"
          />
        )}
        {recipes.map((recipe) => {
          const craftable = canCraft(recipe, inventory);
          return (
            // COMPONENTS.md documents this row as `role="listitem"` with click
            // activation; see the identical rationale on hud/StatusEffects.tsx.
            /* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex */
            <div
              key={recipe.id}
              role="listitem"
              tabIndex={0}
              onClick={() => select(recipe.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  select(recipe.id);
                }
              }}
              className={cn(
                'flex items-center gap-2 p-2 rounded border cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-400',
                recipe.id === selectedRecipe ? 'border-blue-500 bg-gray-800' : 'border-gray-700',
                !craftable && 'opacity-60',
              )}
            >
              {recipe.icon && <Icon name={recipe.icon} />}
              <Text size="sm" className="text-white">
                {recipe.name}
              </Text>
            </div>
            /* eslint-enable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex */
          );
        })}
      </div>

      {selected && (
        <div
          role="region"
          aria-labelledby={`recipe-${selected.id}-title`}
          className="p-3 bg-gray-800 rounded"
        >
          <Text id={`recipe-${selected.id}-title`} weight="semibold" className="text-white">
            {selected.name}
          </Text>
          <Grid cols={1} gap={1} className="mt-2">
            {selected.ingredients.map((ing) => {
              const owned = inventory.find((item) => item.id === ing.itemId)?.quantity ?? 0;
              const sufficient = owned >= ing.quantity;
              return (
                <div
                  key={ing.itemId}
                  className={cn('flex items-center gap-2 text-sm', !sufficient && 'text-red-400')}
                >
                  <span>{ing.itemId}</span>
                  <span>
                    {owned} / {ing.quantity}
                  </span>
                </div>
              );
            })}
          </Grid>
          {isCrafting && craftProgress !== undefined && (
            <Progress value={craftProgress} max={1} className="mt-2" />
          )}
          <Button
            className="mt-3"
            disabled={!canCraft(selected, inventory)}
            aria-disabled={!canCraft(selected, inventory)}
            aria-describedby={
              !canCraft(selected, inventory) ? `recipe-${selected.id}-reason` : undefined
            }
            loading={isCrafting}
            onPress={() => craft(selected)}
          >
            Craft
          </Button>
          {!canCraft(selected, inventory) && (
            <Text id={`recipe-${selected.id}-reason`} size="xs" className="text-red-400 sr-only">
              Missing ingredients
            </Text>
          )}
        </div>
      )}
    </Box>
  );
}

CraftingPanel.displayName = 'CraftingPanel';
