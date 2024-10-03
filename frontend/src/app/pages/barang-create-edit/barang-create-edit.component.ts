import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Barang } from './../../../model/barang.model';
import { BarangService } from './../service/barang-service.service';

@Component({
  selector: 'app-barang-create-edit',
  templateUrl: './barang-create-edit.component.html',
  styleUrls: ['./barang-create-edit.component.css'],
})
export class BarangCreateEditComponent implements OnInit {
  barang: Barang = {
    id: '',
    nama_barang: '',
    stok: 0,
    jumlah_terjual: 0,
    tanggal_transaksi: '',
    jenis_barang: ''
  };

  isEditMode: boolean = false;

  constructor(
    private barangService: BarangService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.barangService.getBarangById(id).subscribe(data => {
        this.barang = data;
      });
    }
  }

  back() {
    this.router.navigate(['/barang']);
  }

  createOrUpdateBarang(): void {
    if (this.isEditMode) {
      this.barangService.updateBarang(this.barang.id, this.barang).subscribe(() => {
        this.toastr.success('Barang berhasil diperbarui!', 'Berhasil');
        this.router.navigate(['/barang']);
      }, error => {
        this.toastr.error('Gagal memperbarui barang!', 'Error');
      });
    } else {
      this.barangService.createBarang(this.barang).subscribe(() => {
        this.toastr.success('Barang berhasil ditambahkan!', 'Berhasil');
        this.router.navigate(['/barang']);
      }, error => {
        this.toastr.error('Gagal menambahkan barang!', 'Error');
      });
    }
  }
}
