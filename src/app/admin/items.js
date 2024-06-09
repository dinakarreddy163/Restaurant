import { Dialog } from 'primereact/dialog';
import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const Item = () => {
    const [visible, setVisible] = useState(false);
    const [item, setItem] = useState({
        itemName: '',
        price: '',
        category: '',
        available: 1,
        type: '',
        description: ''
    });

    const [itemList, setItemList] = useState([{
        item_name: '',
        item_id: '',
        price: '',
        category: '',
        available: 1,
        type: '',
        description: ''
    }]);

    const itemsFormData = (e) => {
        let { value, name, checked } = e.target;
        if (name == 'available') {
            value = checked ? 1 : 0;
        }
        let formVal = {
            ...item,
            [name]: value
        }
        setItem(formVal);
        console.log(itemList)
    }


    const submit = (e) => {
        console.log(e);
        itemAdd();
    }

    useEffect(() => {
        getEmployee();
    }, []);

    const getEmployee = async () => {
        await fetch('http://localhost:3000/item').then((res) => {
            res.json().then((json) => {
                setItemList(json);
            })
        })
    }

    const itemAdd = async () => {
        await fetch("http://localhost:3000/item", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(item)
        }).then(res => {
            res.json().then(json => {
                console.log(json);
            });
        });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full min-h-screen">
                <div className="flex justify-content-between">
                    <h1 className="text-2xl font-bold mb-4">Items</h1>
                    <button className="bg-blue-500 text-white font-bold py-2 px-4 m-4 rounded hover:bg-blue-700" onClick={() => setVisible(true)}>
                        Add
                    </button>
                    <Dialog header="Add Item" visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
                        <form onSubmit={submit}>
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label for="itemName" className="block text-sm font-medium leading-6 text-gray-900">Item Name</label>
                                    <div className="mt-2">
                                        <input type="text" required onChange={itemsFormData} name="itemName" id="itemName" autocomplete="given-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label for="description" className="block text-sm font-medium leading-6 text-gray-900">Item Description</label>
                                    <div className="mt-2">
                                        <input type="text" required onChange={itemsFormData} name="description" id="description" autocomplete="given-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label for="price" className="block text-sm font-medium leading-6 text-gray-900">Price</label>
                                    <div className="mt-2">
                                        <input type="text" required onChange={itemsFormData} name="price" id="price" autocomplete="given-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                                <div class="sm:col-span-3">
                                    <label for="category" class="block text-sm font-medium leading-6 text-gray-900">Category</label>
                                    <div class="mt-2">
                                        <select required id="category" name="category" value={item.category} onChange={itemsFormData} autocomplete="Type-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                            <option>Veg starters</option>
                                            <option>Non Veg starters</option>
                                            <option>Dessert</option>
                                            <option>Shakes</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="sm:col-span-3">
                                    <label for="Type" class="block text-sm font-medium leading-6 text-gray-900">Type</label>
                                    <div class="mt-2">
                                        <select required id="Type" name="type" value={item.type} onChange={itemsFormData} autocomplete="Type-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                            <option>Veg</option>
                                            <option>Non Veg</option>
                                            <option>Dessert</option>
                                            <option>Shakes</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="sm:col-span-3">
                                    <div class="flex h-6 items-center">
                                        <input id="available" name="available" type="checkbox" checked={item.available} onChange={itemsFormData} class="h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                    </div>
                                    <div class="text-sm leading-6">
                                        <label for="available" class="font-medium text-gray-900">Available</label>
                                    </div>
                                </div>
                                <div class="mt-6 flex items-center justify-end gap-x-6">
                                    <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                                    <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                                </div>
                            </div>
                        </form>
                    </Dialog>
                </div>
                <DataTable value={itemList} selectionMode="single" dataKey="item_id" tableStyle={{ minWidth: '50rem' }}>
                    <Column field="item_id" header="Item Id" ></Column>
                    <Column field="item_name" header="Item Name"></Column>
                    <Column field="description" header="Description"></Column>
                    <Column field="price" header="Price"></Column>
                    <Column field="category" header="Category"></Column>
                    <Column field="type" header="Type"></Column>
                    <Column field="available" header="Available"></Column>
                </DataTable>

            </div>
        </div>
    )

}

export default Item;