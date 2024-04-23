'use client'

import { Fragment, useState, useRef, useEffect } from 'react'
import { Popover, Transition, Listbox } from '@headlessui/react';
import {
    ChevronDownIcon,
    CalendarIcon,
    TrashIcon,
    PencilSquareIcon,
    DocumentTextIcon,
    DocumentPlusIcon
} from '@heroicons/react/20/solid';

import ReactMarkdown from 'react-markdown';
import { useParams, useRouter } from "next/navigation";

const TeamManagement = [
    { name: '이슈 수정', description: '이슈에 대한 내용을 수정합니다', href: '#', icon: PencilSquareIcon },
    { name: '이슈 삭제', description: '이슈를 삭제합니다.', href: '#', icon: TrashIcon },
];


export default function Project() {
    const params = useParams();
    const router = useRouter();
    const [openRow1, setOpenRow1] = useState(true);
    const [openRow2, setOpenRow2] = useState(true);

    const toggleRow1 = () => {
        setOpenRow1(!openRow1);
    };

    const toggleRow2 = () => {
        setOpenRow2(!openRow2);
    };

    const [issues, setIssues] = useState([]);

    useEffect(() => {
        fetchIssues();
    }, []);

    const fetchIssues = () => {
        fetch("http://localhost:8050/api/v1/Issues")
            .then(result => result.json())
            .then(result => setIssues(result.data.issues))
            .catch(error => console.error('Error fetching issues:', error));
    }
    const [issue, setIssue] = useState({})

    const fetchIssue = () => {
        fetch(`http://localhost:8050/api/v1/Issues/${params.id}`)
            .then(row => row.json())
            .then(row => { setIssue(row.data.issue) })
    }

    useEffect(() => {
        fetchIssue()
    }, [])

    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef(null);

    return (
        <>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">{issue.title}</h1>
                </div>
            </header>
            <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                <Popover className="relative">
                    <Popover.Button
                        ref={buttonRef}
                        className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <span>이슈 관리</span>
                        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                    </Popover.Button>

                    <Transition
                        show={isOpen}
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <Popover.Panel
                            className="absolute z-10 mt-2 bg-white border border-gray-200 rounded-md shadow-lg focus:outline-none"
                            style={{ left: buttonRef.current?.offsetLeft }}
                        >
                            <div className="p-4">
                                {TeamManagement.map((item) => (
                                    <div key={item.name} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                        <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                            <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                                        </div>
                                        <div>
                                            <a href={item.href} className="font-semibold text-gray-900">
                                                {item.name}
                                                <span className="absolute inset-0" />
                                            </a>
                                            <p className="mt-1 text-gray-600">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Popover.Panel>
                    </Transition>
                </Popover>
                <div className="group relative flex">
                    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 group relative flex items-center gap-4 rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex items-center justify-center h-11 w-11 flex-none rounded-lg bg-gray-50 group-hover:bg-white">
                            <CalendarIcon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                        </div>
                        <div>
                            <a href="/calendar" className="font-semibold text-gray-900 flex items-center">
                                <span>팀 캘린더</span>
                            </a>
                        </div>
                    </div>
                    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 group relative flex items-center gap-4 rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex items-center justify-center h-11 w-11 flex-none rounded-lg bg-gray-50 group-hover:bg-white">
                            <DocumentTextIcon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                        </div>
                        <div>
                            <a href="/project" className="font-semibold text-gray-900 flex items-center">
                                <span>팀 프로젝트</span>
                            </a>
                        </div>
                    </div>
                </div>
                <>
             <div className="relative overflow-x-auto mt-8 shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead
                            className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                            onClick={toggleRow1}
                            style={{ cursor: 'pointer' }}
                        >
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    ISSUE ID
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    ISSUE NAME
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    CONTENT
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    STATUS
                                </th>
                            </tr>
                        </thead>
                        <tbody style={{ display: openRow1 ? 'table-row-group' : 'none' }}>
                            {issues.map((issue) => {
                                if (issue.state === 'Todo') {
                                    return (
                                        <tr key={issue.id} className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="px-6 py-4">{issue.id}</td>
                                            <td className="px-6 py-4 font-medium text-gray-900">{issue.title}</td>
                                            <td className="px-6 py-4">{issue.content}</td>
                                            <td className="px-6 py-4">{issue.state}</td>
                                        </tr>
                                    );
                                } else {
                                    return null;
                                }
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="relative overflow-x-auto mt-8 shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead
                            className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                            onClick={toggleRow2}
                            style={{ cursor: 'pointer' }}
                        >
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    ISSUE ID
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    ISSUE NAME
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    CONTENT
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    STATUS
                                </th>
                            </tr>
                        </thead>
                        <tbody style={{ display: openRow2 ? 'table-row-group' : 'none' }}>
                            {issues.map((issue) => {
                                if (issue.state === 'Fixed') {
                                    return (
                                        <tr key={issue.id} className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="px-6 py-4">{issue.id}</td>
                                            <td className="px-6 py-4 font-medium text-gray-900">{issue.title}</td>
                                            <td className="px-6 py-4">{issue.content}</td>
                                            <td className="px-6 py-4">{issue.state}</td>
                                        </tr>
                                    );
                                } else {
                                    return null;
                                }
                            })}
                        </tbody>
                    </table>
                </div>
        </>
            </main>
        </>
    )
}


