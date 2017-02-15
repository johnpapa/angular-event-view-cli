import { browser, element, by } from 'protractor';

export class EventViewCliPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ev-app h1')).getText();
  }
}
