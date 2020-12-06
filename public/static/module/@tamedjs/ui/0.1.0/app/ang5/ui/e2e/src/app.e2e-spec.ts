import { AppPage } from './app.po';

describe('trg-ui-ang5 App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to TamedJs: Ui Angular 5!');
  });
});
