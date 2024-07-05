
import React, { useEffect, useState } from 'react';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import Items from './Items';
import Cart from './Cart';
import { json } from 'react-router-dom';
import Footer from "../footer/Footer"
import './Order.css'
import { useSelector } from 'react-redux';


export default function Waiter() {
    const [cartItems, setCartItems] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    let cartList = [];
    const loginDetails = useSelector((state) => state.login.loginDetails);
    const addToOrder = (item) => {
        let listItem = [];
        listItem.push(item);
        listItem = [...listItem, ...cartItems]
        setCartItems(listItem);
    }

    useEffect(() => {
        getItems();
    }, []);

    const getItems = async () => {
        await fetch('http://25.17.214.78:81/menuitems').then((res) => {
            res.json().then((json) => {
                cartList = json;
                setMenuItems(json);
            })
        })
    }
    const getMenu = (data) => {
        // setMenuVal(data);
        // await getItems();
        let menuItem = cartList.filter(e=>e.type === data);
        setMenuItems(menuItem)
    }
    const addQty = (qty) =>{
       let qtyItems = cartItems.map(item=>{
            if(item.item_id === qty.item.item_id) {
                return {...item,qty:qty.qty}

            }
            return item
        });
        setCartItems(qtyItems);
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
