'use client'

import { Fragment, useState, useRef } from 'react'
import { Popover, Transition, Listbox } from '@headlessui/react';
import {
    ChevronDownIcon,
    CalendarIcon,
    TrashIcon,
    UserPlusIcon,
    PencilSquareIcon,
    DocumentTextIcon,
    ChevronUpDownIcon,
    CheckIcon
} from '@heroicons/react/20/solid';

const TeamManagement = [
    { name: '팀 수정', description: '팀에 대한 내용을 수정합니다', href: '#', icon: PencilSquareIcon },
    { name: '팀원 초대', description: '새로운 팀원을 초대합니다', href: '#', icon: UserPlusIcon },
    { name: '팀 삭제', description: '팀을 삭제하면 자료는 복구되지 않습니다.', href: '#', icon: TrashIcon },
];



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Team() {


    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef(null);

    return (
        <>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">팀</h1>
                </div>
            </header>
            <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                <Popover className="relative">
                    <Popover.Button
                        ref={buttonRef}
                        className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <span>팀 관리</span>
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
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Position
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <img className="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-4.jpg" alt="Jese image" />
                                    <div className="ps-3">
                                        <div className="text-base font-semibold">Leslie Livingston</div>
                                        <div className="font-normal text-gray-500">leslie@flowbite.com</div>
                                    </div>
                                </th>
                                <td className="px-6 py-4">
                                    SEO Specialist
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div> Offline
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    )
}


