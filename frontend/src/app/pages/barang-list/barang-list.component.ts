import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { faPencilAlt, faTrashAlt, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Barang } from './../../../model/barang.model';
import { ConfirmDialogComponent } from './../../components/confirm-dialog/confirm-dialog.component';
import { BarangService } from './../service/barang-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-barang-list',
  templateUrl: './barang-list.component.html',
  styleUrls: ['./barang-list.component.css']
})
export class BarangListComponent implements OnInit, OnDestroy {
  barangList: Barang[] = [];
  keyword: string = '';
  currentPage: number = 0;
  pageSize: number = 5;
  totalItems: number = 0;
  startDate: string | undefined;
  endDate: string | undefined;
  loading: boolean = false;
  isShowAll: boolean = false;
  selectedSortOption: string = '';
  isDropdownOpen: { [key: string]: boolean } = {};
  faPencilAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;
  faCirclePlus = faCirclePlus;

  private searchSubject = new Subject<string>();

  constructor(
    private barangService: BarangService,
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadAllBarang();

    this.searchSubject.pipe(debounceTime(300)).subscribe(keyword => {
      this.searchBarang(keyword);
    });

    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown')) {
        this.closeAllDropdowns();
      }
    });
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.closeAllDropdowns.bind(this));
  }

  toggleDropdown(id: string): void {
    for (const key in this.isDropdownOpen) {
      if (key !== id) {
        this.isDropdownOpen[key] = false;
      }
    }
    this.isDropdownOpen[id] = !this.isDropdownOpen[id];
  }

  testNotification() {
    this.toastr.success('Barang berhasil dihapus!', 'Berhasil');
  }

  closeAllDropdowns(): void {
    for (const key in this.isDropdownOpen) {
      this.isDropdownOpen[key] = false;
    }
  }

  loadAllBarang(): void {
    this.barangService.getBarangPaginated(this.currentPage, this.pageSize).subscribe(data => {
      this.barangList = data;
      this.loading = false;
      this.totalItems = data.length;
      this.sortBarangList();
    }, error => {
      console.error('Error fetching barang:', error);
      this.loading = false;
    });
  }

  addOrUpdateBarang(newBarang: Barang): void {
    this.barangList.unshift(newBarang);
    this.totalItems++;
  }

  showAll(): void {
    this.isShowAll = true;
    this.currentPage = 0;
    this.barangService.getAllBarang().subscribe(data => {
      this.barangList = data;
      this.sortBarangList();
      this.totalItems = data.length;
    }, error => {
      console.error('Error fetching all barang:', error);
    });
  }

  sortBarangList(): void {
    this.barangList.sort((a, b) => {
      const dateA = new Date(a.tanggal_transaksi);
      const dateB = new Date(b.tanggal_transaksi);
      return dateB.getTime() - dateA.getTime();
    });
  }

  addBarang(): void {
    this.router.navigate(['/barang/create']);
  }

  editBarang(id: string): void {
    this.router.navigate(['/barang/edit', id]);
  }

  deleteBarang(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.barangService.deleteBarang(id).subscribe({
          next: () => {
            this.loadAllBarang();
            this.toastr.warning('Barang berhasil dihapus!', 'Berhasil');
          },
          error: () => {
            this.toastr.error('Gagal menghapus barang!', 'Error');
          }
        });
      }
    });
  }

  searchBarang(keyword: string = this.keyword): void {
    if (keyword) {
      this.barangService.searchBarang(keyword).subscribe(data => {
        this.barangList = data;
        this.totalItems = data.length;
      });
    } else {
      this.loadAllBarang();
    }
  }

  onKeywordChange(keyword: string): void {
    this.keyword = keyword;
    this.searchSubject.next(keyword);
  }

  nextPage(): void {
    this.currentPage++;
    this.loadAllBarang();
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadAllBarang();
    }
  }

  sortByNama(): void {
    this.barangService.sortBarangByNama().subscribe(data => {
      this.barangList = data;
      this.totalItems = data.length;
    });
  }

  sortByTanggal(): void {
    this.barangService.sortBarangByTanggal().subscribe(data => {
      this.barangList = data;
      this.totalItems = data.length;
    });
  }

  filterByDateRange(): void {
    if (this.startDate && this.endDate) {
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);

      if (start <= end) {
        this.barangService.filterBarangByDateRange(this.startDate, this.endDate).subscribe(data => {
          this.barangList = data;
          this.totalItems = data.length;
        });
      } else {
        console.log('Tanggal mulai tidak boleh setelah tanggal akhir.');
      }
    } else {
      console.log('Silakan pilih tanggal mulai dan akhir.');
    }
  }

  onSortChange(): void {
    if (this.selectedSortOption === 'name') {
      this.sortByNama();
    } else if (this.selectedSortOption === 'date') {
      this.sortByTanggal();
    }
  }
}
