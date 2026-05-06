package com.hotel.sistemahotelero.trazabilidad;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface HistorialEstadoRepository extends JpaRepository<HistorialEstado, Integer> {
    // Esto nos servirá más adelante para que el Dashboard busque la historia de una habitación específica
    List<HistorialEstado> findByHabitacionIdOrderByFechaHoraDesc(Integer habitacionId);
}