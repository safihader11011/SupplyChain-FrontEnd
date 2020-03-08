import axios from 'axios'
import {GetUser} from './Auth-service'

const endpoint='https://supply-chain-tracking-system.herokuapp.com'
export const AddBlock=(data,id)=>{
    return new Promise((resolve,reject)=>{
        axios({
            method:'post',
            url:`${endpoint}/api/supplychain/add/supplier/${id}`,
            data:{name:data.name,blocks:data.blocks},
            headers:{auth:localStorage.getItem('Auth-Token')}
        })
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