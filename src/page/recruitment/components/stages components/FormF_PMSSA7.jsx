
import { DatepickerComponent, InputText, TextArea, YesNoInput } from '../../../../components/layoutComponents'
import { useState,useEffect } from 'react'

export default function FormF_PMSSA7() {
    const [valueForm,setValueForm] = useState({})

useEffect(()=>{
    setValueForm({
        resume:"",
        experience:"",

    })
},[])

const changeData = (e) => {
  let updatedData = {
    ...valueForm,
    [e.target.name]: e.target.value,
  };

  if (e.target.name === "newquestion10" && e.target.value === false) {
    updatedData.newquestion10Why = "";
  }
  if (e.target.name === "newquestion15" && e.target.value === false) {
    updatedData.newquestion15Why = "";
  }
  if (e.target.name === "newquestion27" && e.target.value === "") {
    updatedData.employer1 = ""
    updatedData.employerEmail1 = ""
    updatedData.employerPhone1 = ""
    updatedData.employer2 = ""
    updatedData.employerEmail2 = ""
    updatedData.employerPhone2 = ""
  }
    setValueForm(updatedData);
  };

  const mostrar =(()=>{
    console.log(valueForm)
  })
    
  return (
    <div className=''>
        <button onClick={mostrar}>mostrar </button>
     <form className='pt-5 '>
  <fieldset className='grid grid-cols-1 md:grid-cols-2 gap-6'>
    <legend className='hidden'>Resume and Experience</legend>
    <TextArea title="Resume" id="resume" value={valueForm.resume || ""} onChange={changeData} name="resume"/>
    <TextArea title="Previous Experience" id="experience" value={valueForm.experience || ""} onChange={changeData} name="experience" />
  </fieldset>
  <fieldset className='mt-6'>
    <TextArea title="1. What can you tell us about your experience working on board?" id="newquestion1" value={valueForm.newquestion1 || ""} onChange={changeData} name="newquestion1" />
  </fieldset>
  <fieldset className='mt-6'>
    <TextArea title="2.	How many years of experience do you have working in Hotel, Restaurant, Bar or as a sailor?" id="newquestion2" value={valueForm.newquestion2 || ""} onChange={changeData} name="newquestion2" />
  </fieldset>
  <fieldset className='mt-6'>
    <TextArea title="3.	Let's talk a little bit about you. (optional)." id="newquestion3" value={valueForm.newquestion3 || ""} onChange={changeData} name="newquestion3" />
  </fieldset>
  <fieldset className='mt-6'>
    <label htmlFor="newquestion4" className="text-gray-500">4.	Are you currently employed?</label>
    <YesNoInput classname='justify-left' defaultChecked={valueForm.newquestion4 || ""} onChange={changeData} name="newquestion4" />
  </fieldset>
  <fieldset className='mt-6'>
    
    <TextArea title="5.	If your answer is no, why did you come out of the last job?" id="newquestion5" value={valueForm.newquestion5 || ""} onChange={changeData} name="newquestion5" />
  </fieldset>
  <fieldset className='mt-6'>
    
    <TextArea title="6.	Why do you want to work on a cruise ship? (optional)" id="newquestion6" value={valueForm.newquestion6 || ""} onChange={changeData} name="newquestion6" />
  </fieldset>
  <fieldset className='mt-6'>
    
    <TextArea title="7.	Would you be willing to share the cabin with other staff who might be of other nationalities?" id="newquestion7" value={valueForm.newquestion7 || ""} onChange={changeData} name="newquestion7" />
  </fieldset>
  <fieldset className='mt-6'>
    
    <TextArea title="8.	Are you currently studying? (optional)" id="newquestion8" onChange={changeData} value={valueForm.newquestion8 || ""} name="newquestion8" />
  </fieldset>
  <fieldset className='mt-6'>
    
    <TextArea title="9.	In the case of acquiring the job, can you lift up to 50 pounds of weight?" id="newquestion9" value={valueForm.newquestion9 || ""} />
  </fieldset>
  <fieldset className='mt-6'>
    
    <label htmlFor="newquestion10" className="text-gray-500">10.	Have you been arrested (or have a previous / currently legal problem subject to criminal prosecution?</label>
    <YesNoInput classname='justify-left' onChange={changeData} name="newquestion10" defaultChecked={valueForm.newquestion10 || ""}/>
  </fieldset>
    
    {
      valueForm.newquestion10 & valueForm.newquestion10 === true?
      <fieldset className='mt-6'>
    <TextArea title="Why?" id="newquestion10Why" onChange={changeData} value={valueForm.newquestion10Why || ""} name="newquestion10Why" />
  </fieldset>: null
    }

  <fieldset className='mt-6'>
    
    <label htmlFor="newquestion11" className="text-gray-500">11.	Have you ever applied for an US VISA C1D?</label>
    <YesNoInput classname='justify-left' onChange={changeData} name="newquestion11" defaultChecked={valueForm.newquestion11 || ""}/>
  </fieldset>
  <fieldset className='mt-6'>
    
    <label htmlFor="newquestion12" className="text-gray-500">12.	If your answer is yes: Has it been denied?</label>
    <YesNoInput classname='justify-left' onChange={changeData} name="newquestion12" defaultChecked={valueForm.newquestion12 || ""}/>
  </fieldset>
  <fieldset className='mt-6'>
    
    <label htmlFor="newquestion13" className="text-gray-500">13.	Have you ever been deported or have a VISA Cancelled?</label>
    <YesNoInput classname='justify-left' onChange={changeData} name="newquestion13" defaultChecked={valueForm.newquestion13 || ""}/>
  </fieldset>
  <fieldset className='mt-6'>
    
    <label htmlFor="newquestion14" className="text-gray-500">14.	Have you ever studied or worked in the United States?</label>
    <YesNoInput classname='justify-left' onChange={changeData} name="newquestion14" defaultChecked={valueForm.newquestion14 || ""}/>
  </fieldset>
  <fieldset className='mt-6'>
    
    <label htmlFor="newquestion15" className="text-gray-500">15.	Do you have any physical limitations, preventing you for being able to perform the position applying for?</label>
    <YesNoInput classname='justify-left' onChange={changeData} name="newquestion15" defaultChecked={valueForm.newquestion15 || ""}/>
  </fieldset>
  {valueForm.newquestion15 & (valueForm.newquestion15 === true) ? (
          <fieldset className="mt-6">
            <TextArea
              title="Why?"
              id="newquestion15Why"
              onChange={changeData}
              value={valueForm.newquestion15Why || ""}
              name="newquestion15Why"
            />
          </fieldset>
        ) : null}
  <fieldset className='mt-6'>
    
    <label htmlFor="newquestion16" className="text-gray-500">16.	Have you suffered from any accident or serious Illness causing a medical condition that requires some sort of treatment to keep you under controlled medication?</label>
    <YesNoInput classname='justify-left' onChange={changeData} name="newquestion16" defaultChecked={valueForm.newquestion16 || ""}/>
  </fieldset>
  <fieldset className='mt-6'>
    
    <label htmlFor="newquestion17" className="text-gray-500">17.	Do you use any kind of illegal drugs?</label>
    <YesNoInput classname='justify-left' onChange={changeData} name="newquestion17" defaultChecked={valueForm.newquestion17 || ""}/>
  </fieldset>
  <fieldset className='mt-6'>
    
    <label htmlFor="newquestion18" className="text-gray-500">18.	Would you be willing to work on board the ship, for a period of 6 to 8 months, away from your family and friends, working 10 – 12 hours a day, 7 days a week?</label>
    <YesNoInput classname='justify-left' onChange={changeData} name="newquestion18" defaultChecked={valueForm.newquestion18 || ""}/>
  </fieldset>
  <fieldset className='mt-6'>
    
    <TextArea title="19.	If I ask the person responsible in your previous job, what could he or she tell me about your work habits, punctuality, and reason for your departure? (optional)" id="newquestion19" onChange={changeData} value={valueForm.newquestion19 || ""} name="newquestion19" />
  </fieldset>
  <fieldset className='mt-6'>
    
    <TextArea title="20.	What qualities do you have for the position you are applying for? (optional)" id="newquestion20" value={valueForm.newquestion20 || ""} onChange={changeData} name="newquestion20" />
  </fieldset>
  <fieldset className='mt-6'>
    
    <TextArea title="21.	Where would you like you be in your career five years from now? (optional)" id="newquestion21" value={valueForm.newquestion21 || ""} onChange={changeData} name="newquestion21" />
  </fieldset>
  <fieldset className='mt-6'>
    
    <TextArea title="22.	What do you know about our company and what we do? (optional)" id="newquestion22" value={valueForm.newquestion22 || ""} onChange={changeData} name="newquestion22" />
  </fieldset>
  <fieldset className='mt-6'>
    
    <TextArea title="23.	How would you motivate your employees and foster teamwork? (optional)" id="newquestion23" value={valueForm.newquestion23 || ""} onChange={changeData} name="newquestion23" />
  </fieldset>
  <fieldset className='mt-6'>
    
    <TextArea title="24.	What is your major weakness and your biggest strength? (optional)" id="newquestion24" value={valueForm.newquestion24 || ""} onChange={changeData} name="newquestion24" />
  </fieldset>
  <fieldset className='mt-6'>
    <TextArea title="25.	How do you think your previous work experience will benefit you in these positions? (optional)" id="newquestion25" onChange={changeData}  value={valueForm.newquestion25 || ""} name="newquestion25"/>
  </fieldset>
  <fieldset className='mt-6'>
    <TextArea title="26.	Why did you choose this particular position? (optional)" id="newquestion26" value={valueForm.newquestion26 || ""} onChange={changeData} name="newquestion26"/>
  </fieldset>
  <fieldset className='mt-6'>
    <TextArea title="27.	Why do you have gaps in your employment history? (If apply it)" id="newquestion27" value={valueForm.newquestion27 || ""} onChange={changeData} name="newquestion27" />
  </fieldset>
  { valueForm.newquestion27 != "" && valueForm.newquestion27 != null? 
    <fieldset className='mt-6 '>
    <legend className='underline'>EMPLOYER 1</legend>
  <InputText labelinput='Name' onChange={changeData} name="employer1" defaultChecked={valueForm.employer1 || ""} />
  <InputText labelinput='Phone' onChange={changeData} name="employerPhone1" defaultChecked={valueForm.employerPhone1 || ""} />
  <InputText labelinput='Email' onChange={changeData} name="employerEmail1"  defaultChecked={valueForm.employerEmail1 || ""} />
  <legend className='underline'>EMPLOYER 2</legend>
  <InputText labelinput='Name' onChange={changeData} name="employer2" defaultChecked={valueForm.employer2 || ""} />
  <InputText labelinput='Phone' onChange={changeData} name="employerPhone2" defaultChecked={valueForm.employerPhone2 || ""} />
  <InputText labelinput='Email' onChange={changeData} name="employerEmail2" defaultChecked={valueForm.employerEmail2 || ""} />
  </fieldset>
  : null
  } 
<p className='border-b-2 border-black text-lg pt-2'>Rating Scale</p>
<fieldset className=''>
  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-5'>
<InputText labelinput='English Language Profiency' onChange={changeData} name="englishLanguage" defaultChecked={valueForm.englishLanguage || ""} />
<InputText labelinput='Comprehension' onChange={changeData} name="comprehension" defaultChecked={valueForm.comprehension || ""} />
<InputText labelinput='Vocabulary' onChange={changeData} name="vocabulary" defaultChecked={valueForm.vocabulary || ""}/>
<InputText labelinput='Understand' onChange={changeData} name="understand" defaultChecked={valueForm.understand || ""}/>
<InputText labelinput='Other Languages' onChange={changeData} name="otherLanguages" defaultChecked={valueForm.otherLanguages || ""}/>
<InputText labelinput='Appearance' onChange={changeData} name="appearance" defaultChecked={valueForm.appearance || ""}/>
<InputText labelinput='Personality' onChange={changeData} name="personality" defaultChecked={valueForm.personality || ""}/>
<InputText labelinput='Courtesy' onChange={changeData} name="courtesy" defaultChecked={valueForm.courtesy || ""}/>
<InputText labelinput='Familiarity with work' onChange={changeData} name="familiarity" defaultChecked={valueForm.familiarity || ""}/>
<InputText labelinput='Previous Experience' onChange={changeData} name="previous" defaultChecked={valueForm.previous || ""}/>
</div>
</fieldset>
<p className='border-b-2 border-black text-lg pt-2'>Conditions of Employment</p>
<fieldset className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-5'>
<YesNoInput classname='justify-left' text="WORKING HOURS" onChange={changeData} name="workingHours" defaultChecked={valueForm.workingHours || ""}/>
<YesNoInput classname='justify-left' text="DURATION OF THE CONTRACT" onChange={changeData} name="durationContract" defaultChecked={valueForm.durationContract || ""}/>
<YesNoInput classname='justify-left' text="SALARY AND BENEFITS" onChange={changeData} name="salaryBenefits" defaultChecked={valueForm.salaryBenefits || ""}/>
<YesNoInput classname='justify-left' text="OVERTIME" onChange={changeData} name="overtime" defaultChecked={valueForm.overtime || ""}/>
<YesNoInput classname='justify-left' text="TIPS" onChange={changeData} name="tips" defaultChecked={valueForm.tips || ""}/>
<YesNoInput classname='justify-left' text="BONUSES" onChange={changeData} name="bonuses" defaultChecked={valueForm.bonuses || ""}/>
<YesNoInput classname='justify-left' text="VACATION" onChange={changeData} name="vacation" defaultChecked={valueForm.vacation || ""}/>
<YesNoInput classname='justify-left' text="JOB DESCRIPTION" onChange={changeData} name="jobDescription" defaultChecked={valueForm.jobDescription || ""}/>
<YesNoInput classname='justify-left' text="TECHNICAL QUESTION" onChange={changeData} name="technicalQuestion" defaultChecked={valueForm.technicalQuestion || ""}/>
<YesNoInput classname='justify-left' text="F-PMSSA-01 APPLICATION FORM" onChange={changeData} name="applicationForm" defaultChecked={valueForm.applicationForm || ""}/>
<YesNoInput classname='justify-left' text="SHIPOWNER'S LETTER OF EMPLOYMENT" onChange={changeData} name="shipowners" defaultChecked={valueForm.shipowners || ""}/>
</fieldset>
<p className='border-b-2 border-black text-lg pt-2'>Cruise Lines</p>
<fieldset className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-5'>
<YesNoInput text="ROYAL CARIBBEAN INT'L" onChange={changeData} name="royalCaribbean" defaultChecked={valueForm.royalCaribbean || ""}/>
<YesNoInput text="CELEBRITY" onChange={changeData} name="celebrity" defaultChecked={valueForm.celebrity || ""}/>
<YesNoInput text="ROYAL CARIBBEAN INT'L" onChange={changeData} name="workingHours" defaultChecked={valueForm.workingHours || ""}/>
<YesNoInput text="AZAMARA" onChange={changeData} name="azamara" defaultChecked={valueForm.azamara || ""}/>
<YesNoInput text="CARNIVAL" onChange={changeData} name="carnival" defaultChecked={valueForm.carnival || ""}/>
<YesNoInput text="COSTA CROCIERE" onChange={changeData} name="costaCrociere" defaultChecked={valueForm.costaCrociere || ""}/>
<YesNoInput text="IMAGE" onChange={changeData} name="image" defaultChecked={valueForm.image || ""}/>
<YesNoInput text="STARBOARD" onChange={changeData} name="starboard" defaultChecked={valueForm.starboard || ""}/>
<YesNoInput text="MSC" onChange={changeData} name="msc" defaultChecked={valueForm.msc || ""}/>
<YesNoInput text="VIRGIN" onChange={changeData} name="virgin" defaultChecked={valueForm.virgin || ""}/>
<YesNoInput text="DISNEY" onChange={changeData} name="disney" defaultChecked={valueForm.disney || ""}/>
<YesNoInput text="OTHER" onChange={changeData} name="other" defaultChecked={valueForm.other || ""}/>
</fieldset>
<fieldset className='mt-6'>
    <TextArea title="Recommended for employment by" id="recommended" name="recommended" onChange={changeData} Value={valueForm.recommended || ""} />
</fieldset>
<fieldset className='mt-6'>
    <TextArea title="Detail the reasons why he / she is recommended for that position" id="detail" name="detail" onChange={changeData} Value={valueForm.detail || ""}  />
  </fieldset>
  <fieldset className='mt-6'>
    <DatepickerComponent label="Form Date" name="formDate" onChange={changeData} datevalue={valueForm.formDate||""}/>
  </fieldset>
</form>
    </div>
  )
}
