import { useState, useEffect } from "react";
import {
  DatepickerComponent,
  InputText,
  TextArea,
  YesNoInput,
} from "../../../../components/layoutComponents";

export default function FormF_PMSSA11({ formData, onDataChange = () => {} }) {
  const [valueForm, setValueForm] = useState({});

  useEffect(() => {
    if (!formData) {
      setValueForm({});
    } else {
      setValueForm(formData);
    }
  }, []);

  const changeData = (e) => {
    let updatedData = {
      ...valueForm,
      [e.target.name]: e.target.value,
    };
    setValueForm(updatedData);
    onDataChange(updatedData);
  };

  return (
    <div>
      {/* <button onClick={mostrar}>mostrar </button> */}
      <form className="">
        <fieldset className="flex gap-6">
          <legend className="pb-3">
            Have you registered with another placement agency in any other
            country?
          </legend>
          <YesNoInput
            classname="justify-left"
            defaultChecked={valueForm?.otherAgencyBoolean || ""}
            onChange={changeData}
            name="otherAgencyBoolean"
          />
          <InputText
            label="Other Agency Name"
            onChange={changeData}
            name="otherAgencyName"
            value={valueForm?.otherAgencyName || ""}
          />
          <InputText
            label="Other Agency Country"
            onChange={changeData}
            name="otherAgencyCountry"
            value={valueForm.otherAgencyCountry || ""}
          />
        </fieldset>
        <fieldset className="mt-6">
          <TextArea
            title="Write a little about yourself and your experience (go into details about past experience / position you held)"
            id="newquestion1"
            value={valueForm.newquestion1 || ""}
            onChange={changeData}
            name="newquestion1"
          />
        </fieldset>
        <fieldset className="mt-6">
          <TextArea
            title="Why do you want to work on a cruise ship and what knowledge do you have about living on board a ship?"
            id="newquestion2"
            value={valueForm.newquestion2 || ""}
            onChange={changeData}
            name="newquestion2"
          />
        </fieldset>
        <fieldset className="flex gap-6">
          <legend className="pb-3">
            What languages are you fluent in? (Please include your native
            language)
          </legend>
          <InputText
            onChange={changeData}
            name="language1"
            value={valueForm.language1 || ""}
          />
          <InputText
            onChange={changeData}
            name="language2"
            value={valueForm.language2 || ""}
          />
          <InputText
            onChange={changeData}
            name="language3"
            value={valueForm.language3 || ""}
          />
          <InputText
            onChange={changeData}
            name="language4"
            value={valueForm.language4 || ""}
          />
        </fieldset>
        <fieldset className="flex flex-col-1 sm:flex-col-1 md:flex-col-2 lg:flex-col-4 gap-6">
          <legend className="pb-3">
            WWhat languages can you read and write?
          </legend>
          <InputText
            onChange={changeData}
            name="language5"
            value={valueForm.language5 || ""}
          />
          <InputText
            onChange={changeData}
            name="language6"
            value={valueForm.language6 || ""}
          />
          <InputText
            onChange={changeData}
            name="language7"
            value={valueForm.language7 || ""}
          />
          <InputText
            onChange={changeData}
            name="language8"
            value={valueForm.language8 || ""}
          />
        </fieldset>
        <fieldset className="mt-6">
          <TextArea
            title="Life on board is very different from life on land.  Is there any reason why you can't commit to a 6- or 8-month onboard assignment far away from your family and friends, working 10-12 hours a day, 7 days a week?"
            id="newquestion3"
            value={valueForm.newquestion3 || ""}
            onChange={changeData}
            name="newquestion3"
          />
        </fieldset>
        <fieldset className="mt-6">
          <TextArea
            title="When living on board, it is possible to share a small cabin with another person; in some cases you may have to share with others up to three people from different parts of the world. How do you feel about this, and what would you do to adapt to this new lifestyle?"
            id="newquestion4"
            value={valueForm.newquestion4 || ""}
            onChange={changeData}
            name="newquestion4"
          />
        </fieldset>
        <fieldset className="mt-6">
          <TextArea
            title="Working on a cruise ship may require stretching, reaching, pulling, lifting up to 50 pounds, and sometimes working in a hot, humid environment. Is there a reason why you won't be able to perform these types of tasks or won't be able to adapt to such an environment?"
            id="newquestion5"
            value={valueForm.newquestion5 || ""}
            onChange={changeData}
            name="newquestion5"
          />
        </fieldset>
        <fieldset className="mt-6">
          <TextArea
            title="What kind of activities do you enjoy in your free time?"
            id="newquestion6"
            value={valueForm.newquestion6 || ""}
            onChange={changeData}
            name="newquestion6"
          />
        </fieldset>
        <fieldset className="mt-6">
          <TextArea
            title="Why should I refer you for a contract with a cruise/merchant line?"
            id="newquestion7"
            value={valueForm.newquestion7 || ""}
            onChange={changeData}
            name="newquestion7"
          />
        </fieldset>
        <fieldset className="mt-6">
          <TextArea
            title="Comments from the person in charge of the interview by the Placement agency:"
            id="newquestion8"
            value={valueForm.newquestion8 || ""}
            onChange={changeData}
            name="newquestion8"
          />
        </fieldset>
        <fieldset className="mt-6">
          <DatepickerComponent
            label="Form Date"
            name="formDate"
            onChange={changeData}
            datevalue={valueForm.formDate || ""}
          />
        </fieldset>
      </form>
    </div>
  );
}
