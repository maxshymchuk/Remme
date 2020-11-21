import moment from 'moment';

export function getDateTime(time: number, mask: string) {
  const difference = moment.duration(moment().diff(time));
  const date = [
    { value: -difference.years(), name: 'y' },
    { value: -difference.months(), name: 'm' },
    { value: -difference.days(), name: 'd' },
    { value: -difference.hours(), name: 'h' },
    { value: -difference.minutes(), name: 'min' },
    { value: -difference.seconds(), name: 'sec' }
  ];
  return date
    .map(item => mask.split('.').includes(item.name) ? item : 0)
    .filter(item => item && item.value !== 0)
    .map(item => item && item.value + item.name);
}