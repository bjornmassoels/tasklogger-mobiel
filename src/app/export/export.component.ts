import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss'],
})
export class ExportComponent implements OnInit {
  fileFormat: string = "CSV";
  fieldSeparator: string = "Automatic";
  isChoosingFormat: boolean = false;
  isChoosingSeparator: boolean = false;
  constructor(private router: Router) { }

  ngOnInit() {}
  setFileFormat() {
    if (this.isChoosingFormat === false) {
      this.isChoosingFormat = true;
    } else {
      this.isChoosingFormat = false;
    }
  }
  selectFileFormat(format: string){
    this.fileFormat = format;
    this.setFileFormat();
  }
  setFieldSeparator() {
    if (this.isChoosingSeparator === false) {
      this.isChoosingSeparator = true;
    } else {
      this.isChoosingSeparator = false;
    }
  }
  selectFieldSeparator(separator: string){
    this.fieldSeparator = separator;
    this.setFieldSeparator();
  }
  goBackToSettings(){
    this.router.navigate(['/tabs/settings']);
  }
}
