import React from 'react';
import {Link} from 'react-router-dom';


const Side = () => {

    return (
        <div>
            <div className="card" style={{width: '18rem'}}>
                <div className="card-header">Application Menu</div>
                <ul className="list-group list-group-flush">
                    <Link to='kategori'><li className="list-group-item">Kategori</li></Link>
                    <Link to='menu'><li className="list-group-item">Menu</li></Link>
                    <Link to='pelanggan'><li className="list-group-item">Pelanggan</li></Link>
                    <Link to='order'><li className="list-group-item">Order</li></Link>
                    <Link to='detail'><li className="list-group-item">Order Detail</li></Link>
                    <Link to='user'><li className="list-group-item">Users</li></Link>
                </ul>
            </div>
        </div>
    );
}

export default Side;
