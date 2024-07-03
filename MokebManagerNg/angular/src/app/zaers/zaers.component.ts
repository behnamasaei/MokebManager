import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ZaerDto } from '@proxy/domain/dtos';
import { ZaerService } from '@proxy';
import { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { PageEvent } from 'src/app/shared/shared.model';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-zaers',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './zaers.component.html',
  styleUrl: './zaers.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class ZaersComponent {
  zaers: PagedResultDto<ZaerDto> = {
    items: [],
    totalCount: 0,
  };
  paged: PagedAndSortedResultRequestDto = { skipCount: 0, maxResultCount: 10 };
  searchValue: string;

  /**
   *
   */
  constructor(
    private zaerService: ZaerService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getZaerData();
  }

  onPageChange(event: PageEvent) {
    this.paged = { skipCount: event.first, maxResultCount: 10 };
    this.getZaerData();
  }

  search() {
    if (this.searchValue !== null && this.searchValue !== '')
      this.zaerService.getSearch(this.searchValue).subscribe(x => (this.zaers.items = x));
    else this.getZaerData();
  }

  getZaerData() {
    this.zaerService.getList(this.paged).subscribe(x => {
      this.zaers.items = x.items;
      this.zaers.totalCount = x.totalCount;
    });
  }

  showInformation(id: string) {
    this.router.navigate(['zaers', id]);
  }

  editZaer(zaer) {
    this.router.navigate(['update-zaers', zaer.id]);
  }

  deleteZaer(zaer: ZaerDto) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.zaerService.delete(zaer.id).subscribe(x => {
          this.deleteItem(zaer.id);
          this.messageService.add({
            severity: 'info',
            summary: 'Confirmed',
            detail: 'Record deleted',
          });
        });
      },
      reject: () => {},
    });
  }

  deleteItem(id: string): void {
    this.zaers.items = this.zaers.items.filter(item => item.id !== id);
  }
}
