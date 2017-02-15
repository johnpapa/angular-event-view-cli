import { EventViewCliPage } from './app.po';

describe('event-view-cli App', function() {
  let page: EventViewCliPage;

  beforeEach(() => {
    page = new EventViewCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Event View');
  });
});
