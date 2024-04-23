import { Card } from 'primereact/card';
import './Order.css'
const Cart = ({items}) =>{
    // console.log(data)
        const renderCards = () => {
            return items.map((item) => (
              <div key={item.item_id} className="p-col-12 p-md-4">
                <Card title={item.item_name} subTitle={`$${item.price} * ${item.qty}`} style={{ marginBottom: '20px' }}>
                  <div>{item.description}</div>
                </Card>
              </div>
            ));
          };
        
          return <div className="p-grid-cart">{renderCards()}</div>;
}

export default Cart;