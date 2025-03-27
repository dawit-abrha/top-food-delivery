import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import './List.css'

function List({url}) {
  const [list, setListt] = useState([]);
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setListt(response.data.data);
    }
    else {
      toast.error(" error");

    }

  }
  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    await fetchList()
    if(response.data.success) {
      toast.success(response.data.message);
    }
    else {
      toast.error("Error");
    }
  }
  useEffect(() => {
    fetchList();
  }, [])
  return (
    <div className='flex-col'>
      <p>All foods list</p>
      <div className="list-food-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {
          list.map((item, index) => {
            return (
              <div key={index} className='list-table-format'>
                <img src={`${url}/images/` + item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{item.price}birr</p>
                <p onClick={() => removeFood(item._id)} className='delete'>x</p>

              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default List