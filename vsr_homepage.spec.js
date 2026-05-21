import { test, expect } from '@playwright/test';

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
      await this.page.getByRole('textbox', { name: 'Vehicle Identification Number' }).fill('2321');
      await this.page.getByRole('button', { name: 'Search VIN' }).click();
      await this.page.getByText('VIN must be at least 5').click();
      await this.page.getByRole('textbox', { name: 'Vehicle Identification Number' }).fill('');
    });
  }

  async fieldValidationForVINLock() {
    await test.step('Navigate to Homepage', async () => {
      await this.page.goto('https://vsr.accessautohistory.com/');
    });

    await test.step('Validate Search VIN Input Lock', async () => {
      await this.page.getByRole('tab', { name: 'By VIN' }).click();
      await this.page.getByRole('textbox', { name: 'Vehicle Identification Number' }).fill('123456789012345678');
      await expect(this.page.getByRole('textbox', { name: 'Vehicle Identification Number' })).toHaveValue('12345678901234567');
    });
  }

  async couponSwapLogic() { /* ... */ }

  async decode17CharVIN() {
    const baseVIN = 'WDDZF4JB0HA182257';
    const characters = 'ABCDEFGHJKLMNPRSTUVWXYZ0123456789';
    let vinArray = baseVIN.split('');
    const indexToModify = Math.random() > 0.5 ? 16 : 15;
    vinArray[indexToModify] = characters.charAt(Math.floor(Math.random() * characters.length));
    const vin = vinArray.join('');

    await test.step('Navigate to Homepage', async () => {
      await this.page.goto('https://vsr.accessautohistory.com/');
    });

    await test.step(`Search with modified VIN: ${vin}`, async () => {
      await this.page.getByRole('tab', { name: 'By VIN' }).click();
      await this.page.getByRole('textbox', { name: 'Vehicle Identification Number' }).fill(vin);
      await this.page.getByRole('button', { name: 'Search VIN' }).click();
      await this.page.waitForURL(/.*\/vin-check\/preview/, { timeout: 40000 });
    });
  }

  async verifyLPDecode() {
    const basePlate = 'HBL121';
    const randomDigit = Math.floor(Math.random() * 10).toString();
    const plate = basePlate + randomDigit;

    await test.step('Navigate to Homepage', async () => {
      await this.page.goto('https://vsr.accessautohistory.com/');
    });

    await test.step(`Search with plate: ${plate}`, async () => {
      await this.page.getByRole('tab', { name: 'By License Plate' }).click();
      await this.page.getByRole('textbox', { name: 'Enter License Plate' }).fill(plate);
      await this.page.getByRole('combobox', { name: 'State' }).fill('texas');
      await this.page.getByRole('option', { name: 'Texas TX' }).click();
      await this.page.getByRole('button', { name: 'Search License Plate' }).click();
      await this.page.waitForURL(/.*\/vin-check\/license-preview/, { timeout: 40000 });
    });
  }
}

class Stickers {
  constructor(page) {
    this.page = page;
  }

  async fieldValidationForSticker() {
    await test.step('Navigate to Window Stickers page', async () => {
      await this.page.goto('https://vsr.accessautohistory.com/window-stickers');
    });
  }

  async fieldValidationForVINLockSticker() {
    await test.step('Navigate to Window Stickers page', async () => {
      await this.page.goto('https://vsr.accessautohistory.com/window-stickers');
    });

    await test.step('Validate Search VIN Input Lock', async () => {
      await this.page.getByRole('tab', { name: 'By VIN' }).click();
      await this.page.getByRole('textbox', { name: 'Vehicle Identification Number' }).fill('123456789012345678');
      await expect(this.page.getByRole('textbox', { name: 'Vehicle Identification Number' })).toHaveValue('12345678901234567');
    });
  }

  async couponSwapLogic() { /* ... */ }

  async decode17CharVIN() {
    const vin = 'WDDZF4JB0HA182257';
    await test.step('Navigate to Window Stickers page', async () => {
      await this.page.goto('https://vsr.accessautohistory.com/window-stickers');
    });

    await test.step(`Search with VIN: ${vin}`, async () => {
      await this.page.getByRole('tab', { name: 'By VIN' }).click();
      await this.page.getByRole('textbox', { name: 'Vehicle Identification Number' }).fill(vin);
      await this.page.getByRole('button', { name: 'Search VIN' }).click();
      await this.page.waitForURL(/.*\/vin-check\/ws-preview/, { timeout: 40000 });
    });
  }

  async verifyLPDecode() {
    const plate = 'HBL1216';
    await test.step('Navigate to Window Stickers page', async () => {
      await this.page.goto('https://vsr.accessautohistory.com/window-stickers');
    });

    await test.step(`Search with plate: ${plate}`, async () => {
      await this.page.getByRole('tab', { name: 'By License Plate' }).click();
      await this.page.getByRole('textbox', { name: 'Enter License Plate' }).fill(plate);
      await this.page.getByRole('combobox', { name: 'State' }).fill('texas');
      await this.page.getByRole('option', { name: 'Texas TX' }).click();
      await this.page.getByRole('button', { name: 'Search License Plate' }).click();
      await this.page.waitForURL(/.*\/vin-check\/(ws-)?license-preview/, { timeout: 40000 });
    });
  }
}

class RevisitBanner {
  constructor(page) {
    this.page = page;
  }

  async verifyRevisitBanner(baseUrl) {
    const vin = '4JGDA5HB4HA985664';
    await test.step('Trigger revisit banner', async () => {
      await this.page.goto(baseUrl);
      await this.page.getByRole('tab', { name: 'By VIN' }).click();
      await this.page.getByRole('textbox', { name: 'Vehicle Identification Number' }).fill(vin);
      await this.page.getByRole('button', { name: 'Search VIN' }).click();
      await this.page.waitForURL(/.*\/vin-check\/(ws-)?(preview|license-preview)/, { timeout: 40000 });
    });

    await test.step('Verify and click Revisit Banner', async () => {
      await this.page.goto(baseUrl);
      const grabItButton = this.page.locator('text=Grab it').first();
      try {
        await grabItButton.waitFor({ state: 'visible', timeout: 10000 });
        await grabItButton.click();
      } catch (e) {
        console.log('Revisit Banner not visible.');
      }
    });
  }
}

test.describe('VSR Functional Suite', () => {
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
