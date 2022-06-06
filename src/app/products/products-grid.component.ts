import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, SimpleChanges } from "@angular/core";
import { Product } from './model/product.model';

@Component({
  selector: "products-table",
  templateUrl: "products-grid.component.html",
  styleUrls: ['products-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ProductsGridComponent {
  @Input() products: Product[];
  constructor()
  { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products']) {
      console.log(this.products);
    }
  }
}
