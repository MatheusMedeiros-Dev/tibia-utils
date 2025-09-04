const getActiveLinkClass = ({ isActive }: { isActive: boolean }): string =>
  `transition-all duration-700 ${
    isActive
      ? 'bg-btn-active-bg text-primary-text px-4'
      : 'px-2 hover:bg-btn-active-bg hover:text-primary-text'
  }`

export default getActiveLinkClass
