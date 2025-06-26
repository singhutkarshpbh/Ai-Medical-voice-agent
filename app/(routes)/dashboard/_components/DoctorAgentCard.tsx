"use client"

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useAuth } from '@clerk/nextjs'
import { IconArrowRight } from '@tabler/icons-react'
import axios from 'axios'
import { Loader2Icon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'


export type doctorAgent = {
    id:number,
    specialist:string,
    description:string,
    image:string,
    agentPrompt:string,
    subscriptionRequired:boolean,
}

type props = {
    doctorAgent:doctorAgent
}
function DoctorAgentCard({doctorAgent}:props) {

  const [loading,setLoading] = useState(false);
  const router = useRouter();
  const {has} = useAuth();
  //ts-ignore
  const paidUser =has&&has({plan:'pro'})
  const onStartConsultation = async()=>{
      //save all info to database
      setLoading(true);
      const result = await axios.post('/api/session-chat' , {
        notes:'New Query',
        selectedDoctor:doctorAgent
      })

      if(result.data?.sessionId) {
        console.log(result.data.sessionId);
        //Route new COnversation screen
        router.push('/dashboard/medical-agent/'+result.data.sessionId);
      }
      setLoading(false);
    }
  return (
    <div className='relative flex flex-col items-center border rounded-2xl hover:border-blue-500 cursor-pointer shadow p-5'>
      {doctorAgent.subscriptionRequired && <Badge className='absolute top-2 right-2'>Premium</Badge>}
        <Image src= {doctorAgent.image} 
        alt = {doctorAgent.specialist}
        width={200} height = {300} 
        className='w-full  h-[250px] object-cover rounded-xl'/>
        <h2 className='font-bold '>{doctorAgent.specialist }</h2>
        <p className='line-clamp-2 text-sm text-gray-500'>{doctorAgent.description}</p>

        <Button className='w-full mt-2'
        onClick={()=>onStartConsultation()} disabled={!paidUser&&doctorAgent.subscriptionRequired}>Start Consult{loading? <Loader2Icon className='animate-spin' />: <IconArrowRight /> }</Button>
    </div>
  )
}

export default DoctorAgentCard