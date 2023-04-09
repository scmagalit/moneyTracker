export function roundAmount(amount: string | number) {
    return Math.round((Number(amount) + Number.EPSILON) * 100) / 100;
}

export function formatAmount(amount: number) {
    const formatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    return formatter.format(amount);
}
