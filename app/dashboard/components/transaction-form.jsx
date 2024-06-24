"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/components/button";
import Input from "@/components/input";
import Label from "@/components/label";
import Select from "@/components/select";
import { purgeTransactionListCache } from "@/lib/actions";
import { categories, types } from "@/lib/consts";
import { transactionSchema } from "@/lib/validation";

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
    type: "date",
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
    validation: { required: "Description is required" },
  },
];

export default function TransactionForm() {
  const [isSaving, setSaving] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched", resolver: zodResolver(transactionSchema) });

  const onSubmit = async (data) => {
    setSaving(true);

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          created_at: `${data.created_at}T00:00:00`,
        }),
      });
      await purgeTransactionListCache();
      router.push("/dashboard");
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
              {errors[name] && <FormError error={errors.message} />}
            </div>
          )
        )}
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={isSaving}>
          Save
        </Button>
      </div>
    </form>
  );
}
