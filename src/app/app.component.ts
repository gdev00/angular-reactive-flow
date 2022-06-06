import { Component, ChangeDetectionStrategy, ViewEncapsulation } from "@angular/core";
import { BehaviorSubject, combineLatest } from 'rxjs';
import { Product } from './products/model/product.model';
import { ProductsService } from './products/products.service';
import { ProductFilter } from './products/model/product-filter.model';
import { StockStatusEnum } from './products/enum/stock-status.enum';
import { map } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  title = "ir-dev-test";

  readonly DEFAULT_PRODUCT_BRAND: string = "All";
  readonly STOCK_STATUS_ALL: string = "all";
  readonly STOCK_STATUS_INSTOCK: string = "in-stock";
  readonly STOCK_STATUS_OUTOFSTOCK: string = "out-of-stock";


  private brandChange$ = new BehaviorSubject<string>(this.DEFAULT_PRODUCT_BRAND);
  private stockStatusChange$ = new BehaviorSubject<number>(StockStatusEnum.All);
  private searchChange$ = new BehaviorSubject<string>(null);

  productList$ = this.productService.getProducts();

  productBrands$ = this.productList$
  .pipe(
    map(products => {
      return products.map(x => x.brand).filter((x, i, a) => a.indexOf(x) == i)
    }));

  productFilter$ = combineLatest([this.brandChange$, this.stockStatusChange$, this.searchChange$])
  .pipe(
    map(result => {
      return <ProductFilter>{
        brand: result[0],
        stockStatus: result[1],
        search: result[2]
      }
    })
  )

  products$ = combineLatest([this.productList$, this.productFilter$])
  .pipe(
    map(([products, filter]) => {
      let filteredProducts = products as Product[];
      if(filter.search) {
        const keyword = filter.search.toLowerCase();
        filteredProducts = filteredProducts.filter(x => 
          x.brand.toLowerCase().indexOf(keyword) > -1 ||
          x.description.toLowerCase().indexOf(keyword) > -1 ||
          x.name.toLowerCase().indexOf(keyword) > -1
          )
      }

      if (filter.brand != this.DEFAULT_PRODUCT_BRAND) {
        filteredProducts = filteredProducts.filter(x => x.brand === filter.brand);
      }
  
      if (filter.stockStatus == StockStatusEnum.InStock) {
        filteredProducts = filteredProducts.filter(x => x.quantity > 0);
      }
      else if (filter.stockStatus == StockStatusEnum.OutOfStock) {
        filteredProducts = filteredProducts.filter(x => x.quantity === 0);
      }
      return filteredProducts;
    })
  );

  constructor(private productService: ProductsService) { }

  productBrandDropdDownOnChanged(brand: string): void {
    this.brandChange$.next(brand);
  }

  productStockStatusOnChanged(status: string): void {
    if (status == this.STOCK_STATUS_ALL)
    this.stockStatusChange$.next(1);
    else if (status == this.STOCK_STATUS_INSTOCK)
    this.stockStatusChange$.next(2);
    else
     this.stockStatusChange$.next(3);
  }

  onProductItemSearched(search: string): void {
    if(search.length === 0) {
      this.searchChange$.next(null);
    } else if (search.length >= 3) {
      this.searchChange$.next(search);
    }
  }
}
