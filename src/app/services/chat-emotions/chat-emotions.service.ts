import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatEmotionsService {
  private apiUrl: string= environment.apiUrl.replace('/api', '');

  constructor(private httpClient: HttpClient) { }

  getChatEmotions(phone: string): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/telegram/chat-emotions/${phone}`);
  }

  connectTelegram(userId: string, phone: string): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/telegram/auth`, JSON.stringify({ user_id: userId, phone: phone }));
  }

  telegramOTPVerification(userId: string, OTPcode: string, phoneCodeHash: string): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/telegram/otp-verification`, JSON.stringify({ user_id: userId, otp_code: OTPcode, phone_code_hash: phoneCodeHash }));
  }

  disconnectTelegram(userId: string): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/telegram/auth/logout`, JSON.stringify({ user_id: userId }));
  }
}
