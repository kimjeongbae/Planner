'use client'

export default function Home() {

  return (
    <>
      <div className="mx-auto max-w-2xl">
        <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              사용방법 보러 가기.{' '}
              <a href="#" className="font-semibold text-indigo-600">
                <span className="absolute inset-0" aria-hidden="true" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              PlanifyHub
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              PlanifyHub 홈페이지에 오신 것을 진심으로 환영합니다.
            </p>
            <p className="text-lg leading-8 text-gray-600">
              여기서는 간편하고 효율적으로 일정을 관리할 수 있는
            </p>
            <p className="text-lg leading-8 text-gray-600">
              다양한 기능과 도구를 제공합니다. 지금 시작하여
            </p>
            <p className="text-lg leading-8 text-gray-600">
              생산성을 높이고 시간을 효율적으로 활용하세요!
            </p>

            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/calendar"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                시작하기
              </a>
              <a href="/member/login" className="text-sm font-semibold leading-6 text-gray-900">
                로그인 <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
