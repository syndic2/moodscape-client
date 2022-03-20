import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatEmotionsService {
  private apiUrl: string = environment.apiUrl.replace('/api', '');

  constructor(private httpClient: HttpClient) { }

  connectTelegram(userId: string, phone: string): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/services/telegram/auth`, JSON.stringify({ user_id: userId, phone: phone }));
  }

  telegramOTPVerification(userId: string, phone: string, phoneCodeHash: string, OTPcode: string): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/services/telegram/otp-verification`, JSON.stringify({ user_id: userId, phone: phone, phone_code_hash: phoneCodeHash, otp_code: OTPcode }));
  }

  telegramTwoStepVerification(userId: string, phone: string, password: string): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/services/telegram/two-step-verification`, JSON.stringify({ user_id: userId, phone: phone, password: password }));
  }

  disconnectTelegram(userId: string, phone: string): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/services/telegram/auth/logout`, JSON.stringify({ user_id: userId, phone: phone }));
  }

  getChatEmotions(userId: string, phone: string): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/services/telegram/chat-emotions/${userId}/${phone}`);
  }
}
