import antacidImage from '../assets/medicines/antacid.svg';
import cetirizineImage from '../assets/medicines/cetirizine.svg';
import coughSyrupImage from '../assets/medicines/cough-syrup.svg';
import ibuprofenImage from '../assets/medicines/ibuprofen.svg';
import oralRehydrationImage from '../assets/medicines/oral-rehydration.svg';
import paracetamolImage from '../assets/medicines/paracetamol.svg';
import salineSprayImage from '../assets/medicines/saline-spray.svg';
import vitaminCImage from '../assets/medicines/vitamin-c.svg';

const medicines = [
  {
    id: 'paracetamol-500',
    name: 'Paracetamol 500 mg',
    category: 'Pain relief',
    description: 'Common over-the-counter option for minor aches and fever.',
    price: 7.49,
    image: paracetamolImage,
    inStock: true,
  },
  {
    id: 'ibuprofen-200',
    name: 'Ibuprofen 200 mg',
    category: 'Pain relief',
    description: 'Anti-inflammatory support for headaches, soreness, and fever.',
    price: 8.99,
    image: ibuprofenImage,
    inStock: true,
  },
  {
    id: 'cetirizine-10',
    name: 'Cetirizine 10 mg',
    category: 'Allergy',
    description: 'Daily antihistamine for seasonal allergy symptoms.',
    price: 11.5,
    image: cetirizineImage,
    inStock: true,
  },
  {
    id: 'vitamin-c-1000',
    name: 'Vitamin C 1000 mg',
    category: 'Vitamins',
    description: 'Daily supplement for general wellness support.',
    price: 9.25,
    image: vitaminCImage,
    inStock: true,
  },
  {
    id: 'cough-syrup-honey',
    name: 'Cough Syrup',
    category: 'Cold care',
    description: 'Soothing syrup for temporary cough relief.',
    price: 10.75,
    image: coughSyrupImage,
    inStock: true,
  },
  {
    id: 'antacid-chewable',
    name: 'Antacid Chewables',
    category: 'Digestive care',
    description: 'Fast-acting chewable tablets for occasional heartburn.',
    price: 6.99,
    image: antacidImage,
    inStock: true,
  },
  {
    id: 'saline-spray',
    name: 'Saline Spray',
    category: 'Nasal care',
    description: 'Gentle saline mist for dry nasal passages.',
    price: 5.95,
    image: salineSprayImage,
    inStock: true,
  },
  {
    id: 'oral-rehydration',
    name: 'Oral Rehydration',
    category: 'Hydration',
    description: 'Electrolyte packets for fluid and mineral replacement.',
    price: 12.25,
    image: oralRehydrationImage,
    inStock: true,
  },
];

export default medicines;
