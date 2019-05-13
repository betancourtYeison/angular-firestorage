import { Component, OnInit } from "@angular/core";
import { FileItem } from "src/app/models/file-item";
import { UploadPhotosService } from "src/app/services/upload-photos.service";

@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styles: []
})
export class UploadComponent implements OnInit {
  files: FileItem[] = [];
  overDrop: boolean = false;

  constructor(public _uploadPhotosService: UploadPhotosService) {}

  ngOnInit() {}

  uploadPhotos() {
    this._uploadPhotosService.uploadImages(this.files);
  }
}
