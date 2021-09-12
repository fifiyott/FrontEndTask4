import React from "react";

export default function List({dataList, handleEdit, handleDelete}) {
  return (
    <div className="list-group">
        <h1 className="headerlist">List</h1>
        {
            dataList.map((list) => {
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