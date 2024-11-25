import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service'; // Serviço de autenticação (você precisará criar)

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmitting = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
  }


  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    const { email, senha } = this.loginForm.value;

    this.authService.login(email, senha).subscribe(
      (response) => {
        this.router.navigate(['/home']); // Redirecionar para a página de dashboard ou onde você quiser
      },
      (error) => {
        this.isSubmitting = false;
        this.errorMessage = 'Email ou senha inválidos'; // Mensagem de erro
      }
    );
  }
}
