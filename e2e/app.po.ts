import { browser, element, by } from 'protractor';

export class EventViewCliPage {

  getBrowserLogs() {
    return browser.manage().logs().get('browser');
  }

  navigateToDashboard() {
    return browser.get('/');
  }

  navigateToSpeakers() {
    return browser.get('/speakers');
  }

  navigateToSessions() {
    return browser.get('/sessions');
  }

  navigateToAdmin() {
    return browser.get('/admin');
  }

  navigateToLogin() {
    return browser.get('/login');
  }

  getAppTitle() {
    return element(by.css('ev-app ev-nav h1')).getText();
  }

  getPageTitle() {
    return element(by.css('ev-app article.template h4')).getText();
  }

  getDashboardButtonText(position: number) {
    return element(by.css(`ev-app ev-dashboard div.mdl-grid  div.mdl-cell:nth-child(${position}) ev-dashboard-button button`)).getText();
  }
}
