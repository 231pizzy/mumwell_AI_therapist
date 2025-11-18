import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { SessionDetail } from "../medical-agent/[sessionId]/page"
import moment from 'moment'
import ViewReportDialog, { MedicalReport } from "./ViewReportDialog"

type Props = {
  history: SessionDetail[]
}

function HistoryTable({ history }: Props) {
  return (
    <div>
      <Table>
        <TableCaption>Previous Consultation Reports</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px] text-center font-bold">
              AI Medical Specialist
            </TableHead>

            <TableHead className="w-[260px] text-center font-bold">
              Description
            </TableHead>

            <TableHead className="w-[150px] text-center font-bold">
              Date
            </TableHead>

            <TableHead className="w-[120px] text-right font-bold">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {history.map((record: SessionDetail, index: number) => (
            <TableRow key={index}>
              <TableCell className="font-medium text-center">
                {record.selectedDoctor?.specialist}
              </TableCell>

              <TableCell className="max-w-[260px] line-clamp-2 text-muted-foreground text-center">
                {record.notes}
              </TableCell>

              <TableCell className="text-center">
                {moment(new Date(record.createdOn)).fromNow()}
              </TableCell>

              <TableCell className="text-right">
                <ViewReportDialog
                  record={{
                    ...record,
                    report: record.report as MedicalReport, // ✅ cast here
                  }}
                />

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>


    </div>
  )
}

export default HistoryTable
