const mapping: Record<string, string> = {
  organizations: 'organization',
  'pricing-details': 'pricing_detail',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
