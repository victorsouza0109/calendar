import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { CalendarComponent, DialogOverviewEventDialog, DialogOverviewExampleDialog } from './calendar/calendar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    DialogOverviewEventDialog,
    DialogOverviewExampleDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    MatTableModule,
    FormsModule,
    MatDialogModule,
    DragDropModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
