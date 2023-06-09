import { Component , OnInit} from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ApiServiceService } from 'src/app/services/api.service.service';
import { MatButtonModule } from '@angular/material/button';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  standalone:true,
  imports:[MatFormFieldModule,MatInputModule,MatDatepickerModule,
          MatNativeDateModule,
           ReactiveFormsModule,FormsModule,MatSelectModule,
           CommonModule,MatIconModule,MatDialogModule,MatButtonModule]
})

export class AddProductComponent implements OnInit{

  form!: FormGroup; 
  x:any;
  isDataLoading:boolean = false;

  addForm = new FormGroup({

    token: new FormControl('', [Validators.required]),
    DevType : new FormControl('', [Validators.required]),
    DevTypeOther : new FormControl('', [Validators.required]),
    Make : new FormControl('', [Validators.required]),
    Model : new FormControl('', [Validators.required]),
    Owner : new FormControl('', [Validators.required]),
    Location : new FormControl('', [Validators.required]),
    Serial : new FormControl('', [Validators.required]),
    PurchaseDate : new FormControl('' , [Validators.required]),
    WarrantyExpDate : new FormControl('', [Validators.required]),
    ServiceExpDate : new FormControl('', [Validators.required]),
    Value : new FormControl('' , [Validators.required]),
    Size : new FormControl('', [Validators.required]),
    Toner : new FormControl('', [Validators.required]),
    MacAddress : new FormControl('', [Validators.required]),
    IPAddress : new FormControl('', [Validators.required]),
    CellNumber : new FormControl('', [Validators.required])
    
  })

  get Token_Func(){
    return this.addForm.get('token');
  }
  get DevType_Func(){
    return this.addForm.get('DevType');
  }
  get DevTypeOther_Func(){
    return this.addForm.get('DevTypeOther');
  }
  get Make_Func(){
    return this.addForm.get('Make');
  }
  get Model_Func(){
    return this.addForm.get('Model');
  }
  get Owner_Func(){
    return this.addForm.get('Owner');
  }
  get Location_Func(){
    return this.addForm.get('Location');
  }
  get Serial_Func(){
    return this.addForm.get('Serial');
  }
  get PurchaseDate_Func(){
    return this.addForm.get('PurchaseDate');
  }
  get WarrantyExpDate_Func(){
    return this.addForm.get('WarrantyExpDate');
  }
  get ServiceExpDate_Func(){
    return this.addForm.get('ServiceExpDate');
  }
  get Value_Func(){
    return this.addForm.get('Value');
  }
  get Size_Func(){
    return this.addForm.get('Size');
  }
  get Toner_Func(){
    return this.addForm.get('Toner');
  }
  get MacAddress_Func(){
    return this.addForm.get('MacAddress');
  }
  get IPAddress_Func(){
    return this.addForm.get('IPAddress');
  }
  get CellNumber_Func(){
    return this.addForm.get('CellAddress');
  }

  constructor ( private fb: FormBuilder,
                private http:HttpClient,private route:Router,
                private dialogRef:MatDialog,
                private api:ApiServiceService,
                private toast:NgToastService
               ) {   console.log('constructor'); }

  ngOnInit():void { 

    console.log('ngOnInit');

  }

  addFormSubmit(){
    console.log(this.addForm.value);
    // string type assertion
    this.x = this.addForm.value as string;

    this.api.addDataFunc(this.x)
        .pipe(catchError((err:any)=>{
            console.log(typeof(err));
            this.toast.error({detail:err, summary:'Error',duration:5000});
            this.route.navigate(['/error']);  
            return err;
    })).subscribe(res=>{
      console.log(typeof(res));
         this.isDataLoading = true;
         this.toast.success({detail:'Details Added Successfully', summary:'Successful',duration:5000});
         this.route.navigate(['/admin/product-homepage']);
    });

  }

  goBackBtn(){
    this.route.navigate(["admin/product-homepage"]);
  }

}
