import axios from "axios";
import { useEffect, useState } from "react";

export const useApiData = (endpoint: string) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    async function callApi() {
        setLoading(true);
        axios.get(`https://cuentas-x-cobrar.azurewebsites.net/${endpoint}`,{
          headers:{
            Accept: 'application/json',
           'Content-Type': 'application/json',
        }
        })
          .then(function (response) {
            if(response.data){ 
              setData(response.data)
              setLoading(false)
            }
          
          })
          .catch(function (error) {
            console.log(error);
            setError('Usuario o contraseña incorrectos')
          });
    }
   
  async function getData(id: any) {
      setLoading(true);
      axios.get(`https://cuentas-x-cobrar.azurewebsites.net/${endpoint}/${id}`,{
        headers:{
          Accept: 'application/json',
         'Content-Type': 'application/json',
      }
      })
        .then(function (response) {
          if(response.data){ 
            setData(response.data)
            setLoading(false)
          }
        
        })
        .catch(function (error) {
          console.log(error);
          setError('Error al obtener datos.')
        });
  }

  async function postData(data: any, callback: () => void) {
    setLoading(true);
    axios.post(`https://cuentas-x-cobrar.azurewebsites.net/${endpoint}`, data,{
      headers:{
        Accept: 'application/json',
       'Content-Type': 'application/json',
    }
    })
      .then(function (response) {
        if(response.data){ 
          // setData(response.data)
          setLoading(false)
          callback()
        }
      
      })
      .catch(function (error) {
        console.log(error);
        setError('Error al guardar los datos')
      });
  }

  async function putData(id: number, data: any, callback: () => void) {
    setLoading(true);
    axios.put(`https://cuentas-x-cobrar.azurewebsites.net/${endpoint}/${id}`, data,{
      headers:{
        Accept: 'application/json',
       'Content-Type': 'application/json',
    }
    })
      .then(function (response) {
        if(response.data){ 
          // setData(response.data)
          setLoading(false)
          callback()
        }
      
      })
      .catch(function (error) {
        console.log(error);
        setError('Error al guardar los datos')
      });
  }

  async function deleteData(id: number, callback: () => void) {
    setLoading(true);
    axios.delete(`https://cuentas-x-cobrar.azurewebsites.net/${endpoint}/${id}`,{
      headers:{
        Accept: 'application/json',
       'Content-Type': 'application/json',
    }
    })
      .then(function (response) {
        setLoading(false)
        callback()
      
      })
      .catch(function (error) {
        console.log(error);
        setError('Error al guardar los datos')
      });
  }
  async function validateCedula(cedula: string, callback: (res: any) => void){
    setLoading(true);
    axios.get(`https://api.digital.gob.do/v3/cedulas/${cedula}/validate`,{
      headers:{
        Accept: 'application/json',
       'Content-Type': 'application/json',
    }
    })
      .then(function (response) {
        if(response.data){ 
          setLoading(false)
          callback(response.data)
        }
      
      })
      .catch(function (error) {
        console.log(error);
        setError('Error al buscar los datos')
        callback({
          valid: false
      
        })
      });
  }
    return { data, loading, error,callApi, postData,putData, deleteData, validateCedula, getData };
};