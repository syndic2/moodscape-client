import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private skipLoading: string = 'true';

  constructor(private http: HttpClient) { }

  initiateGreetBot(userId: string) {
    return this.http.post(`${environment.rasaChatbot}/conversations/${userId}/trigger_intent`,
      { name: 'initiate_greet_bot' },
      {
        ...this.skipLoading && {
          headers: { skipLoading: this.skipLoading }
        }
      }
    );
  }

  //setAuthId(userId: string): Observable<any> {
  //  return this.http.post(`${environment.rasaChatbot}/conversations/jonathan/tracker/events`,
  //    { event: 'slot', name: 'auth_id', value: userId }, {
  //      ...this.skipLoading && {
  //        headers: { skipLoading: this.skipLoading }
  //      }
  //    }
  //  );
  //}

  sendMessage(sender: string | number, messageText: string): Observable<any> {
    return this.http.post(`${environment.rasaChatbot}/webhooks/rest/webhook`,
      { sender: sender, message: messageText }, {
      ...this.skipLoading && {
        headers: { skipLoading: this.skipLoading }
      }
    }
    );
  }
}
