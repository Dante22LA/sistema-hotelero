package com.hotel.sistemahotelero.operaciones;

import com.hotel.sistemahotelero.configuracion.Habitacion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/operaciones") // Ajustado para que coincida con tu RoomService de Angular
public class OperacionesController {

    @Autowired
    private HabitacionService habitacionService;

    /**
     * Registro de Entrada (Check-In)
     * Angular envía: { huespedId: número } en el body
     */
    @PostMapping("/check-in")
    public Habitacion realizarCheckIn(
            @PathVariable Long habitacionId,
            @RequestBody Map<String, Long> payload) {

        // Extraemos el ID del huésped del cuerpo JSON
        Long huespedId = payload.get("huespedId");

        return habitacionService.realizarCheckIn(habitacionId, huespedId);
    }

    /**
     * Registro de Salida (Check-Out)
     * Angular envía: { total: X, metodoPago: X, tiempoUso: X } en el body
     */
    @PostMapping("/{habitacionId}/check-out")
    public Habitacion realizarCheckOut(
            @PathVariable Long habitacionId,
            @RequestBody Map<String, Object> payload) {

        // Convertimos los datos del JSON a los tipos que espera el Service
        Double monto = Double.valueOf(payload.get("total").toString());
        String medioPago = (String) payload.get("metodoPago");
        String tiempoEstadia = (String) payload.get("tiempoUso");

        return habitacionService.realizarCheckOut(habitacionId, monto, medioPago, tiempoEstadia);
    }
}