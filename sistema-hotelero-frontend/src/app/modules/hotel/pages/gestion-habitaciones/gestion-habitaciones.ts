import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-habitaciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-habitaciones.html',
  styleUrls: ['./gestion-habitaciones.css'],
})
export class GestionHabitacionesComponent implements OnInit {
  // --- PROPIEDADES ---
  habitaciones: any[] = [];
  pisosDisponibles = [1, 2, 3, 4, 5];
  idHotel: number = 0;

  filtroSeleccionado: string = 'TODOS';
  habSeleccionada: any = null; // Para el Modal de detalles

  nuevaHabitacion: any = {
    piso: 1,
    numero: '',
    descripcion: '',
    limitePersonas: 2,
    camasSimples: 1,
    camasDobles: 1,
    horasMinimas: 6,
    precioMinimo: 0,
    precio12Horas: 0,
    precio24Horas: 0,
    precioHoraExtra: 0,
    hotelId: 0, // Se llenará en el ngOnInit
  };

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {}

  ngOnInit() {
    // 1. Obtenemos el ID del hotel seleccionado del localStorage
    const storedId = localStorage.getItem('hotelId');

    if (storedId) {
      this.idHotel = Number(storedId);
      // 2. Seteamos el ID en el objeto de creación para que no se pierda
      this.nuevaHabitacion.hotelId = this.idHotel;
      // 3. Cargamos los datos filtrados
      this.listarHabitaciones();
    } else {
      // Si no hay hotelId, lo mandamos a la pantalla de selección por seguridad
      console.warn('⚠️ No se detectó hotel activo, redirigiendo...');
      this.router.navigate(['/seleccion']);
    }
  }

  // --- LÓGICA DE DATOS ---

  listarHabitaciones() {
    // Usamos el endpoint específico de hotel para traer solo lo que pertenece a esta sede
    this.http.get<any[]>(`http://localhost:8080/api/habitaciones/hotel/${this.idHotel}`).subscribe({
      next: (data) => {
        this.habitaciones = data;
        console.log(`✅ ${data.length} habitaciones cargadas para el hotel ${this.idHotel}`);
        this.cdr.detectChanges(); // Forzamos a Angular a pintar los cambios
      },
      error: (err) => {
        console.error('❌ Error al listar habitaciones:', err);
      },
    });
  }

  guardarHabitacion() {
    // Aseguramos que el hotelId esté presente antes de enviar el POST
    this.nuevaHabitacion.hotelId = this.idHotel;

    this.http.post('http://localhost:8080/api/habitaciones', this.nuevaHabitacion).subscribe({
      next: () => {
        alert('Habitación guardada exitosamente en esta sede.');
        this.listarHabitaciones(); // Refrescamos la lista
        this.limpiarFormulario();
      },
      error: (err) => alert('Error al guardar: ' + err.message),
    });
  }

  // --- MÉTODOS DE VISTA Y FILTRO ---

  contarPorEstado(estado: string): number {
    return this.habitaciones.filter((h) => h.estadoActual === estado).length;
  }

  setFiltro(estado: string) {
    this.filtroSeleccionado = this.filtroSeleccionado === estado ? 'TODOS' : estado;
  }

  obtenerHabitacionesPorPiso(piso: number) {
    let filtradas = this.habitaciones.filter((h) => h.piso == piso);
    if (this.filtroSeleccionado !== 'TODOS') {
      filtradas = filtradas.filter((h) => h.estadoActual === this.filtroSeleccionado);
    }
    return filtradas;
  }

  verDetalle(hab: any) {
    this.habSeleccionada = hab;
  }

  cerrarDetalle() {
    this.habSeleccionada = null;
  }

  limpiarFormulario() {
    this.nuevaHabitacion = {
      ...this.nuevaHabitacion, // Mantenemos el hotelId y el piso actual
      numero: '',
      descripcion: '',
      precioMinimo: 0,
      precio12Horas: 0,
      precio24Horas: 0,
      precioHoraExtra: 0,
    };
  }

  irACheckIn(idHabitacion: number) {
    this.router.navigate(['/checkin', idHabitacion]);
  }
}
