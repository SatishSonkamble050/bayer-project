"use client";
import React, { useState } from 'react'

const UploadImage = () => {
    const [imagesFile, setImagesFiles] = useState([])
    const  fileSelectedHandler = (file) => {
    // let addedFiles = this.state.files.concat(file)
    addedFiles = file[0]
    setImagesFiles([...imagesFile, addedFiles])
    console.log("upload file " + file.name)
  }

 const submitImageHandler =async() =>{
    // const reps = fetch("")
    console.log("HHH")
}


  return (
    <div>
        <input type='file'  onChange={fileSelectedHandler}  />
        <button onClick={submitImageHandler}>Upload</button>
    </div>
  )
}

export default UploadImage


