import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import { DailyRecord } from '../dailyrecord';
import { DailyRecordsService } from 'src/app/shared/services/dailyrecords.service';

@Component({
  selector: 'app-dailyrecords-list',
  templateUrl: './dailyrecords-list.component.html',
  styleUrls: ['./dailyrecords-list.component.css']
})
export class DailyrecordsListComponent implements OnInit {

  dailyRecords : DailyRecord[] = [];
  selectedDailyRecord : DailyRecord;
  successMessage: string;
  errorMessage: string;


  constructor(private service : DailyRecordsService, 
    private router: Router) { }

  new(){
    this.router.navigate(['/lancamentos/form']);
  }

  ngOnInit(): void {
    this.service
    .getDailyRecords()
    .subscribe( response => this.dailyRecords = response);
  }

  prepareToDelete( dailyRecord:DailyRecord ) {
    this.selectedDailyRecord = dailyRecord;
  }

  deleteDailyRecord(){
    this.service
      .delete(this.selectedDailyRecord)
      .subscribe(
        response => {this.successMessage = 'Lançamento deletado com sucesso!',
        this.ngOnInit();
      },
        erro => this.errorMessage = 'Ocorreu um erro ao deletar o lançamento.'
      )
  }



}



