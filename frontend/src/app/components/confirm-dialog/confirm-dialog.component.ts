import { Component, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon'; 

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <mat-card class="confirm-dialog" #dialogCard>
      <div class="dialog-header">
        <h1 mat-dialog-title>Konfirmasi ⚠️</h1>
      </div>
      <mat-card-content>
        <div class="dialog-content">
          <p>Apakah Anda yakin ingin menghapus barang ini ❓</p>
        </div>
      </mat-card-content>
      <mat-card-actions class="action-buttons">
        <button type="button" class="btn btn-outline-dark" (click)="onNoClick()">Tidak</button>
        <button type="button" class="btn btn-outline-danger" (click)="onYesClick()">Ya</button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    .confirm-dialog {
      min-width: 400px;
      text-align: center;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); /* Bayangan untuk tampilan yang lebih menarik */
    }

    .dialog-header {
      background-color: #343a40; /* Latar belakang hitam */
      color: white;
      padding: 10px; /* Menambahkan padding untuk tampilan yang lebih baik */
    }

    .dialog-content {
      display: flex;
      align-items: center; /* Pusatkan isi secara vertikal */
      justify-content: center; /* Pusatkan isi secara horizontal */
      margin-top: 10px;
    }

    .dialog-icon {
      color: #ffc107; /* Warna kuning untuk ikon peringatan */
      font-size: 40px; /* Ukuran ikon */
      margin-right: 10px; /* Jarak antara ikon dan teks */
    }

    .action-buttons {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-top: 10px;
    }

    .action-buttons button {
      margin: 0;
      user-select: none; /* Mencegah teks tombol agar tidak dapat diseleksi */
    }
  `],
  standalone: true,
  imports: [MatCardModule, MatIconModule], // Tambahkan MatIconModule ke imports
})
export class ConfirmDialogComponent {
  @ViewChild('dialogCard', { static: true }) dialogCard!: ElementRef;

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) { }

  ngAfterViewInit() {
    this.dialogCard.nativeElement.focus();
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
