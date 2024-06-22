"use client";
import { useForm, SubmitHandler } from "react-hook-form";

import Button from "@/components/button";
import Input from "@/components/input";
import Label from "@/components/label";
import Select from "@/components/select";
import { categories, types } from "@/lib/consts";

const fields = [
  {
    label: "Type",
    name: "type",
    component: Select,
    options: types,
    validation: { required: "Type is required" },
  },
  {
    label: "Category",
    name: "category",
    component: Select,
    options: categories,
    validation: { required: "Category is required" },
  },
  {
    label: "Date",
    name: "created_at",
    component: Input,
    validation: { required: "Date is required" },
  },
  {
    label: "Amount",
    name: "amount",
    component: Input,
    type: "number",
    validation: { required: "Amount is required" },
  },
  {
    label: "Description",
    name: "description",
    component: Input,
    type: "text",
    span: 2,
    validation: { required: "Amount is required" },
  },
];

export default function TransactionForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map(
          ({
            label,
            name,
            component: Component,
            options,
            type,
            span,
            validation,
          }) => (
            <div key={name} className={`col-span-${span || 1}`}>
              <Label className="mb-1">{label}</Label>
              {options ? (
                <Component {...register(name, validation)}>
                  {options.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </Component>
              ) : (
                <Component type={type} {...register(name, validation)} />
              )}
              {errors[name] && (
                <p className="text-red-600 text-sm mt-1">
                  {errors[name]?.message}
                </p>
              )}
            </div>
          )
        )}
      </div>
      <div className="flex justify-end">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
