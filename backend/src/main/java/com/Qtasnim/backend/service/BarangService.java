package com.Qtasnim.backend.service;

import com.Qtasnim.backend.model.Barang;
import com.Qtasnim.backend.repository.BarangRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class BarangService {

    private final BarangRepository barangRepository;

    public BarangService(BarangRepository barangRepository) {
        this.barangRepository = barangRepository;
    }

    public List<Barang> getAllBarang() {
        return barangRepository.findAll();
    }

    public Barang getBarangById(UUID id) { 
        return barangRepository.findById(id);
    }

    public void createBarang(Barang barang) {
        barang.id = UUID.randomUUID(); 
        barangRepository.save(barang);
    }

    public int updateBarang(Barang barang) { 
        return barangRepository.update(barang);
    }
    
    public List<Barang> getBarangPaginated(int page, int size) {
        return barangRepository.getBarangPaginated(page, size);
    }

    public void deleteBarang(UUID id) { 
        barangRepository.delete(id);
    }

    public List<Barang> searchBarang(String keyword) {
        return barangRepository.search(keyword);
    }

    public List<Barang> sortBarangByNama() {
        return barangRepository.sortByNama();
    }

    public List<Barang> sortBarangByTanggal() {
        return barangRepository.sortByTanggal();
    }

    public List<Barang> getBarangByJenisSorted(String jenisBarang, boolean ascending) {
        return barangRepository.getBarangByJenisSorted(jenisBarang, ascending);
    }

    public List<Barang> getBarangByDateRange(LocalDate startDate, LocalDate endDate) {
        return barangRepository.findByDateRange(startDate, endDate);
    }
}