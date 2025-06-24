import { AIDoctorAgents } from '@/shared/list'
import React from 'react'
import DoctorAgentCard from './DoctorAgentCard'

function DoctorsAgentList() {
  return (
    <div className='mt-10'>
        <h2 className='font-bold text-xl'>AI specialist doctors Agent</h2>
        <div>
            {AIDoctorAgents.map((doctor:any,index)=>(
                <div key = {index}>
                    <DoctorAgentCard doctorAgent ={doctor} />
                </div>
            ))}
        </div>
    </div>
  )
}

export default DoctorsAgentList