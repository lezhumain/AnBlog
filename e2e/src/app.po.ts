import {$, browser, ElementFinder} from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

    getNavTitleText() {
        return $('.navbar-brand').getText() as Promise<string>;
    }

    getNewButton(): ElementFinder {
        return $('.btn.btn-success');
    }
}
