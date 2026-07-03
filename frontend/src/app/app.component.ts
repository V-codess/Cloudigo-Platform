import { Component } from '@angular/core';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { OffersListComponent } from './offers-list/offers-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AddOfferComponent, OffersListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}