
import React from 'react'; 
import { Splitter, SplitterPanel } from 'primereact/splitter';

export default function SizeDemo() {
    return (
        <Splitter style={{ height: '100%' }}>
            <SplitterPanel className="flex align-items-center justify-content-center" size={25} minSize={10}>Items List</SplitterPanel>
            <SplitterPanel className="flex align-items-center justify-content-center" size={75}>Check Out list</SplitterPanel>
        </Splitter>
    )
}
        