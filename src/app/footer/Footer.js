// Footer.js
import React, { useEffect, useState, useRef } from 'react';
import { Menubar } from 'primereact/menubar';
import './Footer.css'
import { Button } from 'primereact/button';

import { Toast } from 'primereact/toast';

const Footer = ({ menuItem, orderItems }) => {
  const [menuItemsList, setMenuItemsList] = useState();
  const [menu, setMenu] = useState();
  const toast = useRef(null);
  useEffect(() => {
    menuItems();
  }, []);
  const menuItems = () => {
    fetch("http://localhost:3000/menuTypes").then(res => {
      res.json().then(json => {

        const items = [
        ];
        json.forEach(e => {
          items.push({
            label: e.type, icon: 'pi pi-fw pi-utensils', command: (item) => {
              console.log(item);
              menuItem(item.item.label);
            }
          })
        });
        console.log(json);
        setMenuItemsList(items);
      })
    })
  }

  const submit = () => {
    console.log(orderItems);
    let orderedItems = [];
    orderItems.forEach(e => {
      orderedItems.push({
        "item_id": e.item_id,
        "quantity": e.qty
      })
    })
    const sendOrder = {
      "table_id": 100,
      "customer_id": 1,
      "waiter_id": 1,
      "cook_id": 1,
      "order_time": "",
      "order_status": "Cooking pending",
      "orderItems": orderedItems
    }
    fetch("http://localhost:3000/order", {
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
      body: JSON.stringify(sendOrder), // body data type must match "Content-Type" header
    }).then(res => {
      res.json().then(json => {
        console.log(json);
        toast.current.show({ severity: 'info', summary: 'Info', detail: json.message });
        window.location.reload();

      });
    });

    // callOrderApi.then((e)=>{console.log(e)})
  }

  const end = (
    <div className="flex align-items-center gap-2">
      <Button rounded onClick={submit}>Submit</Button>
      <Toast ref={toast} />
    </div>
  );
  return (
    <footer className="footer-menu">
      <Menubar model={menuItemsList} end={end} />
    </footer>
  );
};

export default Footer;