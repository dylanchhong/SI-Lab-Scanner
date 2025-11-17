"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";

interface Lab {
    CourseId: number;
    CourseTitle: string;
    Day: string;
    BeginDate: Date;
    EndDate: Date;
    BeginTime: string;
    EndTime: string;
    Capacity: number;
    Location: string;
    CategoryId: string;
}

interface Attendee {
    ParticipantId: number;
    CourseId: number;
    FirstName: string;
    LastName: string;
    Agency: string;
    State: string;
    Email: string;
    Registered: boolean;
    Attended: boolean;
    EnrollStatus: string;
    CompletedDate: Date;
}

interface QrCodeData {
    ParticipantId: number;
    Name: string;
}

export default function LabPage() {
    const { courseId } = useParams();
    const [lab, setLab] = useState<Lab | null>(null);
    const [attendees, setAttendees] = useState<Attendee[]>([]);
    const [attendeesWithPass, setAttendeesWithPass] = useState<Attendee[]>([]);
    const [currentCapacity, setCurrentCapacity] = useState(0);

    const [qrInput, setQrInput] = useState("");
    const [status, setStatus] = useState<"success" | "already" | "error" | "capacity" | null>(null);
    const qrRef = useRef<HTMLInputElement>(null);

    const [showAttendeeList, setShowAttendeeList] = useState(false);

    useEffect(() => {
        async function loadData() {
            const labRes = await fetch(`http://localhost:3001/labs/${courseId}`);
            const labData = await labRes.json();
            setLab(labData);

            const attendeesRes = await fetch(`http://localhost:3001/attendees/${courseId}`);
            const attendeesData = await attendeesRes.json();
            setAttendees(attendeesData);
            setCurrentCapacity(attendeesData.length);

            const passesRes = await fetch("http://localhost:3001/attendees-with-pass");
            const passesData = await passesRes.json();
            setAttendeesWithPass(passesData);
        }

        loadData();
    }, [courseId]);

    useEffect(() => {
        if (!qrInput) return;
        try {
            const data: QrCodeData = JSON.parse(qrInput);
            const participant = data.ParticipantId;

            if (attendees.some(a => a.ParticipantId === participant)) {
                setStatus("already");
            } else if (attendeesWithPass.some(a => a.ParticipantId === participant)) {
                setStatus("success");
                setAttendees(prev => [...prev, { ...attendeesWithPass.find(a => a.ParticipantId === participant)! }]);
                setCurrentCapacity(prev => prev + 1);
            } else {
                setStatus("error");
            }
        } catch {
            setStatus(null);
        } finally {
            setQrInput("");
            if (qrRef.current) qrRef.current.focus();
        }
    }, [qrInput, attendees, attendeesWithPass]);

    if (!lab) return <p className="text-black">Loading...</p>;

    return (
        <div className="min-h-screen text-black p-6 flex flex-col items-center space-y-4">
            <div className="text-center space-y-1">
                <h1 className="text-5xl font-bold">{lab.CourseTitle}</h1>
                <p className="text-4xl font-bold mt-3">{lab.Day}, {lab.BeginTime} - {lab.EndTime}</p>
                <p className="text-4xl font-bold mt-3">{lab.Location}</p>
                <p className="text-4xl font-bold mt-3">{currentCapacity} / {lab.Capacity}</p>
            </div>

            <input
                ref={qrRef}
                type="text"
                value={qrInput}
                onChange={e => setQrInput(e.target.value)}
                placeholder="Scan QR code"
                className="p-2 rounded-md text-black w-full max-w-md"
                autoFocus
            />

            {status === "success" && <p className="text-green-500 font-bold">Checked-In</p>}
            {status === "already" && <p className="text-yellow-400 font-bold">Already Checked-In</p>}
            {status === "error" && <p className="text-red-500 font-bold">Lab Pass Not Found</p>}
            {status === "capacity" && <p className="text-red-600 font-bold">At Capacity</p>}

            <button
                className="mt-4 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => setShowAttendeeList(!showAttendeeList)}
            >
                Toggle Attendees
            </button>

            {showAttendeeList && (
                <div className="overflow-auto max-h-64 w-full max-w-2xl mt-2">
                    <table className="table-auto w-full border border-white">
                        <thead>
                            <tr>
                                <th className="border px-2">Name</th>
                                <th className="border px-2">Agency</th>
                                <th className="border px-2">State</th>
                                <th className="border px-2">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendees.map(a => (
                                <tr key={a.ParticipantId}>
                                    <td className="border px-2">{a.FirstName} {a.LastName}</td>
                                    <td className="border px-2">{a.Agency}</td>
                                    <td className="border px-2">{a.State}</td>
                                    <td className="border px-2">{a.Email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}