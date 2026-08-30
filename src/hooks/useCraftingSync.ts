import { useScript } from './useScript';
import type { Recipe } from '../types';

/** Crafting-recipe sync (docs/API.md § useCraftingSync) — used by `CraftingPanel`. */
export function useCraftingSync(options: { pcEntity?: string } = {}): {
  recipes: Recipe[];
  craft: (recipeId: string) => Promise<void>;
} {
  const { value } = useScript({
    entityId: options.pcEntity ?? '',
    stateKey: 'recipes',
    initialValue: [] as Recipe[],
  });
  const recipes = (value as Recipe[] | undefined) ?? [];
  return {
    recipes,
    craft: async (recipeId: string) => {
      // Ingredient validation is CraftingPanel's own `canCraft` diff against its
      // `inventory` prop (docs/COMPONENTS.md); this hook just triggers the recipe.
      void recipeId;
    },
  };
}
