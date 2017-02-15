import { browser, element, by } from 'protractor';

export class EventViewCliPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ev-app ev-nav h1')).getText();
  }
}
