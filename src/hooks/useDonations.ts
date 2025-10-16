import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createDonation,
  getDonations,
  getDonationById,
  updateDonationStatus,
} from "../services/donations";
import type { DonationRequest, DonationResponse, ApiError } from "../types/donation";

// Get donation by ID
export const useGetDonationById = (id: string) => {
  return useQuery({
    queryKey: ["donation", id],
    queryFn: () => getDonationById(id),
    enabled: !!id,
  });
};

// Get all donations
export const useGetDonations = () => {
  return useQuery({
    queryKey: ["donations"],
    queryFn: () => getDonations(),
  });
};

// Create donation
export const useCreateDonation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (payload: DonationRequest) => createDonation(payload),
    onSuccess: (data: DonationResponse) => {
      console.log('Donation created successfully:', data);
      // Invalidate donations-related queries
      queryClient.invalidateQueries({ queryKey: ["donations"] });
    },
    onError: (error: unknown) => {
      console.error('Error creating donation:', error);
      // Extract error message from API response
      const apiError = error as ApiError;
      const errorMessage = apiError?.response?.data?.error?.message || 
                          apiError?.response?.data?.message || 
                          apiError?.message || 
                          'An unexpected error occurred';
      throw new Error(errorMessage);
    },
  });
};

// Update donation status
export const useUpdateDonationStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: 'pending' | 'completed' | 'failed' | 'refunded' | 'expired';
    }) => updateDonationStatus(id, status),
    onSuccess: (data: DonationResponse) => {
      // Update the specific donation in cache
      queryClient.setQueryData(["donation", data._id], data);
      // Invalidate donations list to refetch
      queryClient.invalidateQueries({ queryKey: ["donations"] });
    },
  });
};
