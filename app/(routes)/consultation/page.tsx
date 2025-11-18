import AppHeader from './_components/AppHeader';
import { Container } from '@/components/ui/container';
import HistoryList from './_components/HistoryList';
import DoctorsAgentList from './_components/DoctorsAgentList';
import AddNewSessionDialog from './_components/AddNewSessionDialog';

export default function ConsultationDashboard() {
  return (
    <div className="min-h-screen p-3">
      {/* Top Container for AppHeader */}
      <Container className="pt-20 pb-8">
        <div className="mt-6 flex justify-end">
          <AppHeader />
        </div>
      </Container>

      {/* Main Content */}
      <Container className="space-y-6 px-6 mt-14">
        {/* Dashboard Title */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h2 className="text-xl lg:text-3xl font-bold text-foreground">
              Voice Consultation Dashboard
            </h2>
            <p className="mt-2 text-foreground">
              Review your recent consultations and manage history efficiently.
            </p>
          </div>

          {/* + Consult Button */}
          <AddNewSessionDialog/>
        </div>

        {/* History List Section */}
        <div className="shadow-md rounded-xl p-1">
          <HistoryList />
        </div>

      </Container>
        <DoctorsAgentList/>
    </div>
  );
}
