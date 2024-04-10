import { Subject, takeUntil } from 'rxjs';
import ODataQueryCommand from 'src/lib/odata/ODataCommand';

import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import User from '@domain/user/user.model';

@Component({
	selector: 'app-paginator',
	templateUrl: './paginator.component.html',
	styleUrl: './paginator.component.scss',
})
export class PaginatorComponent implements OnInit {
	@Input({ required: true })
	public queryCommand!: ODataQueryCommand<User>;

	@Input()
	public disabled: boolean = false;

	@Input()
	public showFirstLastButtons: boolean = true;

	@Input()
	public hidePageSize: boolean = false;

	@Input()
	public pageIndex: number = 0;

	@Input()
	public pageSizeOptions: number[] = [5, 15, 25, 50];

	@Input()
	public pageSize: number = 15;

	public length: number = 0;

	private $delete: Subject<void> = new Subject();

	ngOnInit(): void {
		this.queryCommand.params = { $count: true };

		this.queryCommand.response$.pipe(takeUntil(this.$delete)).subscribe((res) => {
			this.length = res['@odata.count'] ?? 0;
		});

		this.updateQuery();
	}

	public handlePageEvent(event: PageEvent) {
		this.pageIndex = event.pageIndex;
		this.pageSize = event.pageSize;

		this.updateQuery();
	}

	private updateQuery() {
		this.queryCommand.params = {
			$top: this.pageSize,
			$skip: this.pageIndex * this.pageSize,
		};

		this.queryCommand.execute();
	}
}
