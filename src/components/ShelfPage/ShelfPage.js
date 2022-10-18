import { useState, useEffect } from 'react';
import axios from 'axios';
import './ShelfPage.css';

function ShelfPage() {
  const [shelfList, setShelfList] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemImage, setItemImage] = useState('');

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = () => {
    axios.get('/api/shelf').then((response) => {
      setShelfList(response.data);
    }).catch((error) => {
      console.log(error);
      alert('Something went wrong.');
    });
  }

  const addNewItem = (e) => {
    e.preventDefault();
    axios.post('/api/shelf', {name: itemName, image:itemImage}).then(() =>{
      fetchPets();
    }).catch((e) => {
      console.log(e);
      alert('Something went wrong.');
    })
  }

  const deleteItem = (itemId) => {
    axios.delete(`/api/shelf/${itemId}`).then(() => {
      fetchPets();
    }).catch((e) => {
      console.log(e)
      alert('Something went wrong.')
    })
  }

  return (
    <div className="container">
      <div>
        <h2>Add Item to Shelf</h2>
        <form onSubmit={addNewItem}>
          <input value={itemName} onChange={(e) => setItemName(e.target.value)} type="text" />
          <input value={itemImage} onChange={(e) => setItemImage(e.target.value)} type="text" />
          <input type="submit" />
        </form>
      </div>
      <h2>Shelf</h2>
      <p>All of the available items can be seen here.</p>
      {
        shelfList.length === 0 && (
          <div>No items on the shelf</div>
        )
      }
      {
        shelfList.map(item => {
          return <div className="responsive" key={item.id}>
                    <div className="gallery">
                        <img src={item.image_url} alt={item.description} />
                        <br />
                        <div className="desc">{item.description}</div>
                        <div style={{textAlign: 'center', padding: '5px'}}>
                          <button onClick={() => deleteItem(item.id)} style={{cursor: 'pointer'}}>Delete</button>
                        </div>
                    </div>
                 </div>
        })
      }
      <div className="clearfix"></div>
    </div>
  );
}

export default ShelfPage;
