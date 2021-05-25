export const singleLineString= (strings, ...values) => {
  let output= '';

  for (let i = 0; i < values.length; i++) {
    output+= strings[i]+values[i];
  }

  output += strings[values.length];
  let lines = output.split(/(?:\r\n|\n|\r)/);

  return lines.map((line) => {
    return line.replace(/^\s+/gm, '');
  }).join(' ').trim();
};

export const filterObjectProps= (object) => {
  let stringfiedObj= JSON.stringify(object, (key, value) => {
    return ['', null].includes(value) || (typeof value === 'object' && (value.length === 0 || Object.keys(value).length === 0)) ? undefined : value;
  });
  let cleanedObject = JSON.parse(stringfiedObj);
  let isEmptyProps = ['{}', '[]', '""', 'null'].some((key) => stringfiedObj.includes(key));

  if (isEmptyProps) return filterObjectProps(cleanedObject);

  return cleanedObject;
};

export const transformDateTime= (dateTime: Date) => {
  const months= [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  const days= ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

  const transformed= {
    date: dateTime.getDate(),
    day: days[dateTime.getDay()],
    month: months[dateTime.getMonth()],
    year: dateTime.getFullYear(),
    hours: dateTime.getHours(),
    minutes: dateTime.getMinutes() < 10 ? `0${dateTime.getMinutes()}` : dateTime.getMinutes(),
    seconds: dateTime.getSeconds(),
    milliSeconds: dateTime.getMilliseconds(),
    meridiem: dateTime.getHours() >= 12 ? 'PM' : 'AM',
    timeCategory: () => {},
    toDate: () => {},
    toTime: () => {}
  };
  transformed.timeCategory= (): string => {
    if (transformed.hours >= 4 && transformed.hours <= 10) return 'Pagi';
    else if (transformed.hours > 10 && transformed.hours <= 14) return 'Siang';
    else if (transformed.hours > 14 && transformed.hours <= 18) return 'Sore';
    else return 'Malam';
  };
  transformed.toDate= () => {
    return `${transformed.day}, ${transformed.date} ${transformed.month} ${transformed.year}`;
  };
  transformed.toTime= () => {
    return `${transformed.hours}:${transformed.minutes}`;
  };

  return transformed;
};


