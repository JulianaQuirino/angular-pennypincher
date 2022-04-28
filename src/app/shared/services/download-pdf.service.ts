import { Injectable } from '@angular/core';

import jsPDF from 'jspdf'; 
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class DownloadPDFService {

  constructor() { }

  public exportToPDF(elementId: string, fileName: string) {

    var data = document.getElementById(elementId);
    html2canvas(data!).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 20;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save(fileName + '.pdf'); // Generated PDF
    });
  }

  
}
