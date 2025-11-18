'use client'

import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Loader2, PhoneCall } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';


export type doctorAgent = {
  id: number;
  specialist: string;
  description: string;
  image: string;
  agentPrompt: string;
  voiceId?: string
  firstMessage?: string
};

type props = {
  doctorAgent: doctorAgent;
};

export default function DoctorCard({ doctorAgent }: props) {

  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const note= "Patient requires quick consultation.";

  const onStartConsultation = async () => {

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const result = await axios.post(
        "/api/session-chat",
        {
          notes: note,
          selectedDoctor: doctorAgent
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(result.data);

      if (result.data?.sessionId) {
        console.log("Session ID:", result.data.sessionId);
        // Route to conversation screen
        router.push('/consultation/medical-agent/' + result.data.sessionId)
      }

    } catch (error) {
      console.error("Error starting consultation:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card shadow-md rounded-xl p-2 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 w-full">
      <div className="w-full flex justify-center">
        <Image
          src={doctorAgent.image}
          alt={doctorAgent.specialist}
          width={150}
          height={150}
          className="w-full h-[250px] object-cover rounded-xl"
        />
      </div>
      <h3 className="mt-3 text-lg font-semibold">{doctorAgent.specialist}</h3>
      <p className="mt-1 text-foreground line-clamp-2 text-sm">{doctorAgent.description}</p>
      <Button className='mt-1.5 cursor-pointer px-3 py-2' onClick={() => onStartConsultation()} disabled={loading}>
      {loading ? "processing..." : "Start Consultation"}{loading ? <Loader2 className="animate-spin" /> : <PhoneCall className="h-4" />}
      
      </Button>
    </div>
  );
}
