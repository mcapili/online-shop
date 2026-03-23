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
];
