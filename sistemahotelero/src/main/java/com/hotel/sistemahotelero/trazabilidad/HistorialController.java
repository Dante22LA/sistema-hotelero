package com.hotel.sistemahotelero.trazabilidad;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/historial")
public class HistorialController {

    @Autowired
    private HistorialEstadoRepository historialRepository;

    // Este endpoint devolverá toda la bitácora de una habitación específica
    @GetMapping("/{habitacionId}")
    public List<HistorialEstado> obtenerHistorialPorHabitacion(@PathVariable Integer habitacionId) {
        return historialRepository.findByHabitacionIdOrderByFechaHoraDesc(habitacionId);
    }
}
