import axios from 'axios'

export const SignUP=({name,email,password,role,phone})=>{
    return new Promise((resolve,reject)=>{
        axios.post('http://192.168.1.6:3000/user/signup',{name,email,password,role,phone})
        .then((res)=>{
            localStorage.setItem('Auth-Token', res.data.token);
            resolve(res.data.role)
        })
        .catch((res)=>{
            console.log(res)
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
        axios.post('http://192.168.1.4:3000/user/login',{email,password})
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