type NavLink = {
  href: string;
  label: string;
};

export const links: NavLink[] = [
  {
    href: '/',  // Home
    label: 'Home',
  },
  {
    href: '/about',  // About
    label: 'About',
  },
  {
    href: '/products',  // Products
    label: 'Products',
  },
  {
    href: '/favorites',  // Favorites
    label: 'Favorites',
  },
  {
    href: '/cart',  // Cart
    label: 'Cart',
  },
  {
    href: '/orders',  // Orders
    label: 'Orders',
  },
  {
    href: '/admin/sales',  // Dashboard
    label: 'Dashboard',
  },
];

export const adminLinks: NavLink[] = [
  { href: '/admin/sales', label: 'sales' },
  { href: '/admin/products', label: 'manage products' },
  { href: '/admin/products/create', label: 'add products' },
];
