import { useHealthCheck } from '@features/health-check/useHealthCheck'

type SidebarConnectionStatusProps = {
  isCollapsed: boolean
}

export const SidebarConnectionStatus = ({
  isCollapsed
}: SidebarConnectionStatusProps) => {
  const { isSuccess, isError, isFetching } = useHealthCheck()

  const status =
    isFetching && !isSuccess && !isError
      ? 'checking'
      : isSuccess
        ? 'connected'
        : 'disconnected'

  const label =
    status === 'connected'
      ? '서버 연결됨'
      : status === 'disconnected'
        ? '연결 끊김'
        : '확인 중…'

  return (
    <div
      className="sidebar-footer connection-status"
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <span
        className={`connection-dot connection-dot--${status}`}
        aria-hidden
      />
      {!isCollapsed && <span className="connection-label">{label}</span>}
    </div>
  )
}
