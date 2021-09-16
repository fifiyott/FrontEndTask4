import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { uid } from "uid"
import styles from '../styles/Home.module.css'
import List from '../components/list'
import data from '../data-dummy/data.json'

export default function Home() {
  const [ formList, setformList ] = useState(data);

  const [updateData, setUpdateData] = useState({ id: null, status: false });

  const [formInput, setFormInput] = useState({
    title: "",
    quantity: "",
    price: ""
  });

  function handleChange(e) {
    let dataList = {...formInput};
    dataList[e.target.name] = e.target.value;
    setFormInput(dataList);
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert('Data Berhasil Tersimpan');
    let dataList = [...formList];


    //supaya inputan yang kosong jika diklik submit, tidak tercetak outputnya
    if (formInput.title === ""){
      return false;
    }
    if (formInput.quantity === ""){
      return false;
    }
    if (formInput.price === ""){
      return false;
    }

    if (updateData.status){
      dataList.forEach((list) => {
        if(list.id === updateData.id){
          list.title = formInput.title;
          list.quantity = formInput.quantity;
          list.price = formInput.price;
        }
      });
    } else {
        dataList.push({ id: uid(), title: formInput.title, quantity: formInput.quantity, price: formInput.price });

    }

    setUpdateData({ id: null, status: false });
    setformList(dataList);
    setFormInput({ title: "", quantity: "", price: "" });
  }

  function handleEdit(id) {
    let dataList = [...formList];
    let foundData = dataList.find((list) => list.id === id);
    setFormInput({ title: foundData.title, quantity: foundData.quantity, price:foundData.price });
    setUpdateData({ id: id, status: true });
  }

  function handleDelete(id){
    let dataList = [...formList];
    alert('Data Akan Terhapus');
    let filteredData = dataList.filter((list) => list.id !== id);
    setformList(filteredData);
  }

  return (
    <div className="container">
      <Head>
        <title>List Form</title>
        <meta name="keywords" content="list"></meta>
      </Head>

      <form onSubmit={handleSubmit} className="form-universal">
        <div className="form-group">
          <input 
            type="text"  
            onChange={handleChange}
            value={formInput.title} 
            name="title"
            className="input"
            placeholder="Title" />
        </div>
        <div className="form-group">
          <input 
            type="text"  
            onChange={handleChange}
            value={formInput.quantity} 
            name="quantity" 
            className="input"
            placeholder="Quantity"/>
        </div>
        <div className="form-group">
          <input 
            type="text"  
            onChange={handleChange}
            value={formInput.price} 
            name="price"
            className="input"
            placeholder="Price" />
        </div>
        <div>
          <button type="submit" className="btnSubmit">
            Submit
          </button>
        </div>
      </form>

      <List handleEdit={handleEdit} handleDelete={handleDelete} dataList={formList}/>

    </div>
  )
}
