export interface Delivery {
  freeDeliveryFromCzk: number;
  zones: DeliveryZone[];
  openingHours: OpeningHours[];
}

export interface DeliveryZone {
  slug: string;
  name: string;
  areas: string[];
  feeCzk: number;
  minOrderCzk: number;
  deliveryTimeMin: {
    from: number;
    to: number;
  };
}

export interface OpeningHours {
  days: string;
  from: string;
  to: string;
}
