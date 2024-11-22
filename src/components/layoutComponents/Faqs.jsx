import React from "react";
import { Accordion } from "flowbite-react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function Faqs({ faqs }) {
  return (
    <section className=" ">
      <h1 className="font-bold text-2xl text-center mb-4 md:mb-6">
        Frequently Asked Questions
      </h1>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {faqs.map((faq, index) => (
          <section key={index} className="px-1 md:px-2 mb-4 md:mb-6">
            <section className="rounded-xl  mx-auto ">
              <Accordion
                collapseAll
                className="text-sm w-full shadow-md  h-full p-0 rounded-xl border-none hover-border-none  bg-gray-100  hover:bg-gray-100 "
              >
                <Accordion.Panel className="bg-gray-100  text-black h-15 border-none hover-border-none">
                  <Accordion.Title className="border-blue-200 focus:ring-transparent border-none hover-border-none font-semibold text-blue-900 text-sm  md:text-base">
                    {faq.question}
                  </Accordion.Title>
                  <Accordion.Content className="bg-gray-100 border-none hover-border-none pt-0 pb-2">
                    <p className="mb-2 text-gray-500 dark:text-gray-400 text-xs md:text-sm">
                      {faq.answer}
                    </p>
                  </Accordion.Content>
                </Accordion.Panel>
              </Accordion>
            </section>
          </section>
        ))}
      </section>
    </section>
  );
}
