import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  cartForm;
  cartData;
  constructor(public http: HttpClient,public router: Router) { }


  ngOnInit() {
   
      this.cartForm = new FormGroup({
        "Categories": new FormControl(),
        "Item": new FormControl(),
        "Quantity": new FormControl(),
        "Price": new FormControl()
      })
    this.loadData();

  }
  postBook() {
    console.log(this.cartForm.value);
    this.http.post('https://5d451f2ed823c30014771b95.mockapi.io/alfa', this.cartForm.value)
      .toPromise()
      .then((response) => {
        this.cartForm = new FormGroup({
          "Categories": new FormControl(),
          "Item": new FormControl(),
          "Quantity": new FormControl(),
          "Price": new FormControl()
        })
        this.loadData();
        this.router.navigate(['']);
        console.log(response);
      }, (error) => {
        console.log(error);
      }
      );
  }
  loadData() {
    this.http.get('https://5d451f2ed823c30014771b95.mockapi.io/alfa')
      .toPromise()
      .then((response) => {
        this.cartData = response;
      }, (error) => {
        console.log(error);
      }
      );
  }
  deleteBook(id) {
    let result = confirm('Are you sure do you want to delete?');
    if (result == true) {
      console.log(id);
      this.http.delete(`https://5d451f2ed823c30014771b95.mockapi.io/alfa/${id}`)
        .toPromise()
        .then((response) => {
          console.log(response);
          this.loadData();
        },
          (error) => {
            console.log(error);
          }
          );
    }
  }
  

}
