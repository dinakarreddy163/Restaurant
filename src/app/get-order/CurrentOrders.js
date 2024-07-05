import { TabView, TabPanel } from 'primereact/tabview';
import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

const CurrentOrders = () => {
    const [orders, setOrders] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [visible, setVisible] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        getOrders();
    }, [])
    const getOrders = () => {
        const orders = fetch("http://25.17.214.78:81/getOrders");
        orders.then(res => {
            res.json().then((json) => {
                setOrders(json);
            })
        })
    }

    const onRowSelect = (event) => {
        console.log(event)
        setVisible(true);
        setItems(event.data.items)    };

    const onRowUnselect = (event) => {
        console.log(event)
    };

    const actionBodyTemplate = () => {
        return (<div>
            <Button label="Approve" rounded />
            <Button label="Cancel" severity="secondary" rounded />
        </div>)
    }

    return (
        <div className="card">
            <DataTable value={orders} selectionMode="single" selection={selectedProduct} onSelectionChange={(e) => setSelectedProduct(e.value)} dataKey="order_id"
                onRowSelect={onRowSelect} onRowUnselect={onRowUnselect} metaKeySelection={false} tableStyle={{ minWidth: '50rem' }}>
                <Column field="order_id" header="Order Id" ></Column>
                <Column field="order_status" header="Order Status"></Column>
                <Column field="order_time" header="Order Time"></Column>
                <Column field="table_number" header="Table Number"></Column>
                <Column field="Waiter" header="Waiter"></Column>
            </DataTable>
            <div className="card flex justify-content-center">
                <Dialog header="Items" visible={visible} onHide={() => setVisible(false)}
                    breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                    <div className="card">
                        <DataTable value={items} tableStyle={{ minWidth: '50rem' }}>
                            <Column field="item_name" header="Item Name"></Column>
                            <Column field="quantity" header="Quantity"></Column>
                            <Column field="status" header="Status"></Column>
                            <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>

                        </DataTable>
                    </div>
                </Dialog>
            </div>
        </div>
    )

}

export default CurrentOrders