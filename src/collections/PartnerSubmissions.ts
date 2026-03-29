import type { CollectionConfig } from 'payload'
import { beforeChangeHook, afterChangeHook } from '../hooks/partner-submission-hooks'

export const PartnerSubmissions: CollectionConfig = {
  slug: 'partner-submissions',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'submittedAt', 'submittedBy'],
    components: {
      edit: {
        PreviewButton: '/components/ApprovePartnerButton#ApproveButton',
      },
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Partner Name',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Partner Description',
    },
    {
      name: 'logo',
      type: 'text',
      admin: {
        description: 'Paste full Cloudinary or image URL',
      },
      label: 'Logo URL',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'partner-categories',
      required: true,
      hasMany: false,
    },
    {
      name: 'contact',
      type: 'group',
      label: 'Contact Information',
      fields: [
        {
          name: 'email',
          type: 'email',
          required: true,
        },
        {
          name: 'phone',
          type: 'text',
        },
        {
          name: 'whatsapp',
          type: 'text',
          label: 'WhatsApp',
        },
        {
          name: 'address',
          type: 'text',
        },
      ],
    },
    {
      name: 'website',
      type: 'text',
    },
    {
      name: 'social',
      type: 'group',
      label: 'Social Media',
      fields: [
        {
          name: 'facebook',
          type: 'text',
        },
        {
          name: 'instagram',
          type: 'text',
        },
        {
          name: 'linkedin',
          type: 'text',
        },
      ],
    },
    {
      name: 'membershipEmail',
      type: 'email',
      label: 'Membership Email',
      admin: {
        description: 'Email registered as a BRINCA member',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      required: true,
      options: [
        { label: 'Pending Review', value: 'pending' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'reviewerNotes',
      type: 'textarea',
      label: 'Reviewer Notes',
      admin: {
        description: 'Admin notes about the submission',
      },
    },
    {
      name: 'rejectionReason',
      type: 'textarea',
      label: 'Rejection Reason',
      admin: {
        condition: (_, siblingData) => siblingData?.status === 'rejected',
        description: 'Reason for rejection (visible to submitter if notified)',
      },
    },
    {
      name: 'approvedPartner',
      type: 'relationship',
      relationTo: 'partners',
      label: 'Approved Partner Record',
      admin: {
        description: 'Links to the Partner record created after approval',
        condition: (_, siblingData) => siblingData?.status === 'approved',
      },
    },
    {
      name: 'submittedBy',
      type: 'text',
      label: 'Submitted By',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'submittedAt',
      type: 'date',
      label: 'Submitted At',
      admin: {
        readOnly: true,
      },
    },
  ],
  timestamps: true,
  hooks: {
    beforeChange: [beforeChangeHook],
    afterChange: [afterChangeHook],
  },
}
