import { TPriceProps } from '@/types/price'

export const pricing: TPriceProps[] = [
  {
    name: 'Starter',
    price: 'Free',
    features: [
      '5 learning modules',
      'Basic dashboard',
      'Online community',
      'Fundamental AI materials'
    ],
    cta: 'Start Free',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$19.99',
    period: '/month',
    features: [
      'All learning modules',
      'Complete dashboard',
      '1-on-1 mentoring',
      'Practical projects',
      'Certificate',
      'API access'
    ],
    cta: 'Choose Pro',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: [
      'Custom solutions',
      'Team dashboard',
      'Dedicated support',
      'Custom curriculum',
      'Advanced analytics',
      'White-label option'
    ],
    cta: 'Contact Us',
    popular: false,
  }
]

