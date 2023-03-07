import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

export interface DialogData {
  titleEvent: string;
  date: Date;
  description: string;
  cancel: boolean;
  hasEvent: boolean
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  currentDate: Date = new Date();
  calendarDays: Date[] = [];

  events: any[] = [];

  titleEvent!: string;
  date!: Date;
  description!: string;
  hasEvent!: boolean;

  displayedColumns: string[] = ['titleEvent', 'date', 'description', 'event'];
  dataSource = this.events;

  constructor(public dialog: MatDialog) { }

  openDialog(dia: Date): void {
    let dias = new Date(dia).toJSON().slice(0, 10)
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: { titleEvent: this.titleEvent, description: this.description, date: dias, hasEvent: this.hasEvent },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.titleEvent) {
        result.date = new Date(new Date(result.date).getTime() + 86400000)
        this.events = this.events.filter(word => word.hasEvent == true);
        this.events.push(result)
      }
      this.dataSource = this.events
    });
  }

  openDialogEvent(item: any): void {
    const dialogRef = this.dialog.open(DialogOverviewEventDialog, {
      data: item
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.cancel) {
        this.events = this.events.filter(word => word.cancel != true);
      }
      this.dataSource = this.events
    });
  }

  ngOnInit() {
    this.createEvent();
    this.buildCalendar();
    this.dataSource = this.events;
  }

  buildCalendar() {
    const ano = this.currentDate.getFullYear();
    const mes = this.currentDate.getMonth();

    const primeiroDiaDaSemana = 0; // domingo
    const ultimoDiaDaSemana = 6; // sábado

    const dataInicial = new Date(ano, mes, 1);
    while (dataInicial.getDay() !== primeiroDiaDaSemana) {
      dataInicial.setDate(dataInicial.getDate() - 1);
    }

    const dataFinal = new Date(ano, mes + 1, 0);
    while (dataFinal.getDay() !== ultimoDiaDaSemana) {
      dataFinal.setDate(dataFinal.getDate() + 1);
    }

    this.calendarDays = [];
    for (
      let data = new Date(dataInicial.getTime());
      data <= dataFinal;
      data.setDate(data.getDate() + 1)
    ) {
      this.calendarDays.push(new Date(data.getTime()));
    }
  }


  changeMonth(offsetMes: number) {
    this.currentDate.setMonth(this.currentDate.getMonth() + offsetMes);
    this.currentDate = new Date(this.currentDate.getTime());
    this.buildCalendar();
  }

  createEvent() {
    this.events = [
      {
        titleEvent: 'Event 1',
        date: new Date(),
        description: "Event 1",
        hasEvent: true
      },
      {
        titleEvent: 'Event 2',
        date: new Date(new Date().getTime() + 86400000),
        description: "Event 2",
        hasEvent: true
      }
    ]
  }

  deleteEvent(row: any) {
    console.log(row)
    row.cancel = true
    this.events = this.events.filter(word => word.cancel != true);
    this.dataSource = this.events
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog.html',
})

export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  onNoClick(): void {
    this.data.hasEvent = true
    this.dialogRef.close(this.data);
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialogEvent.html',
})
export class DialogOverviewEventDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewEventDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  onNoClick(): void {
    this.data.cancel = true
    this.dialogRef.close(this.data);
  }
}
