import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private skipLoading: string= 'true';

  constructor(private http: HttpClient) {}

  sendMessage(sender: string | number, messageText: string): Observable<any> {
    return this.http.post(`${environment.rasaChatbot}/webhooks/rest/webhook`, 
      { sender: sender, message: messageText }, {
      ...this.skipLoading && {
        headers: { skipLoading: this.skipLoading }
      }
    });
  }
}
