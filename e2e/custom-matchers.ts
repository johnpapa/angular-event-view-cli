// import { __platform_browser_private__ } from '@angular/platform-browser';
// declare var global: any;
// const getDOM = __platform_browser_private__.getDOM;

const _global = <any>(typeof window === 'undefined' ? global : window);

export const expect: (actual: any) => NgMatchers = <any>_global.expect;

/**
 * Jasmine matchers that check Angular specific conditions.
 */
export interface NgMatchers extends jasmine.Matchers {
  toEqualText(expected: string): boolean;
}

export const customMatchers: jasmine.CustomMatcherFactories = {
  toHaveText: function () {
    return {
      compare: function (actualText: string, expectedText: string) {
        // const actualText = element.getText();
        return {
          pass: actualText.toLowerCase() === expectedText.toLowerCase(),
          get message() {
            return 'Expected ' + actualText + ' to be equal to ' + expectedText;
          }
        };
      }
    };
  },
};
