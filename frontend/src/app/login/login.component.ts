import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../service/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  identificador: string = '';
  senha: string = '';
  permanecerConectado: boolean = false;

  constructor(private service: UsuarioService, private router: Router) {}

  login() {
    const payload = {
      identificador: this.identificador.trim(),
      senha: this.senha,
      permanecerConectado: this.permanecerConectado,
    };

    this.service.login(payload).subscribe({
      next: () => {
        // Aguarda carregamento do usuário para navegar
        setTimeout(() => {
          alert('Login realizado com sucesso!');
          this.router.navigate(['/dashboard']);
        }, 500);
      },
      error: (err) => {
        alert(err.error?.message || 'Erro ao fazer login');
      },
    });
  }

  ngOnInit() {
    const token = localStorage.getItem('token'); // só localStorage, não sessionStorage
    if (token) {
      this.router.navigate(['/dashboard']);
    }
  }

  onInputIdentificador() {
    const apenasNumeros = this.identificador.replace(/\D/g, '');

    if (apenasNumeros.length > 0 && /^[0-9()\s]*$/.test(this.identificador)) {
      this.identificador = this.formatarTelefone(apenasNumeros);
    }
  }

  formatarTelefone(numero: string): string {
    if (numero.length <= 2) return '(' + numero;
    if (numero.length <= 7)
      return '(' + numero.substring(0, 2) + ') ' + numero.substring(2);
    if (numero.length <= 11)
      return (
        '(' +
        numero.substring(0, 2) +
        ') ' +
        numero.substring(2, 7) +
        ' ' +
        numero.substring(7)
      );
    return numero;
  }
}
