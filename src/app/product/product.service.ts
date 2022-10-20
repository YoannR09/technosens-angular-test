import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { PRODUCTS_MOCK } from '../mock/product-mock';

export interface Info {
  quantite: number;
  title: string;
  comments?: string,
  color?: string,
  material: string[]
}


@Injectable()
export class ProductService {

  infosChanged = new BehaviorSubject<Info[]>([]);

  constructor(private http: HttpClient) {}

  async read() {
    // this.infosChanged.next(PRODUCTS_MOCK)
    this.infosChanged.next(
      await lastValueFrom(this.http.get<Info[]>("https://api-privee/info"))
    )
  }

  async command(info: Info) {
    await lastValueFrom(this.http.post("https://api-privee/envoyer-commande", info));
  }

  async cancel(info: Info) {
    await lastValueFrom(this.http.post("https://api-privee/cancel-commande", info));
  }

  async rev(info: Info) {
    if(!this.actionDeVerification()) {
      throw new Error('Verification Failed')
    }
    await lastValueFrom(this.http.post("https://api-privee/relance", info));
  }
  
  public actionDeVerification() {
    //.....
    return true;
  }
}
