"use client";

import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Please share your name"),
  phone: z
    .string()
    .min(7, "A phone number we can reach you on")
    .regex(/^[0-9+()\-\s.]+$/, "Numbers, spaces, parentheses or dashes only"),
  email: z.string().email("That email looks off").optional().or(z.literal("")),
  topic: z.enum(["Catering", "Group order", "Wholesale tea", "Other"], {
    message: "Pick a topic",
  }),
  message: z.string().max(280).optional().or(z.literal("")),
});

type FormVals = z.infer<typeof schema>;

const zResolver: Resolver<FormVals> = async (values) => {
  const result = schema.safeParse(values);
  if (result.success) return { values: result.data, errors: {} };
  const fieldErrors: Record<string, { type: string; message: string }> = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] as string;
    if (key && !fieldErrors[key]) {
      fieldErrors[key] = { type: issue.code, message: issue.message };
    }
  }
  return { values: {}, errors: fieldErrors };
};

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormVals>({
    resolver: zResolver,
    defaultValues: { topic: "Catering" },
  });

  const onSubmit = async (vals: FormVals) => {
    // TODO: wire up to actual email / CRM endpoint
    await new Promise((r) => setTimeout(r, 600));
    console.log("Luxe Tea enquiry", vals);
    setSent(true);
    reset();
  };

  return (
    <section id="contact" className="relative bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-[1480px] px-5 md:px-10 grid md:grid-cols-12 gap-10 md:gap-14">
        <div className="md:col-span-5">
          <p className="eyebrow text-espresso">08 — Say hello</p>
          <h2 className="h-display mt-4 text-[clamp(2.4rem,5vw,4rem)] text-ink">
            Catering, group orders <span className="italic">or hello</span>.
          </h2>
          <p className="mt-5 text-ink/75 leading-snug max-w-md">
            Five quick fields. We&apos;ll get back to you, usually the same day.
            For walk-ins, just come by — every drink is built fresh on the spot.
          </p>

          <ul className="mt-8 space-y-3 text-sm text-ink/75">
            {[
              "Office catering and group orders",
              "Event drink stations",
              "Wholesale tea & coffee enquiries",
              "Anything else we can help with",
            ].map((it) => (
              <li key={it} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-espresso" />
                {it}
              </li>
            ))}
          </ul>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="md:col-span-7 bg-cream rounded-3xl border border-line p-6 md:p-10 shadow-soft"
          noValidate
        >
          {sent ? (
            <div className="min-h-[420px] flex flex-col items-center justify-center text-center">
              <div className="h-16 w-16 rounded-full bg-matcha flex items-center justify-center mb-6">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2A2725" strokeWidth="2.4">
                  <path d="M4 12.5l5 5 11-11" />
                </svg>
              </div>
              <h3 className="h-display text-3xl text-ink">Thanks — we&apos;ve got it.</h3>
              <p className="mt-3 text-ink/70 max-w-sm">
                Someone from Luxe Tea will be in touch shortly. In the meantime,
                come by 230 Merton St for a fresh cup.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-6 btn-ghost"
              >
                Send another
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field
                label="Your name"
                required
                error={errors.name?.message}
              >
                <input
                  {...register("name")}
                  type="text"
                  autoComplete="name"
                  placeholder="Alex Tran"
                  className="form-input"
                />
              </Field>

              <Field label="Phone" required error={errors.phone?.message}>
                <input
                  {...register("phone")}
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="(416) 555 1234"
                  className="form-input"
                />
              </Field>

              <Field label="Email" error={errors.email?.message}>
                <input
                  {...register("email")}
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="form-input"
                />
              </Field>

              <Field label="Topic" error={errors.topic?.message}>
                <select {...register("topic")} className="form-input">
                  <option>Catering</option>
                  <option>Group order</option>
                  <option>Wholesale tea</option>
                  <option>Other</option>
                </select>
              </Field>

              <Field
                label="Anything else?"
                className="md:col-span-2"
                error={errors.message?.message}
              >
                <textarea
                  {...register("message")}
                  rows={4}
                  placeholder="Date, headcount, drink preferences…"
                  className="form-input resize-none"
                />
              </Field>

              <div className="md:col-span-2 flex items-center justify-between gap-4 mt-2">
                <p className="text-xs text-ink/45 max-w-xs leading-snug">
                  By sending you agree we can use your details to reply about
                  your enquiry only.
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary"
                >
                  {isSubmitting ? "Sending…" : "Send enquiry →"}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      <style>{`
        .form-input{
          width:100%;
          min-height:54px;
          background:var(--color-paper);
          border:1px solid var(--color-line);
          border-radius:14px;
          padding:12px 14px;
          color:var(--color-ink);
          font-size:16px;
          transition:border-color 200ms ease, background 200ms ease;
        }
        .form-input:focus{
          outline:none;
          border-color:var(--color-espresso);
          background:#fff;
        }
        textarea.form-input{ min-height:120px; line-height:1.45; }
      `}</style>
    </section>
  );
}

function Field({
  label,
  children,
  required,
  error,
  className,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  error?: string;
  className?: string;
}) {
  return (
    <label className={["block", className].filter(Boolean).join(" ")}>
      <span className="block eyebrow text-ink/55 mb-2">
        {label} {required && <span className="text-espresso">*</span>}
      </span>
      {children}
      {error && (
        <span className="block mt-1.5 text-xs text-espresso">{error}</span>
      )}
    </label>
  );
}
