import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PhotosComponent } from "./components/photos/photos.component";
import { UploadComponent } from "./components/upload/upload.component";

const ROUTES: Routes = [
  { path: "photos", component: PhotosComponent },
  { path: "upload", component: UploadComponent },
  { path: "**", pathMatch: "full", redirectTo: "photos" }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
