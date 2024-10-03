package com.Qtasnim.backend.repository;

import com.Qtasnim.backend.model.Barang;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public class BarangRepository {

    private final JdbcTemplate jdbcTemplate;

    public BarangRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Barang> rowMapper = new RowMapper<Barang>() {
        @Override
        public Barang mapRow(ResultSet rs, int rowNum) throws SQLException {
            return new Barang(
                    UUID.fromString(rs.getString("id")),
                    rs.getString("nama_barang"),
                    rs.getInt("stok"),
                    rs.getInt("jumlah_terjual"),
                    rs.getDate("tanggal_transaksi").toLocalDate(),
                    rs.getString("jenis_barang")
            );
        }
    };

    public List<Barang> getBarangPaginated(int page, int size) {
        String sql = "SELECT * FROM barang ORDER BY id LIMIT ? OFFSET ?";
        return jdbcTemplate.query(sql, new Object[]{size, page * size}, rowMapper);
    }

    public List<Barang> findAll() {
        String sql = "SELECT * FROM barang";
        return jdbcTemplate.query(sql, rowMapper);
    }

    public Barang findById(UUID id) {
        String sql = "SELECT * FROM barang WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{id}, rowMapper);
    }

    public int save(Barang barang) {
        String sql = "INSERT INTO barang (id, nama_barang, stok, jumlah_terjual, tanggal_transaksi, jenis_barang) VALUES (?, ?, ?, ?, ?, ?)";
        UUID newId = UUID.randomUUID(); 
        System.out.println("Executing SQL: " + sql);
        System.out.println("Parameters: " + newId + ", " + barang.nama_barang + ", " + barang.stok + ", " + barang.jumlah_terjual + ", " + barang.tanggal_transaksi + ", " + barang.jenis_barang);

        return jdbcTemplate.update(sql,
                newId,
                barang.nama_barang,
                barang.stok,
                barang.jumlah_terjual,
                barang.tanggal_transaksi,
                barang.jenis_barang);
    }

    public int update(Barang barang) {
        String sql = "UPDATE barang SET nama_barang = ?, stok = ?, jumlah_terjual = ?, tanggal_transaksi = ?, jenis_barang = ? WHERE id = ?";
        
        System.out.println("Executing SQL: " + sql);
        System.out.println("Parameters: " + barang.nama_barang + ", " + barang.stok + ", " + barang.jumlah_terjual + ", " + barang.tanggal_transaksi + ", " + barang.jenis_barang + ", " + barang.id);
        
        if (barang.id == null) {
            System.out.println("ID is null, cannot perform update.");
            return 0;
        }

        return jdbcTemplate.update(sql,
                barang.nama_barang,
                barang.stok,
                barang.jumlah_terjual,
                barang.tanggal_transaksi,
                barang.jenis_barang,
                barang.id); 
    }
    
    public int delete(UUID id) {
        String sql = "DELETE FROM barang WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }
    
    public List<Barang> search(String keyword) {
        String sql = "SELECT * FROM barang WHERE nama_barang ILIKE ?";
        return jdbcTemplate.query(sql, new Object[]{"%" + keyword + "%"}, rowMapper);
    }

    public List<Barang> sortByNama() {
        String sql = "SELECT * FROM barang ORDER BY nama_barang ASC";
        return jdbcTemplate.query(sql, rowMapper);
    }
    
    public List<Barang> sortByTanggal() {
        String sql = "SELECT * FROM barang ORDER BY tanggal_transaksi ASC";
        return jdbcTemplate.query(sql, rowMapper);
    }

    public List<Barang> getBarangByJenisSorted(String jenisBarang, boolean ascending) {
        String sql = "SELECT * FROM barang WHERE jenis_barang = ? ORDER BY jumlah_terjual " + (ascending ? "ASC" : "DESC");
        return jdbcTemplate.query(sql, new Object[]{jenisBarang}, new BeanPropertyRowMapper<>(Barang.class));
    }

    public List<Barang> findByDateRange(LocalDate startDate, LocalDate endDate) {
        String sql = "SELECT * FROM barang WHERE tanggal_transaksi BETWEEN ? AND ?";
        LocalDate adjustedEndDate = endDate.plusDays(1);
        return jdbcTemplate.query(sql, new Object[]{startDate, adjustedEndDate}, rowMapper);
    }
}
