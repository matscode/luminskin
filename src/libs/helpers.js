export default {
  /**
   * format money
   *
   * @param amount
   * @returns {string}
   */
  formatMoney(amount, currency = 'USD', locale = 'en-US') {
    let amountValue = amount;
    if (!amount || typeof amount !== 'number') {
      // set amount to zero
      amountValue = 0;
    }

    const fm = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: 2,
    }).format(amountValue);

    return fm;
  },
};
