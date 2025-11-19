"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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

export default function LabDropdown() {
    const [labs, setLabs] = useState<Lab[]>([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        async function loadLabs() {
            const res = await fetch("http://localhost:3001/labs");
            const data = await res.json();
            setLabs(data);
        }

        loadLabs();
    }, []);

    return (
        <div className="relative inline-block w-full mt-5">
            <button onClick={() => setOpen(!open)} type="button" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700">
                Select a lab
            </button>

            {open && (
                <div className="absolute mt-2 w-full shadow-lg rounded-md border z-20 max-h-64 overflow-y-auto">
                    {labs.length > 0 ? (
                        labs.map((lab) => (
                            <Link key={lab.CourseId} href={`/lab/${lab.CourseId}`} className="block text-black px-4 py-2 hover:bg-gray-100">
                                {lab.Day} {lab.BeginTime}-{lab.EndTime}, {lab.Location},{" "} {lab.CourseTitle}
                            </Link>
                        ))
                    ) : (
                        <p className="px-4 py-2 text-black">Loading...</p>
                    )}
                </div>
            )}
        </div>
    );
}
