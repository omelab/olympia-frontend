import { AppConfig } from '../AppConfig';

describe('App Config Util', () => {
  describe('App Configuration Properties', () => {
    it('should not change the path for default language', () => {
      const defaultHtmlLocalLng = 'en';
      const locale = AppConfig.defaultLocale;

      expect(locale).toBe(defaultHtmlLocalLng);
    });
  });
});
