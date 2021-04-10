import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css']
})
export class JuegosComponent implements OnInit {

  loading:Boolean = false;

  constructor(private fireAuth:AngularFireAuth, private router:Router) { }

  ngOnInit(): void {
    this.loading = true;
    setTimeout(()=>{
      this.loading = false;
    },2000);

    this.fireAuth.currentUser.then(resp=>{
      if(!resp){
        this.router.navigate(["/"]);
      }
    })
  }

}
