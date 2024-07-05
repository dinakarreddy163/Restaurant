// src/Receipt.jsx
import React from 'react';
import { Printer, Text, Line, renderToHtml } from 'react-thermal-printer';

const Receipt = ({ bill }) => {
  return (
    <Printer type="epson" width={42}>
      <Text align="center" size={{ width: 2, height: 2 }}>Restaurant Bill</Text>
      <Line />
      <Text>Bill Number: {bill.billNumber}</Text>
      <Text>Date: {bill.date}</Text>
      <Text>Customer Name: {bill.customerName}</Text>
      <Line />
      {bill.items.map((item, index) => (
        <Text key={index}>
          {item.name} x{item.quantity} @ {item.price.toFixed(2)} = {(item.quantity * item.price).toFixed(2)}
        </Text>
      ))}
      <Line />
      <Text>Total Amount: {bill.total.toFixed(2)}</Text>
      <Line />
      <Text align="center">Thank you for your visit!</Text>
    </Printer>
  );
};

export default Receipt;
