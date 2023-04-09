type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

interface Database {
    public: {
        Tables: {
            accounts: {
                Row: {
                    created_at: string;
                    current_balance: number;
                    id: string;
                    name: string;
                    notes: string | null;
                    starting_trans_id: string | null;
                    updated_at: string;
                };
                Insert: {
                    created_at?: string;
                    current_balance?: number;
                    id?: string;
                    name: string;
                    notes?: string | null;
                    starting_trans_id?: string | null;
                    updated_at?: string;
                };
                Update: {
                    created_at?: string;
                    current_balance?: number;
                    id?: string;
                    name?: string;
                    notes?: string | null;
                    starting_trans_id?: string | null;
                    updated_at?: string;
                };
            };
            categories: {
                Row: {
                    created_at: string;
                    id: string;
                    name: string;
                    updated_at: string;
                };
                Insert: {
                    created_at?: string;
                    id?: string;
                    name?: string;
                    updated_at?: string;
                };
                Update: {
                    created_at?: string;
                    id?: string;
                    name?: string;
                    updated_at?: string;
                };
            };
            first_trans: {
                Row: {
                    account_id_from: string;
                    account_id_to: string | null;
                    amount: number;
                    category_id: string;
                    created_at: string;
                    id: string;
                    is_first_trans: boolean;
                    name: string;
                    notes: string | null;
                    recorded_at: string;
                    type: string;
                    updated_at: string;
                };
                Insert: {
                    account_id_from: string;
                    account_id_to?: string | null;
                    amount?: number;
                    category_id: string;
                    created_at?: string;
                    id?: string;
                    is_first_trans?: boolean;
                    name?: string;
                    notes?: string | null;
                    recorded_at?: string;
                    type?: string;
                    updated_at?: string;
                };
                Update: {
                    account_id_from?: string;
                    account_id_to?: string | null;
                    amount?: number;
                    category_id?: string;
                    created_at?: string;
                    id?: string;
                    is_first_trans?: boolean;
                    name?: string;
                    notes?: string | null;
                    recorded_at?: string;
                    type?: string;
                    updated_at?: string;
                };
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
}

type transactionDetails = {
    id: string;
    name: string;
    amount: number;
    type: string;
    recorded_at: string;
    notes: string | null;
    is_first_trans: boolean;
    category: {
        id: string;
        name: string;
    };
    account_from: {
        id: string;
        name: string;
    };
    account_to: {
        id: string;
        name: string;
    } | null;
};

type accountDetails = {
    id: string;
    name: string;
    current_balance: number;
    notes: string;
    created_at: string;
    updated_at: string;
    first_trans: {
        id: string;
        amount: number;
        type: string;
    };
};

type categoryDetails = {
    id: string;
    name: string;
};

type transactionFormData = {
    id: string;
    name: string;
    amount: number;
    type: string;
    recordDate: string;
    recordTime: string;
    categoryId: string;
    accountIdFrom: string;
    accountIdTo: string | null;
    notes: string;
};

type categoryFormData = {
    id: string;
    name: string;
};

type accountFormData = {
    id: string;
    name: string;
    startingBalance: number;
    currentBalance: number;
    notes: string;
};
