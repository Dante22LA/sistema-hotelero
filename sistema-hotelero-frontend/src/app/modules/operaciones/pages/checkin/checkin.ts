import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-checkin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkin.html',
  styleUrls: ['./checkin.css'],
})
export class CheckinComponent implements OnInit {
  idHabitacion: number = 0;
  buscandoDni: boolean = false;

  // Objeto Huesped (Campos que pide tu Java)
  huesped = {
    dni: '',
    nombres: '',
    apellidos: '',
    telefono: '',
    email: '',
  };

  // Datos extra de la operación
  operacion = {
    adelanto: 0,
    observacion: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    // Capturamos el ID de la URL (el :id que definimos en las rutas)
    this.route.params.subscribe((params) => {
      this.idHabitacion = +params['id'];
    });
  }

  // LÓGICA DE AUTO-LLENADO
  buscarDni() {
    if (this.huesped.dni.length !== 8) {
      alert('El DNI debe tener 8 dígitos');
      return;
    }

    this.buscandoDni = true;

    // Aquí llamarás a tu servicio de Java. Por ahora simulamos el éxito:
    setTimeout(() => {
      if (this.huesped.dni === '12345678') {
        // Prueba con este número
        this.huesped.nombres = 'Davisito';
        this.huesped.apellidos = 'Agurto';
        this.huesped.telefono = '987654321';
      } else {
        alert('DNI no registrado. Por favor, complete los datos.');
      }
      this.buscandoDni = false;
    }, 800);
  }

  confirmarCheckIn() {
    const dataFinal = {
      idHabitacion: this.idHabitacion,
      huesped: this.huesped,
      adelanto: this.operacion.adelanto,
      observacion: this.operacion.observacion,
    };

    console.log('Enviando datos de Check-In:', dataFinal);

    this.http.post('http://localhost:8080/api/operaciones/checkin', dataFinal).subscribe({
      next: () => {
        alert('Check-In exitoso');
        this.router.navigate(['/gestion-pisos']); // O la ruta de tus habitaciones
      },
      error: (err) => alert('Error al procesar: ' + err.message),
    });
  }
  regresar() {
    this.router.navigate(['/gestion-pisos']);
  }
}
