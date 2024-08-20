export const checkValueStar = (rate: number | undefined) => {
    if (!rate) return 0;
    const decimalPart = rate % 1;

    if (decimalPart < 0.25) return Math.floor(rate);
    if (decimalPart > 0.75) return Math.ceil(rate);
    return Math.floor(rate) + 0.5;
}