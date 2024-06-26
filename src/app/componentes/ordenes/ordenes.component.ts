import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToolbarModule } from 'primeng/toolbar';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-ordenes',
  standalone: true,
  imports: [CommonModule, RouterModule, FieldsetModule, InputNumberModule, InputTextModule, InputTextModule, ButtonModule, DropdownModule,
    TableModule,CalendarModule, RadioButtonModule, ToolbarModule, CheckboxModule, CardModule, FormsModule 
  ],
  templateUrl: './ordenes.component.html',
  styleUrl: './ordenes.component.scss'
})

export class OrdenesComponent   implements OnInit{

  cities: City[] | undefined;

  selectedCity: City | undefined;;

  ngOnInit() {
    this.cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];
}

}
