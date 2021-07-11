interface WebhookInterface {
  createdAt: Date
  type: 'users' | 'channels'
  value: string
  id: string
}

export type Webhook = WebhookInterface | null
