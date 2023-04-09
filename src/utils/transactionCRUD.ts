import { supabase } from './supabase';

export async function getTransactionList() {
    const fields = [
        'id',
        'name',
        'amount',
        'type',
        'recorded_at',
        'notes',
        'is_first_trans',
        'category:categories (id, name)',
        'account_from:accounts!transactions_account_id_from_fkey (id, name)',
        'account_to:accounts!transactions_account_id_to_fkey (id, name)'
    ];

    const res = await supabase
        .from('transactions')
        .select(fields.join())
        .order('recorded_at', { ascending: false })
        .order('updated_at', { ascending: false })
        .returns<transactionDetails[]>();

    return res;
}

export async function getTransactionDetails(id: string) {
    const fields = [
        'id',
        'name',
        'amount',
        'type',
        'recorded_at',
        'notes',
        'is_first_trans',
        'category:categories (id, name)',
        'account_from:accounts!transactions_account_id_from_fkey (id, name)',
        'account_to:accounts!transactions_account_id_to_fkey (id, name)'
    ];

    const res = await supabase
        .from('transactions')
        .select(fields.join())
        .eq('id', id)
        .limit(1)
        .returns<transactionDetails[]>();

    return res;
}

export async function addTransaction(data: transactionFormData) {
    let recordDateTimeUTCString = new Date(
        [data.recordDate, data.recordTime].join(' ')
    ).toISOString();

    const row = {
        name: data.name,
        amount: data.amount,
        type: data.type,
        recorded_at: recordDateTimeUTCString,
        category_id: data.categoryId,
        account_id_from: data.accountIdFrom,
        account_id_to: data.accountIdTo,
        notes: data.notes
    };

    const res = await supabase.from('transactions').insert([row]);
}

export async function deleteTransaction(id: string) {
    const res = await supabase.from('transactions').delete().eq('id', id);
}

export async function updateTransaction(data: transactionFormData) {
    let recordDateTimeUTCString = new Date(
        [data.recordDate, data.recordTime].join(' ')
    ).toISOString();

    const row = {
        name: data.name,
        amount: data.amount,
        type: data.type,
        recorded_at: recordDateTimeUTCString,
        category_id: data.categoryId,
        account_id_from: data.accountIdFrom,
        account_id_to: data.accountIdTo,
        notes: data.notes
    };

    const res = await supabase.from('transactions').update(row).eq('id', data.id);

    console.log(res);
}
