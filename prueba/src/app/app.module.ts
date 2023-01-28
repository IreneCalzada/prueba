import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularSignaturePadModule } from '@almothafar/angular-signature-pad';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localeES from "@angular/common/locales/es";
import { PhoneMaskDirective } from 'src/shared/directives/phone-mask.directive';
import { phoneFormatComponent } from 'src/shared/pipes/phone-format.pipe';
import { ToastrModule } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';

registerLocaleData(localeES, "es");

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    PhoneMaskDirective,
    phoneFormatComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularSignaturePadModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 3000,
      progressBar: true,
    }),
  ],
  exports: [
    PhoneMaskDirective
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
