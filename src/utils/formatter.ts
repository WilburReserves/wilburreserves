const priceFormatter = Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  minimumFractionDigits: 0,
});

export const formatPrice = (price: number | null | undefined): string => {
  if (!price) return "₦0";
  const priceInDollars = price / 100;
  return priceFormatter.format(priceInDollars);
};