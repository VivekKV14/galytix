import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data-service.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {
  public countryList: any[] = [];
  public filteredList: any[] = [];
  public isLoading: boolean = true;
  public currSortOrder: number = null;
  public searchControl = new FormControl('');

  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {
    this.getCountryData();
    this.searchControl.valueChanges.pipe(debounceTime(200)).subscribe(val => {
      this.getFilteredData();
    })
  }

  getCountryData(): void {
    this.data.getCountryList().subscribe(res => {
      this.countryList = res;
      this.filteredList = this.countryList;
      this.isLoading = false;
    })
  }

  getFilteredData(): void {
    this.filteredList = this.countryList.filter(country => {
      const countryName = (country.name || {}).common || "";
      this.currSortOrder = null;
      return countryName.toLowerCase().includes(this.searchControl.value.toLowerCase())
    })
  }

  sortData(): void {
    if (!this.currSortOrder) {
      this.currSortOrder = 1;
    } else {
      this.currSortOrder *= -1;
    }
    debugger;
    this.filteredList = this.filteredList.sort((a, b) => {
      const aName = (a.name || {}).common || "";
      const bName = (b.name || {}).common || "";
      return (aName.localeCompare(bName) * this.currSortOrder)
    }
    );
  }


  getCountryWeatherData(country: any) {
    this.router.navigate(['/weather'], { queryParams: { country: JSON.stringify(country) } })
  }

}
