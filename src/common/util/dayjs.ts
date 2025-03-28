import dayjs from 'dayjs';

export function getStartAndEndMonthDate(): {
  startDate: string;
  endDate: string;
} {
  const startDate = dayjs().startOf('month').format('YYYYMMDD');
  const endDate = dayjs().endOf('month').format('YYYYMMDD');

  return { startDate, endDate };
}
