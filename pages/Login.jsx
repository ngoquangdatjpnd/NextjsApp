import React from 'react'
import Image from 'next/image'
import Logo from '../images/logo.png'
import { fethAPI } from '../utils/fetch'
import { API_PATHS } from '../configs/apiConfigs'
import axios from 'axios'
import dynamic from 'next/dynamic'
import Router from 'next/router'

const SignInForm = dynamic(() => import('../modules/auth/components/SignInForm'));

const SignInPage = ({props}) =>{

    const [loading,setLoading] = React.useState(false);
    const [error,SetError] = React.useState();

    const onLogin = React.useCallback(async (email,password)=>{
      setLoading(true);
      await fethAPI(API_PATHS.login,'POST',{email : email,password : password},true).then(user =>{
        if(user.data.success == true) {
          console.log('ok')
        }
        else {
          SetError(user.data.message)
        }
      })
      setLoading(false)
      return;
    },[])

    return (
      <div>
        { error ?
                     <div className="relative px-4 py-3 leading-normal text-red-700 bg-red-100 rounded-lg" role="alert">
                      <span className="absolute inset-y-0 left-0 flex items-center ml-4">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                      </span>
                      <p className="ml-6">{error}</p> 
        </div> : null }
          <div className="w-full h-screen font-sans bg-cover bg-landscape">
            <div className="container flex items-center justify-center flex-1 h-full mx-auto">
                <div className="w-full max-w-lg">
                    <div className="leading-loose">
                      <SignInForm onLogin={onLogin} loading={loading}/>
                   </div>
                </div>
            </div>
        </div>
      </div>
    )
}

export async function getStaticProps() {
  return {
    props : {

    }
  }
}

export default SignInPage;