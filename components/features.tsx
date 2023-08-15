'use client'

import { useState, useRef, useEffect } from 'react'
import { Transition } from '@headlessui/react'
import Image from 'next/image'

export default function Features() {
  
  const [tab, setTab] = useState<number>(1)
  const [enteredText, setEnteredText] = useState('') // State to store entered text
  const [displayText, setDisplayText] = useState('') // State to store display text

  const tabs = useRef<HTMLDivElement>(null)

  const heightFix = () => {
    if (tabs.current && tabs.current.parentElement) tabs.current.parentElement.style.height = `${tabs.current.clientHeight}px`
  }

  const fetchData = async (enteredText: string) => {

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "query": enteredText
        })
      })
      if (!response.ok && response.status === 429) {
        setDisplayText(
          "ERROR: Too Many Requests, please try again after a few minutes. Current Usage Limits: 2 RPM, 5 RPH, 50 RPD"
        )
      }
      else {
        const data = await response.json()
        setDisplayText(data['answer'])
      }
    }
    catch (error) {
      console.log(error)
      setDisplayText('')
    }
  }

  useEffect(() => {
    heightFix()
  }, []) 

  return (
    <section className="relative">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-6 md:pt-20">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-8">
            <h1 className="text-5xl text-white md:text-1xl font-mono font-bold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">ThinkAi</h1>
            <h3 className='h3 text-white md:text-1xl font-mono mb-4'> Your place for all things Philosophy</h3>
            <p className='font-sans text-xs text-white'>Disclaimer: Nomí has been trained on articles published and owned by Stanford Encyclopedia of Philosphy [https://plato.stanford.edu]</p>
          </div>

          {/* Section content */}
          <div className="md:grid md:grid-cols-12 md:gap-6">

            {/* Content */}
            <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt" data-aos="fade-right">
              
              {/* Tabs buttons */}
              <div className="mb-8 md:mb-0">
                <a
                  className={`flex items-center text-lg p-5 rounded border transition duration-100 ease-in-out mb-3 ${tab !== 4 ? 'bg-white shadow-md border-gray-200 hover:shadow-lg' : 'bg-white border-transparent'}`}
                  href="#0"
                  onClick={(e) => { e.preventDefault(); setTab(1); }}
                >
                  <div className="leading-snug tracking-tight mb-1">
                    <h4 className="h4 mb-3 font-mono text-black">Hi, this is Nomí, ask me a question on Philosophy!</h4>
                    <div className="flex flex-wrap -mx-3">
                      <div className="w-full px-3">
                        <textarea className="peer min-h-[100px] w-full resize-none rounded border font-mono text-gray-800" placeholder="Enter a Question to ask Nomí" 
                          required value={enteredText} onChange={(e) => {
                            setDisplayText('');
                            setEnteredText(e.target.value);
                          }}
                        />
                        <p className="text-white">blah</p>
                        <button className="btn-sm text-white font-mono bg-black hover:bg-gray-700 shadow" 
                          onClick={() => {
                            setDisplayText('Generating Response...'); 
                            fetchData(enteredText);
                            setEnteredText('');
                          }} >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </a>

                <a
                  className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${tab !== 2 ? 'bg-white shadow-md border-gray-200 hover:shadow-lg' : 'bg-gray-300 border-transparent'}`}
                  href="#0"
                  onClick={(e) => { e.preventDefault(); setTab(2); }}
                >
                  <div>
                    <div className="font-mono text-base leading-snug tracking-tight mb-1">Example: What is God?</div>
                  </div>
                </a>
                <a
                  className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${tab !== 3 ? 'bg-white shadow-md border-gray-200 hover:shadow-lg' : 'bg-gray-300 border-transparent'}`}
                  href="#0"
                  onClick={(e) => { e.preventDefault(); setTab(3); }}
                >
                  <div>
                    <div className="font-mono text-base leading-snug tracking-tight mb-1">Example: If someone has less material wealth than me, does this automatically make him unhappy? ?</div>
                  </div>
                </a>
                <a
                  className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${tab !== 1 ? 'bg-white shadow-md border-gray-200 hover:shadow-lg' : 'bg-gray-300 border-transparent'}`}
                  href="#0"
                  onClick={(e) => { e.preventDefault(); setTab(4); }}
                >
                  <div>
                    <div className="font-mono text-base leading-snug tracking-tight mb-1">Example: Helping others makes me feel good, does this count as a selfless act or selfish act?</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Tabs items */}
            <div className="max-w-xl h-[500px] md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1">
              <div className="transition-all">
                <div className="relative flex flex-col text-center lg:text-right" data-aos="zoom-y-out" ref={tabs}>
                  {/* Item 1 */}
                  <Transition
                    show={tab === 1}
                    appear={true}
                    className="w-full"
                    enter="transition ease-in-out duration-700 transform order-first"
                    enterFrom="opacity-0 translate-y-16"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in-out duration-300 transform absolute"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 -translate-y-16"
                    beforeEnter={() => heightFix()}
                    unmount={false}                     
                  >
                    <div className="relative flex-col pl-5">
                      <div className="relative flex-col rounded bg-gradient-to-r from-slate-500 to-slate-600">
                        <blockquote className="text-white text-l font-medium mb-4 font-mono text-justify px-4 py-4">
                          Response generated from Nomí:
                        </blockquote>
                        <div className="h-[calc(100vh-5.75rem)] sticky top-16 overflow-y-scroll overscroll-contain rounded-b bg-white display-inline font-small text-sm font-mono text-left px-4 py-4">  
                          <div className="h-[1000px]">
                            {displayText}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Transition>
                  {/* Item 2 */}
                  <Transition
                    show={tab === 2}
                    appear={true}
                    className="w-full"
                    enter="transition ease-in-out duration-700 transform order-first"
                    enterFrom="opacity-0 translate-y-16"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in-out duration-300 transform absolute"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 -translate-y-16"
                    beforeEnter={() => heightFix()}
                    unmount={false}                     
                  >
                    <div className="relative flex-col pl-5">
                      <div className="relative flex-col rounded bg-gradient-to-r from-slate-500 to-slate-600">
                        <blockquote className="text-white text-l font-medium mb-4 font-mono text-left px-4 py-4">
                          Response generated from Nomí:
                        </blockquote>
                        <div className="rounded-b bg-white display-inline font-small text-sm font-mono text-left px-4 py-4">
                          According to articles published by Stanford Encyclopedia of Philosophy, the concept of God is discussed in relation to various philosophical perspectives. Theism is the view that God is an omniscient, omnipotent, and omnibenevolent being who created the world. The question of God's existence is often debated, and arguments such as the argument from evil are presented to challenge the idea of an all-good and all-powerful God. Different theories and interpretations of the Trinity are also explored, including the concept of one-self theories and three-self theories. Overall, the nature and attributes of God are complex and subject to philosophical inquiry and debate.
                        </div>
                      </div>
                    </div>
                  </Transition>
                  {/* Item 3 */}
                  <Transition
                    show={tab === 3}
                    appear={true}
                    className="w-full"
                    enter="transition ease-in-out duration-700 transform order-first"
                    enterFrom="opacity-0 translate-y-16"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in-out duration-300 transform absolute"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 -translate-y-16"
                    beforeEnter={() => heightFix()}
                    unmount={false}                     
                  >
                    <div className="relative flex-col pl-5">
                      <div className="relative flex-col rounded bg-gradient-to-r from-slate-500 to-slate-600">
                        <blockquote className="text-white text-l font-medium mb-4 font-mono text-left px-4 py-4">
                          Response generated from Nomí:
                        </blockquote>
                        <div className="rounded-b bg-white display-inline font-small text-sm font-mono text-left px-4 py-4">
                          According to articles published by Stanford Encyclopedia of Philosophy, helping others can make you feel good, but whether it's a selfless or selfish act depends on the underlying motivation. Altruistic acts involve doing good for others without seeking personal gain, while selfish acts are driven by self-interest. The distinction between these motives is important. Some argue that all human actions are ultimately motivated by self-interest, but this view doesn't fit all cases of helping behavior. Empathy plays a role – when you genuinely feel for others and help them without expecting something in return, it leans more towards selflessness. It's a complex debate, considering factors like empathy, social norms, and personal values.
                        </div>
                      </div>
                    </div>
                  </Transition>
                  {/* Item 4 */}
                  <Transition
                    show={tab === 4}
                    appear={true}
                    className="w-full"
                    enter="transition ease-in-out duration-700 transform order-first"
                    enterFrom="opacity-0 translate-y-16"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in-out duration-300 transform absolute"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 -translate-y-16"
                    beforeEnter={() => heightFix()}
                    unmount={false}                     
                  >
                    <div className="relative flex-col pl-5">
                      <div className="relative flex-col rounded bg-gradient-to-r from-slate-500 to-slate-600">
                        <blockquote className="text-white text-l font-medium mb-4 font-mono text-justify px-4 py-4">
                          Response generated from Nomí:
                        </blockquote>
                        <div className="rounded-b bg-white display-inline font-small text-sm font-mono text-left px-4 py-4">
                          According to articles published by Stanford Encyclopedia of Philosophy, having less material wealth than someone else does not automatically make a person unhappy. While envy may arise when someone does not possess the same material goods as another person, it does not necessarily mean that the person is unhappy. Happiness is often seen as a short-lived state and well-being is a kind of value that is separate from material wealth. The concept of well-being challenges the notion that sacrificing present comfort for future health is always a sacrifice. Therefore, the level of material wealth does not determine a person's happiness.
                        </div>
                      </div>
                    </div>
                  </Transition>
                </div>
              </div>
            </div>
          </div>
          <footer className="fixed inset-x-0 bottom-0 z-50 bg-navy-100 h-6">
          </footer>
        </div>
      </div>
    </section>
  )
}