import { roundAmount } from './currency';
import { supabase } from './supabase';

export async function getAccountList() {
    const fields = [
        'id',
        'name',
        'current_balance',
        'notes',
        'created_at',
        'updated_at',
        'first_trans:transactions!accounts_starting_trans_id_fkey (id, amount, type)'
    ];

    const res = await supabase
        .from('accounts')
        .select(fields.join())
        .order('name', { ascending: true })
        .returns<accountDetails[]>();

    return res;
}

export async function getAccountDetails(id: string) {
    const fields = [
        'id',
        'name',
        'current_balance',
        'notes',
        'created_at',
        'updated_at',
        'first_trans:transactions!accounts_starting_trans_id_fkey (id, amount, type)'
    ];

    const res = await supabase
        .from('accounts')
        .select(fields.join())
        .eq('id', id)
        .limit(1)
        .returns<accountDetails[]>();

    return res;
}

export async function addAccount(data: accountFormData) {
    const row = {
        name: data.name,
        current_balance: roundAmount(data.startingBalance),
        notes: data.notes
    };

    const res = await supabase.from('accounts').insert([row]);
}

export async function deleteAccount(id: string) {
    const res = await supabase.from('accounts').delete().eq('id', id);
}

export async function updateAccount(data: accountFormData) {
    const origRes = await getAccountDetails(data.id);
    const origData = origRes.data ? origRes.data[0] : null;

    // TODO: Error: account not found
    if (!origData) return;

    const origStartingBalance =
        (origData.first_trans.type === 'INCOME' ? 1 : -1) * origData.first_trans.amount;

    // * Update starting transaction balance
    if (data.startingBalance != origStartingBalance) {
        const row = {
            amount: Math.abs(data.startingBalance),
            type: data.startingBalance >= 0 ? 'INCOME' : 'EXPENSE'
        };

        const res = await supabase
            .from('transactions')
            .update(row)
            .eq('id', origData.first_trans.id);
    }

    // * Add an adjustment transaction to adjust current balance
    if (data.currentBalance != origData.current_balance) {
        const difference = data.currentBalance - origData.current_balance;
        const categFields = ['id', 'name'];

        const otherCategData = await supabase
            .from('categories')
            .select(categFields.join())
            .eq('name', 'Others')
            .limit(1)
            .returns<categoryDetails[]>();

        const otherCategId = otherCategData.data ? otherCategData.data[0].id : null;

        // TODO: Error: 'Others' category not found
        if (!otherCategId) return;

        const row = {
            name: 'Adjustment',
            amount: Math.abs(difference),
            type: difference >= 0 ? 'INCOME' : 'EXPENSE',
            account_id_from: data.id,
            category_id: otherCategId
        };

        const res = await supabase.from('transactions').insert([row]);
    }

    // * Update account if either name or notes changed
    if (origData.name != data.name || origData.notes != data.notes) {
        const row = {
            name: data.name,
            notes: data.notes
        };

        const res = await supabase.from('accounts').update(row).eq('id', data.id);
    }
}
