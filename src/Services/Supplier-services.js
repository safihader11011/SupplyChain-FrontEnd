import axios from 'axios'
import {GetUser} from './Auth-service'

const endpoint='https://supply-chain-tracking-system.herokuapp.com'
export const AddBlock=(data,id)=>{
    return new Promise((resolve,reject)=>{
        axios.post(`${endpoint}/api/supplychain/add/supplier/${id}`,{name:data.name,blocks:data.blocks})
        .then((res)=>{
            console.log(res)
            resolve(true)
        })
        .catch((res)=>{
            console.log(res)
            resolve(false)
        })
    })
}