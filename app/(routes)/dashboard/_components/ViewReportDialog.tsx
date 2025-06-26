import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SessionDetail } from "../medical-agent/[sessionId]/page";
import moment from "moment";
type props ={
    record:SessionDetail
}
function ViewReportDialog({record}:props) {
  return (
    <div>
      <Dialog>
        <DialogTrigger><Button variant={'link'} size={'sm'}>View Report</Button></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle asChild>
                <h2 className="text-center text-2xl">Medical AI voice agent</h2>
            </DialogTitle>
            <DialogDescription asChild>
              <div className="mt-10">
                <h2 className="font-bold text-blue-500 txt-lg">Video Info:</h2>
                <div className="grid grid-cols-2 ">
                    
                        <h2><span className="font-bold">Doctor Specialization:</span> {record.selectedDoctor.specialist}</h2>
                        <h2>Visit Date: { moment(new Date(record.createdOn)).fromNow()}</h2>
                   
                </div>
              </div>

            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ViewReportDialog;
