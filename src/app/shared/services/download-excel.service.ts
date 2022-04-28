import { Injectable } from '@angular/core';

import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class DownloadExcelService {

  constructor() { }


  exportExcel(content: any, header: string[], fileName: string, qtdColumns : number) {
    //create new excel work book
    let workbook = new Workbook();

    //add name to sheet
    let worksheet = workbook.addWorksheet(fileName);

    //add column name
    let headerRow = worksheet.addRow(header);

    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF3CB371' },
        bgColor: { argb: 'FF0000FF' }
      }
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    });

    for (let account of JSON.parse(JSON.stringify(content))) {
      let fields=Object.keys(account);
      let temp=[]
      let cont = 0;
      for (let field of fields) {
        temp.push(this.isNumber(account[field]) ? Number(account[field]) : account[field])
        cont ++;
        if (cont == qtdColumns){ // Usually used to ignore last column
          break;
        }
      }
      worksheet.addRow(temp)
    }

    //add data and file name and download
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fileName +'.xlsx');
    });

  }

  public isNumber(value: string | number): boolean {
   return ((value != null) &&
           (value !== '') &&
           !isNaN(Number(value.toString())));
  }
}
