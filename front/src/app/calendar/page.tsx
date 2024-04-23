'use client'

import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Dialog, Transition } from '@headlessui/react';
import koLocale from '@fullcalendar/core/locales/ko';
import listPlugin from '@fullcalendar/list';
import multiMonthPlugin from '@fullcalendar/multimonth'
import { Fragment } from 'react';
import { useParams } from 'next/navigation';


export default function Create() {
  
   const params = useParams();

  // 스케줄 등록 시작
  const [createOpen, setCreateOpen] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [schedule, setSchedule] = useState({ title: '', content: '', start_date: '', end_date: '', color: '' });
  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = () => {
    fetch("http://localhost:8050/api/v1/Schedules")
      .then(result => result.json())
      .then(result => setSchedules(result.data.schedules))
      .catch(error => console.error('Error fetching schedules:', error));
  };

  const CreatCloseModal = () => {
    setCreateOpen(false);
    setSchedule({ title: '', content: '', start_date: '', end_date: '', color: '' });
  };

  const CreatOpenModal = () => {
    setCreateOpen(true);
  };


  const createChange = (e) => {
    const { name, value } = e.target;
    setSchedule({ ...schedule, [name]: value });
  };


  const createSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8050/api/v1/Schedules", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(schedule)
      });

      if (response.ok) {
        alert("스케줄 등록 완료");
        fetchSchedules();
        CreatCloseModal();
      } else {
        alert("스케줄 등록 실패");
      }
    } catch (error) {
      console.error('Error creating schedule:', error);
    }
  };

  const handleDateSelect = (selectInfo) => {
    CreatOpenModal();

    const { startStr, endStr } = selectInfo;

    setSchedule({
      ...schedule,
      start_date: startStr,
      end_date: endStr
    });
  };
  // 스케줄 등록 끝

  // 스케줄 수정 시작
  const [detailOpen, setDetailOpen] = useState(false);

  const DetailCloseModal = () => {
    setDetailOpen(false);
    setSchedule({ title: '', content: '', start_date: '', end_date: '', color: '' });
  };

  const DetailOpenModal = () => {
    setDetailOpen(true);
  };


  const handleEventClick = () => {
    DetailOpenModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSchedule({ ...schedule, [name]: value })

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:8050/api/v1/schedules/${params.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(schedule)
    })

    if (response.ok) {
      alert("수정 완료")
      fetchSchedules()
    } else {
      alert("수정 실패")
    }
  }



  // 스케줄 수정 끝

  // 스케줄 삭제 시작


  useEffect(() => {
    fetchSchedules()
  }, [])


  const fetchArticles = () => {
    fetchSchedules("http://localhost:8050/api/v1/schedules")
      .then(result => result.json())
      .then(result => setArticles(result.data.schedules))
  }

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:8090/api/v1/schedules/${id}`, {
      method: 'DELETE'
    })

    if (response.ok) {
      alert("스케줄 삭제 성공")
      fetchArticles()
    } else {
      alert("스케줄 삭제 실패")
    }
  }
  // 스케줄 삭제 끝

  const handleEventDrop = async (dropInfo) => {
    const { event } = dropInfo;

    const updatedEvent = {
      title: event.title,
      content: event.content,
      start_date: event.start,
      end_date: event.end,
      color: event.color
    };

    try {
      const response = await fetch(`http://localhost:8050/api/v1/schedules/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedEvent)
      });

      if (response.ok) {
        alert("스케줄 변경 완료");
        fetchSchedules();
      } else {
        alert("스케줄 변경 실패");
      }
    } catch (error) {
      console.error('Error updating schedules:', error);
    }
  };

  const handleEvents = (events) => {

  };


  const renderEventContent = (eventContent) => {
    return (
      <>
        <b>{eventContent.timeText}</b>
        <i>{eventContent.event.title}</i>
      </>
    );
  };

  const renderSidebarEvent = (event) => {
    return (
      <li key={event.id}>
        <b>{formatDate(event.start!, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
        <i>{event.title}</i>
      </li>
    );
  };

  return (
    <>
      <div className="mx-auto mt-8 max-w-6xl">
        <FullCalendar
          plugins={[dayGridPlugin, listPlugin, timeGridPlugin, interactionPlugin, multiMonthPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today create',
            center: 'title',
            right: 'year,dayGridMonth,timeGridWeek,timeGridDay'
          }}
          footerToolbar={{
            left: 'listMonth,listWeek,list',
            right: 'prev,next'
          }}
          views={{
            listDay: { buttonText: '일정 목록' },
            listWeek: { buttonText: '주간 일정' },
            listMonth: { buttonText: '월간 일정' },
            dayGridMonth: { buttonText: '월' },
            timeGridWeek: { buttonText: '주' },
            timeGridDay: { buttonText: '일' },
            year: {
              type: 'multiMonthYear',
              duration: { years: 1 },
              buttonText: '년'
            }
          }}
          locale={koLocale}
          customButtons={{ // 커스텀 버튼 추가
            create: {
              text: '일정 추가',
              click: CreatOpenModal
            }
          }}
          events={schedules.map(row => ({
            title: row.title,
            start: row.start_date,
            end: row.end_date,
            color: row.color
          }))}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          eventsSet={handleEvents}
          eventDrop={handleEventDrop}
        />
        {/* 등록 모달 시작 */}
        <Transition appear show={createOpen} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={CreatCloseModal}>
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-black/25" />
              </Transition.Child>

              <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>

              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">일정 추가</Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={createSubmit}>
                      <div className="mt-3 mb-3">
                        스케줄 제목 <input onChange={createChange} value={schedule.title} className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" type="text" name="title" id="title" />
                      </div>
                      <div className="mt-3 mb-3">
                        스케줄 내용 <input onChange={createChange} value={schedule.content} className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" type="text" name="content" id="content" />
                      </div>
                      <div className="mt-3 mb-3">
                        시작 날짜 <input onChange={createChange} value={schedule.start_date} className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" type="datetime-local" name="start_date" id="start" />
                      </div>
                      <div className="mt-3 mb-3">
                        종료 날짜 <input onChange={createChange} value={schedule.end_date} className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" type="datetime-local" name="end_date" id="end" />
                      </div>
                      <div className="mt-3 mb-3">
                        배경 색상
                        <select onChange={createChange} value={schedule.color} className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" name="color" id="color">
                          <option value="red">빨강색</option>
                          <option value="orange">주황색</option>
                          <option value="yellow">노랑색</option>
                          <option value="green">초록색</option>
                          <option value="blue">파랑색</option>
                          <option value="indigo">남색</option>
                          <option value="purple">보라색</option>
                        </select>
                      </div>
                      <div className="flex justify-end mt-4">
                        <button
                          type="submit"
                          className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                        >
                          저장
                        </button>
                        <button
                          type="button"
                          onClick={CreatCloseModal}
                          className="rounded-md bg-black/20 ml-3 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                        >
                          취소
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
        {/* 등록 모달 끝 */}

        {/* 디테일 모달 시작 (수정,삭제 포함) */}
        <Transition appear show={detailOpen} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={CreatCloseModal}>
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-black/25" />
              </Transition.Child>

              <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>

              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">일정 내용</Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit}>
                      <div className="sm:col-span-2">
                        <label htmlFor="title" className="block text-sm font-semibold leading-6 text-gray-900">
                          스케줄 제목
                        </label>
                        <div className="mt-2.5">
                          <input
                            type="text"
                            name="title"
                            id="title"
                            autoComplete="organization"
                            defaultValue={schedule.title}
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="content" className="block text-sm font-semibold leading-6 text-gray-900">
                          스케줄 내용
                        </label>
                        <div className="mt-2.5">
                          <input
                            type="text"
                            name="content"
                            id="content"
                            autoComplete="organization"
                            defaultValue={schedule.content}
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="start_date" className="block text-sm font-semibold leading-6 text-gray-900">
                          시작 날짜
                        </label>
                        <div className="mt-2.5">
                          <input
                            type="datetime-local"
                            name="start_date"
                            id="start_date"
                            autoComplete="organization"
                            defaultValue={schedule.start_date}
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="title" className="block text-sm font-semibold leading-6 text-gray-900">
                          종료 날짜
                        </label>
                        <div className="mt-2.5">
                          <input
                            type="datetime-local"
                            name="end_date"
                            id="end_date"
                            autoComplete="organization"
                            defaultValue={schedule.end_date}
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div className="mt-3 mb-3">
                        배경 색상
                        <select onChange={handleChange} value={schedule.color} className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" name="color" id="color">
                          <option value="red">빨강색</option>
                          <option value="orange">주황색</option>
                          <option value="yellow">노랑색</option>
                          <option value="green">초록색</option>
                          <option value="blue">파랑색</option>
                          <option value="indigo">남색</option>
                          <option value="purple">보라색</option>
                        </select>
                      </div>
                      <div className="flex justify-end mt-4">
                        <button
                          type="submit"
                          className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => handleDelete(row.id)}
                          className="rounded-md bg-black/20 ml-3 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                        >
                          삭제
                        </button>
                        <button
                          type="button"
                          onClick={DetailCloseModal}
                          className="rounded-md bg-black/20 ml-3 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                        >
                          닫기
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
        {/* 디테일 모달 끝 */}

      </div>
    </>
  );
}