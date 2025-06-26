"use client"

import React, { useEffect, useState } from 'react'
import DoctorAgentCard , {doctorAgent} from './DoctorAgentCard'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ArrowRight, Loader, Loader2 } from 'lucide-react'
import axios from 'axios'
import SuggestedDoctorCard from './SuggestedDoctorCard'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { SessionDetail } from '../medical-agent/[sessionId]/page'





function AddNewSessionDialog() {
    const [note,setNote] = useState<string>();
    const [loading,setLoading] = useState(false);
const [suggestedDoctors, setSuggestedDoctors] = useState<doctorAgent[]>([])
    const [selectedDoctor, setSelectedDoctor] = useState<doctorAgent | null>(null);
    const router = useRouter();
    const [historyList,setHistoryList] = useState<SessionDetail[]>([])
    const {has} = useAuth();
     //ts-ignore
    const paidUser =has&&has({plan:'pro'})

    useEffect(()=>{
    GetHistoryList()
;  },[])

  const GetHistoryList = async()=>{
    const result = await axios.get('/api/session-chat?sessionId=all')
    console.log(result.data);
    setHistoryList(result.data);
  }
    const OnClickNext = async ()=> {
      setLoading(true);
      const result = await axios.post('/api/suggest-doctors' , {
        notes:note
      })
      
      console.log(result.data);
      setSuggestedDoctors(result.data)
      setLoading(false)
    }

    const onStartConsultation = async()=>{
      //save all info to database
      setLoading(true);
      const result = await axios.post('/api/session-chat' , {
        notes:note,
        selectedDoctor:selectedDoctor
      })

      if(result.data?.sessionId) {
        console.log(result.data.sessionId);
        //Route new COnversation screen
        router.push('/dashboard/medical-agent/'+result.data.sessionId);
      }
      setLoading(false);
    }
  return (
    <Dialog>
  <DialogTrigger>
    <Button className='mt-3' disabled={!paidUser && historyList.length>1}>+ Start a Consultation</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Add Basic Details</DialogTitle>
      <DialogDescription asChild>
        {!suggestedDoctors? <div>
            <h2>Add Symptoms or Any other details</h2>
            <Textarea placeholder='add details' className='h-[250px] mt-1' 
            onChange={ (e)=> setNote(e.target.value)} />
        </div>:
        <div>
          <h2 >Select the doctor</h2>
        <div className='grid grid-cols-3 gap-5'>

          {suggestedDoctors.map((doctor , index) => (
            <SuggestedDoctorCard doctorAgent={doctor} key = {index} setSelectedDoctor={setSelectedDoctor} 
            //@ts-ignore
            selectedDoctor= {selectedDoctor}/>
          ))}
          </div>
          </div>}
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
        <DialogClose> <Button variant={'outline'}>Cancel</Button> </DialogClose>

        {!suggestedDoctors? <Button disabled ={!note || loading} onClick={ ()=> OnClickNext()}> Next {loading ? <Loader2 className='animate-spin' /> : <ArrowRight /> } </Button>
        : <Button disabled= {loading || !selectedDoctor} onClick={()=> onStartConsultation()} >Start Consultation {loading ? <Loader2 className='animate-spin' /> : <ArrowRight /> }</Button> }
    </DialogFooter>
  </DialogContent>
</Dialog>
  )
}

export default AddNewSessionDialog