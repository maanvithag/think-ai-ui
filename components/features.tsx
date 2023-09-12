'use client'

import { useState, useRef, useEffect } from 'react'
import { Transition } from '@headlessui/react'

export default function Features() {
  
  const [tab, setTab] = useState<number>(1)

  const [enteredText, setEnteredText] = useState('') // State to store entered text
  const [displayText, setDisplayText] = useState('') // State to store display text

  const queryConstText = 'Response generated from Nomí:'
  const [queryText, setQueryText] = useState(queryConstText) // State to store user query
  
  const refConstText = [{'link': '', 'title': ''}]
  const [refText, setRefText] = useState(refConstText) // State to store references text
  const refMetaConstText = {'ref': '', 'publication': ''}
  const [refMetaText, setRefMetaText] = useState(refMetaConstText) // State to store references meta text

  const ex1 = {
    "query": "Am I a Human?",
    "answer": "According to articles published by Stanford Encyclopedia of Philosophy, the concept of personal identity is complex and there is no consensus on what defines a person. Some argue that personal identity is based on both mental and physical continuity, while others suggest that it is determined by causal dependence. Additionally, the question of what matters in identity is also debated, with some proposing that being a human person is based on being an organism. However, being an organism does not necessarily mean being a human person. Therefore, whether or not you are a human depends on how personal identity is defined, and there is no definitive answer provided in the extract.",
    "references": [
      {"link": "https://plato.stanford.edu/entries/identity-personal/", "title": "Personal Identity"},
      {"link": "https://plato.stanford.edu/entries/biology-individual/", "title": "Biological Individuals"},
      {"link": "https://plato.stanford.edu/entries/citizenship/", "title": "Citizenship"}
    ]
  }

  const ex2 = {
    "query": "How does one become a “good person”?",
    "answer": "According to articles published by Stanford Encyclopedia of Philosophy, becoming a \"good person\" involves various aspects. Hume defines a \"good person\" as someone who possesses virtues such as goodwill, generosity, and love. Kant argues that everyone has a duty to be helpful to others. Some philosophers believe that beneficent actions are virtuous and commendable. Gert's theory suggests that the goal of morality is to minimize harm rather than promote good. Singer argues for striving to donate a percentage of income. Murphy proposes fixing limits for large-scale problems as cooperative projects. The concept of being a \"good person\" is multifaceted and encompasses different perspectives and theories in philosophy.",
    "references": [
      {"link": "https://plato.stanford.edu/entries/principle-beneficence/", "title": "The Principle of Beneficence in Applied Ethics"},
      {"link": "https://plato.stanford.edu/entries/ethics-indian-buddhism/", "title": "Ethics in Indian and Tibetan Buddhism"},
      {"link": "https://plato.stanford.edu/entries/reconciliation/","title": "Reconciliation"}
    ]
  }

  const ex3 = {
    "query": "Is morality developed within a culture, or is it intrinsic?",
    "answer": "According to articles published by Stanford Encyclopedia of Philosophy, morality is understood as a set of social rules, principles, and norms that guide people's conduct. Moral philosophers do not believe that the results of their reflective activities are limited to their own societies. In African ethics, morality is considered intrinsic to the conception of a person, and character is acquired through performing good actions. Some scholars argue that there is a connection between religion and morality in African ethics, but the sources of African morality are independent of religious prescriptions. On the other hand, moral relativism, which gained prominence in the twentieth century, suggests that moral judgments are relative to the moral code of a society. Proponents of moral relativism focus on the distinctive features of morality and reject general relativism. There is ongoing debate about whether morality is developed within a culture or if it is intrinsic.    ",
    "references": [
      {"link": "https://plato.stanford.edu/entries/african-ethics/", "title": "African Ethics"},
      {"link": "https://plato.stanford.edu/entries/moral-relativism/", "title": "Moral Relativism"},
      {"link": "https://plato.stanford.edu/entries/moral-conventional/", "title": "The Moral/Conventional Distinction"}
    ]
  }

  const tabs = useRef<HTMLDivElement>(null)

  const heightFix = () => {
    if (tabs.current && tabs.current.parentElement) tabs.current.parentElement.style.height = `${tabs.current.clientHeight}px`
  }

  const fetchData = async (enteredText: string) => {

    try {
      // const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/query`, {
      const response = await fetch(`https://www.thinkaiapi.store/query`, {
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
        setRefMetaText({'ref': 'References:', 'publication': ', The Stanford Encyclopedia of Philosophy'})
        setRefText(data['references'])
      }
    }
    catch (error) {
      console.log(error)
      setDisplayText('')
      setQueryText(queryConstText)
      setRefText(refConstText)
      setRefMetaText(refMetaConstText)
    }
  }

  useEffect(() => {
    heightFix()
  }, []) 

  return (
    <section className="relative">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-4 md:pb-8">
            <h3 className="h3 text-white md:text-1xl leading-tighter tracking-tighter mb-2" data-aos="zoom-y-out">ThinkAi : a place for all talk philosophy</h3>
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
                    <p className="mb-3 font-mono text-base text-black">Hi, this is Nomí, ask me a question on Philosophy!</p>
                    <div className="flex flex-wrap -mx-3">
                      <div className="w-full px-3">
                        <textarea className="peer min-h-[100px] w-full resize-none rounded border font-mono text-base text-gray-800" placeholder="Enter a Question to ask Nomí" 
                          required value={enteredText} onChange={(e) => {
                            setDisplayText('');
                            setQueryText(queryConstText);
                            setRefText(refConstText);
                            setRefMetaText(refMetaConstText);
                            setEnteredText(e.target.value);
                          }}
                        />
                        <p className="text-white">blah</p>
                        <button className="btn-sm text-white bg-black hover:bg-gray-700 shadow" 
                          onClick={() => {
                            setQueryText('Question: ' + enteredText);
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
                    <div className="font-mono text-base leading-snug tracking-tight mb-1">Example: {ex1.query}</div>
                  </div>
                </a>
                <a
                  className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${tab !== 3 ? 'bg-white shadow-md border-gray-200 hover:shadow-lg' : 'bg-gray-300 border-transparent'}`}
                  href="#0"
                  onClick={(e) => { e.preventDefault(); setTab(3); }}
                >
                  <div>
                    <div className="font-mono text-base leading-snug tracking-tight mb-1">Example: {ex2.query}</div>
                  </div>
                </a>
                <a
                  className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${tab !== 4 ? 'bg-white shadow-md border-gray-200 hover:shadow-lg' : 'bg-gray-300 border-transparent'}`}
                  href="#0"
                  onClick={(e) => { e.preventDefault(); setTab(4); }}
                >
                  <div>
                    <div className="font-mono text-base leading-snug tracking-tight mb-1">Example: {ex3.query}</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Tabs items */}
            <div className="max-w-xl h-[500px] md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 mb-8 md:mb-0 md:order-1">
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
                        <blockquote className="text-white text-sm font-medium mb-4 font-mono text-left px-4 py-2">
                          {queryText}
                        </blockquote>
                        <div className="h-[calc(58vh-5.75rem)] sticky top-16 overflow-y-scroll overscroll-contain rounded-b bg-white display-inline font-small text-sm font-mono text-left px-4 py-4">  
                          <div className="h-[800px]">
                            {displayText}
                            <br/> <br/>
                            <p className="font-mono text-rose-600">
                              {refMetaText.ref} 
                            </p>
                            <ul>
                              {
                                refText.map((val, idx) => 
                                <li className="font-sans">
                                <a key={idx} href={val['link']} className="font-sans text-blue-600 underline">
                                  {val['title']}
                                </a>{refMetaText.publication}
                                </li>
                                )
                              }
                            </ul>
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
                      <blockquote className="text-white text-base font-medium mb-4 font-mono text-left px-4 py-4">
                        {queryConstText}
                      </blockquote>
                      <div className="h-[calc(58vh-5.75rem)] sticky top-16 overflow-y-scroll overscroll-contain rounded-b bg-white display-inline font-small text-sm font-mono text-left px-4 py-4">  
                        <div className="h-[600px]">
                          {ex1.answer}
                        <br/> <br/>
                        <p className="font-mono text-rose-600">
                          References: 
                        </p>
                        <ul>
                          {
                            ex1.references.map((val, idx) => 
                            <li className="font-sans">
                            <a key={idx} href={val['link']} className="font-sans text-blue-600 underline">
                              {val['title']}
                            </a>, The Stanford Encyclopedia of Philosophy
                            </li>
                            )
                          }
                        </ul>
                        </div>
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
                      <blockquote className="text-white text-base font-medium mb-4 font-mono text-left px-4 py-4">
                        {queryConstText}
                      </blockquote>
                      <div className="h-[calc(58vh-5.75rem)] sticky top-16 overflow-y-scroll overscroll-contain rounded-b bg-white display-inline font-small text-sm font-mono text-left px-4 py-4">  
                        <div className="h-[600px]">
                          {ex2.answer}
                        <br/> <br/>
                        <p className="font-mono text-rose-600">
                          References: 
                        </p>
                        <ul>
                          {
                            ex2.references.map((val, idx) => 
                            <li className="font-sans">
                            <a key={idx} href={val['link']} className="font-sans text-blue-600 underline">
                              {val['title']}
                            </a>, The Stanford Encyclopedia of Philosophy
                            </li>
                            )
                          }
                        </ul>
                        </div>
                        <div className="">
                        </div>
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
                      <blockquote className="text-white text-base font-medium mb-4 font-mono text-left px-4 py-4">
                        {queryConstText}
                      </blockquote>
                      <div className="h-[calc(58vh-5.75rem)] sticky top-16 overflow-y-scroll overscroll-contain rounded-b bg-white display-inline font-small text-sm font-mono text-left px-4 py-4">  
                        <div className="h-[600px]">
                          {ex3.answer}
                        <br/> <br/>
                        <p className="font-mono text-rose-600">
                          References: 
                        </p>
                        <ul>
                          {
                            ex3.references.map((val, idx) => 
                            <li className="font-sans">
                            <a key={idx} href={val['link']} className="font-sans text-blue-600 underline">
                              {val['title']}
                            </a>, The Stanford Encyclopedia of Philosophy
                            </li>
                            )
                          }
                        </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  </Transition>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}