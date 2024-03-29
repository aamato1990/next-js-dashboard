import Form from '@/app/ui/invoices/edit-form';
import  Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Edit Invoice',
  };

export default async function Page({ params }: { params: { id: string } }){
    const id = params.id;
    
    const [customers, invoice] = await Promise.all([
        fetchCustomers(),
        fetchInvoiceById(id)
    ]);
    if(!invoice) {
        return notFound();
    }

    return (
        <main>
            <Breadcrumbs 
                breadcrumbs={[
                    {label: 'Invoices', href:'/dashboard/invoices'},
                    {label: 'Edit invoice', href: `/dashboard/invoices/${id}/edit`}
                ]}
            />
            <Form invoice={invoice} customers={customers} />
        </main>
    );
};