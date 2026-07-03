import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferService } from '../services/offer.service';

@Component({
  selector: 'app-offers-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './offers-list.component.html'
})
export class OffersListComponent implements OnInit {

  offers: any[] = [];

  constructor(private service: OfferService) {}


 refresh() {
  this.service.getOffers().subscribe(res => {
  this.offers = res.data;
  });
}
get activeOffersCount(): number {
  return this.offers?.filter(o => o.status === 'active').length || 0;
}

get inactiveOffersCount(): number {
  return this.offers?.filter(o => o.status === 'inactive').length || 0;
}
ngOnInit() {
  this.refresh();
}

  toggle(offer: any) {
    const newStatus = offer.status === 'active' ? 'inactive' : 'active';

    this.service.updateStatus(offer.id, newStatus).subscribe(() => {
      offer.status = newStatus;
    });
  }
}