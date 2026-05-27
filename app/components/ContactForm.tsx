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
    <section id="contact" className="relative bg-paper py-16 md:py-32 overflow-hidden">
      <span
        aria-hidden
        className="hidden md:block pointer-events-none absolute -right-6 top-24 font-display text-[22rem] leading-none select-none"
        style={{ WebkitTextStroke: "1px rgba(42,39,37,0.06)", color: "transparent" }}
      >
        08
      </span>

      <div className="relative mx-auto max-w-[1480px] px-5 md:px-10 grid md:grid-cols-12 gap-10 md:gap-14">
        <div className="md:col-span-5">
          <p className="eyebrow text-espresso flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-espresso" />
            08 — Say hello
          </p>
          <h2 className="h-display mt-4 text-[clamp(2.4rem,5vw,4rem)] text-ink">
            Catering, group orders <span className="italic">or hello</span>.
          </h2>
          <p className="mt-5 text-ink/85 leading-snug max-w-md">
            Five quick fields. We&apos;ll get back to you, usually the same day.
            For walk-ins, just come by — every drink is built fresh on the spot.
          </p>

          <ul className="mt-8 space-y-3 text-sm text-ink/85">
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
          aria-label="Luxe Tea enquiry form"
        >
          {sent ? (
            <div
              className="min-h-[420px] flex flex-col items-center justify-center text-center"
              role="status"
              aria-live="polite"
            >
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
                htmlFor="contact-name"
              >
                <input
                  {...register("name")}
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Alex Tran"
                  required
                  aria-required="true"
                  aria-invalid={errors.name ? "true" : "false"}
                  className="form-input"
                />
              </Field>

              <Field
                label="Phone"
                required
                error={errors.phone?.message}
                htmlFor="contact-phone"
              >
                <input
                  {...register("phone")}
                  id="contact-phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="(416) 555 1234"
                  required
                  aria-required="true"
                  aria-invalid={errors.phone ? "true" : "false"}
                  className="form-input"
                />
              </Field>

              <Field
                label="Email"
                error={errors.email?.message}
                htmlFor="contact-email"
              >
                <input
                  {...register("email")}
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  aria-invalid={errors.email ? "true" : "false"}
                  className="form-input"
                />
              </Field>

              <Field
                label="Topic"
                error={errors.topic?.message}
                htmlFor="contact-topic"
              >
                <select
                  {...register("topic")}
                  id="contact-topic"
                  className="form-input"
                  aria-invalid={errors.topic ? "true" : "false"}
                >
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
                htmlFor="contact-message"
              >
                <textarea
                  {...register("message")}
                  id="contact-message"
                  rows={4}
                  placeholder="Date, headcount, drink preferences…"
                  aria-invalid={errors.message ? "true" : "false"}
                  className="form-input resize-none"
                />
              </Field>

              <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-2">
                <p className="text-xs text-ink/70 max-w-xs leading-snug">
                  By sending you agree we can use your details to reply about
                  your enquiry only.
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary whitespace-nowrap"
                >
                  <span>{isSubmitting ? "Sending…" : "Send enquiry"}</span>
                  {!isSubmitting && <span aria-hidden>→</span>}
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
          background:#FFFDF8;
          border:1px solid #D8D0C2;
          border-radius:14px;
          padding:12px 14px;
          color:var(--color-ink);
          font-size:16px;
          transition:border-color 180ms ease, background 180ms ease, box-shadow 180ms ease;
          appearance:none;
          -webkit-appearance:none;
        }
        .form-input::placeholder{
          color:#8A8278;
          opacity:1;
        }
        .form-input:hover{
          border-color:#B7AC97;
        }
        .form-input:focus{
          outline:none;
          border-color:var(--color-espresso);
          background:#fff;
          box-shadow:0 0 0 3px rgba(255,199,167,0.45);
        }
        .form-input[aria-invalid="true"]{
          border-color:var(--color-espresso);
          box-shadow:0 0 0 3px rgba(123,75,50,0.18);
        }
        select.form-input{
          background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path fill='none' stroke='%232A2725' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round' d='M1 1l5 5 5-5'/></svg>");
          background-repeat:no-repeat;
          background-position:right 16px center;
          background-size:12px 8px;
          padding-right:42px;
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
  htmlFor,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  error?: string;
  className?: string;
  htmlFor?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={["block", className].filter(Boolean).join(" ")}
    >
      <span className="block eyebrow text-ink/80 mb-2">
        {label}{" "}
        {required && (
          <span className="text-espresso" aria-label="required">
            *
          </span>
        )}
      </span>
      {children}
      {error && (
        <span
          role="alert"
          className="block mt-1.5 text-xs text-espresso font-medium"
        >
          {error}
        </span>
      )}
    </label>
  );
}
