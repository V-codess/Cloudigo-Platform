import { Component, ViewChild } from '@angular/core';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { OffersListComponent } from './offers-list/offers-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AddOfferComponent, OffersListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  activeTab: 'add' | 'list' = 'list';

  @ViewChild('list') list!: OffersListComponent;

  setTab(tab: 'add' | 'list') {
    this.activeTab = tab;
    if (tab === 'list') {
      this.list?.refresh();
    }
  }

  onOfferAdded() {
    if (this.list) {
      this.list.currentPage = 1;
      this.list.refresh();
    }
    this.activeTab = 'list';
  }
}
