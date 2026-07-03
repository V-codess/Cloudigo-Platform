import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferService } from '../services/offer.service';

@Component({
  selector: 'app-offers-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './offers-list.component.html',
  styleUrl: './offers-list.component.css',
})
export class OffersListComponent implements OnInit {
  offers: any[] = [];
  loading = false;
  loadError = '';
  filter: 'all' | 'active' | 'inactive' = 'all';

  constructor(private service: OfferService) {}

  get filteredOffers(): any[] {
    if (this.filter === 'all') return this.offers;
    return this.offers.filter((o) => o.status === this.filter);
  }

  refresh() {
    this.loading = true;
    this.loadError = '';

    this.service.getOffers().subscribe({
      next: (res) => {
        this.offers = res.data;
        this.loading = false;
      },
      error: () => {
        this.loadError = 'Could not load offers. Is the backend running on port 8080?';
        this.loading = false;
      },
    });
  }

  get activeOffersCount(): number {
    return this.offers.filter((o) => o.status === 'active').length;
  }

  get inactiveOffersCount(): number {
    return this.offers.filter((o) => o.status === 'inactive').length;
  }

  formatCategory(category: string): string {
    return category?.replace(/_/g, ' ') ?? '';
  }

  ngOnInit() {
    this.refresh();
  }

  toggle(offer: any) {
    const newStatus = offer.status === 'active' ? 'inactive' : 'active';

    this.service.updateStatus(offer.id, newStatus).subscribe({
      next: () => {
        offer.status = newStatus;
      },
      error: () => {
        this.loadError = 'Failed to update offer status.';
      },
    });
  }
}
