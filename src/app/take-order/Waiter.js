
import React, { useEffect, useState } from 'react';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import Items from './Items';
import Cart from './Cart';
import { json } from 'react-router-dom';
import Footer from "../footer/Footer"
import './Order.css'
import { useSelector } from 'react-redux';


export default function Waiter() {
    console.log("hit")
    const [cartItems, setCartItems] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    let cartList = [];

    const addToOrder = (item) => {
        console.log(item);
        let listItem = [];
        listItem.push(item);
        console.log(cartItems);
        listItem = [...listItem, ...cartItems]
        setCartItems(listItem);
    }

    useEffect(() => {
        getItems();
    }, []);

    const getItems = async () => {
        await fetch('http://localhost:3000/menuitems').then((res) => {
            console.log(res)
            res.json().then((json) => {
                cartList = json;
                setMenuItems(json);
                console.log(json)
            })
        })
    }
    const getMenu = (data) => {
        // setMenuVal(data);
        // await getItems();
        console.log("menu")
        console.log(cartList)
        let menuItem = cartList.filter(e=>e.type === data);
        setMenuItems(menuItem)
    }
    const addQty = (qty) =>{
        console.log(qty);
       let qtyItems = cartItems.map(item=>{
            if(item.item_id === qty.item.item_id) {
                return {...item,qty:qty.qty}

            }
            return item
        });
        setCartItems(qtyItems)
        console.log(qtyItems);
    }
    return (<>
        <Splitter style={{ height: '81.5%' }}>
            <SplitterPanel className="flex align-items-center justify-content-center" size={25} minSize={10}>
                <div className="p-grid">  {menuItems.map(item => {
                    return <Items key={item.item_id} item={item} addToOrder = {addToOrder} addQty = {addQty} />
                })}
                </div>
            </SplitterPanel>
            <SplitterPanel className="flex align-items-center justify-content-center" size={75}>
                <Cart items={cartItems} />
            </SplitterPanel>
        </Splitter>
        <Footer menuItem={getMenu} orderItems ={cartItems} />
    </>

    )
}
