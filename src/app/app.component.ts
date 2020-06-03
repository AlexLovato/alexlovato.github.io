import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from './dialog.component';
import { DataService } from './data.service';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentPage = 0;
  list = [];
  private obsSource: BehaviorSubject<any>;
  public obs: Observable<any>;
  constructor(public dialog: MatDialog, private dataService: DataService) {

  }

  ngOnInit() {
    this.obsSource  = new BehaviorSubject(this.list);
    this.obs = this.obsSource.asObservable();
    this.getData();
  }

  handler(e) {
    if (e >  ((this.currentPage * 50) - 30)) {
      this.getData();
    }
  }

  openDialog(movie): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '500px',
      data: movie
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  getData() {
    this.currentPage++;
    this.dataService.loadPageResults(this.currentPage, 'seeds').subscribe((res:any) => {
      console.log(res);
      this.dataService.setCache(this.currentPage, 'seeds', res);
      if (res && res.data && res.data.movies) {
        let newList = [...this.list, ...res.data.movies]
        this.list = newList;
        this.obsSource.next(newList);
      }
    })

  }

  title = 'list-movies';
}
