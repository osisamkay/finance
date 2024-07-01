"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/components/button";
import FormError from "@/components/form-error";
import Input from "@/components/input";
import Label from "@/components/label";
import Select from "@/components/select";
import { createTransaction } from "@/lib/actions";
import { categories, types } from "@/lib/consts";
import { transactionSchema } from "@/lib/validation";

const fields = [
  {
    label: "Type",
    name: "type",
    component: Select,
    options: types,
  },
  {
    label: "Category",
    name: "category",
    component: Select,
    options: categories,
  },
  {
    label: "Date",
    name: "created_at",
    component: Input,
    type: "date",
  },
  {
    label: "Amount",
    name: "amount",
    component: Input,
    type: "number",
  },
  {
    label: "Description",
    name: "description",
    component: Input,
    type: "text",
    span: 2,
  },
];

export default function TransactionForm() {
  const [isSaving, setSaving] = useState(false);
  const [lastError, setLastError] = useState();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ mode: "onTouched", resolver: zodResolver(transactionSchema) });

  const type = watch("type");

  useEffect(() => {
    if (type !== "Expense") {
      setValue("category", "");
    }
  }, [type, setValue]);

  const onSubmit = async (data) => {
    setSaving(true);
    setLastError();
    try {
      await createTransaction(data);
      router.push("/dashboard");
    } catch (error) {
      setLastError(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map(
          ({
            label,
            name,
            component: Component,
            options,
            type: inputType,
            span,
          }) => (
            <div key={name} className={`col-span-${span || 1}`}>
              <Label className="mb-1">{label}</Label>
              {options ? (
                <Component
                  {...register(name)}
                  disabled={name === "category" && type !== "Expense"}
                >
                  <option value="">
                    {name === "category"
                      ? "Select a category"
                      : "Select a type"}
                  </option>
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Component>
              ) : (
                <Component type={inputType} {...register(name)} />
              )}
              {errors[name] && <FormError error={errors[name]?.message} />}
            </div>
          )
        )}
      </div>
      <div className="flex justify-between items-center">
        <div className="error">
          {lastError && <FormError error={lastError.message} />}
        </div>
        <Button type="submit" disabled={isSaving}>
          Save
        </Button>
      </div>
    </form>
  );
}
