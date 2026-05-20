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

  async decode17CharVIN() {
    const baseVIN = 'WDDZF4JB0HA182257';
    const characters = 'ABCDEFGHJKLMNPRSTUVWXYZ0123456789';
    
    // Swap last or second-to-last character
    let vinArray = baseVIN.split('');
    const indexToModify = Math.random() > 0.5 ? 16 : 15;
    vinArray[indexToModify] = characters.charAt(Math.floor(Math.random() * characters.length));
    const vin = vinArray.join('');

    await test.step('Navigate to Homepage', async () => {
      await this.page.goto('https://vsr.accessautohistory.com/');
    });

    await test.step(`Search with modified VIN: ${vin}`, async () => {
      await this.page.getByRole('tab', { name: 'By VIN' }).click();
      await this.page.getByRole('textbox', { name: 'Vehicle Identification Number' }).click();
      await this.page.getByRole('textbox', { name: 'Vehicle Identification Number' }).fill(vin);
      await this.page.getByRole('textbox', { name: 'Vehicle Identification Number' }).press('Tab');
      
      const startTime = Date.now();
      await this.page.getByRole('button', { name: 'Search VIN' }).click();
      
      // Ensure navigation to preview page
      await this.page.waitForURL(/.*\/vin-check\/preview/);
      
      const endTime = Date.now();
      const decodeTime = (endTime - startTime) / 1000;
      console.log(`VIN decode time for ${vin}: ${decodeTime}s`);
    });
  }
  async verifyLPDecode() {
    const basePlate = 'HBL121';
    const randomDigit = Math.floor(Math.random() * 10).toString();
    const plate = basePlate + randomDigit;

    await test.step('Navigate to Homepage with Retry', async () => {
      let retries = 1;
      while (retries >= 0) {
        await this.page.goto('https://vsr.accessautohistory.com/');
        try {
          // Check for common error if applicable, or just verify navigation
          await expect(this.page).toHaveURL(/.*vsr.accessautohistory.com\//);
          break;
        } catch (e) {
          if (retries === 0) throw e;
          retries--;
        }
      }
    });

    await test.step(`Search with plate: ${plate}`, async () => {
      await this.page.getByRole('tab', { name: 'By License Plate' }).click();
      await this.page.getByRole('textbox', { name: 'Enter License Plate' }).fill(plate);
      await this.page.getByRole('combobox', { name: 'State' }).click();
      await this.page.getByRole('combobox', { name: 'State' }).fill('texas');
      await this.page.getByRole('option', { name: 'Texas TX' }).click();
      
      const startTime = Date.now();
      await this.page.getByRole('button', { name: 'Search License Plate' }).click();
      
      await this.page.waitForURL(/.*\/vin-check\/license-preview/);
      
      const endTime = Date.now();
      const decodeTime = (endTime - startTime) / 1000;
      console.log(`License Plate decode time for ${plate}: ${decodeTime}s`);
    });
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

  async decode17CharVIN() {
    const baseVIN = 'WDDZF4JB0HA182257';
    const characters = 'ABCDEFGHJKLMNPRSTUVWXYZ0123456789';
    
    // Swap last or second-to-last character
    let vinArray = baseVIN.split('');
    const indexToModify = Math.random() > 0.5 ? 16 : 15;
    vinArray[indexToModify] = characters.charAt(Math.floor(Math.random() * characters.length));
    const vin = vinArray.join('');

    await test.step('Navigate to Window Stickers page', async () => {
      await this.page.goto('https://vsr.accessautohistory.com/window-stickers');
    });

    await test.step(`Search with modified VIN: ${vin}`, async () => {
      await this.page.getByRole('tab', { name: 'By VIN' }).click();
      await this.page.getByRole('textbox', { name: 'Vehicle Identification Number' }).click();
      await this.page.getByRole('textbox', { name: 'Vehicle Identification Number' }).fill(vin);
      await this.page.getByRole('textbox', { name: 'Vehicle Identification Number' }).press('Tab');
      
      const startTime = Date.now();
      await this.page.getByRole('button', { name: 'Search VIN' }).click();
      
      // Ensure navigation to sticker preview page
      await this.page.waitForURL(/.*\/vin-check\/ws-preview/);
      
      const endTime = Date.now();
      const decodeTime = (endTime - startTime) / 1000;
      console.log(`VIN decode time for ${vin} (Stickers): ${decodeTime}s`);
    });
  }

  async verifyLPDecode() {
    const basePlate = 'HBL121';
    const randomDigit = Math.floor(Math.random() * 10).toString();
    const plate = basePlate + randomDigit;

    await test.step('Navigate to Window Stickers page with Retry', async () => {
      let retries = 1;
      while (retries >= 0) {
        await this.page.goto('https://vsr.accessautohistory.com/window-stickers');
        try {
          await expect(this.page).toHaveURL(/.*window-stickers/);
          break;
        } catch (e) {
          if (retries === 0) throw e;
          retries--;
        }
      }
    });

    await test.step(`Search with plate: ${plate}`, async () => {
      await this.page.getByRole('tab', { name: 'By License Plate' }).click();
      await this.page.getByRole('textbox', { name: 'Enter License Plate' }).fill(plate);
      await this.page.getByRole('combobox', { name: 'State' }).click();
      await this.page.getByRole('combobox', { name: 'State' }).fill('texas');
      await this.page.getByRole('option', { name: 'Texas TX' }).click();
      
      const startTime = Date.now();
      await this.page.getByRole('button', { name: 'Search License Plate' }).click();
      
      await this.page.waitForURL(/.*\/vin-check\/(ws-)?license-preview/);
      
      const endTime = Date.now();
      const decodeTime = (endTime - startTime) / 1000;
      console.log(`License Plate decode time for ${plate} (Stickers): ${decodeTime}s`);
    });
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
  });

  test('Case 1: Field validation for Sticker', async ({ page }) => {
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

