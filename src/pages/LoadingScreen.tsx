const LoadingScreen = () => {
  return (
    <div className='flex justify-center'>
      <div className='w-[400px] bg-overlay-bg rounded-b-lg'>
        <p className='flex justify-center items-center h-[50px] text-center animate-blink text-primary-text '>
          Carregando...
        </p>
      </div>
    </div>
  )
}

export default LoadingScreen
