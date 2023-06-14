import axios from 'axios';
import queryString from 'query-string';
import { PricingDetailInterface, PricingDetailGetQueryInterface } from 'interfaces/pricing-detail';
import { GetQueryInterface } from '../../interfaces';

export const getPricingDetails = async (query?: PricingDetailGetQueryInterface) => {
  const response = await axios.get(`/api/pricing-details${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createPricingDetail = async (pricingDetail: PricingDetailInterface) => {
  const response = await axios.post('/api/pricing-details', pricingDetail);
  return response.data;
};

export const updatePricingDetailById = async (id: string, pricingDetail: PricingDetailInterface) => {
  const response = await axios.put(`/api/pricing-details/${id}`, pricingDetail);
  return response.data;
};

export const getPricingDetailById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/pricing-details/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePricingDetailById = async (id: string) => {
  const response = await axios.delete(`/api/pricing-details/${id}`);
  return response.data;
};
