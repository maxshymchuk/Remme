export function getDelta(date: number) {
  const currentTime = new Date().getTime();
  const targetTime = new Date(date).getTime();
  return targetTime - currentTime;
}

export function getDateTime(time: number) {
  const delta = getDelta(time);
  let seconds = delta / 1000;
  const years = Math.trunc(seconds / (3600 * 24 * 365));
  seconds -= years * 3600 * 24 * 365;
  const months = Math.trunc(seconds / (3600 * 24 * 30));
  seconds -= months * 3600 * 24 * 30;
  const days = Math.trunc(seconds / (3600 * 24));
  seconds -= days * 3600 * 24;
  const hours = Math.trunc(seconds / 3600);
  seconds -= hours * 3600;
  const minutes = Math.trunc(seconds / 60);
  if (minutes === 0) return 'Few seconds';
  const arr = [
    { value: years, name: 'y' },
    { value: months, name: 'm' },
    { value: days, name: 'd' },
    { value: hours, name: 'h' },
    { value: minutes, name: 'min' }
  ];
  return arr.filter(item => item.value !== 0).map(item => item.value + item.name).join(' ');
}