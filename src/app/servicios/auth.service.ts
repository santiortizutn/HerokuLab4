import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private firebaseAuth: AngularFireAuth) { }

  registro(correo:string, clave:string){
    return this.firebaseAuth.createUserWithEmailAndPassword(correo, clave);
  }

  login(correo:string, clave:string){
    return this.firebaseAuth.signInWithEmailAndPassword(correo, clave);
  }

  logueado(){
    return this.firebaseAuth.currentUser.then(resp=>{
      if(resp){
        return true;
      }else{
        return false;
      }
    })
  }

  logOut(){
    return this.firebaseAuth.signOut();
  }







}
