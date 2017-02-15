import { EventViewCliPage } from './app.po';

import { customMatchers, expect } from './custom-matchers';

describe('event-view-cli App', function () {
  let page: EventViewCliPage;

  beforeEach(() => {
    jasmine.addMatchers(customMatchers);
    page = new EventViewCliPage();
  });

  it('should display app title', () => {
    page.navigateToDashboard();
    expect(page.getParagraphText()).toEqualText('event view');
  });

  it('should display Han Solo as 4th button in dashboard', () => {
    page.navigateToDashboard();
    expect(page.getDashboardButtonText(4)).toEqualText('han solo');
  });
});
