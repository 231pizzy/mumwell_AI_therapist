'use client'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { DialogClose } from "@radix-ui/react-dialog"
import axios from "axios"
import { ArrowRight, Loader2 } from "lucide-react"
import { useState } from "react"
import { doctorAgent } from "./DoctorCard"
import SuggestedDoctorCard from "./SuggestedDoctorCard"
import { useRouter } from "next/navigation"

export default function AddNewSessionDialog() {
    const [note, setNote] = useState<string>()
    const [loading, setLoading] = useState(false);
    const [suggestedDoctors, setSuggestedDoctors] = useState<doctorAgent[]>();
    const [selectedDoctor, setSelectedDoctor] = useState<doctorAgent>()

    const router = useRouter()

    const OnClickNext = async () => {

        setLoading(true)
        const result = await axios.post('/api/suggest-doctors', {
            notes: note
        })
        console.log(result.data.suggestedDoctors)
        setSuggestedDoctors(result.data.suggestedDoctors)
        setLoading(false)
    }

    const onStartConsultation = async () => {
        setLoading(true);

        try {
            const token = localStorage.getItem("token");

            const result = await axios.post(
                "/api/session-chat",
                {
                    notes: note,
                    selectedDoctor: selectedDoctor
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
        <Dialog>
            <DialogTrigger asChild>
                <Button className=" px-6 py-2 rounded-lg shadow-md cursor-pointer">
                    + Start Consultation
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    {/* <DialogTitle>Add Basic Details</DialogTitle> */}
                    <DialogDescription asChild>

                        {!suggestedDoctors ? <div>
                            <DialogTitle className="mb-5">Add Basic Details</DialogTitle>
                            <h2 className="mb-3">Add Symptoms or Any Other Details</h2>
                            <Textarea placeholder="Add details here...." onChange={(e) => setNote(e.target.value)} className="h-[200px]" />
                        </div>
                            :
                            <div>

                                {/* <h2 className="text-center mb-2 font-bold mt-1">Select A Doctor</h2> */}
                                <DialogTitle className="mb-5">Select A Doctor</DialogTitle>
                                <div className="max-h-[350px] overflow-y-auto pr-2">
                                    <div className="grid grid-cols-2 gap-5">
                                        {suggestedDoctors.map((doctor, index) => (
                                            <SuggestedDoctorCard
                                                setSelectedDoctor={() => setSelectedDoctor(doctor)}
                                                doctorAgent={doctor}
                                                selectedDoctor={selectedDoctor}
                                                key={index}
                                            />
                                        ))}
                                    </div>
                                </div>

                            </div>
                        }
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant={"outline"}>Cancel</Button>
                    </DialogClose>

                    {!suggestedDoctors ? <Button disabled={!note || loading} onClick={() => OnClickNext()}>
                        {loading ? "processing..." : "Next"}{loading ? <Loader2 className="animate-spin" /> : <ArrowRight className="h-4" />}
                    </Button>
                        : <Button onClick={() => onStartConsultation()} disabled={loading || !selectedDoctor}>
                            {loading ? "processing..." : "Start Consultation"}{loading ? <Loader2 className="animate-spin" /> : <ArrowRight className="h-4" />}
                        </Button>}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
