import { Delivery } from '@/common/types/delivery.types';
import { deliveryValidationSchema } from '@/common/validations/delivery.validations';
import deliveryData from '@/data/delivery.json';

// Delivery configuration
export const delivery: Delivery = deliveryValidationSchema.parse(deliveryData);
