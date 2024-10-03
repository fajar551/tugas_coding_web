package com.Qtasnim.backend.controller;

import com.Qtasnim.backend.model.Barang;
import com.Qtasnim.backend.service.BarangService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/barang")
public class BarangController {

    private final BarangService barangService;

    public BarangController(BarangService barangService) {
        this.barangService = barangService;
    }

    @GetMapping
    public List<Barang> getAllBarang() {
        return barangService.getAllBarang();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Barang> getBarangById(@PathVariable String id) {
        Barang barang = barangService.getBarangById(UUID.fromString(id)); 
        return barang != null ? ResponseEntity.ok(barang) : ResponseEntity.notFound().build();
    }

    @GetMapping("/datatable")
    public List<Barang> getBarangPaginated(@RequestParam int page, @RequestParam int size) {
        return barangService.getBarangPaginated(page, size);
    }

    @PostMapping
    public ResponseEntity<Void> createBarang(@RequestBody Barang barang) {
        barangService.createBarang(barang);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateBarang(@PathVariable String id, @RequestBody Barang barang) {
        System.out.println("Received ID: " + id);
        System.out.println("Received Barang: " + barang);

        barang.id = UUID.fromString(id);
        int result = barangService.updateBarang(barang);
        if (result > 0) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBarang(@PathVariable String id) {
        barangService.deleteBarang(UUID.fromString(id)); 
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public List<Barang> searchBarang(@RequestParam String keyword) {
        return barangService.searchBarang(keyword);
    }

    @GetMapping("/sort/nama")
    public List<Barang> sortByNama() {
        return barangService.sortBarangByNama();
    }

    @GetMapping("/sort/tanggal")
    public List<Barang> sortByTanggal() {
        return barangService.sortBarangByTanggal();
    }

    @GetMapping("/compare/jenis")
    public ResponseEntity<List<Barang>> compareByJenis(
            @RequestParam String jenis_barang,
            @RequestParam(defaultValue = "true") boolean ascending) {

        List<Barang> result = barangService.getBarangByJenisSorted(jenis_barang, ascending);
        
        System.out.println("Result size: " + result.size());

        return ResponseEntity.ok(result);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<Barang>> filterByDateRange(@RequestParam String startDate, @RequestParam String endDate) {
        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate).plusDays(1);
        List<Barang> barangList = barangService.getBarangByDateRange(start, end);
        return ResponseEntity.ok(barangList);
    }
}