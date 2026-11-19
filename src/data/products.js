const img = (name) => `/images/products/${name}.jpg`

export const COLORS = {
  green: { label: 'Green', hex: '#00C12B' },
  red: { label: 'Red', hex: '#F50606' },
  yellow: { label: 'Yellow', hex: '#F5DD06' },
  orange: { label: 'Orange', hex: '#F57906' },
  cyan: { label: 'Cyan', hex: '#06CAF5' },
  blue: { label: 'Blue', hex: '#063AF5' },
  purple: { label: 'Purple', hex: '#7D06F5' },
  pink: { label: 'Pink', hex: '#F506A4' },
  white: { label: 'White', hex: '#FFFFFF' },
  black: { label: 'Black', hex: '#000000' },
  // product-specific tones
  olive: { label: 'Olive', hex: '#4F4631' },
  forest: { label: 'Forest', hex: '#314F4A' },
  navy: { label: 'Navy', hex: '#31344F' },
}

// The ten colours shown in the filter panel
export const FILTER_COLORS = [
  'green', 'red', 'yellow', 'orange', 'cyan',
  'blue', 'purple', 'pink', 'white', 'black',
]

export const SIZES = [
  'XX-Small', 'X-Small', 'Small', 'Medium', 'Large',
  'X-Large', 'XX-Large', '3X-Large', '4X-Large',
]

export const TYPES = ['T-shirts', 'Shorts', 'Shirts', 'Hoodie', 'Jeans']
export const STYLES = ['Casual', 'Formal', 'Party', 'Gym']

const std = ['Small', 'Medium', 'Large', 'X-Large']
const wide = ['X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large']

/**
 * discount = % shown in the badge. price is the current price,
 * oldPrice the struck-through one.
 */
export const PRODUCTS = [
  {
    id: 'one-life-graphic-tshirt',
    name: 'One Life Graphic T-shirt',
    price: 260, oldPrice: 300, discount: 40,
    rating: 4.5, reviewCount: 451, sold: 980, isNew: true,
    type: 'T-shirts', styles: ['Casual'],
    colors: ['olive', 'forest', 'navy'], sizes: std,
    images: [img('one-life-front'), img('one-life-back'), img('one-life-model')],
    description:
      'This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
  },
  {
    id: 'tape-details-tshirt',
    name: 'T-shirt with Tape Details',
    price: 120, rating: 4.5, sold: 640, isNew: true,
    type: 'T-shirts', styles: ['Casual'],
    colors: ['black', 'white'], sizes: wide,
    images: [img('tape-tshirt')],
  },
  {
    id: 'skinny-fit-jeans',
    name: 'Skinny Fit Jeans',
    price: 240, oldPrice: 260, discount: 20, rating: 3.5, sold: 720, isNew: true,
    type: 'Jeans', styles: ['Casual'],
    colors: ['blue'], sizes: wide,
    images: [img('skinny-jeans')],
  },
  {
    id: 'checkered-shirt',
    name: 'Checkered Shirt',
    price: 180, rating: 4.5, sold: 810, isNew: true,
    type: 'Shirts', styles: ['Casual', 'Formal'],
    colors: ['red', 'blue'], sizes: wide,
    images: [img('checkered-shirt')],
  },
  {
    id: 'sleeve-striped-tshirt',
    name: 'Sleeve Striped T-shirt',
    price: 130, oldPrice: 160, discount: 30, rating: 4.5, sold: 590, isNew: true,
    type: 'T-shirts', styles: ['Casual', 'Gym'],
    colors: ['orange', 'black'], sizes: std,
    images: [img('sleeve-striped-tshirt')],
  },
  {
    id: 'vertical-striped-shirt',
    name: 'Vertical Striped Shirt',
    price: 212, oldPrice: 232, discount: 20, rating: 5.0, sold: 1450,
    type: 'Shirts', styles: ['Casual', 'Formal'],
    colors: ['green', 'white'], sizes: wide,
    images: [img('vertical-striped-shirt')],
  },
  {
    id: 'courage-graphic-tshirt',
    name: 'Courage Graphic T-shirt',
    price: 145, rating: 4.0, sold: 1320,
    type: 'T-shirts', styles: ['Casual', 'Party'],
    colors: ['orange'], sizes: std,
    images: [img('courage-tshirt')],
  },
  {
    id: 'loose-fit-bermuda-shorts',
    name: 'Loose Fit Bermuda Shorts',
    price: 80, rating: 3.0, sold: 1180,
    type: 'Shorts', styles: ['Casual', 'Gym'],
    colors: ['blue'], sizes: std,
    images: [img('bermuda-shorts')],
  },
  {
    id: 'faded-skinny-jeans',
    name: 'Faded Skinny Jeans',
    price: 210, rating: 4.5, sold: 1250,
    type: 'Jeans', styles: ['Casual', 'Party'],
    colors: ['black'], sizes: wide,
    images: [img('faded-skinny-jeans')],
  },
  {
    id: 'gradient-graphic-tshirt',
    name: 'Gradient Graphic T-shirt',
    price: 145, rating: 3.5, sold: 1500,
    type: 'T-shirts', styles: ['Casual', 'Party'],
    colors: ['white', 'pink'], sizes: wide,
    images: [img('gradient-tshirt')],
  },
  {
    id: 'polo-with-tipping-details',
    name: 'Polo with Tipping Details',
    price: 180, rating: 4.5, sold: 1400,
    type: 'T-shirts', styles: ['Casual', 'Formal'],
    colors: ['red', 'pink', 'white'], sizes: wide,
    images: [img('polo-tipping')],
  },
  {
    id: 'black-striped-tshirt',
    name: 'Black Striped T-shirt',
    price: 120, oldPrice: 150, discount: 30, rating: 5.0, sold: 1600,
    type: 'T-shirts', styles: ['Casual', 'Gym'],
    colors: ['black', 'white'], sizes: wide,
    images: [img('black-striped-tshirt')],
  },
  {
    id: 'polo-with-contrast-trims',
    name: 'Polo with Contrast Trims',
    price: 212, oldPrice: 242, discount: 20, rating: 4.0, sold: 900,
    type: 'T-shirts', styles: ['Casual', 'Formal'],
    colors: ['cyan', 'blue'], sizes: wide,
    images: [img('polo-contrast')],
  },
]

const COPY = {
  'T-shirts':
    'A comfortable everyday tee cut from soft, breathable cotton. Relaxed through the body with a clean neckline that holds its shape wash after wash.',
  Shirts:
    'A well-made shirt with a clean collar and a fit that works open over a tee or buttoned up. Lightweight fabric that keeps its shape through the day.',
  Jeans:
    'Mid-weight stretch denim with a slim leg and a comfortable rise. Built to keep its colour and shape through repeated wear.',
  Shorts:
    'Easy, loose-fitting shorts in durable washed denim, with a comfortable waist and plenty of room to move.',
}

export const getProduct = (id) => {
  const p = PRODUCTS.find((x) => x.id === id)
  if (!p) return null
  return { ...p, description: p.description || COPY[p.type] }
}

export const getRelated = (product, count = 4) => {
  const same = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.type === product.type || p.styles.some((s) => product.styles.includes(s)))
  )
  const rest = PRODUCTS.filter((p) => p.id !== product.id && !same.includes(p))
  const byPopularity = (a, b) => b.sold - a.sold
  return [...same.sort(byPopularity), ...rest.sort(byPopularity)].slice(0, count)
}

export const money = (n) => `$${n.toLocaleString('en-US')}`
