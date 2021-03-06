import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import Image from './components/Image'
import Loader from './components/Loader'
import InfiniteScroll from 'react-infinite-scroll-component'
import { v4 as uuidv4 } from 'uuid';
import './App.css';


function App() {

  const[photos,setPhotos]=useState([]);
  const[photoIndex,setPhotoIndex]=useState(0);
  
  useEffect(() => {
    getPhotos();
    
  }, [])
  
  const getPhotos = async () =>{
    const response= await Axios.get(`https://jsonplaceholder.typicode.com/photos?_start=${photoIndex}&_limit=10`)
    setPhotos([...photos,...response.data])
    setPhotoIndex(Math.floor((Math.random() * 2000) + 1))
  }

  return (
    
    <div>
      <h1>The Photos App</h1>
      <InfiniteScroll
      dataLength={photos.length}
      next={getPhotos}
      hasMore={true}
      loader={<Loader/>}>
      
      <div className="Gallery">
      {
        photos.map((photo)=>(
          <Image url={photo.url} key={uuidv4()}/>
          
        ))
      }
      </div>
      </InfiniteScroll>
      
    </div>
    
  );
}

export default App;
