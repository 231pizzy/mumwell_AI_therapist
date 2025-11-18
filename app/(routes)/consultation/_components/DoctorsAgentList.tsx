import doctors from '@/shared/list';
import DoctorCard from './DoctorCard';

export default function DoctorsAgentList() {
  return (
    <div className="mt-10 w-full max-w-full">
      <h2 className="text-2xl font-bold mb-6">AI Specialist Doctors</h2>

      {/* Responsive Grid: 2 cols mobile, 3 md, 4 lg */}
   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-8 gap-2 w-full mt-5">
  {doctors.map((doctor) => (
    <DoctorCard key={doctor.id} doctorAgent={doctor} />
  ))}
</div>

    </div>
  );
}
