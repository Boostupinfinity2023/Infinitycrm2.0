import React, { useState, useEffect } from 'react';

export default function CalculateIntake({ intakeData }: any) {
    const [intakeInfo, setIntakeInfo] = useState([]);
    useEffect(() => {
        if (intakeData != null) {
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth() + 1;



            const processedIntakes = JSON.parse(intakeData).map((intake: any) => {
                let intakeYear = currentYear;
                if (intake.PROGRAM_INTAKE_MONTH < currentMonth) {
                    intakeYear = currentYear + 1;
                }
                let submissionYear = intakeYear;
                if (intake.APPLICATION_SUBMISSION_MONTH > intake.PROGRAM_INTAKE_MONTH) {
                    submissionYear = intakeYear - 1;
                }
                let closingYear = submissionYear;
                if (intake.APPLICATION_CLOSING_MONTH > intake.APPLICATION_SUBMISSION_MONTH &&
                    intake.APPLICATION_CLOSING_MONTH <= intake.PROGRAM_INTAKE_MONTH) {
                    closingYear = intakeYear;
                }

                return {
                    ID: intake.ID,
                    intakeMonth: intake.PROGRAM_INTAKE_MONTH,
                    intakeYear,
                    submissionDate: intake.APPLICATION_SUBMISSION_DATE,
                    submissionMonth: intake.APPLICATION_SUBMISSION_MONTH,
                    submissionYear,
                    closingDate: intake.APPLICATION_CLOSING_DATE,
                    closingMonth: intake.APPLICATION_CLOSING_MONTH,
                    closingYear,
                };
            }).filter((intake: any) => {
                if (intake.intakeYear > currentYear) return true;
                if (intake.intakeYear === currentYear && intake.intakeMonth >= currentMonth) return true;
                return false;
            }).sort((a: any, b: any) => {
                if (a.intakeYear !== b.intakeYear) {
                    return a.intakeYear - b.intakeYear;
                }
                return a.intakeMonth - b.intakeMonth;
            });

            setIntakeInfo(processedIntakes);
        }
    }, [intakeData]);

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];


    return (
        <div className="grid grid-cols-3 gap-2">
            {intakeInfo.map((intake: any, index: any) => (
                  <div className="" key={index}>
                    <p className="text-xs mb-1"><b>{monthNames[intake.intakeMonth - 1]} {intake.intakeYear}</b></p> 
                </div>
            ))}
        </div>
    );
}
