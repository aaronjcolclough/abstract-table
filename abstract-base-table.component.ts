import {
  ConfirmDialog
} from "../../../dialogs";

import {
  QueryResult,
  QuerySource
} from "../../../models";

import { SelectionModel } from "@angular/cdk/collections";
import { ComponentType } from "@angular/cdk/portal";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { DialogOptions } from "../../../models";

export abstract class AbstractBaseTableComponent<T> {
  dataSource: MatTableDataSource<T>;
  selection: SelectionModel<T> = new SelectionModel<T>(false, []);
  src: QuerySource<T>;
  query: QueryResult<T>;

  constructor(
    protected dialog: MatDialog,
    protected entType: string,
    protected setStream: (entity: T) => void
  ) { }

  openDialog = (dialog: ComponentType<unkown>, options: DialogOptions) =>
    this.dialog.open(dialog, { ...options }).afterClosed();

  clear = () => {
    this.selection.clear();
    this.setStream(null);
  };

  selectRow = (e: T) => {
    this.selection.toggle(e);

    this.selection.selected.includes(e)
      ? this.setStream()
      : this.clear();
  };

  removeRow = () => this.dialog.open(ConfirmDialog, {
    data: {
      title: `Remove ${this.entityType}?`,
      content: `Are you sure you want to remove this ${this.entityType}?`
    },
    disableClose: true,
    autoFocus: false
  }).afterClosed();

  applyFilter = (filter: string) => {
    this.src?.onSearch(filter);

    this.dataSource?.paginator && this.dataSource.paginator.firstPage();
  }
}