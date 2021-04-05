import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor() { }

  loading:Boolean = false;

  ngOnInit(): void {

    this.loading = true;
    setTimeout(()=>{
      this.loading = false;
    },3000);
  }

}
