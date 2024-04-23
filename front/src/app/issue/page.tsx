'use client'

import React, { useEffect, useRef, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { CalendarIcon, DocumentTextIcon, DocumentPlusIcon, ChevronDownIcon } from '@heroicons/react/20/solid';

const YourComponent = ({ issues, onDragEnd }) => {
    const todoIssues = issues.filter(issue => issue.state === 'Todo');
    const fixedIssues = issues.filter(issue => issue.state === 'Fixed');
    const doneIssues = issues.filter(issue => issue.state === 'Done');

    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="grid grid-cols-3 gap-4">
                    {/* Todo */}
                    <Droppable droppableId="todo">
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="flex flex-col gap-3 rounded-xl bg-gray-200 p-4 ring-1 ring-gray-300 transition-shadow dark:bg-[#000000]"
                            >
                                <h2 className="text-lg font-bold">Todo</h2>
                                {todoIssues.map((issue, index) => (
                                    <Draggable key={issue.id.toString()} draggableId={issue.id.toString()} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="bg-white p-4 rounded-lg shadow transition-shadow dark:bg-[#121212]"
                                            >
                                                <div>
                                                    <h3 className="text-base font-semibold">{issue.title}</h3>
                                                    <p className="text-sm text-gray-500">Make the world beautiful</p>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    {/* Fixed */}
                    <Droppable droppableId="fixed">
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="flex flex-col gap-3 rounded-xl bg-gray-200 p-4 ring-1 ring-gray-300 transition-shadow dark:bg-[#000000]"
                            >
                                <h2 className="text-lg font-bold">Fixed</h2>
                                {fixedIssues.map((issue, index) => (
                                    <Draggable key={issue.id.toString()} draggableId={issue.id.toString()} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="bg-white p-4 rounded-lg shadow transition-shadow dark:bg-[#121212]"
                                            >
                                                <div>
                                                    <h3 className="text-base font-semibold">{issue.title}</h3>
                                                    <p className="text-sm text-gray-500">Make the world beautiful</p>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    {/* Done */}
                    <Droppable droppableId="done">
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="flex flex-col gap-3 rounded-xl bg-gray-200 p-4 ring-1 ring-gray-300 transition-shadow dark:bg-[#000000]"
                            >
                                <h2 className="text-lg font-bold">Done</h2>
                                {doneIssues.map((issue, index) => (
                                    <Draggable key={issue.id.toString()} draggableId={issue.id.toString()} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="bg-white p-4 rounded-lg shadow transition-shadow dark:bg-[#121212]"
                                            >
                                                <div>
                                                    <h3 className="text-base font-semibold">{issue.title}</h3>
                                                    <p className="text-sm text-gray-500">Make the world beautiful</p>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            </DragDropContext>
        </>
    )
}

const Issue = () => {


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

    const onDragEnd = (result) => {
        // Your drag end logic here
    }

    return (
        <YourComponent issues={issues} onDragEnd={onDragEnd} />
    );
};

export default Issue;
