import React, { useState } from 'react'

export default function Upload() {
  const [img, setImg] = useState({})

  const fileOnChange = (e) => {
    setImg(URL.createObjectURL(e.target.files[0]))
  }

  const sendImage = (e) => {
    console.log(img);
  }

  return (
    <div>
      {/* <h1>Upload</h1> */}
      {img && <img src={img} />}
      <input type="file" onChange={fileOnChange}/>
      <button onClick={sendImage}>Upload</button>
    </div>
  )
}
