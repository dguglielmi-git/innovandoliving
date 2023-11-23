import React from 'react'
import { useTranslation } from 'react-i18next'

export default function CommentsEmpty () {
  const { t } = useTranslation()
  return (
    <div>
      <h3> {t('questionsNoComments')} </h3>
    </div>
  )
}
