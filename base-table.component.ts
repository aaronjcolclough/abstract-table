import {
  Component,
  Inject,
  InjectionToken,
  Input,
  ViewChild
} from "@angular/core";

import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { AbstractBaseTableComponent } from "./abstract-base-table.component";

@Component({
  selector: 'base-table',
  templateUrl: 'base-table.component.html'
})
export class BAseTableCOmponent<T> extends AbstractBaseTableComponent<T> {
  @Input() displayedColumns: string[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    protected dialog: MatDialog,
    @Inject(new InjectionToken<string>('columns')) protected columns: string[],
    @Inject(new InjectionToken<string>('entType')) protected entType: string,
    @Inject(new InjectionToken<(entity: T) => void>('setStream')) protected setStream: (entity: T) => void,
  ) {
    super(
      dialog,
      entType,
      setStream
    );
    this.displayedColumns = this.displayedColumns ?? this.columns;
  }
}