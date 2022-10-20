import { Injectable } from '@angular/core';

@Injectable({
  providedIn: "root",
})
export class ProductService {
  getInfoOfQuantite(quantite: number, product: string) {
    return quantite > 10
      ? quantite + " " + product
      : "commander des " + product;
  }
}
