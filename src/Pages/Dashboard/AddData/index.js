import React, { useState } from 'react'
import { Button, Col, Form, Input, Progress, Row, Typography } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import { firestore, storage } from 'config/firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'


const {Title}=Typography


const initialstate={product:"",price:"",description:""}
export default function AddData() {
    const [state,setState]=useState(initialstate)
    const[isLoading,setIsLoading]=useState(false)
    const [file,setFile]=useState({})
    const [progress ,setprogress]=useState("")

    const handleChange=(e)=>setState(s=>({...s,[e.target.name]:e.target.value}))

    // Handle Submit
    const handleSubmit=(e)=>{
      e.preventDefault()
      const{product,price,description}=state;
      if(!product && !price && !description) return window.toastify("Please Enter Your Detail","error");
    
      const formdata={product,price,description,EnteringDate:serverTimestamp(),uid:Math.random().toString(36).slice(2)}

      setIsLoading(true)
        if(file.name){
          uploadfile(formdata)
        }
        else{
          createDocument(formdata)
        }
    }
    const uploadfile=(formdata)=>{
      const fileName=formdata.uid +"-"+file.name;
      const storageRef = ref(storage, `images/${fileName}`);

const uploadTask = uploadBytesResumable(storageRef, file);


uploadTask.on('state_changed', 
  (snapshot) => {
  
    const progressbar = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progressbar + '% done');
    Math.floor(progressbar)
    setprogress(Math.floor(progressbar))
  }, 
  (error) => {
    console.log(error)
  }, 
  () => {
  
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      const data={...formdata,photo:{name:fileName,url:downloadURL}}
      createDocument(data)
      
    });
  }
);

    }

    const createDocument=async(formdata)=>{
      try {
        await setDoc(doc(firestore, "Items", formdata.uid), formdata);
        window.toastify("Successfully Added", "success")
        setState(initialstate)
  
      } catch (e) {
        console.error("Error adding document: ", e);
      }
  
      setprogress("")
      setIsLoading(false)


    }

  return (
    <main className='d-flex justify-content-center align-items-center'>

    <div className="border border-dark px-4 " style={{maxWidth:"700px"}}>
        <Title level={2}>Add Data</Title>

    <Form layout='vertical' onSubmitCapture={handleSubmit}>

    <Row>
        <Col span={24}>
        <FormItem wrapperCol={{span:24}} labelCol={{span:24}} label="Product Name"  required>
            <Input type="text" placeholder="Enter Product Name" name="product" value={state.product} onChange={handleChange}/>
         </FormItem>      
        </Col>

        <Col span={24}>
        <FormItem wrapperCol={{span:24}} labelCol={{span:24}} label="Price"  required>
            <Input type="number" placeholder="Enter Price" name="price" value={state.price} onChange={handleChange}/>
         </FormItem>  
        </Col>
        <Col span={24} >
              <FormItem label="Descriptions" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} style={{ marginBottom: 8 }}>
                <Input.TextArea placeholder='Description' name='description' rows={5} value={state.description} spellCheck="false" onChange={handleChange} />
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label="File" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} style={{ marginBottom: 8 }} >
                <Input type='file' onChange={e => { setFile(e.target.files[0]) }} />
               {file && progress ?     <Progress percent={progress} percentPosition={{ align: 'start', type: 'outer' }} /> :""}

              </FormItem>
            </Col>

            <Col span={24}>
              <Button className='mt-2 mb-2' htmlType='submit' type='primary' size='large' block loading={isLoading} onClick={handleSubmit}>ADD</Button>
            </Col>
    </Row>
    </Form>
    </div>
    </main>
  )
}
