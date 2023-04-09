import { supabase } from './supabase';

export async function getCategoryList() {
    const fields = ['id', 'name'];

    const res = await supabase
        .from('categories')
        .select(fields.join())
        .order('name', { ascending: true })
        .returns<categoryDetails[]>();

    return res;
}

export async function getCategoryDetails(id: string) {
    const fields = ['id', 'name'];

    const res = await supabase
        .from('categories')
        .select(fields.join())
        .eq('id', id)
        .limit(1)
        .returns<categoryDetails[]>();

    return res;
}

export async function addCategory(data: categoryFormData) {
    const row = {
        name: data.name
    };

    const res = await supabase.from('categories').insert([row]);
}

export async function deleteCategory(id: string) {
    const res = await supabase.from('categories').delete().eq('id', id);
}

export async function updateCategory(data: categoryFormData) {
    const row = {
        name: data.name
    };

    const res = await supabase.from('categories').update(row).eq('id', data.id);
}
