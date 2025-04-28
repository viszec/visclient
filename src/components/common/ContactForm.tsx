'use client';

import { FormEvent, useState } from 'react';

import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import Rounded from '@/components/common/RoundedButton';

// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FormData {
  name: string;
  email: string;
  message: string;
  budget?: string;
}

const FORM_FIELDS = [
  {
    id: 'name',
    label: 'Name',
    type: 'text',
    required: true,
    placeholder: 'Enter your name',
  },
  {
    id: 'email',
    label: 'Email',
    type: 'email',
    required: true,
    placeholder: 'your@email.com',
  },
  {
    id: 'message',
    label: 'Message',
    type: 'textarea',
    required: true,
    rows: 4,
    placeholder: 'Tell me more about your project...',
  },
  /* 
  {
    id: 'budget',
    label: 'Project Budget',
    type: 'select',
    required: false,
    placeholder: 'Select your budget range',
    options: [
      { value: 'default', label: 'Select...' },
      { value: 'small', label: '$1,000 - $5,000' },
      { value: 'medium', label: '$5,000 - $10,000' },
      { value: 'large', label: '$10,000+' },
    ],
  },
  */
] as const;

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    // budget: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Add state to track which fields have been filled
  const [filledFields, setFilledFields] = useState<Record<string, boolean>>({
    name: false,
    email: false,
    message: false,
    // budget: false,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log('Form submission started');

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Missing information', {
        description: <span className="text-white">Please fill in all required fields.</span>,
      });
      console.log('Validation failed: Missing required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Invalid email', {
        description: 'Please enter a valid email address.',
      });
      console.log('Validation failed: Invalid email format');
      return;
    }

    setIsSubmitting(true);
    console.log('Sending form data:', formData);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      console.log('API response status:', response.status);

      const responseData = await response.json().catch(() => null);
      console.log('API response data:', responseData);

      if (response.ok) {
        toast.success('Message sent!', {
          description: (
            <span className="text-white">
              Hey <span className="font-semibold text-white">{formData.name}</span>, thank you for reaching out.
              I&apos;ll get back to you soon :)
            </span>
          ),
        });

        // Reset form
        setFormData({ name: '', email: '', message: '', budget: '' });
        setFilledFields({
          name: false,
          email: false,
          message: false,
          budget: false,
        });
      } else {
        throw new Error(responseData?.message || 'Failed to send message');
      }
    } catch (error: unknown) {
      console.error('Error sending message:', error);
      toast.error('Message not sent', {
        description: error instanceof Error ? error.message : 'Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Update filled state based on whether the field has a value
    setFilledFields((prev) => ({
      ...prev,
      [name]: value.trim() !== '',
    }));
  };

  // Consistent input styles with dark background
  const inputStyles =
    'w-full px-4 py-3 bg-[#908f8c]/10 rounded-lg border-none focus:outline-none focus:ring-0 text-[#333] placeholder:text-[#333]/40 placeholder:text-xs lg:placeholder:text-sm placeholder:font-light';

  const renderField = (field: (typeof FORM_FIELDS)[number]) => {
    const labelContent = (
      <label
        htmlFor={field.id}
        className="block text-xs lg:text-sm font-medium mb-2 text-[#333]"
      >
        {field.label}
        {field.required && <span className="text-[#908f8c] ml-1">*</span>}
      </label>
    );

    const isFilled = filledFields[field.id as keyof FormData];
    const fieldStyles = `${inputStyles} ${isFilled ? '' : ''}`;

    if (field.type === 'textarea') {
      return (
        <div key={field.id}>
          {labelContent}
          <textarea
            id={field.id}
            name={field.id}
            value={formData[field.id as keyof FormData]}
            onChange={handleChange}
            rows={field.rows}
            placeholder={field.placeholder}
            className={`${fieldStyles} resize-none`}
            required={field.required}
            disabled={isSubmitting}
          />
        </div>
      );
    }

    // Commented out select type handling code
    // if (field.type === 'select') {
    //   return (
    //     <div key={field.id}>
    //       {labelContent}
    //       <Select
    //         name={field.id}
    //         value={formData[field.id as keyof FormData] || 'default'}
    //         onValueChange={(value) => {
    //           setFormData((prev) => ({
    //             ...prev,
    //             [field.id]: value === 'default' ? '' : value,
    //           }));
    //           setFilledFields((prev) => ({
    //             ...prev,
    //             [field.id]: value !== 'default',
    //           }));
    //         }}
    //         disabled={isSubmitting}
    //       >
    //         <SelectTrigger className="w-full px-4 py-3 h-[46px] bg-gray-800/50 rounded-lg border-none focus:ring-0 focus:ring-offset-0 text-gray-500">
    //           <SelectValue placeholder={field.placeholder} />
    //         </SelectTrigger>
    //         <SelectContent className="bg-gray-800/90 border-none">
    //           {field.options?.map((option) => (
    //             <SelectItem
    //               key={option.value}
    //               value={option.value}
    //               className="text-white focus:bg-gray-700 focus:text-white"
    //             >
    //               {option.label}
    //             </SelectItem>
    //           ))}
    //         </SelectContent>
    //       </Select>
    //     </div>
    //   );
    // }

    return (
      <div key={field.id}>
        {labelContent}
        <input
          type={field.type}
          id={field.id}
          name={field.id}
          value={formData[field.id as keyof FormData]}
          onChange={handleChange}
          placeholder={field.placeholder}
          className={fieldStyles}
          required={field.required}
          disabled={isSubmitting}
        />
      </div>
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 text-[#333]"
    >
      {FORM_FIELDS.map(renderField)}
      <div className="flex pt-2 w-[50%]">
        <Rounded
          onClick={(e) => {
            if (e) {
              e.preventDefault();
              console.log('Button clicked, submitting form');
              handleSubmit(e as FormEvent);
            } else {
              console.log('Event is undefined, creating synthetic event');
              handleSubmit({} as FormEvent);
            }
          }}
          className="w-full !h-[50px] lg:!h-[65px] lg:!w-[230px] rounded-full !border-[1px] !border-[#333] hover:!border-[#E6E5DF] hover:bg-[#E6E5DF] group disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          <div className="flex items-center justify-center gap-2">
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            <p className="m-0 text-[#333] font-normal text-sm lg:text-base group-hover:text-[#E6E5DF] transition-colors duration-200">
              {isSubmitting ? 'Sending...' : "Let's Connect"}
            </p>
          </div>
        </Rounded>
      </div>
    </form>
  );
}
