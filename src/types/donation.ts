export interface DedicatedTo {
  type: 'article' | 'publication' | 'author';
  id: string;
}

export interface ApiError {
  response?: {
    data?: {
      error?: {
        message?: string;
      };
      message?: string;
    };
  };
  message?: string;
}

export interface DonationRequest {
  amount: number;
  type: 'one-time' | 'monthly';
  phone: string;
  email: string;
  anonymous: boolean;
  payment_method: 'card' | 'bank_transfer' | 'mobile_money';
  dedicated_to?: DedicatedTo;
}

export interface DonationResponse {
  _id: string;
  user_id?: string;
  amount: number;
  type: 'one-time' | 'monthly';
  status: 'pending' | 'completed' | 'failed' | 'refunded' | 'expired';
  payment_method: 'card' | 'bank_transfer' | 'mobile_money';
  payment_id?: string;
  transaction_id?: string;
  phone: string;
  email: string;
  anonymous: boolean;
  dedicated_to?: DedicatedTo;
  created_at: string;
  updated_at: string;
}
