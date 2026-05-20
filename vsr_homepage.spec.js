import { test, expect } from '@playwright/test';
import path from 'path';
const EVIDENCE_DIR = path.join(__dirname, 'test-results');

class HomepageVHR {
  constructor(page) {
    this.page = page;
  }

  async fieldValidationForVHR() {
    await test.step('Navigate to Homepage', async () => {
      await this.page.goto('https://vsr.accessautohistory.com/');
    });

    await test.step('Validate Search VIN with empty input', async () => {
      await this.page.getByRole('button', { name: 'Search VIN' }).click();
      await this.page.getByText('Please enter a VIN number').click();
    });

    await test.step('Validate Search License Plate with empty input', async () => {
      await this.page.getByRole('tab', { name: 'By License Plate' }).click();
      await this.page.getByRole('button', { name: 'Search License Plate' }).click();
      await this.page.getByText('Please enter a license plate').click();
    });

    await test.step('Validate Search VIN with invalid length', async () => {
      await this.page.getByRole('tab', { name: 'By VIN' }).click();
      await this.page.getByRole('textbox', { name: 'Vehicle Identification Number' }).click();
      await this.page.getByRole('textbox', { name: 'Vehicle Identification Number' }).fill('2321');
      await this.page.getByRole('button', { name: 'Search VIN' }).click();
      await this.page.getByText('VIN must be at least 5').click();
      await this.page.getByRole('textbox', { name: 'Vehicle Identification Number' }).click();
      await this.page.getByRole('textbox', { name: 'Vehicle Identification Number' }).fill('');
    });
  }

  async fieldValidationForVINLock() {
    await test.step('Navigate to Homepage', async () => {
      await this.page.goto('https://vsr.accessautohistory.com/');
    });

    await test.step('Validate Search VIN Input Lock', async () => {
      await this.page.getByRole('tab', { name: 'By VIN' }).click();
      await this.page.getByRole('textbox', { name: 'Vehicle Identification Number' }).click();
      await this.page.getByRole('textbox', { name: 'Vehicle Identification Number' }).fill('123456789012345678');
      // The field limits to 17 characters
      await expect(this.page.getByRole('textbox', { name: 'Vehicle Identification Number' })).toHaveValue('12345678901234567');
    });
  }

  async couponSwapLogic() {
    // ... (keep original coupon logic)
  }
}

class Stickers {
  constructor(page) {
    this.page = page;
  }

  async fieldValidationForSticker() {
    // ... (keep original sticker validation logic)
  }

  async fieldValidationForVINLockSticker() {
    await test.step('Navigate to Window Stickers page', async () => {
      await this.page.goto('https://vsr.accessautohistory.com/window-stickers');
    });

    await test.step('Validate Search VIN Input Lock', async () => {
      await this.page.getByRole('tab', { name: 'By VIN' }).click();
      await this.page.getByRole('textbox', { name: 'Vehicle Identification Number' }).click();
      await this.page.getByRole('textbox', { name: 'Vehicle Identification Number' }).fill('123456789012345678');
      // The field limits to 17 characters
      await expect(this.page.getByRole('textbox', { name: 'Vehicle Identification Number' })).toHaveValue('12345678901234567');
    });
  }

  async couponSwapLogic() {
    // ... (keep original sticker coupon logic)
  }
}

test.describe('VSR Homepage Functional QA', () => {
  test('Case 1: Field validation for VHR', async ({ page }) => {
  const homepageVHR = new HomepageVHR(page);
  await homepageVHR.fieldValidationForVHR();
});

test('Case 3: VIN INPUT Field Lock', async ({ page }) => {
  const homepageVHR = new HomepageVHR(page);
  await homepageVHR.fieldValidationForVINLock();
});

test('Case 3: VIN INPUT Field Lock for Stickers', async ({ page }) => {
    const stickers = new Stickers(page);
    await stickers.fieldValidationForVINLockSticker();
  });  test('Case 1: Field validation for Sticker', async ({ page }) => {
    const stickers = new Stickers(page);
    await stickers.fieldValidationForSticker();
  });

  test('Case 2: Coupon Swap Logic & Discount Banner Verification for VHR', async ({ page }) => {
    const homepageVHR = new HomepageVHR(page);
    await homepageVHR.couponSwapLogic();
  });

  test('Case 2: Coupon Swap Logic & Discount Banner Verification for Sticker', async ({ page }) => {
    const stickers = new Stickers(page);
    await stickers.couponSwapLogic();
  });
});

