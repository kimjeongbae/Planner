'use client'
import { useRouter } from "next/navigation";
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { useState } from 'react';

export default function JoinMember() {

    const router = useRouter();
    const [member, setMember] = useState({ username: '', nickname: '', email: '', password: '', password2: '', thumbnail: null });
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('username', member.username);
        formData.append('nickname', member.nickname);
        formData.append('email', member.email);
        formData.append('password', member.password);
        formData.append('password2', member.password2);
        formData.append('thumbnail', member.thumbnail);

        const response = await fetch('http://localhost:8050/api/v1/members/join', {
            method: 'POST',
            credentials: 'include',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.ok) {
            alert("회원가입 성공");
            router.push("/login");
        } else {
            alert("회원가입 실패");
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMember({ ...member, [name]: value });
    }

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        setThumbnail(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setThumbnailPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setThumbnailPreview(null);
        }
    }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        회원가입
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                아이디
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={handleChange}
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    required
                                    className="block w-full rounded-md border-0 pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                닉네임
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={handleChange}
                                    id="nickname"
                                    name="nickname"
                                    type="text"
                                    autoComplete="nickname"
                                    required
                                    className="block w-full rounded-md border-0 pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={handleChange}
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    비밀번호
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    onChange={handleChange}
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    비밀번호 확인
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    onChange={handleChange}
                                    id="password2"
                                    name="password2"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="col-span-full">
                            <label htmlFor="photo" className="block text-sm font-semibold leading-6 text-gray-900">
                                프로필 이미지
                            </label>
                            <div className="mt-2 flex items-center gap-x-3">
                                {thumbnailPreview ? (
                                    <img src={thumbnailPreview} alt="프로필 이미지 미리보기" className="h-12 w-12 rounded-full" />
                                ) : (
                                    <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                                )}
                                <input
                                    onChange={handleThumbnailChange}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    id="thumbnail"
                                    name="thumbnail"
                                />
                                <label htmlFor="thumbnail" className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer">
                                    선택
                                </label>
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500"
                            >
                                회원가입
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
