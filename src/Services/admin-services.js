import axios from 'axios'

const endpoint='https://supply-chain-tracking-system.herokuapp.com'

export const GetBlockchains=()=>{
    return new Promise((resolve,reject)=>{
        axios({
            method:'get',
            url:`${endpoint}/admin/verifyBlockChain`,
            headers:{auth:localStorage.getItem('Auth-Token')}
        })
        .then((res)=>{
            resolve(res)
            //resolve(res.data.data)
        })
        .catch(err=>{
            console.log(err)
            resolve([])
        })
    })
}

export const GetAllUser=()=>{
    return new Promise((resolve,reject)=>{
        axios.get(`${endpoint}/admin/fetchuser`)
        .then((res)=>{
            resolve(res.data.data)
            //resolve(res.data.data)
        })
        .catch(err=>{
            console.log(err)
            resolve([])
        })
    })
}
export const GetUserAllChains=(id)=>{
    return new Promise((resolve,reject)=>{
        axios.get(`${endpoint}/api/supplychain/fetchById/${id}`)
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
}

export const DeleteBlockChain=(id)=>{
    return new Promise((resolve,reject)=>{
        axios.delete(`${endpoint}/admin/deleteBlockChain/${id}`)
        .then(res=>{
            resolve(true)
        })
        .catch(er=>{
            resolve(true)
        })
    })
}