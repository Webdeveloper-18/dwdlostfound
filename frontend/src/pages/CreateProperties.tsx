import React from 'react'
import { useState } from 'react' 

import { useForm } from "@refinedev/core";
import { useGetIdentity } from "@refinedev/core";
import { FieldValues,useForm as RHFUseForm } from 'react-hook-form'

import { useNavigate } from 'react-router-dom'
import Form from 'components/common/Form'
import { ColorModeContextProvider } from "../contexts/color-mode";
function CreateProperties() {
  interface UserType {
    email: string;
    // Add other properties as needed
  }
  const navigate=useNavigate()
  const { data: user } = useGetIdentity() as { data: UserType };
 
  // const {data: user}=useGetIdentity() //this hook provides me whole data of the current user logged in
  const [pimage,setpimage]=useState({name:'',url:''})
  // const {refineCore:{onFinish,formLoading},register,handleSubmit}=useForm()
  const {onFinish,formLoading}=useForm()
  const {handleSubmit,register}=RHFUseForm()
  const handleImageChange = (file: File) => {
    const reader = (readFile: File) => new Promise<string>((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result as string);
      fileReader.readAsDataURL(readFile);
    }) 
     reader(file).then((result: string) => setpimage({ name: file?.name, url: result }));
  };
  
  const onFinishHandler = async (data: FieldValues) => {
    if(!pimage.name) return alert('Please select an image');
    
    await onFinish({ ...data, photo: pimage.url, email: user.email })
  };
  return (
    <ColorModeContextProvider>
    <Form 
    type="Create"
    register={register}
    onFinish={onFinish}
    formLoading={formLoading}
    handleSubmit={handleSubmit}
    propertyImage={pimage}
    handleImageChange={handleImageChange}
    onFinishHandler={onFinishHandler}
    /></ColorModeContextProvider>
  )
}

export default CreateProperties
