import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from'react-toastify';

function Add({url}) {
const [image ,setImage] =useState(false);
const [data ,setData ] = useState({
  name: '',
  description: '',
  category: 'Salad',
  price: '',

})

const onChangeHandler =(event) =>{
  const name  = event.target.name;
  const value = event.target.value;
  setData(data=>({...data,[name]:value}))

}

const onSubmitHandler =async(event) =>{
  event.preventDefault();
  const formData = new FormData();
  formData.append('image', image);
  formData.append('name', data.name);
  formData.append('description', data.description);
  formData.append('price', Number(data.price));
  formData.append('category', data.category);
  //call your backend api here
  const response = await axios.post(`${url}/api/food/add`,formData);
  if(response.data.success){
setData({
  name: '',
  description: '',
  category: 'Salad',
  price: '',
})
setImage(false)
toast.success(response.data.message);
  }
  else{
    toast.error(response.data.message);

  }
}

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upload">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />
        </div>
        <div className="add-product-name flex-col">
        <p>product name</p>
        <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='type here' />
      </div>
      <div className="add-product-description flex-col">
        <p>description</p>
        <textarea onChange={onChangeHandler} value={data.description} name='description' rows='6' placeholder='type here'  required/>
      </div>
      <div className="add-category-price">
        <div className="add-category flex-col" >
          <p>product category</p>
          <select onChange={onChangeHandler} name="category">
            <option value="Salad">Salad</option>
            <option value="ጥብስ">ጥብስ</option>
            <option value="Deserts">Deserts</option>
            <option value="sandwich">Sandwich</option>
            <option value="Cake">Cake</option>
            <option value="Pure Veg">Pure veg</option>
            <option value="Noodles">Noodels</option>
            <option value="Pasta">Pasta</option>
          </select>
        </div>
        <div className="add-price flrx-col">
          <p>Product price</p>
          <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20' />
        </div>
      </div>
      <div className="add-btn">
        <button type="submit">Add more</button>
      </div>
      </form>
      
    </div>
  )
}

export default Add