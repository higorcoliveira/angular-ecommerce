import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  categoryId: number;
  
  constructor(private productService: ProductService, 
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => { 
      this.listProducts();
    })    
  }

  listProducts() {
    const hasCategoryIdParam: boolean = this.route.snapshot.paramMap.has('id');
    this.categoryId = hasCategoryIdParam ? +this.route.snapshot.paramMap.get('id') : 1;

    this.productService.getProductList(this.categoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }

}
