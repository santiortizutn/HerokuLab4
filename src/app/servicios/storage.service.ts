import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  storageRef : any;
  constructor(private storage : AngularFireStorage) {
    this.storageRef = this.storage.storage.ref();
  }

  obtenerReferencia(){
    return this.storageRef;
  }

  obtenerImagen(nombre : string){
    return this.storageRef.child("/memotest/" + nombre + ".png").getDownloadURL();
  }
}
