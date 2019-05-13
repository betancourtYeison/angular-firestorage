import { Component, OnInit } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Observable } from "rxjs";

export interface Item {
  name: string;
  url: string;
}

@Component({
  selector: "app-photos",
  templateUrl: "./photos.component.html",
  styles: []
})
export class PhotosComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Item>("img", ref =>
      ref.orderBy("date", "desc")
    );
    this.items = this.itemsCollection.valueChanges();
  }

  ngOnInit() {}
}
