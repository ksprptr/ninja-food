import { Calculators } from '@/common/types/calculator.types';
import { calculatorValidationSchema } from '@/common/validations/calculator.validations';
import calculatorData from '@/data/calculators.json';

// Calculators configuration
export const calculators: Calculators = calculatorValidationSchema.parse(calculatorData);
