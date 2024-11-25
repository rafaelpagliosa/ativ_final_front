import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent {
  nome: string = '';
  email: string = '';
  senha: string = '';

  cadastroForm: FormGroup;
  loading: boolean = false;
  errorMessage: string | null = null;

  constructor(private usuarioService: UsuarioService, private router: Router, private fb: FormBuilder,) {
    this.cadastroForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.cadastroForm.invalid) {
      return;
    }

    this.loading = true;
    this.errorMessage = null;

    const { nome, email, senha } = this.cadastroForm.value;

    this.usuarioService.registrar(nome, email, senha).subscribe(
      (response) => {
        this.router.navigate(['/login']);
      },
      (error) => {
        this.errorMessage = 'Erro ao cadastrar. Tente novamente.';
        this.loading = false;
      }
    );
  }
}
