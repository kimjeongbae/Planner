'use client'

import { UserCircleIcon } from '@heroicons/react/24/solid'
import { useState } from 'react';
import { useRouter } from "next/navigation";

export default function Create() {

    const [team, setTeam] = useState({name: '', content: ''});
    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8050/api/vi/Teams", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(team)
        })

        if (response.ok) {
            alert("팀 생성 완료")
            router.push("/team")

        } else {
            alert("팀 생성 실패")
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setTeam({...team, [name]: value})
    }

    return (
        <>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">팀 만들기</h1>
                </div>
            </header>
            <form onSubmit={handleSubmit} action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <label htmlFor="nickname" className="block text-sm font-semibold leading-6 text-gray-900">
                            팀 이름
                        </label>
                        <div className="mt-2.5">
                            <input
                                onChange={handleChange}
                                type="text"
                                name="name"
                                id="name"
                                autoComplete="organization"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                            팀 소개
                        </label>
                        <div className="mt-2.5">
                            <textarea
                                onChange={handleChange}
                                name="content"
                                id="content"
                                rows={4}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                defaultValue={''}
                            />
                        </div>
                    </div>
                    <div className="col-span-full">
                        <label htmlFor="photo" className="block text-sm font-semibold leading-6 text-gray-900">
                            팀 이미지
                        </label>
                        <div className="mt-2 flex items-center gap-x-3">
                            <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                            <button
                                type="button"
                                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                                선택
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <button
                        type="submit"
                        className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        팀 만들기
                    </button>
                </div>
            </form>


        </>
    )

}
