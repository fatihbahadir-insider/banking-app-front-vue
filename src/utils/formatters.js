export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function formatDate(dateString) {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatAmount(transaction, userId) {
  const amount = new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
  }).format(transaction.amount)

  if (transaction.type === 'deposit') return `+${amount}`
  if (transaction.type === 'withdraw') return `-${amount}`
  if (transaction.type === 'transfer') {
    return transaction.from_user_id === userId ? `-${amount}` : `+${amount}`
  }
  return amount
}

export function formatError(err) {
  if (err.data && typeof err.data === 'object') {
    const messages = Object.entries(err.data)
      .map(([field, message]) => `${field}: ${message}`)
      .join(', ')
    return messages || err.message
  }
  return err.message || 'Failed'
}
