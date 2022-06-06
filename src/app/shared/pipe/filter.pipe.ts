import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/products/model/product.model';
import { ProductFilter } from 'src/app/products/model/product-filter.model';
import { StockStatusEnum } from 'src/app/products/enum/stock-status.enum';


@Pipe({
  name: 'productfilter'
})
export class FilterPipe implements PipeTransform {

  DEFAULT_PRODUCT_BRAND: string = "All";

  transform(items: Product[], filter: ProductFilter): any[] {

    if (filter.search) {
      let keyword = filter.search.toLowerCase();
      items = items.filter(function (product) {


        if ((product.brand.toLowerCase().indexOf(keyword) > -1)
          || (product.name.toLowerCase().indexOf(keyword) > -1)
          || (product.description.toLowerCase().indexOf(keyword) > -1)) {
          return product;
        }
      });
    }

    if (filter.brand != this.DEFAULT_PRODUCT_BRAND) {
      items = items.filter(function (product) {
        return product.brand == filter.brand;
      });
    }

    if (filter.stockStatus == StockStatusEnum.InStock) {
      items = items.filter(function (product) {
        return product.quantity > 0;
      });
    }
    else if (filter.stockStatus == StockStatusEnum.OutOfStock) {
      items = items.filter(function (product) {
        return product.quantity == 0;
      });
    }


    return items;
  }

}
