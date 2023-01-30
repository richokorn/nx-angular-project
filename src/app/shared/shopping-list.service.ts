import { Subject } from 'rxjs';
import { Ingredient } from './ingredient.model';

export class ShoppingListService {
  dummyShoppingList: Ingredient[] = [
    new Ingredient('Pizza Dough', 250, 'g'),
    new Ingredient('Tomato Sauce', 150, 'ml'),
  ];

  shoppingList: Ingredient[] = [];

  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  getIngredient(index: number) {
    return this.shoppingList[index];
  }

  getIngredients() {
    return this.shoppingList.slice();
  }

  addIngredient(ingredient: Ingredient) {
    // if the array is empty, just push the ingredient
    if (this.shoppingList.length === 0) {
      this.shoppingList.push({ ...ingredient });
    } else {
      // if the array is not empty, check if ingredient already exists
      let ingredientExists = false;
      this.shoppingList.forEach((i) => {
        if (ingredient.name === i.name) {
          // if it does, add the amount to existing ingredient on the shopping list
          ingredientExists = true;
          i.amount += ingredient.amount;
        }
      });
      if (!ingredientExists) {
        this.shoppingList.push({ ...ingredient });

        // this.shoppingList.push(ingredient);
        // this does not work because the ingredient is a reference so it will change the original ingredient's value instead of creating a new one, which is quite confusing
      }
    }
    this.ingredientsChanged.next(this.shoppingList.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    // if the ingredients array is not empty, we need to check each ingredient if it already exists
    // we can loop through each ingredient and call the addIngredient method
    if (ingredients.length > 0) {
      ingredients.forEach((ingredient) => {
        this.addIngredient(ingredient);
      });
    }
  }

  setIngredients(ingredients: Ingredient[]) {
    this.shoppingList = ingredients;
    this.ingredientsChanged.next(this.shoppingList.slice());
  }

  setDummyIngredients() {
    this.shoppingList = this.dummyShoppingList.slice();
    this.ingredientsChanged.next(this.shoppingList.slice());
  }

  deleteIngredient(ingredient: Ingredient) {
    this.shoppingList.splice(this.shoppingList.indexOf(ingredient), 1);
    this.ingredientsChanged.next(this.shoppingList.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.shoppingList[index] = newIngredient;
    this.ingredientsChanged.next(this.shoppingList.slice());
  }

  clearEditMode() {
    this.startedEditing.next(-1);
  }
}
