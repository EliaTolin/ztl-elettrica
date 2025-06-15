export interface City {
  id: string;
  name: string;
  region: string;
  description: string;
  request_url: string;
  needs_display: boolean;
  free_parking: boolean;
  coordinates: [number, number];
  latitude: number;
  longitude: number;
  duration?: string;
  office_address?: string;
  office_hours?: string;
  phone?: string;
  email?: string;
  parking_zones_description?: string;
  ztl_access_description?: string;
  cost?: string;
  payment_method?: string;
  required_documents?: string;
  requirements?: string;
  notes?: string;
}
