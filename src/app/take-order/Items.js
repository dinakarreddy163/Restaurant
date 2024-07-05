import { Card } from 'primereact/card';
import './Order.css'

import { Button } from 'primereact/button';
import { useState } from 'react';

const Items = ({ item, addToOrder,addQty}) => {
  
  const [quantity, setQuantity] = useState(0);
  const [addCart, setAddCart] = useState(false);

  const handleAddToCart = () => {
    addToCart({ id, name, price, quantity });
    setQuantity(1); 
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
    let qty = quantity+1;
    addQty({qty,item})
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
    if(quantity == 0) {
      setAddCart(false);
    }
    let qty = quantity-1;
    addQty({qty,item})

  };
  
 

  const renderCards = () => {
    return ( <div className="p-col-12 p-md-4">
        <Card title={item.item_name} subTitle={`$${item.price}`} style={{ marginBottom: '20px' }}>
          <div>{item.description}</div>
          <div className="p-mt-2">
            {addCart ?
              <div>
                <Button rounded onClick={handleDecreaseQuantity}>-</Button>
                <span>{quantity}</span>
                <Button rounded onClick={handleIncreaseQuantity}>+</Button>
              </div> : <div></div>
            }
            {
              !addCart ?
                <Button rounded onClick={() => {
                  setAddCart(true);
                  setQuantity(quantity + 1);
                  let qty = quantity+1; 
                  item.qty = 1;
                  addQty({qty,item});
                  addToOrder(item);
                }}>Add to Order</Button> : <div></div>
            }
          </div>
        </Card>
      </div>)
  };

  return <div >{renderCards()}</div>;
}

export default Items;