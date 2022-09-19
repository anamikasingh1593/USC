import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import {
  BetaService
} from '../beta.service';
import {
  FormControl,
  Validators
} from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  filter
} from 'rxjs/operators';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import {
  Item
} from '../model';

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.scss'],
})

export class FindComponent implements OnInit {
  myControl = new FormControl();
  beta: BetaService;
  count = 10;
  searchCount = 100;
  startIndex = 0
  newData: any = [];
  filteredOptions: any;
  resultData: any = [];
  detailInfo: any = [];

  constructor(private betaService: BetaService, public dialog: MatDialog) {
    this.beta = betaService,
      this.filteredOptions = this.myControl.valueChanges.pipe(
        debounceTime(400),
        filter((searchTerm: string) => searchTerm.trim().length > 1),
        distinctUntilChanged(),
        switchMap((searchTerm: string) => {
          return this.betaService.getSearchAutoSuggests(searchTerm, this.count)
        })
      ).subscribe({
        next: (result) => {
          this.newData = result.Items;
        }
      })
  }

  ngOnInit(): void {

  }

  showSearchResult(selectedOption: string) {
    this.betaService.getSearchResults(selectedOption, this.startIndex, this.searchCount)
      .subscribe((data) => {
        this.resultData = data.Items;
      });

  }

  getDetails(code: number) {
    this.betaService.getItem(code)
      .subscribe((data) => {
        this.detailInfo = data;
        const dialogRef = this.dialog.open(FindDetail, {
          width: '450px',
          data: {
            TapeLabel: this.detailInfo.TapeLabel,
            LanguageLabel: this.detailInfo.LanguageLabel,
            ImageURL: this.detailInfo.ImageURL,
            GrantStatement: this.detailInfo.GrantStatement,
            ExperienceGroup: this.detailInfo.ExperienceGroup,
            Length: this.detailInfo.Length,
            OrganizationName: this.detailInfo.OrganizationName
          }
        });
      });
  }
}

@Component({
  selector: 'find-detail',
  templateUrl: 'find-detail.html',
  styleUrls: ['./find.component.scss'],
})
export class FindDetail {
  constructor(
    public dialogRef: MatDialogRef < FindDetail > , @Inject(MAT_DIALOG_DATA) public data: Item) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}
