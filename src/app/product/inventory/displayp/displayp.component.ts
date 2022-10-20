import { HttpErrorResponse } from "@angular/common/http";
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { map, Subject, takeUntil } from "rxjs";
import { Info, ProductService } from "../../product.service";

type InfoViewModel = Info & {
  infoOfQuantity: string
};

@Component({
  selector: 'app-displayp',
  templateUrl: './displayp.component.html',
  styleUrls: ['./displayp.component.scss']
})
export class DisplaypComponent implements OnInit, OnDestroy {

  infos: InfoViewModel[] = []
  private _destroyed = new Subject<void>()

  @Output() onError = new EventEmitter<Error>()

  constructor(public service: ProductService) {}

  async ngOnInit() {
    try {
      await this.service.read()
    } catch(err: any) {
      this.onError.next(err as HttpErrorResponse)
    }
    this.service.infosChanged
      .pipe(
        map((m: Info[]) => m.map(data => ({
                ...data,
                infoOfQuantity: this.getInfoOfQuantite(data.quantite, data.title)
              })
            )
          ),
          takeUntil(this._destroyed)
        ).subscribe(
          info => this.infos = info
        )
  }

  ngOnDestroy(): void {
    this._destroyed.next()
  }
  
  getInfoOfQuantite(quantite: number, product: string): string {
    return quantite > 10
      ? `${quantite} ${product}`
      : `Commander des ${product}`
  }

  async command(info: Info) {
    try {
      await this.service.command(info)
    } catch(err: any) {
      this.onError.next(err as HttpErrorResponse)
    }
  }

  async cancel(info: Info) {
    try {
      await this.service.cancel(info)
    } catch(err: any) {
      this.onError.next(err as HttpErrorResponse)
    }
  }

  // permet de faire une relance
  async revival(info: Info) {
    try {
      await this.service.rev(info)
    } catch(err: any) {
      this.onError.next(err as HttpErrorResponse)
    }
  }
}