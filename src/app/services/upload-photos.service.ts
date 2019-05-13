import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import * as firebase from "firebase";
import { FileItem } from "../models/file-item";

@Injectable({
  providedIn: "root"
})
export class UploadPhotosService {
  private FOLDER_IMAGES = "img";

  constructor(private _angularFirestore: AngularFirestore) {}

  uploadImages(images: FileItem[]) {
    const STORAGE_REF = firebase.storage().ref();
    for (let image of images) {
      image.uploading = true;
      if (image.progress >= 100) {
        continue;
      }
      const UPLOAD_TASK: firebase.storage.UploadTask = STORAGE_REF.child(
        `${this.FOLDER_IMAGES}/${image.fileName}`
      ).put(image.file);
      UPLOAD_TASK.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot: firebase.storage.UploadTaskSnapshot) =>
          (image.progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100),
        error => console.log("Error:", error),
        async () => {
          image.url = await UPLOAD_TASK.snapshot.ref.getDownloadURL();
          image.uploading = false;
          this.saveImage({
            name: image.fileName,
            url: image.url,
            date: new Date().getTime()
          });
        }
      );
    }
  }

  private saveImage(image: { name: string; url: string; date: number }) {
    this._angularFirestore.collection(`/${this.FOLDER_IMAGES}`).add(image);
  }
}
