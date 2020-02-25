import axios from 'axios'

const endpoint='https://supply-chain-tracking-system.herokuapp.com'
export const SignUP=({name,email,password,role,phone})=>{
    return new Promise((resolve,reject)=>{
        axios.post(`${endpoint}/user/signup`,{name,email,password,role,phone})
        .then((res)=>{
            localStorage.setItem('Auth-Token', res.data.token);
            resolve(res.data.role)
        })
        .catch((res)=>{
            resolve(false)
        })
    })
}

export const Logout = async()=>{
    const token=localStorage.removeItem('Auth-Token')
    window.open('/','_self')
}

export const LOGIN=({email,password})=>{
    return new Promise((resolve,reject)=>{
        axios.post(`${endpoint}/user/login`,{email,password})
        .then((res)=>{
            console.log(res)
            localStorage.setItem('Auth-Token', res.data.token);
            resolve(res.data.role)
        })
        .catch((err)=>{
            console.log("User not found")
            resolve(false)
        })
    })
}

export const GetUser=()=>{
    return new Promise((resolve,reject)=>{
        axios.get(`${endpoint}/user/getuser`,{
            headers:{
                auth:localStorage.getItem('Auth-Token')
            }
        })
        .then((res)=>{
            //console.log(res)
            resolve(res.data)
        })
        .catch((res)=>{
            //console.log(res)
            resolve(false)
        })
    })
}