import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CLIENT_TOKEN, VHAPModule } from 'projects/vhap/src/public-api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BETA } from './beta';
import { HomeComponent } from './home/home.component';
import { FindComponent } from './find/find.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, FindComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    FlexLayoutModule,

    MatTooltipModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    ScrollingModule,

    VHAPModule,

    AppRoutingModule,

    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
  ],
  providers: [{ provide: CLIENT_TOKEN, useValue: BETA }],
  bootstrap: [AppComponent],
})
export class AppModule {}
