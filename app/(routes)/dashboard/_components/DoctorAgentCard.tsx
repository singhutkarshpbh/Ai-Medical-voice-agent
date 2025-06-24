import Image from 'next/image'
import React from 'react'


type doctorAgent = {
    id:number,
    specialist:string,
    description:string,
    image:string,
    agentPrompt:string
}

type props = {
    doctorAgent:doctorAgent
}
function DoctorAgentCard({doctorAgent}:props) {
  return (
    <div>
        <Image src= {doctorAgent.image} 
        alt = {doctorAgent.specialist}
        width={200} height = {300} />
    </div>
  )
}

export default DoctorAgentCard