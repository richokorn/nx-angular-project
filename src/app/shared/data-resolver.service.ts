import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { DataStorageService } from './data-storage.service';
import { Ingredient } from './ingredient.model';
import { Recipe } from './recipe.model';

@Injectable({ providedIn: 'root' })
export class DataResolverService implements Resolve<Recipe[] | Ingredient[]> {
  constructor(private dataStorageService: DataStorageService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.dataStorageService.fetchData();
  }
}
