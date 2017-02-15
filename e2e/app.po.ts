import { browser, element, by } from 'protractor';

export class EventViewCliPage {
  navigateToDashboard() {
    return browser.get('/');
  }

  navigateToSpeakers() {
    return browser.get('/speakers');
  }

  getParagraphText() {
    return element(by.css('ev-app ev-nav h1')).getText();
  }

  getDashboardButtonText(position: number) {
    return element(by.css(`ev-app ev-dashboard div.mdl-grid  div.mdl-cell:nth-child(${position}) ev-dashboard-button button`)).getText();
  }
}
