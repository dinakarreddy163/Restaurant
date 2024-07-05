import { useEffect, useState } from 'react';
import { useEffect, useState } from 'react';

const BillingDetail = () => {

    const [getTable, setTable] = useState([]);

    useEffect(() => {
        getAllTables();
    }, []);

    async function getAllTables() {
        await fetch('http://25.17.214.78:81/table').then((res) => {
            res.json().then((json) => {
                setTable(json);
            })
        })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full h-screen">
                <h1 className="text-2xl font-bold mb-4">Tables</h1>
                <div className="flex flex-wrap justify-center gap-6">
                    {
                        getTable.map((value) => (
                          <div 
                          key={value.table_id} 
                          className={`border border-gray-300 rounded-lg shadow-sm p-4 w-80 ${
                              value.is_occupied ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                          }`}
                      >
                          <h2 className="text-lg font-semibold">Table ID: {value.table_id}</h2>
                          <p className="text-sm">
                              {value.is_occupied ? 'Occupied' : 'Available'}
                          </p>
                      </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

// export default RestTable;


// export default RestTable;


// export default RestTable;
//  // src/BillingDetail.jsx
// // src/App.jsx
// import React, { useRef } from 'react';
// import Receipt from './BillDoc';
// import { renderToHtml } from 'react-thermal-printer';

// const billData = {
//   billNumber: '12345',
//   date: '2024-06-13',
//   customerName: 'John Doe',
//   items: [
//     { name: 'Pizza', quantity: 2, price: 15.0 },
//     { name: 'Pasta', quantity: 1, price: 12.0 },
//     { name: 'Salad', quantity: 3, price: 8.0 },
//   ],
//   total: 66.0,
// };

// const BillingDetail = () => {
//   const receiptRef = useRef();

//   const handlePrint = () => {
//     const printContent = receiptRef.current.innerHTML;
//     const printWindow = window.open('', '', 'width=600,height=400');
//     printWindow.document.write('<html><head><title>Print Receipt</title></head><body>');
//     printWindow.document.write(printContent);
//     printWindow.document.write('</body></html>');
//     printWindow.document.close();
//     printWindow.print();
//   };

//   return (
//     <div>
//       <h1>Restaurant Bill</h1>
//       <button onClick={handlePrint}>Generate and Print Receipt</button>
//       <div ref={receiptRef} style={{ display: 'none' }}>
//         <Receipt bill={billData} />
//       </div>
//     </div>
//   );
// };

export default BillingDetail;

