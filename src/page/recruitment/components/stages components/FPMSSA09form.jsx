import React from "react";
import {
  DatepickerComponent,
  InputText,
  SelectComponents,
} from "../../../../components/layoutComponents";
import { Rating, Textarea } from "flowbite-react";
import { useState } from "react";
import { useForm } from "../../../../hooks";
import { useEffect } from "react";
import { useTransition } from "react";

const formData = {
  employer1: "",
  employer2: "",
  contactedBy1: "",
  contactedBy2: "",
  address1: "",
  address2: "",
};

const Evaluation = ({ label, rating, onRatingChange }) => {
  return (
    <div>
      <span className="text-gray-600 text-sm">{label}:</span>
      <Rating size={"md"}>
        {[1, 2, 3].map((value) => (
          <Rating.Star
            key={value}
            className="hover:cursor-pointer"
            filled={rating >= value}
            onClick={() => onRatingChange(value)}
          />
        ))}
      </Rating>
    </div>
  );
};

export const FPMSSA09form = ({ data, onDataChange = () => {} }) => {
  const [isPending, startTransition] = useTransition();
  const {
    employer1,
    employer2,
    contactedBy1,
    contactedBy2,
    positionHeld1,
    positionHeld2,
    from1,
    from2,
    to1,
    to2,
    wage1,
    wage2,
    reliability1,
    reliability2,
    organized1,
    organized2,
    time1,
    time2,
    attendance1,
    attendance2,
    reason1,
    reason2,
    address1,
    address2,
    comment1,
    comment2,
    formState,
    unsavedChanges,
    onInputChange,
    onSelectChange,
    onRatingChange,
  } = useForm(data || formData);

  useEffect(() => {
    if (unsavedChanges) {
      onDataChange(formState);
      console.log("cambio");
    }
  }, [formState]);

  return (
    <section className="my-4 min-h-96">
      <span className="font-semibold flex flex-row items-center justify-start gap-2 ">
        Employer 1 (newest employer)
      </span>
      <hr className="mb-3" />
      <div className="m-auto grid grid-cols-1 gap-4 items-end sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-3">
        <InputText
          value={employer1}
          label="Employer Name"
          name={"employer1"}
          onChange={onInputChange}
        />
        <SelectComponents
          name={"contactedBy1"}
          valueDefault="Contacted By"
          Text="Select a contact medium"
          name_valor={true}
          data={[
            { id: "1", name: "Telephone" },
            { id: "2", name: "E-mail" },
            { id: "3", name: "Whatsapp" },
          ]}
          idKey={"id"}
          valueKey={"name"}
          onChange={onSelectChange}
        />
        <InputText
          value={positionHeld1}
          label="Position Held"
          name={"positionHeld1"}
          onChange={onInputChange}
        />
        <DatepickerComponent
          name="from1"
          onChange={onInputChange}
          label="From"
          datevalue={from1 || ""}
        />
        <DatepickerComponent
          name="to1"
          onChange={onInputChange}
          label="To"
          datevalue={to1 || ""}
        />
        <InputText
          value={wage1}
          label="Wage"
          name={"wage1"}
          onChange={onInputChange}
        />
      </div>
      <div className="my-3">
        <label htmlFor="address1" className="text-sm text-gray-400 font-sans">
          Address
        </label>
        <Textarea
          id="address1"
          name="address1"
          value={address1}
          placeholder="Address"
          required
          rows={4}
          color="blue"
          onChange={onInputChange}
        />
      </div>
      <span className="font-semibold text-sm flex flex-row items-center justify-start gap-2 ">
        Performance Rating
      </span>
      <hr className="mb-3" />
      <div className="m-auto mt-3 grid grid-cols-1 gap-6 items-end md:grid-cols-3 xl:grid-cols-3">
        <Evaluation
          label="Reliability"
          rating={reliability1}
          onRatingChange={(value) => onRatingChange("reliability1", value)}
        />
        <Evaluation
          label="Organized"
          rating={organized1}
          onRatingChange={(value) => onRatingChange("organized1", value)}
        />
        <Evaluation
          label="Time Management"
          rating={time1}
          onRatingChange={(value) => onRatingChange("time1", value)}
        />
        <Evaluation
          label="Attendance"
          rating={attendance1}
          onRatingChange={(value) => onRatingChange("attendance1", value)}
        />
        <InputText
          label="Reason of departure"
          name={"reason1"}
          onChange={onInputChange}
        />
      </div>
      <div className="my-3">
        <label htmlFor="comment1" className="text-sm text-gray-400 font-sans">
          Comments
        </label>
        <Textarea
          id="comment1"
          name="comment1"
          value={comment1}
          placeholder="Comments"
          required
          rows={4}
          color="blue"
          onChange={onInputChange}
        />
      </div>
      <span className="font-semibold flex flex-row items-center justify-start gap-2 mt-8">
        Employer 2 (next most recent employer)
      </span>
      <hr className="mb-3" />
      <div className="m-auto grid grid-cols-1 gap-4 items-end sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-3">
        <InputText
          value={employer2}
          label="Employer Name"
          name={"employer2"}
          onChange={onInputChange}
        />
        <SelectComponents
          name={"contactedBy2"}
          valueDefault="Contacted By"
          Text="Select a contact medium"
          name_valor={true}
          data={[
            { id: "1", name: "Telephone" },
            { id: "2", name: "E-mail" },
            { id: "3", name: "Whatsapp" },
          ]}
          idKey={"id"}
          valueKey={"name"}
          onChange={onSelectChange}
        />
        <InputText
          value={positionHeld2}
          label="Position Held"
          name={"positionHeld2"}
          onChange={onInputChange}
        />
        <DatepickerComponent
          name="from2"
          onChange={onInputChange}
          label="From"
          datevalue={from2 || ""}
        />
        <DatepickerComponent
          name="to2"
          onChange={onInputChange}
          label="To"
          datevalue={to2 || ""}
        />
        <InputText
          value={wage2}
          label="Wage"
          name={"wage2"}
          onChange={onInputChange}
        />
      </div>
      <div className="my-3">
        <label htmlFor="address2" className="text-sm text-gray-400 font-sans">
          Address
        </label>
        <Textarea
          id="address2"
          name="address2"
          value={address2}
          placeholder="Address"
          required
          rows={4}
          color="blue"
          onChange={onInputChange}
        />
      </div>
      <span className="font-semibold text-sm flex flex-row items-center justify-start gap-2 ">
        Performance Rating
      </span>
      <hr className="mb-3" />
      <div className="m-auto mt-3 grid grid-cols-1 gap-6 items-end md:grid-cols-3 xl:grid-cols-3">
        <Evaluation
          label="Reliability"
          rating={reliability2}
          onRatingChange={(value) => onRatingChange("reliability2", value)}
        />
        <Evaluation
          label="Organized"
          rating={organized2}
          onRatingChange={(value) => onRatingChange("organized2", value)}
        />
        <Evaluation
          label="Time Management"
          rating={time2}
          onRatingChange={(value) => onRatingChange("time2", value)}
        />
        <Evaluation
          label="Attendance"
          rating={attendance2}
          onRatingChange={(value) => onRatingChange("attendance2", value)}
        />
        <InputText
          label="Reason of departure"
          name={"reason2"}
          onChange={onInputChange}
        />
      </div>
      <div className="my-3">
        <label htmlFor="comment2" className="text-sm text-gray-400 font-sans">
          Comments
        </label>
        <Textarea
          id="comment2"
          name="comment2"
          value={comment2}
          placeholder="Comments"
          required
          rows={4}
          color="blue"
          onChange={onInputChange}
        />
      </div>
    </section>
  );
};
