'use client'

import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon, CalendarIcon, TrashIcon, UserPlusIcon, PencilSquareIcon, DocumentTextIcon, PencilIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { useEffect, Fragment, useState, useRef } from 'react';

const TeamManagement = [
    { name: '팀 일정', href: '#', icon: CalendarIcon },
    { name: '팀원 초대', href: '#', icon: UserPlusIcon },
    { name: '프로젝트', href: '#', icon: DocumentTextIcon },
    { name: '팀 수정', href: '#', icon: PencilSquareIcon },
    { name: '팀 삭제', href: '#', icon: TrashIcon },
];

export default function Team() {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        fetchTeams();
    }, []);

    const fetchTeams = () => {
        fetch("http://localhost:8050/api/vi/Teams")
            .then(result => result.json())
            .then(result => setTeams(result.data.teams));
    };

    return (
        <>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">팀</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="mt-5 flex lg:ml-4 lg:mt-0">
                        <span className="hidden sm:block">
                            <Link href={`/team/create`}>
                                <button
                                    type="button"
                                    className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                >
                                    <PencilIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                    팀 생성
                                </button>
                            </Link>
                        </span>
                    </div>
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
                            {teams.map((team) => (
                                <TeamItem key={team.id} team={team} />
                            ))}
                        </ul>
                    </div>
                </div>
            </main>
        </>
    );
}

function TeamItem({ team }) {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef(null);

    return (
        <li key={team.id}>
            <Popover className="relative flex justify-end">
                <Popover.Button
                    ref={buttonRef}
                    className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span>팀 메뉴</span>
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
                        style={{ right: `calc(100% - ${buttonRef.current?.offsetLeft}px)` }}
                    >
                        <div className="p-4">
                            {TeamManagement.map((item) => (
                                <div key={item.name} className="group relative flex items-center gap-4 rounded-lg p-4 hover:bg-gray-50">
                                    <div className="flex items-center justify-center h-11 w-11 flex-none rounded-lg bg-gray-50 group-hover:bg-white">
                                        <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                                    </div>
                                    <div>
                                        <a href={item.href} className="font-semibold text-gray-900 flex items-center">
                                            <span>{item.name}</span>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Popover.Panel>
                </Transition>
            </Popover>
            <div className="max-w-xs overflow-hidden rounded-lg shadow-lg">
                <img className="object-cover w-full h-48" src="https://images.pexels.com/photos/2033997/pexels-photo-2033997.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="Flower and sky" />
                <div className="px-6 py-4">
                    <h4 className="mb-3 text-xl font-semibold tracking-tight text-gray-800">{team.name}</h4>
                    <p className="leading-normal text-gray-700">{team.content}</p>
                </div>
            </div>
        </li>
    );
}


