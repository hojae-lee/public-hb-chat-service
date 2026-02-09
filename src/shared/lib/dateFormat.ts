import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko'

dayjs.extend(relativeTime)
dayjs.locale('ko')

export const formatDate = (date: string): string => {
  return dayjs(date).format('YYYY년 M월 D일')
}

export const formatTime = (date: string): string => {
  return dayjs(date).format('HH:mm')
}

export const formatDateTime = (date: string): string => {
  return dayjs(date).format('YYYY년 M월 D일 HH:mm')
}

export const formatRelative = (date: string): string => {
  return dayjs(date).fromNow()
}

export const now = (): string => {
  return dayjs().toISOString()
}
