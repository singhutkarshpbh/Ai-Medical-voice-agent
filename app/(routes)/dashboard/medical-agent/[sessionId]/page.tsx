"use client"

import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { doctorAgent } from '../../_components/DoctorAgentCard';


type SessionDetail = {
  id:number,
  notes:string,
  sessionId:string,
  report:JSON,
  selectedDoctor:doctorAgent,
  createdOn:string,
}
function MedicalVoiceAgent() {

  const {sessionId} = useParams();

  const [sessionDetails,setsessionDetail] = useState();
  useEffect(()=>{
    sessionId&&GetSessionDetails();
  },[sessionId])
  const GetSessionDetails = async()=> {
    const result = await axios.get('/api/session-chat?sessionId='+sessionId)
    console.log(result.data);
  }
  return (
    <div>
      MedicalVoiceAgent
    </div>
  )
}

export default MedicalVoiceAgent
