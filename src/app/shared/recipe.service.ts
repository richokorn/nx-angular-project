import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from './ingredient.model';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  dummyRecipes: Recipe[] = [
    new Recipe(
      'Pizza Margherita',
      'Classic. Simple. Delicious.',
      'https://images.pexels.com/photos/11568782/pexels-photo-11568782.jpeg?cs=srgb&dl=pexels-christina-petsos-11568782.jpg&fm=jpg',
      [
        new Ingredient('Pizza Dough', 750, 'g'),
        new Ingredient('Tomato Sauce', 150, 'ml'),
        new Ingredient('Mozarella', 150, 'g'),
        new Ingredient('Basil Leaves', 5, 'pcs'),
        new Ingredient('Cherry Tomatoes', 10, 'pcs'),
      ]
    ),
    new Recipe(
      'Caesar Salad',
      'Healthy salad topped with croutons',
      'https://natashaskitchen.com/wp-content/uploads/2019/01/Caesar-Salad-Recipe-3.jpg',
      [
        new Ingredient('Romaine Lettuce', 500, 'g'),
        new Ingredient('Croutons', 50, 'g'),
        new Ingredient('Parmesan Cheese, shaved', 50, 'g'),
        new Ingredient('Poached Egg', 1, 'pcs'),
        new Ingredient('Caesar Dressing', 50, 'ml'),
      ]
    ),
    new Recipe(
      'Spaghetti Bolognese',
      'A taste of Italy in the comfort of your own home.',
      'https://thumbs.dreamstime.com/b/spaghetti-bolognese-black-serving-platter-fresh-basil-parmesan-44237816.jpg',
      [
        new Ingredient('Spaghetti', 250, 'g'),
        new Ingredient('Tomato Sauce', 250, 'ml'),
        new Ingredient('Mince Meat', 250, 'g'),
        new Ingredient('Mixed Italian Herbs', 50, 'g'),
      ]
    ),
  ];

  private recipes: Recipe[] = [];

  getRecipe(index: number) {
    return this.recipes[index];
  }

  getRecipes(): Recipe[] {
    if (this.recipes.length > 0) {
      return this.recipes.slice();
    }
    console.log('No recipes found');
    return this.recipes
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.getRecipes());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.getRecipes());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.getRecipes());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.getRecipes());
  }

  setDummyRecipes() {
    this.recipes = this.dummyRecipes.slice();
    this.recipesChanged.next(this.getRecipes());
  }
}
