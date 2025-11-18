'use client'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { doctorAgent } from '../../_components/DoctorCard'
import { Circle, PhoneCall, PhoneOff, Loader2 } from 'lucide-react'
import { Container } from '@/components/ui/container'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Vapi from '@vapi-ai/web';
import { toast } from 'sonner'

export type SessionDetail = {
  id: number,
  notes: string,
  sessionId: string,
  report: JSON,
  selectedDoctor: doctorAgent,
  createdOn: string
}

type messages = {
  role: string,
  text: string,
}

export default function MedicalVoiceAgent() {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const { sessionId } = useParams()
  const [sessionDetail, setSessionDetail] = useState<SessionDetail>()
  const [currentRole, setCurrentRole] = useState<string | null>()
  const [liveTranscript, setLiveTranscript] = useState<string>()
  const [messages, setMessages] = useState<messages[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const [callStarted, setCallStarted] = useState(false)
  const [startingCall, setStartingCall] = useState(false) // New: loading state for StartCall
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [vapiInstance, setVapiInstance] = useState<any>()

  const [onCallStartListener] = useState(() => () => {
    console.log('Call started')
    setCallStarted(true)
    setStartingCall(false) // call has started

    // start timer
    timerRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  })

  const [onCallEndListener] = useState(() => () => {
    console.log('Call ended')
    setCallStarted(false)

    // stop timer
    if (timerRef.current) clearInterval(timerRef.current);
    setSeconds(0);
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [onMessageListener] = useState(() => (message: any) => {
    if (message.type === 'transcript') {
      const { role, transcriptType, transcript } = message
      if (transcriptType === 'partial') {
        setLiveTranscript(transcript)
        setCurrentRole(role)
      } else if (transcriptType === 'final') {
        setMessages((prev) => [...prev, { role, text: transcript }])
        setLiveTranscript("")
        setCurrentRole(null)
      }
    }

    if (!vapiInstance) return
    vapiInstance.on('speech-start', () => {
      console.log('Assistant started speaking')
      setCurrentRole('MumWell AI Doctor')
    })

    vapiInstance.on('speech-end', () => {
      console.log('Assistant stopped speaking')
      setCurrentRole('user')
    })
  })

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    sessionId && GetSessionDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, liveTranscript])

  const GetSessionDetails = async () => {
    setLoading(true)
    const token = localStorage.getItem("token");
    const result = await axios.get('/api/session-chat?sessionId=' + sessionId, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    setSessionDetail(result.data)
    setLoading(false)
  }

  const StartCall = () => {
    if (!sessionDetail?.selectedDoctor) return;

    setStartingCall(true) // start loading
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API!)
    setVapiInstance(vapi)

    const VapiAgentConfig = {
      name: 'MumWell AI Therapist',
      firstMessage: sessionDetail?.selectedDoctor?.firstMessage,
      transcriber: {
        provider: 'assembly-ai',
        language: 'en'
      },
      voice: {
        provider: 'vapi',
        voiceId: sessionDetail?.selectedDoctor?.voiceId
      },
      model: {
        provider: 'openai',
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: sessionDetail?.selectedDoctor?.agentPrompt
          }
        ]
      }
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    vapi.start(VapiAgentConfig)

    vapi.on('call-start', onCallStartListener)
    vapi.on('call-end', onCallEndListener)
    vapi.on('message', onMessageListener)
  }

  const EndCall = async () => {
    const result = await GenerateReport()
    console.log('result', result)
    if (!vapiInstance) return
    if (timerRef.current) clearInterval(timerRef.current);
    setSeconds(0);

    vapiInstance.stop()
    vapiInstance.off('call-start', onCallStartListener)
    vapiInstance.off('call-end', onCallEndListener)
    vapiInstance.off('message', onMessageListener)
    setCallStarted(false)
    setVapiInstance(null)
    toast.success('Your report is generated!')
    router.replace('/consultation')
  }

  const GenerateReport = async () => {
    const result = await axios.post('/api/medical-report', {
      messages: messages,
      sessionDetail: sessionDetail,
      sessionId: sessionId
    })

    console.log('result', result.data)

    return result.data
  }

  const formatTime = (total: number) => {
  const m = Math.floor(total / 60).toString().padStart(2, "0");
  const s = (total % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};


  return (
    <div className="pt-32 px-2 md:px-16">
      <div className='md:p-10 p-2 border rounded-2xl bg-secondary'>
        <Container className="pt-4 pb-8">
          <div className='flex justify-between items-center'>
            <h2 className='p-1 px-2 border rounded-md flex gap-2 items-center'>
              <Circle className={`h-4 w-4 rounded-full ${callStarted ? "bg-teal-500" : "bg-red-500"}`} />
              {callStarted ? "Connected..." : "Not Connected"}
            </h2>
            <h2 className='font-bold text-xl text-foreground'>
  {formatTime(seconds)}
</h2>

          </div>
        </Container>

        {sessionDetail && (
          <div className='flex items-center flex-col mt-10'>
            <Image
              src={sessionDetail.selectedDoctor.image}
              alt={sessionDetail.selectedDoctor.specialist}
              height={120}
              width={120}
              className='rounded-full h-[100px] w-[100px] object-cover'
            />
            <h2 className='mt-2 text-foreground font-semibold text-lg'>
              {sessionDetail.selectedDoctor.specialist}
            </h2>
            <p className='text-sm text-accent-foreground'>MumWell AI Medical Voice Agent</p>

            <div className="mt-32 overflow-y-auto max-h-[300px] px-4 md:px-20 lg:px-40 xl:px-56 flex flex-col gap-4">
              {messages?.slice(-3).map((msg, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-xl max-w-[85%] shadow-sm border text-sm 
        ${msg.role === "user" ? "bg-card text-primary-foreground self-end" : "bg-muted text-muted-foreground self-start"}`}
                >
                  <p className="font-semibold mb-1 capitalize">{msg.role}</p>
                  <p className="leading-relaxed">{msg.text}</p>
                </div>
              ))}

              {liveTranscript && liveTranscript.length > 0 && (
                <div className="self-start bg-secondary border p-3 rounded-xl max-w-[85%] shadow-sm">
                  <p className="font-semibold text-sm text-foreground mb-1">{currentRole}</p>
                  <p className="text-foreground animate-pulse">{liveTranscript}</p>
                </div>
              )}

              {/* Empty div to scroll into view */}
              <div ref={messagesEndRef} />
            </div>

            {!callStarted ? (
              <Button className='mt-20 flex items-center gap-2' onClick={StartCall} disabled={startingCall}>
                <PhoneCall className='h-4' />
                {startingCall ? "Calling..." : "Start Call"}
                {startingCall && <Loader2 className="animate-spin h-4 w-4" />}
              </Button>
            ) : (
              <Button className='mt-20' variant={'destructive'} onClick={EndCall} disabled={loading}>
                {loading ? <Loader2 className='animate-spin' /> : <PhoneOff className='h-4' />} {loading ? "Generating Report..." : "End Call"}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
