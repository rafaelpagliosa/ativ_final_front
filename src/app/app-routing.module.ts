import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

import { LoginComponent } from './components/login/login.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { HomeComponent } from './components/home/home.component';
import { CadastrarMensagemComponent } from './components/cadastrar-mensagem/cadastrar-mensagem.component';
import { ListarMensagemComponent } from './components/listar-mensagem/listar-mensagem.component';
import { ExibirComponent } from './components/exibir/exibir.component';
import { ExibirFullComponent } from './components/exibir-full/exibir-full.component';


const routes: Routes = [
  { path: 'novamensagem', component: CadastrarMensagemComponent, canActivate: [AuthGuard] },
  { path: 'novamensagem/:id', component: CadastrarMensagemComponent, canActivate: [AuthGuard] },
  { path: 'listar', component: ListarMensagemComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'exibir', component: ExibirComponent, canActivate: [AuthGuard] },
  { path: 'exibirFull', component: ExibirFullComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'registrar', component: RegistrarComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
