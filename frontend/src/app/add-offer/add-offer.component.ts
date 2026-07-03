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
  discount: number | null = null;
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

  openDatePicker(input: HTMLInputElement) {
    try {
      input.showPicker?.();
    } catch {
      input.focus();
    }
  }

  resetForm() {
    this.title = '';
    this.description = '';
    this.merchantName = '';
    this.category = '';
    this.discount = null;
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
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      this.backendError = 'Please select an image file.';
      input.value = '';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      this.backendError = 'Image must be 5 MB or smaller.';
      input.value = '';
      return;
    }

    this.backendError = '';
    const reader = new FileReader();

    reader.onload = () => {
      this.image = reader.result as string;
    };

    reader.readAsDataURL(file);
  }
  isDiscountMissing(): boolean {
    return this.discount === null || this.discount === undefined;
  }

  isDiscountOutOfRange(): boolean {
    return !this.isDiscountMissing() && (this.discount! < 0 || this.discount! > 100);
  }

  isEndDateBeforeStart(): boolean {
    return !!(this.startDate && this.endDate && this.endDate < this.startDate);
  }

  get parsedOutlets(): string[] {
    return this.outlets.split(',').map((x) => x.trim()).filter(Boolean);
  }

  isOutletsMissing(): boolean {
    return this.parsedOutlets.length === 0;
  }

  addOffer() {
    this.submitted = true;
    this.backendError = '';

    if (
      !this.title.trim() ||
      !this.description.trim() ||
      !this.merchantName.trim() ||
      !this.category ||
      this.isDiscountMissing() ||
      this.isDiscountOutOfRange() ||
      this.isOutletsMissing() ||
      !this.termsAndConditions.trim() ||
      !this.offerType ||
      !this.startDate ||
      !this.endDate ||
      this.isEndDateBeforeStart()
    ) {
      return;
    }

    const payload: Record<string, unknown> = {
      title: this.title.trim(),
      description: this.description.trim(),
      merchantName: this.merchantName.trim(),
      category: this.category,
      discount: Number(this.discount),
      outlets: this.parsedOutlets,
      termsAndConditions: this.termsAndConditions.trim(),
      offerType: this.offerType,
      startDate: this.startDate,
      endDate: this.endDate,
    };

    if (this.availability.length) payload['availability'] = this.availability;

    if (this.image) payload['image'] = this.image;
    if (this.usageLimit) payload['usageLimit'] = this.usageLimit;

    this.service.addOffer(payload).subscribe({
      next: () => {
        this.resetForm();
        this.refresh.emit();
        this.submitted = false;
      },
      error: (err) => {
        const body = err?.error;
        this.backendError = body?.message || body?.error || 'Something went wrong';
      },
    });
  }
}
