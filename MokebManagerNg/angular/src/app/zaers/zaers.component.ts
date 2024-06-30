import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ZaerDto } from '@proxy/domain/dtos';
import { ZaerService } from '@proxy';
import { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { PageEvent } from 'src/app/shared/shared.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-zaers',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './zaers.component.html',
  styleUrl: './zaers.component.scss',
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
  constructor(private zaerService: ZaerService,private router: Router,) {}

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

  showInformation(id:string){
    this.router.navigate(['zaers',id])
  }
}
