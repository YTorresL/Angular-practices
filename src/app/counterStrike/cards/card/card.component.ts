import { Component, Input } from '@angular/core';
import { Welcome } from '../../../app.component';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input()
  data: MatTableDataSource<Welcome> | null = null;
}
