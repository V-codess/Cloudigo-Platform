import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

export interface OffersResponse {
  message: string;
  pagination: {
    totalOffers: number;
    activeCount: number;
    inactiveCount: number;
    currentPage: number;
    totalPages: number;
    pageSize: number;
  };
  data: any[];
}

@Injectable({ providedIn: 'root' })
export class OfferService {

  api = "http://localhost:8080/api/offers";

  constructor(private http: HttpClient) {}

  getOffers(page = 1, limit = 6, status?: 'active' | 'inactive') {
    let params = new HttpParams()
      .set('page', page)
      .set('limit', limit);

    if (status) {
      params = params.set('status', status);
    }

    return this.http.get<OffersResponse>(this.api, { params });
  }

  addOffer(offer: any) {
    return this.http.post(this.api, offer);
  }

  updateStatus(id: string, status: string) {
    return this.http.patch(`${this.api}/${id}/status`, { status });
  }
}