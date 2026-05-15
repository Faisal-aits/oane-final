import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { CONTACT_DETAILS, PROJECT_TYPES } from '../constants/index.jsx';
import { useParallax } from '../hooks/useParallax.js';

export default function Contact() {
  const headRef = useRef(null);
  const headVisible = useInView(headRef, { once: true, margin: '-80px' });
  const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error'

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const { ref: sectionRef, bgY, contentY } = useParallax(50, 100);

  const onSubmit = async (data) => {
    setStatus('sending');
    try {
      await axios.post('/api/contact', data);
      setStatus('success');
      reset();
      setTimeout(() => setStatus(null), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus(null), 5000);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="parallax-section bg-[#1A1A1A]"
    >
      {/* Background radial glow */}
      <motion.div
        style={{ y: bgY }}
        className="absolute right-0 top-0 w-1/2 h-full pointer-events-none"
        aria-hidden
      >
        <div
          className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(circle, #DE3B2B 0%, transparent 70%)' }}
        />
      </motion.div>

      <motion.div style={{ y: contentY }} className="relative z-10 section-pad max-w-[1440px] mx-auto">
        {/* Header */}
        <div ref={headRef} className="mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={headVisible ? { opacity: 1, y: 0 } : {}}
            className="section-label block mb-6"
          >
            Contact
          </motion.span>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* ... (rest of the component stays same) */}
          {/* Left: copy + contact details */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={headVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          >
            <h2
              className="font-poppins font-semibold text-white mb-6 leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Let's talk<br />
              <span className="text-[#DE3B2B]">about light.</span>
            </h2>

            <p className="font-redhat text-[#999] leading-relaxed mb-12 max-w-sm"
              style={{ fontSize: 'clamp(1.125rem, 1.5vw, 1.25rem)' }}
            >
              Whether you're an architect designing a landmark, a developer planning a hospitality
              project, or an MEP consultancy looking for a design partner — we'd like to hear from
              you.
            </p>

            {/* Contact detail list */}
            <ul className="space-y-6">
              {CONTACT_DETAILS.map(({ label, value, href }) => (
                <li key={label} className="flex items-start gap-4">
                  <span className="font-poppins text-xs tracking-[0.2em] uppercase text-[#DE3B2B] pt-1 min-w-[70px]">
                    {label}
                  </span>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="font-redhat text-white text-base md:text-lg hover:text-[#DE3B2B] transition-colors duration-200"
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="font-redhat text-white text-base md:text-lg">{value}</span>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-12">
              <a href="mailto:hello@onae.ae" className="btn-outline-white text-sm tracking-widest uppercase">
                Start a conversation
              </a>
            </div>
          </motion.div>

          {/* Right: enquiry form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={headVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          >
            <p className="font-poppins text-sm tracking-[0.2em] uppercase text-[#DE3B2B] mb-10">
              Or send us an enquiry
            </p>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">

              {/* Name */}
              <div>
                <input
                  {...register('name', { required: 'Name is required' })}
                  placeholder="Your name"
                  className="form-input"
                />
                {errors.name && (
                  <p className="font-redhat text-[#DE3B2B] text-xs mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
                  })}
                  placeholder="Email address"
                  type="email"
                  className="form-input"
                />
                {errors.email && (
                  <p className="font-redhat text-[#DE3B2B] text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Project type */}
              <div>
                <select
                  {...register('projectType', { required: 'Please select a project type' })}
                  className="form-input"
                  defaultValue=""
                >
                  <option value="" disabled>Project type</option>
                  {PROJECT_TYPES.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                {errors.projectType && (
                  <p className="font-redhat text-[#DE3B2B] text-xs mt-1">{errors.projectType.message}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <textarea
                  {...register('message', { required: 'Please tell us about your project' })}
                  placeholder="Tell us about your project"
                  rows={4}
                  className="form-input resize-none"
                />
                {errors.message && (
                  <p className="font-redhat text-[#DE3B2B] text-xs mt-1">{errors.message.message}</p>
                )}
              </div>

              {/* Submit */}
              <div className="flex items-center gap-6">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-red text-sm tracking-widest uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? 'Sending…' : 'Send enquiry'}
                </button>

                {status === 'success' && (
                  <motion.p
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="font-redhat text-sm text-green-400"
                  >
                    Message sent. We'll be in touch.
                  </motion.p>
                )}
                {status === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="font-redhat text-sm text-[#DE3B2B]"
                  >
                    Something went wrong. Please email us directly.
                  </motion.p>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

