'use client';

import React from 'react';
import Link from 'next/link';
import { Check, Mail, MapPin, Globe2, Clock } from 'lucide-react';
import { PageIntro } from '../components/PageIntro';
import { contact } from '../content/aixcoEnergy';
import { contactPageCopy } from '../content/sitePages';
import { useI18n } from '../i18n/I18nProvider';
import { recordEmailClick, submitEnergyContactSubmission } from '../lib/backend/energy-lead-capture';

const ContactPage: React.FC = () => {
  const { tx } = useI18n();
  const [status, setStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('name') ?? '');
    const email = String(formData.get('email') ?? '');
    const subject = String(formData.get('subject') ?? '');
    const enquiryType = String(formData.get('enquiry_type') ?? '');
    const message = String(formData.get('message') ?? '');

    const result = await submitEnergyContactSubmission({
      name,
      email,
      interest: enquiryType,
      message: subject ? `Subject: ${subject}\n\n${message}` : message,
      metadata: {
        subject,
        enquiry_type: enquiryType,
      },
    });

    setIsSubmitting(false);
    setStatus(result.ok ? 'success' : 'error');

    if (result.ok) {
      event.currentTarget.reset();
    }
  };

  return (
    <main className="min-h-screen bg-industrial-white pt-24 text-industrial-black lg:pt-32">
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-12 md:pt-16">
        <PageIntro eyebrow={tx(contactPageCopy.eyebrow)} title={tx(contactPageCopy.title)} />

        <div className="mb-12 rounded-lg border border-zinc-800 bg-zinc-950 p-6 text-center shadow-soft md:p-10">
          <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-brand-red">{tx(contactPageCopy.introLabel)}</p>
          <h2 className="mb-4 text-[clamp(1.6rem,3vw,2.4rem)] leading-tight">{tx(contactPageCopy.introTitle)}</h2>
          <p className="mx-auto max-w-3xl text-sm font-bold leading-7 text-zinc-500">{tx(contactPageCopy.introBody)}</p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-brand-red">{tx(contactPageCopy.infoLabel)}</p>
            <h2 className="mb-6 text-[clamp(1.5rem,3vw,2.2rem)] leading-tight">{tx(contactPageCopy.infoTitle)}</h2>
            <p className="mb-8 text-sm font-bold leading-7 text-zinc-500">{tx(contactPageCopy.infoBody)}</p>

            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-5">
                <div className="mb-2 flex items-center gap-2 font-black text-industrial-black">
                  <MapPin className="h-4 w-4 text-brand-red" />
                  {tx(contactPageCopy.officeLabel)}
                </div>
                <p className="text-sm font-bold leading-relaxed text-zinc-500">{contact.address}</p>
              </div>
              <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-5">
                <div className="mb-2 flex items-center gap-2 font-black text-industrial-black">
                  <Mail className="h-4 w-4 text-brand-red" />
                  {tx(contactPageCopy.emailLabel)}
                </div>
                <a
                  href={`mailto:${contact.email}`}
                  onClick={() => {
                    void recordEmailClick('contact_page_email', contact.email);
                  }}
                  className="text-sm font-bold text-zinc-500 transition-colors hover:text-brand-red"
                >
                  {contact.email}
                </a>
              </div>
              <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-5">
                <div className="mb-2 flex items-center gap-2 font-black text-industrial-black">
                  <Globe2 className="h-4 w-4 text-brand-red" />
                  {tx(contactPageCopy.websiteLabel)}
                </div>
                <p className="text-sm font-bold text-zinc-500">{contactPageCopy.websiteValue}</p>
              </div>
              <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-5">
                <div className="mb-2 flex items-center gap-2 font-black text-industrial-black">
                  <Clock className="h-4 w-4 text-brand-red" />
                  {tx(contactPageCopy.availabilityLabel)}
                </div>
                <p className="whitespace-pre-line text-sm font-bold leading-relaxed text-zinc-500">{tx(contactPageCopy.availabilityValue)}</p>
              </div>
            </div>

            <div className="rounded-lg border border-zinc-800 bg-industrial-white p-6">
              <h3 className="mb-4 text-lg font-black">{tx(contactPageCopy.topicsTitle)}</h3>
              <ul className="space-y-3">
                {contactPageCopy.topics.map((topic) => (
                  <li key={topic} className="flex gap-3 text-sm font-bold leading-relaxed text-zinc-500">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
                    {tx(topic)}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6 md:p-8">
              <h3 className="mb-3 text-2xl font-black">{tx(contactPageCopy.formTitle)}</h3>
              <p className="mb-8 text-sm font-bold leading-7 text-zinc-500">{tx(contactPageCopy.formBody)}</p>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder={tx(contactPageCopy.formName)}
                  className="min-h-12 w-full rounded-lg border border-zinc-800 bg-industrial-white px-4 text-sm font-bold text-industrial-black outline-none transition-colors focus:border-brand-red"
                />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder={tx(contactPageCopy.formEmail)}
                  className="min-h-12 w-full rounded-lg border border-zinc-800 bg-industrial-white px-4 text-sm font-bold text-industrial-black outline-none transition-colors focus:border-brand-red"
                />
                <input
                  type="text"
                  name="subject"
                  required
                  placeholder={tx(contactPageCopy.formSubject)}
                  className="min-h-12 w-full rounded-lg border border-zinc-800 bg-industrial-white px-4 text-sm font-bold text-industrial-black outline-none transition-colors focus:border-brand-red"
                />
                <select
                  name="enquiry_type"
                  required
                  defaultValue=""
                  className="min-h-12 w-full rounded-lg border border-zinc-800 bg-industrial-white px-4 text-sm font-bold text-industrial-black outline-none transition-colors focus:border-brand-red"
                >
                  <option value="" disabled>
                    {tx(contactPageCopy.formEnquiryType)}
                  </option>
                  {contactPageCopy.enquiryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {tx(option.label)}
                    </option>
                  ))}
                </select>
                <textarea
                  name="message"
                  required
                  rows={6}
                  placeholder={tx(contactPageCopy.formMessage)}
                  className="w-full rounded-lg border border-zinc-800 bg-industrial-white px-4 py-3 text-sm font-bold text-industrial-black outline-none transition-colors focus:border-brand-red"
                />
                <button type="submit" disabled={isSubmitting} className="btn-gold w-full justify-center disabled:opacity-60">
                  {isSubmitting ? tx("Sending...") : tx(contactPageCopy.formSubmit)}
                </button>
                {status === 'success' && (
                  <p className="text-sm font-bold text-brand-red" role="status">
                    {tx(contactPageCopy.formSuccess)}
                  </p>
                )}
                {status === 'error' && (
                  <p className="text-sm font-bold text-brand-red" role="alert">
                    {tx(contactPageCopy.formError)}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px border border-zinc-800 bg-zinc-800 md:grid-cols-3">
          {contactPageCopy.highlights.map((item) => (
            <div key={item.title} className="bg-industrial-white p-8 text-center">
              <h4 className="mb-3 text-lg font-black uppercase tracking-normal">{tx(item.title)}</h4>
              <p className="text-sm font-bold leading-relaxed text-zinc-500">{tx(item.body)}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm font-bold text-zinc-500">
          {tx("Prefer email?")}{' '}
          <Link href={`mailto:${contact.email}`} className="text-brand-red transition-colors hover:text-industrial-black">
            {contact.email}
          </Link>
        </p>
      </section>
    </main>
  );
};

export default ContactPage;
