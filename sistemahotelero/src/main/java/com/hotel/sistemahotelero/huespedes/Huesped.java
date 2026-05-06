package com.hotel.sistemahotelero.huespedes;

import com.hotel.sistemahotelero.seguridad.Usuario; // Importamos la relación
import jakarta.persistence.*;

@Entity
@Table(name = "huesped")
public class Huesped {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "dni", unique = true, nullable = false)
    private String dni; // Ahora coincide con el Service

    @Column(nullable = false, length = 100)
    private String nombres;

    @Column(nullable = false, length = 100)
    private String apellidos;

    @Column(length = 20)
    private String telefono;

    // --- VINCULACIÓN CON LA APP ---
    @OneToOne
    @JoinColumn(name = "usuario_id", nullable = true) // Es opcional
    private Usuario usuario;

    // Constructor vacío
    public Huesped() {
    }

    // Constructor con parámetros
    public Huesped(String dni, String nombres, String apellidos, String telefono) {
        this.dni = dni;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.telefono = telefono;
    }

    // --- Getters y Setters ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDni() { return dni; }
    public void setDni(String dni) { this.dni = dni; }

    public String getNombres() { return nombres; }
    public void setNombres(String nombres) { this.nombres = nombres; }

    public String getApellidos() { return apellidos; }
    public void setApellidos(String apellidos) { this.apellidos = apellidos; }

    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }
}