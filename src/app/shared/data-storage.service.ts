import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from "rxjs";
import { Ingredient } from './ingredient.model';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import { ShoppingListService } from './shopping-list.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService
  ) {}

  recipesHttpUrl: string =
    'https://ng--complete-guide-8a1d7-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';
  shoppinglistHttpUrl: string =
    'https://ng--complete-guide-8a1d7-default-rtdb.europe-west1.firebasedatabase.app/shopping-list.json';

  storeData() {
    this.http.delete(this.recipesHttpUrl).subscribe(() => {
      this.http
        .post(this.recipesHttpUrl, this.recipeService.getRecipes())
        .subscribe();
    });

    this.http.delete(this.shoppinglistHttpUrl).subscribe(() => {
      this.http
        .post(
          this.shoppinglistHttpUrl,
          this.shoppingListService.getIngredients()
        )
        .subscribe();
    });
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http.get<{[key: string]: Recipe[]}>(this.recipesHttpUrl).pipe(
      map((recipes) => {
        const values = Object.values(recipes);
        return values[0].map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((recipes) => this.recipeService.setRecipes(recipes))
    );
  }

  fetchIngredients(): Observable<Ingredient[]> {
    return this.http
      .get<{[key: string]: Ingredient[]}>(this.shoppinglistHttpUrl)
      .pipe(
        map((shoppingListIngredients) => {
          const values = Object.values(shoppingListIngredients);
          return values[0];
        }),
        tap((ingredients) => this.shoppingListService.setIngredients(ingredients))
      );
  }

  fetchData() {
    return {
      recipes: this.fetchRecipes(),
      shoppingList: this.fetchIngredients(),
    };
  }

  loadDummyData() {
    this.recipeService.setDummyRecipes();
    this.shoppingListService.setDummyIngredients();
  }
}
