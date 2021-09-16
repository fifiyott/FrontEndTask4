import React from "react";
import { useState } from 'react'

export default function List({dataList, handleEdit, handleDelete}) {
    const [ searchFilter, setSearchFilter ] = useState('');
  return (
    <div className="list-group">
        <div className="list-header">
            <h1 className="headerlist">List</h1>
            <div className="filter-post">
                <input type="text"
                    className="filter"
                    placeholder="Search"
                    onChange={ (e) => {
                    setSearchFilter(e.target.value);
                    } }
                />
            </div>
        </div>
            {dataList.filter((val) => {
              if( searchFilter === "") {
                return val;
              } else if ( val.title.toLowerCase().includes(searchFilter.toLocaleLowerCase())) {
                return val
              }
            }).map((list) => {
                return (
                        <div>
                            <div className="flex-container">
                                <div className="flex-left">
                                    <h5>{list.title}</h5>
                                    <p>{list.quantity}</p>
                                    <p>{list.price}</p>
                                </div>
                                <div className="flex-right">
                                    <button className="btnEdit" onClick={() => handleEdit(list.id)}>Edit</button>
                                    <button className="btnDel" onClick={() => handleDelete(list.id)}>Delete</button>
                                </div>
                            </div>
                            <hr/>
                        </div>
                    )
                })
            }
    </div>
  );
}