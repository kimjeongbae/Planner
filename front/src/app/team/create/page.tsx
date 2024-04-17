'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'

export default function Create() {

    const [calendars, setCalendars] = useState([]);

    useEffect(() => {
        fetchCalendars()
    }, [])


    const fetchCalendars = () => {
        fetch("http://localhost:8050/api/v1/Calendars")
            .then(result => result.json())
            .then(result => setCalendars(result.data.calendars))
    }

    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:8050/api/v1/Calendars/${id}`, {
            method: 'DELETE'
        })

        if (response.ok) {
            alert("스케줄 삭제 완료")
            fetchCalendars()
        } else {
            alert("fail")
        }
    }


    return (
        <>
            <CalendarForm fetchCalendars={fetchCalendars} />
            <ul>
                번호 / 제목 / 내용 / 시작일 / 종료일 / 컬러
                {calendars.map(row =>
                    <li key={row.id}>
                        {row.id} / {row.title} / {row.content} / {row.start_date} / {row.end_date} / {row.color}
                        <button onClick={() => handleDelete(row.id)}>삭제</button>
                    </li>
                )}
            </ul>


            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">팀 생성</h1>
                </div>
            </header>
            <main>

                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">팀 생성</div>




            </main>
        </>
    )

    function CalendarForm({ fetchCalendars }) {

        const [calendar, setCalendar] = useState({ title: '', content: '' });

        const handleSubmit = async (e) => {
            e.preventDefault();

            const response = await fetch("http://localhost:8050/api/v1/Calendars", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(calendar)
            })

            if (response.ok) {
                alert("스케줄 등록 완료")
                fetchCalendars()
            } else {
                alert("스케줄 등록 실패")
            }
        }

        const handleChange = (e) => {
            const { name, value } = e.target;
            setCalendar({ ...calendar, [name]: value })
        }

        let [isOpen, setIsOpen] = useState(false)

        function closeModal() {
            setIsOpen(false)
        }

        function openModal() {
            setIsOpen(true)
        }

        return (
            <>
                <button
                    type="button"
                    onClick={openModal}
                    className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                >
                    일정 추가
                </button>

                <form onSubmit={handleSubmit}>
                    <Transition appear show={isOpen} as={Fragment}>
                        <Dialog as="div" className="relative z-10" onClose={closeModal}>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0 bg-black/25" />
                            </Transition.Child>

                            <div className="fixed inset-0 overflow-y-auto">
                                <div className="flex min-h-full items-center justify-center p-4 text-center">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                    >
                                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg font-medium leading-6 text-gray-900"
                                            >
                                                일정 추가
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <div className="modal-body">
                                                    <div className="mt-3 mb-3">
                                                        스케줄 제목  <input onChange={handleChange} className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" type="text" name="title" id="title" />
                                                    </div>
                                                    <div className="mt-3 mb-3">
                                                        스케줄 내용  <input onChange={handleChange} className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" type="text" name="content" id="content" />
                                                    </div>
                                                    <div className="mt-3 mb-3">
                                                        시작 시간  <input onChange={handleChange} className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" type="datetime-local" name="start_date" id="start" />
                                                    </div>
                                                    <div className="mt-3 mb-3">
                                                        종료 시간  <input onChange={handleChange} className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" type="datetime-local" name="end_date" id="end" />
                                                    </div>
                                                    배경 색상
                                                    <select onChange={handleChange} className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" name="color" id="color">
                                                        <option value="red">빨강색</option>
                                                        <option value="orange">주황색</option>
                                                        <option value="yellow">노랑색</option>
                                                        <option value="green">초록색</option>
                                                        <option value="blue">파랑색</option>
                                                        <option value="indigo">남색</option>
                                                        <option value="purple">보라색</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="flex justify-end mt-4">
                                                <button
                                                    type="button"
                                                    onClick={handleSubmit}
                                                    className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                                                >
                                                    저장
                                                </button>
                                                <button
                                                    type="button"
                                                    className="rounded-md bg-black/20 ml-3 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                                                    onClick={closeModal}
                                                >
                                                    취소
                                                </button>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>
                </form>
            </>
        )

    }

}
