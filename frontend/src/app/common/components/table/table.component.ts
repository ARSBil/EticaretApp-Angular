import { Component, Input } from '@angular/core';
import { HeaderModel } from './models/header.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input() headers:HeaderModel[] = [];
}
