import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchComponent } from './counterStrike/forms/search/search.component';
import { CardComponent } from './counterStrike/cards/card/card.component';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

export type Welcome = {
  id:             string;
  name:           string;
  description:    string;
  weapon:         Category;
  category:       Category;
  pattern:        Category | null;
  min_float:      number | null;
  max_float:      number | null;
  rarity:         Rarity;
  stattrak:       boolean;
  souvenir?:      boolean;
  paint_index:    null | string;
  wears?:         Category[];
  collections?:   Collection[];
  crates:         Collection[];
  team:           Category;
  image:          string;
  special_notes?: SpecialNote[];
  phase?:         Phase;
}

export type Category = {
  id:   null | string;
  name: null | string;
}

export type Collection = {
  id:    string;
  name:  string;
  image: string;
}

export enum Phase {
  BlackPearl = "Black Pearl",
  Emerald = "Emerald",
  Phase1 = "Phase 1",
  Phase2 = "Phase 2",
  Phase3 = "Phase 3",
  Phase4 = "Phase 4",
  Ruby = "Ruby",
  Sapphire = "Sapphire",
}

export type Rarity = {
  id:    ID;
  name:  Name;
  color: Color;
}

export enum Color {
  B0C3D9 = "#b0c3d9",
  D32Ce6 = "#d32ce6",
  E4Ae39 = "#e4ae39",
  Eb4B4B = "#eb4b4b",
  The4B69Ff = "#4b69ff",
  The5E98D9 = "#5e98d9",
  The8847Ff = "#8847ff",
}

export enum ID {
  RarityAncient = "rarity_ancient",
  RarityAncientWeapon = "rarity_ancient_weapon",
  RarityCommonWeapon = "rarity_common_weapon",
  RarityContrabandWeapon = "rarity_contraband_weapon",
  RarityLegendaryWeapon = "rarity_legendary_weapon",
  RarityMythicalWeapon = "rarity_mythical_weapon",
  RarityRareWeapon = "rarity_rare_weapon",
  RarityUncommonWeapon = "rarity_uncommon_weapon",
}

export enum Name {
  Classified = "Classified",
  ConsumerGrade = "Consumer Grade",
  Contraband = "Contraband",
  Covert = "Covert",
  Extraordinary = "Extraordinary",
  IndustrialGrade = "Industrial Grade",
  MilSpecGrade = "Mil-Spec Grade",
  Restricted = "Restricted",
}

export type SpecialNote = {
  source: string;
  text:   string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardComponent, SearchComponent, HttpClientModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private baseUrl = 'https://bymykel.github.io/CSGO-API/api/en/skins.json';
  dataOriginal = new MatTableDataSource<Welcome>();
  dataResponse = new MatTableDataSource<Welcome>();
  search : string = '';
  dataLength = 0

  receiveSearch($event: string) {
    this.search = $event;
    const filteredData = this.dataOriginal.data.filter(item => {
      return (
        item.name.toLowerCase().includes(this.search) ||
        item.weapon.name?.toLowerCase().includes(this.search) ||
        item.category.name?.toLowerCase().includes(this.search) ||
        item.rarity.name.toLowerCase().includes(this.search) ||
        (item.pattern?.name?.toLowerCase().includes(this.search) ?? false) ||
        (item.collections?.some(collection => collection.name.toLowerCase().includes(this.search)) ?? false)
      );
    });
    this.dataResponse.data = filteredData;
    this.dataLength = this.dataResponse.data.length
  }

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.http.get<Welcome[]>(this.baseUrl).subscribe(data => {
      this.dataOriginal.data = data;
      this.dataResponse.data = data;
      this.dataLength = this.dataResponse.data.length
    });
  }
}
