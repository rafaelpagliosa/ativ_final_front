import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ListarMensagemComponent } from './components/listar-mensagem/listar-mensagem.component';
import { CadastrarMensagemComponent } from './components/cadastrar-mensagem/cadastrar-mensagem.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HomeComponent } from './components/home/home.component';
import { ExibirComponent } from './components/exibir/exibir.component';
import { ExibirFullComponent } from './components/exibir-full/exibir-full.component';
import { DestaqueDirective } from './diretiva/destaque.directive';
import { DataFormatadaPipe } from './pipes/data-formatada.pipe';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    ListarMensagemComponent,
    CadastrarMensagemComponent,
    RegistrarComponent,
    LoginComponent,
    HomeComponent,
    ExibirComponent,
    ExibirFullComponent,
    DestaqueDirective,
    DataFormatadaPipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
