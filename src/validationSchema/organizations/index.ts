import * as yup from 'yup';
import { pricingDetailValidationSchema } from 'validationSchema/pricing-details';

export const organizationValidationSchema = yup.object().shape({
  description: yup.string(),
  image: yup.string(),
  name: yup.string().required(),
  user_id: yup.string().nullable().required(),
  pricing_detail: yup.array().of(pricingDetailValidationSchema),
});
