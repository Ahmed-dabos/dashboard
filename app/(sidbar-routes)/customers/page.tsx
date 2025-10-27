import CustomersTable from "@/components/CustormersTable";
import AddCustomer from "@/components/AddCustomerDialog";
export default function Customers() {
    return (
        <main className="flex flex-col gap-4 max-w-7xl mx-auto p-4 md:p-24">
            <h1 className="text-2xl font-bold">Customers</h1>
            <div className="flex justify-end">
                <AddCustomer />
            </div>
            <CustomersTable />
        </main>
    )
}