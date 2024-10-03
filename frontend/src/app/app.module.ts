import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { BarangListComponent } from './pages/barang-list/barang-list.component';
import { BarangCreateEditComponent } from './pages/barang-create-edit/barang-create-edit.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HighlightPipe } from './highlight.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CardModule } from 'primeng/card';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    BarangListComponent,
    BarangCreateEditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    HighlightPipe,
    FontAwesomeModule,
    MatDialogModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule.forRoot({ type: 'ball-running-dots' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
