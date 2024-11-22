import { useEffect, useState } from "react";
import {
  DatepickerComponent,
  InputText,
  SelectComponentCountry,
  SelectComponenteCountryCode,
  TextArea,
} from "../../../../components/layoutComponents";
import { Datepicker } from "flowbite-react";

export default function FormF_PMSSA20({ formData, onDataChange = () => {} }) {
  const [valueForm, setValueForm] = useState({});

  useEffect(() => {
    if (formData) {
      setValueForm(formData);
    } else {
      setValueForm({});
    }
  }, [formData]);

  const changeData = (e) => {
    const { name, value } = e.target;
    const updatedData = {
      ...valueForm,
      [name]: value,
    };
    setValueForm(updatedData);
    onDataChange(updatedData);
  };

  const onSelectCountryChange = (value, name) => {
    const updatedData = {
      ...valueForm,
      [name]: value,
    };
    setValueForm(updatedData);
    onDataChange(updatedData);
  };

  const onSelectPhoneChange = (value) => {
    const updatedData = {
      ...valueForm,
      phone1: value,
    };
    setValueForm(updatedData);
    onDataChange(updatedData);
  };

  return (
    <div>
      <form>
        <fieldset className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <legend className="underline">Primary beneficiary</legend>
          <InputText
            labelinput="Split %"
            onChange={changeData}
            name="split1"
            value={valueForm.split1 || ""}
          />
          <InputText
            labelinput="First Names"
            onChange={changeData}
            name="firstName1"
            value={valueForm.firstName1 || ""}
          />
          <InputText
            labelinput="Surnames"
            onChange={changeData}
            name="surName1"
            value={valueForm.surName1 || ""}
          />
          <DatepickerComponent
            name="dateBirth1"
            onChange={changeData}
            label="Date of Birth"
            datevalue={valueForm.dateBirth1 || ""}
            isValid={valueForm.dateBirth1}
          />
          <SelectComponenteCountryCode
            classNamePhone="w-full inset-y-6 inset-0"
            label="Phone number"
            value={valueForm.phone1}
            data={valueForm.phone1?.value}
            onChange={onSelectPhoneChange}
          />
          <InputText
            labelinput="Email"
            onChange={changeData}
            name="email1"
            value={valueForm.email1 || ""}
          />
          <SelectComponentCountry
            name="countryBirth1"
            text="Country of Birth"
            value={valueForm.countryBirth1 || ""}
            initialValue={valueForm.countryBirth1}
            onChange={(value) => onSelectCountryChange(value, "countryBirth1")}
          />
          <InputText
            labelinput="State"
            onChange={changeData}
            name="state1"
            value={valueForm.state1 || ""}
          />
          <InputText
            labelinput="Zip Code"
            onChange={changeData}
            name="zipCode1"
            value={valueForm.zipCode1 || ""}
          />
        </fieldset>
        <fieldset>
          <TextArea
            title="Address"
            id="address1"
            value={valueForm.address1 || ""}
            onChange={changeData}
            name="address1"
          />
        </fieldset>
        {/* Contingent beneficiary section */}
        <fieldset className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <legend className="underline">Contingent beneficiary</legend>
          <InputText
            labelinput="Split %"
            onChange={changeData}
            name="split2"
            value={valueForm.split2 || ""}
          />
          <InputText
            labelinput="First Names"
            onChange={changeData}
            name="firstName2"
            value={valueForm.firstName2 || ""}
          />
          <InputText
            labelinput="Surnames"
            onChange={changeData}
            name="surName2"
            value={valueForm.surName2 || ""}
          />
          <DatepickerComponent
            name="dateBirth2"
            onChange={changeData}
            label="Date of Birth"
            datevalue={valueForm.dateBirth2 || ""}
            isValid={valueForm.dateBirth2}
          />
          <SelectComponenteCountryCode
            classNamePhone="w-full inset-y-6 inset-0"
            label="Phone number"
            value={valueForm.phone2}
            data={valueForm.phone2?.value}
            onChange={onSelectPhoneChange}
          />
          <InputText
            labelinput="Email"
            onChange={changeData}
            name="email2"
            value={valueForm.email2 || ""}
          />
          <SelectComponentCountry
            name="countryBirth2"
            text="Country of Birth"
            value={valueForm.countryBirth2 || ""}
            initialValue={valueForm.countryBirth2}
            onChange={(value) => onSelectCountryChange(value, "countryBirth2")}
          />
          <InputText
            labelinput="State"
            onChange={changeData}
            name="state2"
            value={valueForm.state2 || ""}
          />
          <InputText
            labelinput="Zip Code"
            onChange={changeData}
            name="zipCode2"
            value={valueForm.zipCode2 || ""}
          />
        </fieldset>
        <fieldset>
          <TextArea
            title="Address"
            id="address2"
            value={valueForm.address2 || ""}
            onChange={changeData}
            name="address2"
          />
        </fieldset>
      </form>
    </div>
  );
}
