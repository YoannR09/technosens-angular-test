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
    } catch(e: any) {
      this.onError.next(e)
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
    this.service.command(info).catch(
      err => this.onError.next(err)
    )
  }

  async cancel(info: Info) {
    this.service.cancel(info).catch(
      err => this.onError.next(err)
    )
  }

  // permet de faire une relance
  async revival(info: Info) {
    await this.service.rev(info).catch(
      err => this.onError.next(err)
    )
  }
}