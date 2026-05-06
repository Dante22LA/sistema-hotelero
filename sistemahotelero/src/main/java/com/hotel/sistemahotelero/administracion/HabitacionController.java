package com.hotel.sistemahotelero.administracion;

import com.hotel.sistemahotelero.configuracion.EstadoHabitacion;
import com.hotel.sistemahotelero.configuracion.Habitacion;
import com.hotel.sistemahotelero.configuracion.HabitacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/habitaciones")
public class HabitacionController {

    @Autowired
    private HabitacionRepository habitacionRepository;

    @Autowired
    private HotelRepository hotelRepository;

    // 1. LISTAR HABITACIONES FILTRADAS POR HOTEL
    @GetMapping("/hotel/{hotelId}")
    public List<Habitacion> listarPorHotel(@PathVariable Long hotelId) {
        // 🚨 CAMBIO: Quitamos el guion bajo para que coincida con el Repositorio
        return habitacionRepository.findByHotelId(hotelId);
    }

    @PostMapping
    public Habitacion crearHabitacion(@RequestBody Habitacion nuevaHabitacion) {
        Long idBuscado = nuevaHabitacion.getHotelIdRecibido();

        if (idBuscado == null) {
            throw new RuntimeException("ID de hotel no proporcionado");
        }

        Hotel hotel = hotelRepository.findById(idBuscado)
                .orElseThrow(() -> new RuntimeException("Hotel no existe"));

        // 🚨 CAMBIO: Usamos el nuevo nombre del método aquí también
        long cantidadActual = habitacionRepository.countByHotelId(hotel.getId());

        if (cantidadActual >= hotel.getLimiteHabitaciones()) {
            throw new RuntimeException("Límite alcanzado para el plan " + hotel.getPlan());
        }

        nuevaHabitacion.setHotel(hotel);
        nuevaHabitacion.setEstadoActual(EstadoHabitacion.DISPONIBLE);

        return habitacionRepository.save(nuevaHabitacion);
    }
}