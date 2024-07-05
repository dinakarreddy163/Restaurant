import { Dialog } from 'primereact/dialog';
import { useEffect, useState } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
const Employee = () => {
    const [visible, setVisible] = useState(false);
    const [employee, setEmployee] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        type: '',
        password: ''
    });

    const [employeeList, setEmployeeList] = useState([{
        "emp_id": "",
        "username": "",
        "password": "",
        "full_name": "",
        "email": "",
        "phone_number": "",
        "type": ""
    }]);

    
    const loginFormData = (e) => {
        const { value, name } = e.target
        let formVal = {
            ...employee,
            [name]: value
        }
        setEmployee(formVal);
    }


    const submit = (e) => {
        employeeAdd();
    }

    useEffect(()=>{
        getEmployee();
    }, [])

    const getEmployee = () => {
       fetch('http://25.17.214.78:81/employee').then((res) => {
        res.json().then((json) => {
            setEmployeeList(json);
        })
    })
    }

    const employeeAdd = async () => {
        await fetch("http://25.17.214.78:81/employee", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            // mode: "cors", // no-cors, *cors, same-origin
            // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            // redirect: "follow", // manual, *follow, error
            // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(employee), // body data type must match "Content-Type" header
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
                    <h1 className="text-2xl font-bold mb-4">Employee</h1>
                    <button className="bg-blue-500 text-white font-bold py-2 px-4 m-4 rounded hover:bg-blue-700" onClick={() => setVisible(true)}>
                        Add
                    </button>
                    <Dialog header="Add Employee" visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
                        <form onSubmit={submit}>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                                <div className="sm:col-span-3">
                                    <label for="first-name" className="block text-sm font-medium leading-6 text-gray-900">First name</label>
                                    <div className="mt-2">
                                        <input type="text" required onChange={loginFormData} name="firstName" id="first-name" autocomplete="given-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label for="first-name" className="block text-sm font-medium leading-6 text-gray-900">Last name</label>
                                    <div className="mt-2">
                                        <input type="text" required onChange={loginFormData} name="lastName" id="Last-name" autocomplete="given-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label for="first-name" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                    <div className="mt-2">
                                        <input type="password" required onChange={loginFormData} name="password" id="password" autocomplete="given-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label for="first-name" className="block text-sm font-medium leading-6 text-gray-900">Phone No</label>
                                    <div className="mt-2">
                                        <input type="text" required onChange={loginFormData} name="phone" id="phone" autocomplete="given-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                                <div class="sm:col-span-3">
                                    <label for="Type" class="block text-sm font-medium leading-6 text-gray-900">Type</label>
                                    <div class="mt-2">
                                        <select required id="Type" name="type" value={employee.type} onChange={loginFormData} autocomplete="Type-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                            <option>Cook</option>
                                            <option>Admin</option>
                                            <option>Waiter</option>
                                        </select>
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

                <DataTable value={employeeList} selectionMode="single" dataKey="item_id" tableStyle={{ minWidth: '50rem' }}>
                    <Column field="emp_id" header="Emp Id" ></Column>
                    <Column field="full_name" header="Emp Name"></Column>
                    <Column field="username" header="User Name"></Column>
                    <Column field="phone_number" header="Phone"></Column>
                    <Column field="type" header="Type"></Column>
                </DataTable>
            </div>
        </div>
    )
}

export default Employee;