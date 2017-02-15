import { EventViewCliPage } from './app.po';

import { customMatchers, expect } from './custom-matchers';

describe('event-view-cli App', () => {
  let page: EventViewCliPage;

  beforeEach(() => {
    jasmine.addMatchers(customMatchers);
    page = new EventViewCliPage();
  });

  describe('Dashboard page', () => {
    it('should display app title', () => {
      page.navigateToDashboard();
      expect(page.getAppTitle()).toEqualText('event view');
    });

    it('should display Han Solo as 4th button in dashboard', () => {
      page.navigateToDashboard();
      expect(page.getDashboardButtonText(4)).toEqualText('han solo');
    });
  });

  describe('Speakers page', () => {
    it('should display title', () => {
      page.navigateToSpeakers();
      expect(page.getPageTitle()).toEqualText('speakers');
    });
  });

  describe('Sessions page', () => {
    it('should display title', () => {
      page.navigateToSessions();
      expect(page.getPageTitle()).toEqualText('sessions');
    });
  });

  xdescribe('Admin page', () => {
    it('should display title', () => {
      page.navigateToAdmin();
      expect(page.getPageTitle()).toEqualText('admin');
    });
  });

  describe('Login page', () => {
    it('should display title', () => {
      page.navigateToLogin();
      expect(page.getPageTitle()).toEqualText('login');
    });
  });

});
