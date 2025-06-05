describe('CurrencyList App', () => {
  beforeAll(async () => {
    await device.launchApp({
      newInstance: true
    });
  });

  it('should show the currency list screen', async () => {
    // 等待應用加載
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    try {
      // 檢查貨幣列表是否存在
      await expect(element(by.id('currency-list'))).toBeVisible();
      
      // 檢查是否有貨幣項目（使用 atIndex 來檢查第一個項目）
      await expect(element(by.id('currency-list-item')).atIndex(0)).toBeVisible();
      
      // 檢查是否至少有多個貨幣項目
      await expect(element(by.id('currency-list-item')).atIndex(1)).toBeVisible();
    } catch (error) {
      console.error('Test failed:', error);
      throw error;
    }
  });

  it('should be able to scroll the currency list', async () => {
    try {
      // 向下滾動列表
      await element(by.id('currency-list')).scroll(500, 'down');
      
      // 確認可以看到更多的貨幣項目
      await expect(element(by.id('currency-list-item')).atIndex(5)).toBeVisible();
    } catch (error) {
      console.error('Test failed:', error);
      throw error;
    }
  });
});
