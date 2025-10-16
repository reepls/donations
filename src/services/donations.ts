import { apiClient } from './api';
import type { DonationRequest, DonationResponse } from '../types/donation';

export const createDonation = async (donation: DonationRequest): Promise<DonationResponse> => {
  console.log('Sending donation request:', donation);
  const { data } = await apiClient.post('/donations', donation);
  console.log('Donation API response:', data);
  return data;
};

export const getDonations = async (): Promise<DonationResponse[]> => {
  const { data } = await apiClient.get('/donations');
  return data;
};

export const getDonationById = async (id: string): Promise<DonationResponse> => {
  const { data } = await apiClient.get(`/donations/${id}`);
  return data;
};

export const updateDonationStatus = async (
  id: string, 
  status: 'pending' | 'completed' | 'failed' | 'refunded' | 'expired'
): Promise<DonationResponse> => {
  const { data } = await apiClient.patch(`/donations/${id}`, { status });
  return data;
};
