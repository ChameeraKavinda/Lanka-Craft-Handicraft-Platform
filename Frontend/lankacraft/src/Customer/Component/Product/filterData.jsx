export const colors = [
  'white',
  'beige',
  'blue',
  'brown',
  'green',
  'purple',
  'natural',
  'black'
  
];

// Multiple-option filters
export const Filter = [
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'natural', label: 'Natural', checked: false },
      { value: 'brown', label: 'Brown', checked: false },
      { value: 'black', label: 'Black', checked: false },
     
    ],
  }
];

// Single-selection filters
export const singleFilter = [
  {
    id: 'price',
    name: 'Price',
    options: [
      { value: '0-1000', label: 'Below Rs. 1,000', checked: false },
      { value: '1000-5000', label: 'Rs. 1,000 - Rs. 5,000', checked: false },
      { value: '5000-10000', label: 'Rs. 5,000 - Rs. 10,000', checked: false },
      { value: '10000+', label: 'Above Rs. 10,000', checked: false },
    ],
  },
  {
    id: 'discount',
    name: 'Discount Range',
    options: [
      { value: '10', label: '10% or more', checked: false },
      { value: '20', label: '20% or more', checked: false },
      { value: '30', label: '30% or more', checked: false },
      { value: '50', label: '50% or more', checked: false },
    ],
  },
  {
    id: 'stock',
    name: 'Stock Availability',
    options: [
      { value: 'in-stock', label: 'In Stock', checked: true },
      { value: 'out-of-stock', label: 'Out of Stock', checked: false },
    ],
  },
];
