
export const shortNum = (number) => {
    if (number < 1000) {
        return number;
    }
    const formatted = Math.round(number / 100) / 10;
    return `${formatted}k`;
};
