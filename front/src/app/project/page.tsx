'use client'

import Link from "next/link";
import { PencilIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from "react";
export default function Project() {

    const [projects, setProjects] = useState([]);

    const [openRow1, setOpenRow1] = useState(true);
    const [openRow2, setOpenRow2] = useState(true);

    const toggleRow1 = () => {
        setOpenRow1(!openRow1);
    };

    const toggleRow2 = () => {
        setOpenRow2(!openRow2);
    };

    useEffect(() => {
        fetchIssues();
    }, []);

    const fetchIssues = () => {
        fetch("http://localhost:8050/api/v1/Projects")
            .then(result => result.json())
            .then(result => setProjects(result.data.projects))
            .catch(error => console.error('Error fetching projects:', error));
    }

    return (
        <>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">프로젝트</h1>
                </div>
            </header>
            <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="mt-5 flex lg:ml-4 lg:mt-0">
                    <span className="hidden sm:block">
                        <Link href={`/project/create`}>
                            <button
                                type="button"
                                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                                <PencilIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                프로젝트 생성
                            </button>
                        </Link>
                    </span>
                </div>
                <div className="mt-8 relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    번호
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    제목
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    내용
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    상태
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map(row => (
                                <tr key={row.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {row.id}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link href={`/project/${row.id}`}>{row.title}</Link>
                                    </td>
                                    <td className="px-6 py-4">
                                        {row.content}
                                    </td>
                                    <td className="px-6 py-4">
                                        {row.state}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    )
}