import {
  Directive,
  EventEmitter,
  ElementRef,
  HostListener,
  Input,
  Output
} from "@angular/core";
import { FileItem } from "../models/file-item";

@Directive({
  selector: "[appNgDropFiles]"
})
export class NgDropFilesDirective {
  @Input() files: FileItem[] = [];
  @Output() mouseOver: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  @HostListener("dragover", ["$event"])
  public onDragEnter(event: any) {
    this.mouseOver.emit(true);
    this._preventOpen(event);
  }

  @HostListener("dragleave", ["$event"])
  public onDragLeave(event: any) {
    this.mouseOver.emit(false);
  }

  @HostListener("drop", ["$event"])
  public onDrop(event: any) {
    let dataTransfer = this._getTransfer(event);
    if (!dataTransfer) {
      return;
    }
    this._extractFiles(dataTransfer.files);
    this._preventOpen(event);
    this.mouseOver.emit(false);
  }

  private _getTransfer(event: any) {
    return event.dataTransfer
      ? event.dataTransfer
      : event.originalEvent.dataTransfer;
  }

  private _extractFiles(fileList: FileList) {
    for (let property in Object.getOwnPropertyNames(fileList)) {
      let fileTmp = fileList[property];
      if (this._canUploadFile(fileTmp)) {
        let newFile = new FileItem(fileTmp);
        this.files.push(newFile);
      }
    }
  }

  private _canUploadFile(file: File): boolean {
    return !this._fileDropped(file.name) && this._isImage(file.type);
  }

  private _preventOpen(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  private _fileDropped(fileName: string): boolean {
    for (const file of this.files) {
      if (file["fileName"] === fileName) {
        return true;
      }
    }
    return false;
  }

  private _isImage(fileType: string): boolean {
    return fileType === "" || fileType === undefined
      ? false
      : fileType.startsWith("image");
  }
}
