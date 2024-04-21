import { CarRequest } from '../garage/models/cars.models';

const carBrand = [
  'Trabant',
  'Smyk',
  'Nysa',
  'Warszawa',
  'Syrenka',
  'Polonez',
  'Fiat',
  'Wartburg',
  'Mikrus',
  'Volkswagen'
];
const carModel = [
  'Maluch',
  '522',
  '601',
  '535',
  '125p',
  'Sport',
  '2000 Rally',
  'Panda',
  'Uno',
  '126'
];

function getRandomArrayItem(array: Array<string>): string {
  return array[Math.floor(Math.random() * array.length)];
}

function generateRandomColor(): string {
  const symbols = '0123456789ABCDEF';
  const countColorHexSymbols = 6;
  let color = '#';
  for (let i = 0; i < countColorHexSymbols; i++) {
    color += symbols[Math.floor(Math.random() * symbols.length)];
  }
  return color;
}

export function generateRandomCar(): CarRequest {
  return {
    name: `${getRandomArrayItem(carBrand)} ${getRandomArrayItem(carModel)}`,
    color: generateRandomColor()
  };
}
