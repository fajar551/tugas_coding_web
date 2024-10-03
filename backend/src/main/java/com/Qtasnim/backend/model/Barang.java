package com.Qtasnim.backend.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.util.UUID;

@Data
public class Barang {
    public UUID id; 

    @NotBlank(message = "Nama barang tidak boleh kosong")
    public String nama_barang;

    @NotNull(message = "Stok tidak boleh null")
    public Integer stok;

    @NotNull(message = "Jumlah terjual tidak boleh null")
    public Integer jumlah_terjual;

    @NotNull(message = "Tanggal transaksi tidak boleh null")
    public LocalDate tanggal_transaksi;

    @NotBlank(message = "Jenis barang tidak boleh kosong")
    public String jenis_barang;
    
    public Barang(UUID id, String nama_barang, int stok, int jumlah_terjual, LocalDate tanggal_transaksi, String jenis_barang) {
        this.id = id;
        this.nama_barang = nama_barang;
        this.stok = stok;
        this.jumlah_terjual = jumlah_terjual;
        this.tanggal_transaksi = tanggal_transaksi;
        this.jenis_barang = jenis_barang;
    }
    
    public Barang() {}
}
