import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OfferService } from '../services/offer.service';
import { CommonModule } from '@angular/common';

type FieldName =
  | 'title'
  | 'description'
  | 'merchantName'
  | 'category'
  | 'discount'
  | 'outlets'
  | 'termsAndConditions'
  | 'offerType'
  | 'startDate'
  | 'endDate'
  | 'image'
  | 'usageLimit'
  | 'availability';

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
  fieldErrors: Partial<Record<FieldName, string>> = {};
  backendError = '';

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
  usageLimit = '';
  availability: string[] = [];
  image = '';
  days: string[] = [
    'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday',
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

  clearFieldError(field: FieldName) {
    delete this.fieldErrors[field];
  }

  fieldError(field: FieldName): string {
    return this.fieldErrors[field] ?? '';
  }

  hasFieldError(field: FieldName): boolean {
    return !!this.fieldErrors[field];
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
    this.fieldErrors = {};
    this.usageLimit = '';
    this.availability = [];
    this.image = '';
  }

  toggleDay(day: string, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      if (!this.availability.includes(day)) this.availability.push(day);
    } else {
      this.availability = this.availability.filter((d) => d !== day);
    }
    if (this.availability.length > 0) {
      this.clearFieldError('availability');
    }
  }

  onImageSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      this.fieldErrors['image'] = 'Please select an image file (JPG, PNG, etc.).';
      input.value = '';
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      this.fieldErrors['image'] = 'Image must be 5 MB or smaller.';
      input.value = '';
      return;
    }

    this.clearFieldError('image');
    const reader = new FileReader();
    reader.onload = () => { this.image = reader.result as string; };
    reader.readAsDataURL(file);
  }

  get parsedOutlets(): string[] {
    return this.outlets.split(',').map((x) => x.trim()).filter(Boolean);
  }

  private validateForm(): boolean {
    this.fieldErrors = {};
    this.backendError = '';

    if (!this.title.trim()) this.fieldErrors['title'] = 'Enter an offer title.';
    if (!this.description.trim()) this.fieldErrors['description'] = 'Enter a description for this offer.';
    if (!this.merchantName.trim()) this.fieldErrors['merchantName'] = 'Enter the merchant name.';
    if (!this.category) this.fieldErrors['category'] = 'Select a category.';
    if (this.discount === null || this.discount === undefined) {
      this.fieldErrors['discount'] = 'Enter a discount percentage.';
    } else if (this.discount < 0 || this.discount > 100) {
      this.fieldErrors['discount'] = 'Discount must be between 0 and 100.';
    }
    if (this.parsedOutlets.length === 0) {
      this.fieldErrors['outlets'] = 'Add at least one outlet (comma-separated).';
    }
    if (!this.termsAndConditions.trim()) {
      this.fieldErrors['termsAndConditions'] = 'Enter terms and conditions.';
    }
    if (!this.offerType) this.fieldErrors['offerType'] = 'Select an offer type.';
    if (this.availability.length === 0) {
      this.fieldErrors['availability'] = 'Select at least one available day.';
    }
    if (!this.startDate) this.fieldErrors['startDate'] = 'Select a start date.';
    if (!this.endDate) {
      this.fieldErrors['endDate'] = 'Select an end date.';
    } else if (this.startDate && this.endDate < this.startDate) {
      this.fieldErrors['endDate'] = 'End date must be on or after the start date.';
    }

    return Object.keys(this.fieldErrors).length === 0;
  }

  private applyBackendError(message: string) {
    const fieldMap: Record<string, FieldName> = {
      'Discount must be a number between 0 and 100': 'discount',
      'Outlets must be a non-empty array': 'outlets',
      'Invalid category': 'category',
      'Invalid offer type': 'offerType',
      'Start date must be before end date': 'endDate',
      'Invalid start or end date': 'endDate',
      'Invalid usage limit': 'usageLimit',
      'Select at least one available day': 'availability',
      'Availability must be a non-empty array': 'availability',
    };

    if (message === 'Offer already exists') {
      this.fieldErrors['title'] = 'An offer with this title already exists for this merchant.';
      return;
    }
    if (message === 'Missing required fields') {
      this.backendError = 'Please fill in all required fields.';
      return;
    }

    const field = fieldMap[message];
    if (field) {
      this.fieldErrors[field] = message;
      return;
    }
    this.backendError = message;
  }

  addOffer() {
    this.submitted = true;
    if (!this.validateForm()) return;

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
      availability: this.availability,
    };
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
        this.applyBackendError(body?.message || body?.error || 'Something went wrong. Please try again.');
      },
    });
  }
}
