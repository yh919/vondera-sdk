/**
 * Common API response wrapper
 */
export interface ApiResponse<T = any> {
  status: number;
  message: string;
  data: T | null;
}

/* ==========================
   Wishlist
   ========================== */
export interface WishlistItem {
  id: string;
  name: string;
  description?: string;
  price?: number;
  crossedPrice?: number;
  quantity?: number;
  mainImage?: ImageSizes | null;
  images?: ImageSizes[];
  link?: string;
  categoryName?: string;
  categoryId?: string;
  subCategoryId?: string;
  subCategoryName?: string;
  sku?: string;
  variantsDisplay?: Record<string, string[] | string>;
  variantsSettings?: VariantSetting[];
  rating?: { average?: number; count?: number };
  isAvailable?: boolean;
}

export interface WishlistResponse {
  items: WishlistItem[];
  isLastPage: boolean;
  nextPageNumber: number | null;
  currentPage: number;
  totalPages: number;
}

/* ==========================
   Images and Variants
   ========================== */
export interface ImageSizes {
  originalSize?: string;
  smallSize?: string;
  small?: string;
  large?: string;
}

export interface VariantSetting {
  id?: string;
  sku?: string;
  price?: number;
  cost?: number;
  quantity?: number;
  displayOptions?: Record<string, string>;
  optimizedImage?: string;
  image?: string;
  currency?: string;
  country?: string;
}

/* ==========================
   Products
   ========================== */
export interface ProductSummary {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  crossedPrice?: number;
  mainImage?: ImageSizes | null;
  images?: string[] | ImageSizes[];
  link?: string;
  categoryName?: string;
  categoryLink?: string;
  subCategoryName?: string;
  subCategoryId?: string;
  quantity?: number;
  isAvailable?: boolean;
  currency?: string;
  country?: string;
  variantsDisplay?: Record<string, string[] | string>;
  variantsSettings?: VariantSetting[] | Record<string, any>;
  rating?: { average?: number; count?: number };
}

export interface ProductListResponse {
  items: ProductSummary[];
  isLastPage: boolean;
  nextPageNumber: number | null;
  currentPage: number;
  totalPages: number;
}

export interface ProductDetailResponse {
  product: ProductSummary & {
    variantsDetails?: VariantSetting[];
    simillerProducts?: ProductSummary[];
  };
  simillerProducts?: ProductSummary[];
}

export interface ProductReviewItem {
  id: string;
  rating: number;
  name: string;
  email: string;
  review: string;
  date?: { _seconds?: number; _nanoseconds?: number } | string;
  productId?: string;
}

export interface ProductReviewsResponse {
  items: ProductReviewItem[];
  isLastPage: boolean;
  nextPageNumber: number | null;
  currentPage: number;
  totalPages: number;
}

/* ==========================
   Categories
   ========================== */
export interface CategorySubItem {
  id: string;
  categoryId?: string;
  name: string;
  sortValue?: number;
  productCount?: number;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
  link?: string;
  subCategories?: CategorySubItem[];
  productsCount?: number;
}

/* ==========================
   Auth / Customer
   ========================== */
export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponseData {
  user?: CustomerDetails | null;
  token?: string | null;
}

export interface CustomerDetails {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  gov?: string;
  storeId?: string;
  createDate?: { _seconds?: number; _nanoseconds?: number } | string;
}

/* ==========================
   Orders
   ========================== */
export interface OrderProductItem {
  id: string;
  name?: string;
  variantId?: string;
  link?: string;
  previewImage?: string;
  itemPrice?: number;
  quantity?: number;
  totalPrice?: number;
  variantDisplay?: Record<string, string> | Record<string, any>;
}

export interface OrderPaymentInfo {
  gateway?: string;
  method?: string;
  paymentStatus?: string;
  productsPrice?: number;
  shippingFees?: number;
  discount?: number;
  totalPrice?: number;
  paidAmount?: number;
  remainingAmount?: number;
}

export interface OrderSummary {
  id: string;
  date?: { _seconds?: number; _nanoseconds?: number } | string;
  status?: string;
  attachmentsCount?: number;
  marketPlaceId?: string;
  productsCount?: number;
  discountCode?: string;
  products?: OrderProductItem[];
  payment?: OrderPaymentInfo;
  customer?: CustomerDetails & {
    name?: string;
    phone?: string;
    email?: string;
    address?: string;
    gov?: string;
  };
  courier?: { id?: string; name?: string };
}

export interface OrdersResponse {
  items: OrderSummary[];
  isLastPage: boolean;
  nextPageNumber: number | null;
  currentPage: number;
  totalPages: number;
}

export interface OrderPriceResponse {
  itemsPrice: number;
  shippingFees: number;
  discount: number;
  totalPrice: number;
}

export interface CreateOrderResponseData {
  id?: string;
  date?: { _seconds?: number; _nanoseconds?: number } | string;
  status?: string;
  link?: string; // gateway link when redirecting
  amount?: number;
  // or full order object
  order?: OrderSummary;
}

/* ==========================
   Cart
   ========================== */
export interface CartItem {
  id: string;
  name?: string;
  image?: string;
  categoryName?: string;
  subCategoryName?: string;
  link?: string;
  variantId?: string;
  variantDisplay?: Record<string, any>;
  quantity?: number;
  maxQuantity?: number;
  price?: number;
  totalPrice?: number;
}

export interface CartResponse {
  items: CartItem[];
  totalPrice: number;
  currency?: string;
  totalQuantity?: number;
  productsCount?: number;
}

/* ==========================
   Custom Pages
   ========================== */
export interface CustomPage {
  id: string;
  body?: string;
  title?: string;
  link?: string;
}

/* ==========================
   Store
   ========================== */
export interface StoreThemeing {
  floatingBgColor?: string;
  customerAccountsEnabled?: boolean;
  listBanners?: string[];
  listCover?: string[];
  sendEmailToCustomer?: boolean;
  whatsappButton?: boolean;
  requireEmail?: boolean;
  reviewsEnabled?: boolean;
  prePaidProducts?: boolean;
  askForAddress?: boolean;
  lastPiece?: boolean;
  productTextColor?: string;
  bgColor?: string;
  listBannerBgColor?: string;
  footerBgColor?: string;
  footerTextColor?: string;
  listBannerTextColor?: string;
  productImageBgColor?: string;
  primaryColor?: string;
  secondaryColor?: string;
  canSingleCheckout?: boolean;
  minOrderAmount?: number;
  fontId?: number;
  buttonTextColor?: string;
  buttonBgColor?: string;
  themeId?: number;
}

export interface StoreArea {
  govName?: string;
  price?: number;
}

export interface StoreData {
  enabled?: boolean;
  id?: string;
  name?: string;
  logo?: string;
  slogan?: string;
  country?: string;
  curreny?: string;
  domains?: string[];
  themeing?: StoreThemeing;
  features?: Record<string, any>;
  covers?: string[];
  banners?: string[];
  depositOptions?: { active?: boolean; type?: string; value?: number };
  areas?: StoreArea[];
  pixels?: Record<string, string>;
}

/* ==========================
   Utility
   ========================== */
export type Nullable<T> = T | null | undefined;
