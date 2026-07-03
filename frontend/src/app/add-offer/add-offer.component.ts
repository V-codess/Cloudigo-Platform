import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OfferService } from '../services/offer.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-offer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-offer.component.html',
  styleUrl: './add-offer.component.css',
})
export class AddOfferComponent {
  @Output() refresh = new EventEmitter<void>();

  submitted = false;

  title = '';
  description = '';
  category = '';
  merchantName = '';
  discount = 0;
  outlets = '';
  termsAndConditions = '';
  offerType = '';
  startDate = '';
  endDate = '';
  backendError: string = '';
  usageLimit = '';
  availability: string[] = [];
  image: string = '';
  days: string[] = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];
  today: string = new Date().toISOString().split('T')[0];
  constructor(private service: OfferService) {}
  resetForm() {
    this.title = '';
    this.description = '';
    this.merchantName = '';
    this.category = '';
    this.discount = 0;
    this.outlets = '';
    this.termsAndConditions = '';
    this.offerType = '';
    this.startDate = '';
    this.endDate = '';
    this.backendError = '';
    this.usageLimit = '';
    this.availability = [];
    this.image = '';
  }
  toggleDay(day: string, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;

    if (checked) {
      if (!this.availability.includes(day)) {
        this.availability.push(day);
      }
    } else {
      this.availability = this.availability.filter((d) => d !== day);
    }
  }
  onImageSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      this.image = reader.result as string; // base64 string
    };

    reader.readAsDataURL(file);
  }
  addOffer() {
    this.submitted = true;

    const payload = {
      title: this.title,
      description: this.description,
      merchantName: this.merchantName,
      category: this.category,
      discount: this.discount !== null ? Number(this.discount) : null,
      outlets: this.outlets.split(',').map((x) => x.trim()),
      termsAndConditions: this.termsAndConditions,
      offerType: this.offerType,
      startDate: this.startDate,
      endDate: this.endDate,
      image: this.image,
      usageLimit: this.usageLimit,
      availability: this.availability
    };

    this.service.addOffer(payload).subscribe({
      next: () => {
        this.resetForm();
        this.refresh.emit();
        this.submitted = false;
      },
      error: (err) => {
        this.backendError = err?.error?.message || 'Something went wrong';
      },
    });
  }
}
