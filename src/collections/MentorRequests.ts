import type { CollectionConfig } from 'payload'

export const MentorRequests: CollectionConfig = {
  slug: 'mentor-requests',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'plannedTravelDate', 'status', 'createdAt'],
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
      name: 'plannedTravelDate',
      type: 'date',
      required: true,
      label: 'Planned travel date',
    },
    {
      name: 'stayDuration',
      type: 'text',
      required: true,
      label: 'Planned stay duration',
      admin: {
        description: 'How long do you plan to stay in Ottawa?',
      },
    },
    {
      name: 'familyDescription',
      type: 'textarea',
      required: true,
      label: 'Family & immigration description',
      admin: {
        description:
          'Briefly describe your family, your immigration status (student, PR, etc.), and what you expect from a sponsor',
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
