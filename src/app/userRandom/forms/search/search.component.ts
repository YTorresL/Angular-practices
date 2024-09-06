import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { SearchService } from './service/search.service';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule, ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  search = new FormControl('');
  constructor(private searchService: SearchService) {}

  onSearch() {
    const searchTerm = this.search.value?.toLocaleLowerCase() 
    if (searchTerm) {
      this.searchService.searchUsers(searchTerm);
      console.log('Loading.');
    } else {
      console.log('Search term is empty.');
    }  }
}
