export interface Product {
  category: string;
  name: string;
  note: string;
  image?: string;
  focus?: string;
}

export interface SiteData {
  version: number;
  phone: string;
  ownerName: string;
  address: string;
  ownerBlurb: string;
  announcement: string;
  products: Product[];
}
