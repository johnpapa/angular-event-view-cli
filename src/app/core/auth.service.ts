import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  constructor() {}

  getAuthorizationHeader() {
    return [
      'Basic your-header-goes-here'
      // 'Authorization': 'Basic d2VudHdvcnRobWFuOkNoYW5nZV9tZQ==',
      // 'Accept': 'application/json;odata=verbose'
    ];
  }
}
