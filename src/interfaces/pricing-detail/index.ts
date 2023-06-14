import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface PricingDetailInterface {
  id?: string;
  parameter: string;
  value: number;
  organization_id: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface PricingDetailGetQueryInterface extends GetQueryInterface {
  id?: string;
  parameter?: string;
  organization_id?: string;
}
