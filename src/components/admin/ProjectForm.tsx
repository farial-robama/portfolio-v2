"use client";

import { useFieldArray, useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { projectSchema, type ProjectInput } from "@/lib/validations/project";

interface ProjectFormProps {
  projectId?: string; // present when editing, absent when creating
  defaultValues?: Partial<ProjectInput>;
}

export default function ProjectForm({ projectId, defaultValues }: ProjectFormProps) {
  const router = useRouter();
  const [submitError, setSubmitError] = useState("");

  const methods = useForm<ProjectInput>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      status: "DRAFT",
      sort: 0,
      toolNames: [],
      metrics: [],
      ...defaultValues,
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = methods;

  const metricsArray = useFieldArray({ control, name: "metrics" });

  async function onSubmit(data: ProjectInput) {
    setSubmitError("");

    const url = projectId ? `/api/projects/${projectId}` : "/api/projects";
    const method = projectId ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const json = await res.json();
      setSubmitError(json.error?.message || "Something went wrong.");
      return;
    }

    router.push("/admin/projects");
    router.refresh();
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-[640px]">
        <div className="mb-4">
          <label className="font-mono text-[11px] uppercase text-ink-soft">Title</label>
          <input
            {...register("title")}
            className="w-full mt-1.5 border border-rule px-3 py-2.5 text-sm rounded focus:outline-none focus:border-teal"
          />
          {errors.title && <p className="text-xs text-red-600 mt-1">{errors.title.message}</p>}
        </div>

        <div className="mb-4">
          <label className="font-mono text-[11px] uppercase text-ink-soft">
            Slug (URL, e.g. my-project)
          </label>
          <input
            {...register("slug")}
            className="w-full mt-1.5 border border-rule px-3 py-2.5 text-sm rounded focus:outline-none focus:border-teal"
          />
          {errors.slug && <p className="text-xs text-red-600 mt-1">{errors.slug.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="font-mono text-[11px] uppercase text-ink-soft">Category</label>
            <input
              {...register("category")}
              className="w-full mt-1.5 border border-rule px-3 py-2.5 text-sm rounded focus:outline-none focus:border-teal"
            />
          </div>
          <div>
            <label className="font-mono text-[11px] uppercase text-ink-soft">Year</label>
            <input
              type="number"
              {...register("year", { valueAsNumber: true })}
              className="w-full mt-1.5 border border-rule px-3 py-2.5 text-sm rounded focus:outline-none focus:border-teal"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="font-mono text-[11px] uppercase text-ink-soft">
            Body — plain text for now (structured rich-text editor is a later upgrade)
          </label>
          <textarea
            {...register("bodyJson")}
            rows={6}
            className="w-full mt-1.5 border border-rule px-3 py-2.5 text-sm rounded focus:outline-none focus:border-teal"
          />
        </div>

        <div className="mb-4">
          <label className="font-mono text-[11px] uppercase text-ink-soft">
            Tools (comma-separated, e.g. React, Next.js, PostgreSQL)
          </label>
          <input
            defaultValue={defaultValues?.toolNames?.join(", ") ?? ""}
            onChange={(e) => {
              const names = e.target.value
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean);
              methods.setValue("toolNames", names);
            }}
            className="w-full mt-1.5 border border-rule px-3 py-2.5 text-sm rounded focus:outline-none focus:border-teal"
          />
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between">
            <label className="font-mono text-[11px] uppercase text-ink-soft">
              Impact metrics
            </label>
            <button
              type="button"
              onClick={() => metricsArray.append({ label: "", value: "", unit: "", sort: 0 })}
              className="font-mono text-[11px] text-teal underline"
            >
              + Add metric
            </button>
          </div>
          {metricsArray.fields.map((field, i) => (
            <div key={field.id} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 mt-2">
              <input
                placeholder="Label"
                {...register(`metrics.${i}.label` as const)}
                className="border border-rule px-2.5 py-2 text-sm rounded"
              />
              <input
                placeholder="Value"
                {...register(`metrics.${i}.value` as const)}
                className="border border-rule px-2.5 py-2 text-sm rounded"
              />
              <input
                placeholder="Unit (optional)"
                {...register(`metrics.${i}.unit` as const)}
                className="border border-rule px-2.5 py-2 text-sm rounded"
              />
              <button
                type="button"
                onClick={() => metricsArray.remove(i)}
                className="text-red-600 text-xs"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <label className="font-mono text-[11px] uppercase text-ink-soft">Status</label>
          <select
            {...register("status")}
            className="w-full mt-1.5 border border-rule px-3 py-2.5 text-sm rounded"
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>

        {submitError && <p className="text-sm text-red-600 mb-4">{submitError}</p>}

        <button type="submit" disabled={isSubmitting} className="btn btn-solid">
          {isSubmitting ? "Saving…" : projectId ? "Save changes" : "Create project"}
        </button>
      </form>
    </FormProvider>
  );
}