import { Observable } from 'rxjs/internal/Observable';
import { FileuploadService } from './../../services/fileupload.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { customValidator } from './customValidators';
import { ProductService } from '../../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize, take } from 'rxjs/operators';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})

export class ProductFormComponent implements OnInit {
  
  catagoryList$: any;
  id: string | null;
  product: Product | null = null;
  reader = new FileReader();
  imageFile: File = new File([""], "filename");
  path:string = '';
  progress:Observable<number | undefined> =new Observable();

  formObj= new FormGroup ({
    title: new FormControl("", Validators.required),
    price: new FormControl("", [Validators.required, customValidator.priceValueCheck]),
    catagory: new FormControl("", Validators.required),
    image: new FormControl()
  })

  constructor(private data:ProductService, 
              private router: Router, 
              private route:ActivatedRoute,
              private upload: FileuploadService) { 

    this.catagoryList$ = this.data.getCatagories();

    this.id = this.route.snapshot.paramMap.get('id')
    if (this.id){
      this.data.getProduct(this.id).pipe(take(1)).subscribe(prod=> {
        if(prod){
          this.product = { key:null, title:prod.title, price:prod.price, catagory:prod.catagory, image:prod.image}
          this.path = prod.image
          this.formObj.setValue({
          title: this.product.title,
          price: this.product.price,
          catagory: this.product.catagory,
          image: ""
        });}
        
      })
    }
  }

  ngOnInit() {  }

  onSubmit(form: FormGroup){
    
    if (this.id){
      this.data.updateProduct(this.id, this.product);
    }
    else{
          let data:Product = {key:null,
            title: form.value.title,
            price: form.value.price,
            catagory: form.value.catagory,
            image: this.path};
          this.data.save(data);     
    }
    this.router.navigate(['/admin/products'])
  }

  onDelete(){}

  get form() { 
    return this.formObj.controls; }
    
  async processFile(image: any){
    this.imageFile = image.target.files[0];
    let task = this.upload.pushFiletostorage(this.imageFile)

    this.progress = task.percentageChanges();   
    (await task).ref.getDownloadURL().then(url =>{
      this.path = url;
    })
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    this.data.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

  
}
