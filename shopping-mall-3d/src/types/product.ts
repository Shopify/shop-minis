export interface Product {
    id: string
    title?: string
    price?: {
      amount: string
      currencyCode: string
    }
    featuredImage?: {
      url: string
    }
  }