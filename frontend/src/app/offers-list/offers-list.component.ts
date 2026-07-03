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
  currentPage = 1;
  totalPages = 1;
  totalOffers = 0;
  activeOffersCount = 0;
  inactiveOffersCount = 0;
  readonly pageSize = 6;

  constructor(private service: OfferService) {}

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.loading = true;
    this.loadError = '';

    const status = this.filter === 'all' ? undefined : this.filter;

    this.service.getOffers(this.currentPage, this.pageSize, status).subscribe({
      next: (res) => {
        this.offers = res.data;
        this.currentPage = res.pagination.currentPage;
        this.totalPages = res.pagination.totalPages;
        this.totalOffers = res.pagination.totalOffers;
        this.activeOffersCount = res.pagination.activeCount;
        this.inactiveOffersCount = res.pagination.inactiveCount;
        this.loading = false;
      },
      error: () => {
        this.loadError = 'Could not load offers. Is the backend running on port 8080?';
        this.loading = false;
      },
    });
  }

  setFilter(filter: 'all' | 'active' | 'inactive') {
    if (this.filter === filter) return;
    this.filter = filter;
    this.currentPage = 1;
    this.refresh();
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;
    this.currentPage = page;
    this.refresh();
  }

  get pageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(this.totalPages, start + maxVisible - 1);
    start = Math.max(1, end - maxVisible + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  formatCategory(category: string): string {
    return category?.replace(/_/g, ' ') ?? '';
  }

  private readonly dayOrder = [
    'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday',
  ];

  formatAvailability(days: string[] | undefined): string {
    if (!days?.length) return '';
    return [...days]
      .sort((a, b) => this.dayOrder.indexOf(a) - this.dayOrder.indexOf(b))
      .map((day) => day.charAt(0).toUpperCase() + day.slice(1))
      .join(', ');
  }

  formatUsageLimit(limit: string | undefined): string {
    const labels: Record<string, string> = {
      once: 'Once only',
      twice: 'Twice only',
      week: 'Once per week',
      month: 'Once per month',
      year: 'Once per year',
      unlimited: 'Unlimited use',
    };
    return labels[limit ?? ''] ?? 'No usage limit';
  }

  toggle(offer: any) {
    const newStatus = offer.status === 'active' ? 'inactive' : 'active';

    this.service.updateStatus(offer.id, newStatus).subscribe({
      next: () => {
        this.refresh();
      },
      error: () => {
        this.loadError = 'Failed to update offer status.';
      },
    });
  }
}
