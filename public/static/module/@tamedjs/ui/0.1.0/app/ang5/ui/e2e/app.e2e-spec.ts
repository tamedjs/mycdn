import { AppPage } from './app.po';

describe('pkd-app-base-ang5 App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to Pokedex: App Base Angular 5!');
  });
});
