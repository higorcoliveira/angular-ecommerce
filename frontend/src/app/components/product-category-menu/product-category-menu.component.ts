import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { ProductCategory } from '../../common/productCategory';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {

  productCategories: ProductCategory[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.listProductCategories();
  }

  listProductCategories() {
    this.productService.getProductCategories().subscribe(
      data => {
        console.log(JSON.stringify(data));
        this.productCategories = data;
      }
    );
  }

}
