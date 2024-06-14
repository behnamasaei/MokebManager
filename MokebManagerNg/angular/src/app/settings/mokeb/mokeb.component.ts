import { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MokebDto } from '@proxy/domain/dtos';
import { MokebService } from '@proxy/mokeb.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PageEvent } from 'src/app/shared/shared.model';

@Component({
  selector: 'app-mokeb',
  templateUrl: './mokeb.component.html',
  styleUrl: './mokeb.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class MokebComponent {
  mokeb: PagedResultDto<MokebDto> = {
    items: [],
    totalCount: 0,
  };

  paged: PagedAndSortedResultRequestDto = { skipCount: 0, maxResultCount: 10 };

  /**
   *
   */
  constructor(
    private mokebService: MokebService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.mokebService.getList(this.paged).subscribe(x => {
      this.mokeb.items = x.items;
      this.mokeb.totalCount = x.totalCount;
    });
  }

  openNew() {
    this.router.navigate(['/settings/create-update-mokeb']);
  }

  editMokeb(mokeb: MokebDto) {
    this.router.navigate(['/settings/create-update-mokeb', mokeb.id]);
  }

  deleteMokeb(mokeb: MokebDto) {
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
        this.mokebService.delete(mokeb.id).subscribe(x => {
          this.deleteItem(mokeb.id);
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
    this.mokeb.items = this.mokeb.items.filter(item => item.id !== id);
  }

  onPageChange(event: PageEvent) {
    this.paged = { skipCount: event.first, maxResultCount: 10 };
    this.mokebService.getList(this.paged).subscribe(x => {
      this.mokeb.items = x.items;
      this.mokeb.totalCount = x.totalCount;
    });
  }
}
