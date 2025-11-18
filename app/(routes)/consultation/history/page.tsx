"use client";

import { Container } from '@/components/ui/container'
import HistoryList from '../_components/HistoryList'
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function History() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-secondary py-10 mt-24">
      <Container className="px-3 md:px-8 max-w-5xl mx-auto">

        {/* BACK BUTTON */}
        <div className="mb-6">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>

        {/* PAGE HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Consultation History</h1>
          <p className="text-accent-foreground mt-1">
            Review your past consultation sessions, notes, and medical interactions.
          </p>
        </div>

        {/* CARD WRAPPER */}
        <div className="bg-secondary shadow-lg rounded-2xl p-6 border border-gray-200">
          <HistoryList />
        </div>

      </Container>
    </div>
  )
}
