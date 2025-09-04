import Navbar from './Navbar'
import Footer from './Footer'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col min-h-screen w-screen max-w-full'>
      <Navbar />

      <main className="flex-1 bg-fixed bg-no-repeat bg-cover bg-center bg-[url('./assets/background.jpg')]">
        {children}
      </main>

      <Footer />
    </div>
  )
}

export default MainLayout
