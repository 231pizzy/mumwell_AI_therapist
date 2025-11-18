import React, { useEffect } from 'react'
import { doctorAgent } from './DoctorCard';
import Image from 'next/image';

type props = {
    doctorAgent: doctorAgent;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setSelectedDoctor: any;
    selectedDoctor: doctorAgent;
};

export default function SuggestedDoctorCard({ doctorAgent, setSelectedDoctor, selectedDoctor }: props) {

    useEffect(() => {
        console.log("doctorAgent =", doctorAgent);
    }, [doctorAgent]);

    return (
        <div 
            className={`flex flex-col items-center border rounded-2xl shadow-2xl p-5 hover:border-primary cursor-pointer 
            ${selectedDoctor?.id === doctorAgent?.id ? "border-primary" : ""}`}
            onClick={() => setSelectedDoctor(doctorAgent)}
        >
            <Image
                src={doctorAgent?.image}
                alt={doctorAgent?.specialist}
                width={150}
                height={150}
                className="w-[150px] h-[150px] object-cover rounded-2xl"
            />

            <h3 className="mt-1 text-sm font-bold text-center">{doctorAgent?.specialist}</h3>
            <p className="mt-1 text-foreground line-clamp-2 text-xs text-center">
                {doctorAgent?.description}
            </p>
        </div>
    );
}
