
export const shortNum = (number) => {
    const formatted = Math.round(number / 100) / 10;
    return `${formatted}k`;
};
