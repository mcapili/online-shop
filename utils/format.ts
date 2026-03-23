export const formatCurrency = (amount: number | null) => {
  const value = amount || 0;
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(value);
};