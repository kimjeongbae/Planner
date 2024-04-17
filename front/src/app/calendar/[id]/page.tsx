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

export default function Create() {
  const [schedules, setSchedules] = useState([]);
  const [schedule, setSchedule] = useState({ title: '', content: '', start_date: '', end_date: '', color: '' });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = () => {
    fetch("http://localhost:8050/api/v1/Schedules")
      .then(result => result.json())
      .then(result => setSchedules(result.data.schedules))
      .catch(error => console.error('Error fetching schedules:', error));
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8050/api/v1/Schedules/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        alert("스케줄 삭제 완료");
        fetchSchedules();
      } else {
        alert("스케줄 삭제 실패");
      }
    } catch (error) {
      console.error('Error deleting schedule:', error);
    }
  };

  const handleSubmit = async (e) => {
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
        closeModal();
      } else {
        alert("스케줄 등록 실패");
      }
    } catch (error) {
      console.error('Error creating schedule:', error);
    }
  };

  const handleEventDrop = async (dropInfo) => {
    const { event } = dropInfo;
    const updatedEvent = {
      title: event.title,
      start_date: event.start,
      end_date: event.end,
      color: event.color
    };
  
    try {
      const response = await fetch(`http://localhost:8050/api/v1/Schedules/${event.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedEvent)
      });
  
      if (response.ok) {
        alert("스케줄 변경 완료");
        fetchSchedules(); // 변경된 스케줄 다시 불러오기
      } else {
        alert("스케줄 변경 실패");
      }
    } catch (error) {
      console.error('Error updating schedules:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSchedule({ ...schedule, [name]: value });
  };

  const closeModal = () => {
    setIsOpen(false);
    setSchedule({ title: '', content: '', start_date: '', end_date: '', color: '' });
  };

  const openModal = () => {
    setIsOpen(true);
  };

  // FullCalendar의 콜백 함수들 정의
  const handleDateSelect = (selectInfo) => {
    let title = prompt('스케줄을 입력하세요');
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  };

  const handleEventClick = (clickInfo) => {
    if (confirm(`'${clickInfo.event.title}' 스케줄을 삭제 하시겠습니까?`)) {
      clickInfo.event.remove();
    }
  };

  const handleEvents = (events) => {
    // 이 함수에서는 FullCalendar의 이벤트를 처리할 수 있습니다.
    // 필요한 경우 구현해주세요.
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
              click: openModal
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

        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
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
                    <form onSubmit={handleSubmit}>
                      <div className="mt-3 mb-3">
                        스케줄 제목 <input onChange={handleChange} value={schedule.title} className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" type="text" name="title" id="title" />
                      </div>
                      <div className="mt-3 mb-3">
                        스케줄 내용 <input onChange={handleChange} value={schedule.content} className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" type="text" name="content" id="content" />
                      </div>
                      <div className="mt-3 mb-3">
                        시작 시간 <input onChange={handleChange} value={schedule.start_date} className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" type="datetime-local" name="start_date" id="start" />
                      </div>
                      <div className="mt-3 mb-3">
                        종료 시간 <input onChange={handleChange} value={schedule.end_date} className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" type="datetime-local" name="end_date" id="end" />
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
                          저장
                        </button>
                        <button
                          type="button"
                          onClick={closeModal}
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
      </div>
    </>
  );
}