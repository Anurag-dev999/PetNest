/**
 * Format a number as Indian Rupee currency
 * Uses en-IN locale for proper Indian number formatting (e.g., ₹1,49,999)
 */
export function formatINR(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(amount)
}
