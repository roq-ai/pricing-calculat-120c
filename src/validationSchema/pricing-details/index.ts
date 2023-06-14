import * as yup from 'yup';

export const pricingDetailValidationSchema = yup.object().shape({
  parameter: yup.string().required(),
  value: yup.number().integer().required(),
  organization_id: yup.string().nullable().required(),
});
