import axios from 'axios'
import {GetUser} from './Auth-service'

const endpoint='https://supply-chain-tracking-system.herokuapp.com'

export const AddBlockOther=(data,id)=>{
    return new Promise((resolve,reject)=>{
        axios({
            method:'post',
            url:`${endpoint}/api/supplychain/add/${id}`,
            data:{name:data.name,UserId:data.UserId,role:data.role,data:data.data},
            headers:{auth:localStorage.getItem('Auth-Token')}
        })
        .then((res)=>{
            resolve(true)
        })
        .catch((res)=>{
            console.log(res)
            resolve(false)
        })
    })
}

export const GetBlockchains=()=>{
    return new Promise((resolve,reject)=>{
        axios({
            method:'get',
            url:`${endpoint}/api/supplychain/fetchAll`,
            headers:{auth:localStorage.getItem('Auth-Token')}
        })
        .then((res)=>{
            resolve(res.data.data)
        })
        .catch(err=>{
            console.log(err)
            resolve([])
        })
        // GetUser().
        //     then((user)=>{
        //         axios.get(`${endpoint}/api/supplychain/fetchAll/${user._id}/${user.role}`)
        //         .then((res)=>{
        //             resolve(res.data.data)
        //         })
        //         .catch(err=>{
        //             console.log(err)
        //             resolve([])
        //         })
        //     })
        //     .catch(er=>resolve([]))
    })
}

export const GetAllChains=()=>{
    return new Promise((resolve,reject)=>{
        GetUser().
        then((user)=>{
            axios.get(`${endpoint}/api/supplychain/fetchById/${user._id}`)
            .then((res)=>{
                if(res.data!==[]){
                    resolve(res.data.data[0].block_chain_list)
                }
                else{
                    resolve([])
                }
                console.log(res)
            })
            .catch(err=>{
                console.log([])
                resolve([])
            })
        })
        .catch((err)=>{
            resolve([])
        })
    })
}


