import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {
  registerForm: FormGroup;
  registrationSuccess = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      aceptaTerminos: [false, Validators.requiredTrue]
    }, { validator: this.passwordMatchValidator });
  }


  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const userData = {
        nombre: this.registerForm.value.nombre,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        fechaRegistro: new Date().toISOString()
      };

      // Verificar si el usuario ya existe
      if (this.userExists(userData.email)) {
        this.errorMessage = 'El correo electrónico ya está registrado';
        return;
      }

      // Guardar en localStorage
      this.saveUser(userData);

      // Mostrar mensaje de éxito y redirigir
      this.registrationSuccess = true;
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    }
  }

  private userExists(email: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.some((user: any) => user.email === email);
  }

  private saveUser(userData: any): void {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));

    // También guardamos el usuario actual en sessionStorage
    sessionStorage.setItem('currentUser', JSON.stringify(userData));
  }
}