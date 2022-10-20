import { HttpClient } from "@angular/common/http";
import {
  Component,
  ElementRef,
  HostListener,
  Injectable,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Observable, of } from "rxjs";

interface Info {
  quantite: number;
  title: string;
  data?: any;
}

@Component({
  selector: "app-display-produit",
  templateUrl: "./display-produit.component.html",
})
export class InventoryComponent implements OnInit {
  @ViewChild("relance") relanceEl!: ElementRef;
  a$: Observable<Info[]>;
  infos: any;

  constructor(private http: HttpClient, public service: ProductService) {
    this.a$ = http.get<Info[]>("https://api-privee/info");
  }

  ngOnInit(): void {
    this.a$.subscribe((info) => (this.infos = info));
  }

  getInfoData(info: Info) {
    return info.data !== null;
  }

  @HostListener("mouseenter") mouseenter() {
    this.relanceEl.nativeElement.style.backgroundColor = "red";
  }

  @HostListener("mouseleave") mouseleave() {
    this.relanceEl.nativeElement.style.backgroundColor = "transparent";
  }

  // @HostListener('mouseexit') mouseexit() {
  //     if(this.relanceEl) {
  //         this.relanceEl.nativeElement.style.backgroundColor = 'yellow';
  //     }
  // }

  command(info: Info) {
    this.http.post("https://api-privee/envoyer-commande", info);
  }

  cancel(info: Info) {
    this.http.post("https://api-privee/cancel-commande", info);
  }

  // permet de faire une relance
  rev(info: Info) {
    this.actionDeVerification();
    this.http.post("https://api-privee/relance", info);
  }

  public actionDeVerification() {
    //.....
    return true;
  }
}