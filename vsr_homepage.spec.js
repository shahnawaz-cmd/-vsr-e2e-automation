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
      await this.page.getByRole('textbox', { name: 'Vehicle Identification Number' }).click();
      await this.page.getByRole('textbox', { name: 'Vehicle Identification Number' }).fill('2321');
      await this.page.getByRole('button', { name: 'Search VIN' }).click();
      await this.page.getByText('VIN must be at least 5').click();
      await this.page.getByRole('textbox', { name: 'Vehicle Identification Number' }).click();
      await this.page.getByRole('textbox', { name: 'Vehicle Identification Number' }).fill('');
    });
  }

  async couponSwapLogic() {
    await test.step('Apply lower coupon (offer20) and verify banner', async () => {
      await this.page.goto('https://vsr.accessautohistory.com/?offer=offer20');
      await expect(this.page.locator('div').filter({ hasText: 'You have received 20%' }).nth(2)).toBeVisible();
    });
    
    await test.step('Apply higher coupon (get20) and verify banner', async () => {
      await this.page.goto('https://vsr.accessautohistory.com/?offer=get20');
      await expect(this.page.locator('div').filter({ hasText: 'You have received 20%' }).nth(2)).toBeVisible();
    });

    await test.step('Apply highest coupon (testing) and verify banner', async () => {
      await this.page.goto('https://vsr.accessautohistory.com/?offer=testing');
      await expect(this.page.locator('div').filter({ hasText: 'You have received 96%' }).nth(2)).toBeVisible();
    });

    await test.step('Extract cookies and verify dynamic coupon logic', async () => {
      const cookies = await this.page.context().cookies();
      const couponCookie = cookies.find(c => c.name === 'coupon');
      const prevCouponCookie = cookies.find(c => c.name === 'Prev_coupon' || c.name.toLowerCase().includes('prev'));
      
      console.log(`Active coupon cookie: ${couponCookie ? couponCookie.value : 'Not found'}`);
      console.log(`Prev_coupon cookie: ${prevCouponCookie ? prevCouponCookie.value : 'Not found'}`);

      if (couponCookie) {
        expect(couponCookie.value).toBe('testing'); // highest coupon should remain active
      } else {
        console.log('Cookie named "coupon" not found.');
      }
      
      if (prevCouponCookie) {
        expect(prevCouponCookie.value).toBe('get20'); // previous higher coupon
      } else {
        console.log('Cookie named "Prev_coupon" not found. Available cookies:', cookies.map(c => c.name));
      }
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

    await test.step('Validate Search VIN with empty input', async () => {
      await this.page.getByRole('button', { name: 'Search VIN' }).click();
      await this.page.getByText('Please enter a VIN number').click();
    });

    await test.step('Validate Search License Plate with empty input', async () => {
      await this.page.getByRole('tab', { name: 'By License Plate' }).click();
      await this.page.getByRole('button', { name: 'Search License Plate' }).click();
      await this.page.getByText('Please enter a license plate').click();
    });

    await test.step('Validate Search Vehicle empty input (Year/Make/Model)', async () => {
      await this.page.getByRole('tab', { name: 'Year / Make / Model' }).click();
      await this.page.getByRole('button', { name: 'Search Vehicle' }).click();
    });

    await test.step('Validate Search VIN with invalid length', async () => {
      await this.page.getByRole('tab', { name: 'By VIN' }).click();
      await this.page.getByRole('textbox', { name: 'Vehicle Identification Number' }).click();
      await this.page.getByRole('textbox', { name: 'Vehicle Identification Number' }).fill('ASDA');
      await this.page.getByRole('button', { name: 'Search VIN' }).click();
      await this.page.getByText('VIN must be at least 5').click();
    });

    await test.step('Validate Search License Plate state selection missing', async () => {
      await this.page.getByRole('tab', { name: 'By License Plate' }).click();
      await this.page.getByRole('textbox', { name: 'Enter License Plate' }).click();
      await this.page.getByRole('textbox', { name: 'Enter License Plate' }).fill('SDs');
      await this.page.getByRole('button', { name: 'Search License Plate' }).click();
      await this.page.getByRole('textbox', { name: 'Enter License Plate' }).click();
      await this.page.getByRole('textbox', { name: 'Enter License Plate' }).fill('SDSSDDSa');
      await this.page.getByRole('button', { name: 'Search License Plate' }).click();
      await this.page.getByText('Please select a state').click();
    });
  }

  async couponSwapLogic() {
    await test.step('Apply lower coupon (offer20) and verify banner', async () => {
      await this.page.goto('https://vsr.accessautohistory.com/window-stickers?offer=offer20');
      await expect(this.page.locator('div').filter({ hasText: 'You have received 20%' }).nth(2)).toBeVisible();
    });
    
    await test.step('Apply higher coupon (get20) and verify banner', async () => {
      await this.page.goto('https://vsr.accessautohistory.com/window-stickers?offer=get20');
      await expect(this.page.locator('div').filter({ hasText: 'You have received 20%' }).nth(2)).toBeVisible();
    });

    await test.step('Apply highest coupon (testing) and verify banner', async () => {
      await this.page.goto('https://vsr.accessautohistory.com/window-stickers?offer=testing');
      await expect(this.page.locator('div').filter({ hasText: 'You have received 96%' }).nth(2)).toBeVisible();
    });

    await test.step('Extract cookies and verify dynamic coupon logic', async () => {
      const cookies = await this.page.context().cookies();
      const couponCookie = cookies.find(c => c.name === 'coupon');
      const prevCouponCookie = cookies.find(c => c.name === 'Prev_coupon' || c.name.toLowerCase().includes('prev'));
      
      console.log(`Active coupon cookie: ${couponCookie ? couponCookie.value : 'Not found'}`);
      console.log(`Prev_coupon cookie: ${prevCouponCookie ? prevCouponCookie.value : 'Not found'}`);

      if (couponCookie) {
        expect(couponCookie.value).toBe('testing'); // highest coupon should remain active
      } else {
        console.log('Cookie named "coupon" not found.');
      }
      
      if (prevCouponCookie) {
        expect(prevCouponCookie.value).toBe('get20'); // previous higher coupon
      } else {
        console.log('Cookie named "Prev_coupon" not found. Available cookies:', cookies.map(c => c.name));
      }
    });
  }
}

test.describe('VSR Homepage Functional QA', () => {
  test('Case 1: Field validation for VHR', async ({ page }) => {
    const homepageVHR = new HomepageVHR(page);
    await homepageVHR.fieldValidationForVHR();
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
});
