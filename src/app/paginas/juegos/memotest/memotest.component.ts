import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-memotest',
  templateUrl: './memotest.component.html',
  styleUrls: ['./memotest.component.css']
})
export class MemotestComponent implements OnInit {

  loading:Boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.loading = true;
    setTimeout(()=>{
      this.loading = false;
    },2000);
  }

}
