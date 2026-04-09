import type { CollectionConfig } from 'payload'

export const Mentors: CollectionConfig = {
  slug: 'mentors',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'inCanadaSince', 'status', 'createdAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Full Name',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'E-mail',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Phone',
    },
    {
      name: 'inCanadaSince',
      type: 'date',
      required: true,
      label: 'In Canada since',
    },
    {
      name: 'hasChildren',
      type: 'text',
      required: true,
      label: 'School-age children',
      admin: {
        description: 'Do you have school-age children? How many and what age?',
      },
    },
    {
      name: 'profile',
      type: 'textarea',
      required: true,
      label: 'Professional Profile',
      admin: {
        description:
          'Briefly describe your professional profile and why you would like to be a mentor/sponsor for a newcomer',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      required: true,
      options: [
        { label: 'Pending Review', value: 'pending' },
        { label: 'Active', value: 'active' },
        { label: 'Rejected', value: 'rejected' },
      ],
      admin: {
        position: 'sidebar',
      },
    },

  ],
  timestamps: true,
}
