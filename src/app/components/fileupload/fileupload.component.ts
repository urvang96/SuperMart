import { Component, OnInit } from '@angular/core';
import { ImgSrcDirective } from '@angular/flex-layout';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent implements OnInit {

  file: File | null = null;
  constructor() { }

  ngOnInit(): void {
  }

  processFile(img: any){
    const file: File = img.files[0];
    this.file = file;
  }
}
