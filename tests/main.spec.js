import { test, expect } from '@playwright/test';
import { HomepageVHR, Stickers, RevisitBanner, ExitIntent, DiscountBannerVerification } from '../pages/PageClasses';

test.describe('VSR Functional Suite', () => {
  test('Case 1: Field validation for VHR', async ({ page }) => {
    const homepageVHR = new HomepageVHR(page);
    await homepageVHR.fieldValidationForVHR();
  });

  test('Case 3: VIN INPUT Field Lock', async ({ page }) => {
    const homepageVHR = new HomepageVHR(page);
    await homepageVHR.fieldValidationForVINLock();
  });

  test('Case 3b: Validate VIN Max Length', async ({ page }) => {
    const homepageVHR = new HomepageVHR(page);
    await homepageVHR.validateVINMaxLength();
  });

  test('Case 3: VIN INPUT Field Lock for Stickers', async ({ page }) => {
    const stickers = new Stickers(page);
    await stickers.fieldValidationForVINLockSticker();
  });

  test('Case 1: Field validation for Sticker', async ({ page }) => {
    const stickers = new Stickers(page);
    await stickers.fieldValidationForSticker();
  });

  test('Case 4: 17 Character VIN decode', async ({ page }) => {
    const homepageVHR = new HomepageVHR(page);
    await homepageVHR.decode17CharVIN();
  });

  test('Case 4: 17 Character VIN decode for Stickers', async ({ page }) => {
    const stickers = new Stickers(page);
    await stickers.decode17CharVIN();
  });

  test('Case 5: LP Verification', async ({ page }) => {
    const homepageVHR = new HomepageVHR(page);
    await homepageVHR.verifyLPDecode();
  });

  test('Case 5: LP Verification for Stickers', async ({ page }) => {
    const stickers = new Stickers(page);
    await stickers.verifyLPDecode();
  });
});

test.describe('Case 8: Exit Intent Pop-up', { tag: '@exit-intent' }, () => {
  test('Exit Intent Pop-up', async ({ page }) => {
    const ei = new ExitIntent(page);
    await ei.verifyExitIntent('https://vsr.accessautohistory.com/');
  });
});

test.describe('Case 6: Revisit Banner', { tag: '@revisit' }, () => {
  test.use({ workers: 2 });
  
  test('Revisit Banner Verification', async ({ page }) => {
    const rb = new RevisitBanner(page);
    await rb.verifyRevisitBanner('https://vsr.accessautohistory.com/');
  });

  test('Revisit Banner Verification for Stickers', async ({ page }) => {
    const rb = new RevisitBanner(page);
    await rb.verifyRevisitBanner('https://vsr.accessautohistory.com/window-stickers');
  });
});

test.describe('Case 9: Discount Banner Persistence', () => {
  test('Verify banner persists globally', async ({ page }) => {
    const dbv = new DiscountBannerVerification(page);
    await dbv.verifyBannerGlobalPersistence();
  });
});
