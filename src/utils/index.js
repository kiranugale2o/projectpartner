export const optionsR = [
  { label: 'New', value: 'New', color: '#0068FF', select: true },
  { label: 'Follow Up', value: 'Follow Up', color: '#FFCA00', select: false },
  { label: 'Token', value: 'Token', color: '#2EDC20', select: false },
];

export const optionsL = [
  { label: 'Cancelled', value: 'Cancelled', color: '#FF4646', select: false },
  {
    label: 'Visit Scheduled',
    value: 'Visit Scheduled',
    color: '#0BB501',
    select: false,
  },
  { label: 'Reset filter', value: 'reset', color: 'black', select: false },
];

export const calanderOprtions = [
  {
    label: 'Visit Scheduled',
    value: 'Visit Scheduled',
    color: '#0068FF',
    select: true,
  },
  {
    label: 'Visit Cancelled',
    value: 'Visit Cancelled',
    color: '#FF4646',
    select: false,
  },
  {
    label: 'Visited',
    value: 'Visited',
    color: '#0BB501',
    select: false,
  },
];
export const formatDateToShort = dateStr => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  }); // e.g., "Jun 11"
};

export const formatIndianAmount = amount => {
  const num = Number(amount);
  if (isNaN(num)) return amount;

  if (num >= 10000000) {
    return (num / 10000000).toFixed(2) + ' crore';
  } else if (num >= 100000) {
    return (num / 100000).toFixed(2) + ' lakh';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(2) + 'K';
  } else {
    return num.toString();
  }
};

export function FormatPrice({ price }) {
  return Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
}
