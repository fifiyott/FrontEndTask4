import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { uid } from "uid"
import styles from '../styles/Home.module.css'
import List from '../components/list'
import data from '../data-dummy/data.json'

export default function Home() {
  const [ formList, setformList ] = useState(data);

  const [isUpdate, setIsUpdate] = useState({ id: null, status: false });

  const [formData, setFormData] = useState({
    title: "",
    quantity: "",
    price: ""
  });

  function handleChange(e) {
    let dataList = {...formData};
    dataList[e.target.name] = e.target.value;
    setFormData(dataList);
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert('Data Berhasil Tersimpan');
    let dataList = [...formList];


    //supaya inputan yang kosong jika diklik submit, tidak tercetak outputnya
    if (formData.title === ""){
      return false;
    }
    if (formData.quantity === ""){
      return false;
    }
    if (formData.price === ""){
      return false;
    }

    if (isUpdate.status){
      dataList.forEach((list) => {
        if(list.id === isUpdate.id){
          list.title = formData.title;
          list.quantity = formData.quantity;
          list.price = formData.price;
        }
      });
    } else {
        dataList.push({ id: uid(), title: formData.title, quantity: formData.quantity, price: formData.price });

    }

    setIsUpdate({ id: null, status: false });
    setformList(dataList);
    setFormData({ title: "", quantity: "", price: "" });
  }

  function handleEdit(id) {
    let dataList = [...formList];
    let foundData = dataList.find((list) => list.id === id);
    setFormData({ title: foundData.title, quantity: foundData.quantity, price:foundData.price });
    setIsUpdate({ id: id, status: true });
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
      {/* <h1 className="px-3 py-3">List Form</h1> */}

      <form onSubmit={handleSubmit} className="form-universal">
        <div className="form-group">
          <input 
            type="text"  
            onChange={handleChange}
            value={formData.title} 
            name="title"
            className="input"
            placeholder=" Title" />
        </div>
        <div className="form-group">
          <input 
            type="text"  
            onChange={handleChange}
            value={formData.quantity} 
            name="quantity" 
            className="input"
            placeholder=" Quantity"/>
        </div>
        <div className="form-group">
          <input 
            type="text"  
            onChange={handleChange}
            value={formData.price} 
            name="price"
            className="input"
            placeholder=" Price" />
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
