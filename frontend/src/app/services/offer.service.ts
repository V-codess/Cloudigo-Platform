import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class OfferService {

  api = "http://localhost:8080/api/offers";

  constructor(private http: HttpClient) {}

  getOffers() {
    return this.http.get<any>(this.api);
  }

  addOffer(offer: any) {
    return this.http.post(this.api, offer);
  }

  updateStatus(id: string, status: string) {
    return this.http.patch(`${this.api}/${id}/status`, { status });
  }
}