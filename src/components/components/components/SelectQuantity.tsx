import { useEffect, useState } from "react";

class Props {
  currentQuantity: number = 0;
  onChange?: Function;
}
const SelectQuantity = ({currentQuantity, onChange}: Props) => {
  const [quantity, setQuantity] = useState(currentQuantity);

  useEffect(()=>{
    if(onChange != null) onChange(quantity);
  }, [quantity])

  const onChangeHandler = (value: number) => {
    if(value >= 0 && value != quantity){
      setQuantity(+value);
    } 
  }
  
  return (
    <div className="input-group pt-2 mw145px">
      <span className="btn btn-block btn-primary" onClick={()=> quantity > 0 ? onChangeHandler(quantity - 1): null }>-</span>
      <input type="number" 
        className="w60px text-end" 
        value={quantity} 
        onChange={(event)=> onChangeHandler(+event.target.value >= 0 ? +event.target.value : 0) }
      />
      <span className="btn btn-block btn-primary" onClick={()=> onChangeHandler(quantity + 1) }>+</span>
    </div>
  );
}

export default SelectQuantity;