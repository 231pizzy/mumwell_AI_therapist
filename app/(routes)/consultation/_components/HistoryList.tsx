"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import AddNewSessionDialog from "./AddNewSessionDialog";
import axios from "axios";
import HistoryTable from "./HistoryTable";
import { SessionDetail } from "../medical-agent/[sessionId]/page";


export default function HistoryList() {
  const [history, setHistory] = useState<SessionDetail[]>([]);

  useEffect(() => {
    GetHistoryList()
  }, [])

  const GetHistoryList = async () => {
    const token = localStorage.getItem("token");
    const result = await axios.get('/api/session-chat?sessionId=all', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log('result', result.data)
    setHistory(result.data)
  }

  return (
    <div className="flex flex-col items-center justify-center py-4 px-4 text-center">
      {history.length === 0 ? (
        <div className="flex flex-col items-center gap-4 bg-card shadow-md rounded-xl p-8 w-full max-w-sm mx-auto">
          <Image
            src="/medical-assistant.jpg"
            alt="medical-assistant"
            width={150}
            height={150}
            className="rounded-full"
          />
          <h2 className="text-xl lg:text-2xl font-bold text-foreground">
            No Recent Consultations
          </h2>
          <p className="text-muted-foreground">
            It looks like you haven&apos;t consulted with any doctor yet.
          </p>
          <AddNewSessionDialog />
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-6">Previous Consultation Reports</h2>
       <div className="w-full overflow-x-auto h-[400px]">
         <HistoryTable history={history}/>
        </div>
        </>
      )}
    </div>
  );
}
