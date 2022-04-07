import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { finalize, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {

  path:string = "";
  progress: any;

  constructor(private db:AngularFireDatabase, private store:AngularFireStorage) { }

  pushFiletostorage(image: File){
    const filePath = `${image.name}`;
    const storageRef = this.store.ref(filePath);
    const task:AngularFireUploadTask = this.store.upload(filePath, image);

    return task;
  }
}
