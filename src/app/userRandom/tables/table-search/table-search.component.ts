import {  HttpClientModule } from '@angular/common/http';
import {Component} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { SearchService } from '../../forms/search/service/search.service';


export type Welcome = {
  statusCode: number;
  data:       Data;
  message:    string;
  success:    boolean;
}

export type Data = {
  page:             number;
  limit:            number;
  totalPages:       number;
  previousPage:     boolean;
  nextPage:         boolean;
  totalItems:       number;
  currentPageItems: number;
  data:             Datum[];
}

export type Datum = {
  gender:     Gender;
  name:       Name;
  location:   Location;
  email:      string;
  login:      Login;
  dob:        Dob;
  registered: Dob;
  phone:      string;
  cell:       string;
  id:         number;
  picture:    Picture;
  nat:        string;
}

export type Dob = {
  date: Date;
  age:  number;
}

export enum Gender {
  Female = "female",
  Male = "male",
}

export type Location = {
  street:      Street;
  city:        string;
  state:       string;
  country:     string;
  postcode:    number | string;
  coordinates: Coordinates;
  timezone:    Timezone;
}

export type Coordinates = {
  latitude:  string;
  longitude: string;
}

export type Street = {
  number: number;
  name:   string;
}

export type Timezone = {
  offset:      string;
  description: string;
}

export type Login = {
  uuid:     string;
  username: string;
  password: string;
  salt:     string;
  md5:      string;
  sha1:     string;
  sha256:   string;
}

export type Name = {
  title: string;
  first: string;
  last:  string;
}

export type Picture = {
  large:     string;
  medium:    string;
  thumbnail: string;
}

@Component({
  selector: 'app-table-search',
  standalone: true,
  imports: [MatTableModule, HttpClientModule],
  templateUrl: './table-search.component.html',
  styleUrl: './table-search.component.css'
})
export class TableSearchComponent  {
  dataResponse = new MatTableDataSource<Datum>();
  nameColumns: string[] = ['id', 'picture', 'name', 'phone', 'location']
  hasData = false;


  ngOnInit() {
    this.searchService.fetchData();
    this.searchService.filteredData$.subscribe(filteredData => {
      this.dataResponse.data = filteredData;
      this.hasData = this.dataResponse.data.length > 0 ? true : false;
      console.log('Filtered Data for Table:', this.dataResponse.data);
    });
  }

  constructor(private searchService: SearchService){
  }
}
