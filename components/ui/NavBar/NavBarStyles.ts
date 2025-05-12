const styles = {
  container: `navbar 
              flex 
              gap-8`,
  top: `navbar--top`,
  bottom: `navbar--bottom 
           bg-green-600 
           px-8 
           py-4 
           rounded-2xl 
           flex-col 
           lg:flex-row`,
  brand: `navbar__brand 
          flex 
          items-center 
          justify-center 
          lg:justify-left`,
  items: {
    container: `navbar__items 
                flex 
                flex-col 
                xl:flex-row 
                gap-8 
                items-center 
                ml-0 
                xl:ml-auto`,
    top: `fixed 
          xl:static 
          z-40 
          overflow-scroll 
          xl:overflow-visible 
          scroll-smooth 
          top-0 
          right-[100%] 
          py-16 
          px-8 
          xl:p-0 
          bg-white 
          xl:bg-transparent 
          w-screen 
          md:w-1/2 
          md:shadow-2xl 
          xl:shadow-none 
          xl:w-auto 
          h-screen 
          xl:h-auto 
          transition-all 
          ease-in-out`,
    topOpen: `right-0`,
    bottom: ``,
  },
  isOpen: `left-0 
           md:left-1/2`,
  isClose: `left-full`,
  buttonContainer: `navbar__button 
                    absolute 
                    z-50 
                    top-8 
                    right-6 
                    flex 
                    xl:hidden`,
  closeButton: `bg-green-600 
                text-white 
                py-2 
                px-4 
                rounded-full`,
  openButton: `p-2`,
}

export default styles
