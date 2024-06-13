import { PagedAndSortedResultRequestDto } from '@abp/ng.core';
import { Component } from '@angular/core';
import { MokebService } from '@proxy';
import { MokebDto } from '@proxy/domain/dtos';

@Component({
  selector: 'app-mokeb',
  templateUrl: './mokeb.component.html',
  styleUrl: './mokeb.component.scss',
})
export class MokebComponent {
  totalCount: number = 0;
  mokebs: MokebDto[] = [];
  paged: PagedAndSortedResultRequestDto = { skipCount: 0, maxResultCount: 10 };

  /**
   *
   */
  constructor(private mokebService: MokebService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.mokebService.getList(this.paged).subscribe(x => {
      this.mokebs = x.items;
      this.totalCount = x.totalCount;
    });
  }
}
