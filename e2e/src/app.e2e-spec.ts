import {AppPage} from './app.po';
import {browser, logging} from 'protractor';

describe('workspace-project App', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('should display welcome message', () => {
        page.navigateTo();
        expect(page.getNavTitleText()).toEqual('Cams Blog');
    });

    it('should navigate', () => {
        page.navigateTo();

        const button = page.getNewButton();
        expect(button.getText()).toEqual('NEW');

        button.click();

        browser.getCurrentUrl().then((res) => {
            const url = res;
            console.log('url: %o', url);

            expect(url).toBe('http://localhost:4200/new');
        }).catch((err) => {
            console.warn('err: %o', err);
            debugger;
        });
    });

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
    });
});
