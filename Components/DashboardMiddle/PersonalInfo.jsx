import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/Components/ui/input';
import { Calendar } from "@/Components/ui/calendar"
import { Textarea } from "@/Components/ui/textarea"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover"
import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/Components/ui/button"
import { Label } from "@/Components/ui/label"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/Components/ui/tooltip";
import { showSuccess, showError, showInfo } from '@/helpers/ToastManager';
import Loader from '../Workers/Loader'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"
import { Checkbox } from "@/Components/ui/checkbox"
import { reloadPreview } from "@/Components/DesignedPages/MobilePreview"


const PersonalInfo = ({ user }) => {
    const email = user.email
    const [nickname, setNickname] = useState(user.nickname || "");
    const [date, setDate] = React.useState(user.DOB || "")
    const [workStatus, setWorkStatus] = useState(user.workStatus || "");
    const [qualification, setQualification] = useState(user.qualification || "")
    const [hasWorkedInCompany, setHasWorkedInCompany] = useState(user?.hasWorkedInCompany || false)
    const [jobPopUp, setJobPopUp] = useState(false)
    const [jobs, setJobs] = useState(user.jobs || [])
    const [jobEntry, setJobEntry] = useState({
        company: "",
        role: "",
        location: "",
        duration: "",
        description: "",
        isWorking: false
    });
    const [location, setLocation] = useState(user.location || "");
    const [open, setOpen] = React.useState(false)
    const [firstLoad, setFirstLoad] = useState(true)

    useEffect(() => {
        if (firstLoad) {
            setFirstLoad(false)
            return;
        }
        debouncedSave({ jobs, nickname, date, workStatus, hasWorkedInCompany, qualification, location, email })
    }, [jobs, nickname, date, workStatus, hasWorkedInCompany, qualification, location])

    const saveData = async (data) => {
        // always latest values
        const res = await fetch('/api/DashboardDataChange/PersonalInfo', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!res.ok) showError("Failed to save changes.");
        reloadPreview()
    };

    const debouncedSave = useCallback(
        debounce(saveData, 1000),
        [] // The empty dependency array ensures this function is only created once
    );

    const handleJobSubmit = (e) => {
        e.preventDefault();
        setJobs([...jobs, jobEntry]);
        setJobEntry({
            company: "",
            role: "",
            location: "",
            duration: "",
            description: "",
            isWorking: false
        });
    };

    const handleDeleteJob = (index) => {
        setJobs(jobs.filter((_, i) => i !== index));
    };

    function debounce(func, delay) {
        let timeoutId; // This variable will hold the ID of the setTimeout

        return function (...args) {
            // Clear any existing timeout to reset the timer
            clearTimeout(timeoutId);

            // Set a new timeout
            timeoutId = setTimeout(() => {
                // Execute the original function with the correct 'this' context and arguments
                func.apply(this, args);
            }, delay);
        };
    }

    return (

        <div className="w-[90%] mx-auto py-6 mt-2 space-y-6 text-zinc-800 dark:text-zinc-100">
            <h1 className="text-3xl font-semibold text-orange-600">
                Personal Information
            </h1>

            {/* Row container */}
            <div className="flex flex-col md:flex-row gap-6 items-center justify-center ">
                {/* Nickname */}
                <div className="flex-1 w-full md:w-1/2">
                    <Label htmlFor="nickname" className="text-sm">
                        Nick Name
                    </Label>
                    <Input
                        id="nickname"
                        placeholder="Nickname"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        type="text"
                    />
                </div>

                {/* Date of Birth */}
                <div className="flex-1 w-full md:w-1/2">
                    <Label htmlFor="date" className="px-1">
                        Date of birth
                    </Label>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                id="date"
                                className="w-48 justify-between font-normal"
                            >
                                {date ?new Date(date).toLocaleDateString() : "Select date"}
                                <ChevronDownIcon />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={date}
                                captionLayout="dropdown"
                                onSelect={(date) => {
                                    setDate(date)
                                    setOpen(false)
                                }}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
            {/* Qualification */}
            <div>
                <Label htmlFor="qualification" className="text-sm"> Qualification</Label>
                <Input value={qualification} onChange={(e) => { setQualification(e.target.value) }} id="qualification" placeholder="e.g., Completed btech in IIT BOMBAY " />
            </div>
            <div>
                <div className="flex-1">
                    <Label htmlFor="workStatus" className="text-sm">
                        Current Working Status
                    </Label>
                    <Select
                        value={workStatus}
                        onValueChange={(value) => setWorkStatus(value)}
                    >
                        <SelectTrigger id="workStatus" className="w-full">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="student">Student</SelectItem>
                            <SelectItem value="intern">Intern / Apprentice</SelectItem>
                            <SelectItem value="employed-full">Employed (Full-Time)</SelectItem>
                            <SelectItem value="employed-part">Employed (Part-Time)</SelectItem>
                            <SelectItem value="self-employed">Self-Employed</SelectItem>
                            <SelectItem value="freelancer">Freelancer</SelectItem>
                            <SelectItem value="unemployed">Unemployed (Looking for Work)</SelectItem>
                            <SelectItem value="career-break">On Career Break</SelectItem>
                            <SelectItem value="homemaker">Homemaker</SelectItem>
                            <SelectItem value="retired">Retired</SelectItem>
                            <SelectItem value="volunteer">Volunteer</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div>
                <label htmlFor='location' className='text-sm'>Your Location </label>
                <Input id={location} value={location} onChange={(e) => setLocation(e.target.value)} placeholder='e.g., New York' />
            </div>
            <hr />
            <div>
                <div className="flex justify-between items-center">

                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id="hasWorkedInCompany"
                            checked={hasWorkedInCompany}
                            onCheckedChange={(checked) => setHasWorkedInCompany(checked)}
                            className="border-zinc-400 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                        />
                        <Label
                            htmlFor="hasWorkedInCompany"
                            className="text-sm font-medium leading-none text-orange-600 dark:text-orange-500 cursor-pointer"
                        >
                            I have worked in a company before or working currently.
                        </Label>
                    </div>

                    {jobs.length !== 0 && <button
                        onClick={() => setJobPopUp(!jobPopUp)}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 text-sm font-medium rounded-md shadow-md transition-all"
                    >
                        Jobs
                    </button>}

                </div>
                {hasWorkedInCompany && (
                    <div className="mt-4">
                        <div className="m-2 w-full mx-auto">
                            <form onSubmit={handleJobSubmit}>
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Company Name */}
                                    <div>
                                        <Label htmlFor="company" className="text-sm font-medium">
                                            Company Name
                                        </Label>
                                        <Input
                                            id="company"
                                            placeholder="e.g., JUNCTION Inc."
                                            value={jobEntry.company}
                                            onChange={(e) =>
                                                setJobEntry({ ...jobEntry, company: e.target.value })
                                            }
                                        />
                                    </div>

                                    {/* Job Role */}
                                    <div>
                                        <Label htmlFor="role" className="text-sm font-medium">
                                            Job Role
                                        </Label>
                                        <Input
                                            id="role"
                                            placeholder="e.g., Software Engineer"
                                            value={jobEntry.role}
                                            onChange={(e) =>
                                                setJobEntry({ ...jobEntry, role: e.target.value })
                                            }
                                        />
                                    </div>

                                    {/* Location */}
                                    <div>
                                        <Label htmlFor="location" className="text-sm font-medium">
                                            City / Location
                                        </Label>
                                        <Input
                                            id="location"
                                            placeholder="e.g., San Francisco, CA"
                                            value={jobEntry.location}
                                            onChange={(e) =>
                                                setJobEntry({ ...jobEntry, location: e.target.value })
                                            }
                                        />
                                    </div>

                                    {/* Duration */}
                                    <div>
                                        <Label htmlFor="duration" className="text-sm font-medium">
                                            Duration
                                        </Label>
                                        <Input
                                            id="duration"
                                            placeholder="e.g., Jan 2020 - Dec 2022 or 2 years"
                                            value={jobEntry.duration}
                                            onChange={(e) =>
                                                setJobEntry({ ...jobEntry, duration: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="mt-4">
                                    <Label htmlFor="description" className="text-sm font-medium">
                                        Job Description
                                    </Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Briefly describe your responsibilities and achievements..."
                                        value={jobEntry.description}
                                        onChange={(e) =>
                                            setJobEntry({ ...jobEntry, description: e.target.value })
                                        }
                                    />
                                </div>

                                {/* Currently Working */}
                                <div className="flex items-center space-x-3 mt-4">
                                    <Checkbox
                                        id="isWorking"
                                        checked={jobEntry.isWorking}
                                        onCheckedChange={(checked) =>
                                            setJobEntry({ ...jobEntry, isWorking: checked })
                                        }
                                        className="border-zinc-400 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                                    />
                                    <Label
                                        htmlFor="isWorking"
                                        className="text-sm font-medium leading-none text-zinc-800 dark:text-zinc-100 cursor-pointer"
                                    >
                                        I am currently working in this company
                                    </Label>
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-2 mt-5">
                                    <button
                                        type="submit"
                                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 text-sm font-medium rounded-md shadow-md transition-all"
                                    >
                                        Add Job
                                    </button>
                                    <button
                                        type="button"
                                        className="text-sm font-medium cursor-pointer border border-orange-500 text-orange-500 px-4 py-2 rounded-md hover:bg-orange-500 hover:text-white transition-colors"
                                        onClick={() =>
                                            setJobEntry({
                                                company: "",
                                                role: "",
                                                location: "",
                                                duration: "",
                                                description: "",
                                                isWorking: false,
                                            })
                                        }
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>

                        </div>

                    </div>
                )}
            </div>


            {jobPopUp && (
                <div className="fixed inset-0 bg-zinc-500/80 flex justify-center items-center z-50">
                    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg w-full max-w-lg p-6 relative">
                        {/* Close Button */}
                        <button
                            onClick={() => setJobPopUp(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                        >
                            ✕
                        </button>

                        <h2 className="text-xl font-semibold text-orange-600 mb-4">My Jobs</h2>

                        {jobs.length === 0 ? (
                            <p className="text-gray-500 text-sm">No jobs added yet.</p>
                        ) : (
                            <div className="space-y-3 max-h-[70vh] overflow-auto">
                                {jobs.map((job, index) => (
                                    <div
                                        key={index}
                                        className="border border-zinc-300 dark:border-zinc-700 rounded-md p-4 flex justify-between items-center  "
                                    >
                                        <div>
                                            <p className="font-medium">{job.company} — {job.role}</p>
                                            <p className="text-sm text-gray-500">
                                                {job.location} • {job.duration}
                                            </p>
                                            <p className="text-xs text-gray-400">{job.isWorking ? "Currently Working" : "Past Role"}</p>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteJob(index)}
                                            className="text-red-500 hover:text-red-700 text-sm font-medium"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

        </div>

    )
}

export default PersonalInfo