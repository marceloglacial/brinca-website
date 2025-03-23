const styles = {
  container: `ui-navbar 
              ui-flex 
              ui-gap-8`,
  top: `ui-navbar--top`,
  bottom: `ui-navbar--bottom 
           ui-bg-green-600 
           ui-px-8 
           ui-py-4 
           ui-rounded-2xl 
           ui-flex-col 
           lg:ui-flex-row`,
  brand: `ui-navbar__brand 
          ui-flex 
          ui-items-center 
          ui-justify-center 
          lg:ui-justify-left`,
  items: {
    container: `ui-navbar__items 
                ui-flex 
                ui-flex-col 
                xl:ui-flex-row 
                ui-gap-8 
                ui-items-center 
                ui-ml-0 
                xl:ui-ml-auto`,
    top: `ui-fixed 
          xl:ui-static 
          ui-z-40 
          ui-overflow-scroll 
          xl:ui-overflow-auto 
          ui-scroll-smooth 
          ui-top-0 
          ui-right-[100%] 
          ui-py-16 
          ui-px-8 
          xl:ui-p-0 
          ui-bg-white 
          xl:ui-bg-transparent 
          ui-w-screen 
          md:ui-w-1/2 
          md:ui-shadow-2xl 
          xl:ui-shadow-none 
          xl:ui-w-auto 
          ui-h-screen 
          xl:ui-h-auto 
          ui-transition-all 
          ui-ease-in-out`,
    topOpen: `ui-right-0`,
    bottom: ``,
  },
  isOpen: `ui-left-0 
           md:ui-left-1/2`,
  isClose: `ui-left-full`,
  buttonContainer: `ui-navbar__button 
                    ui-absolute 
                    ui-z-50 
                    ui-top-8 
                    ui-right-6 
                    ui-flex 
                    xl:ui-hidden`,
  closeButton: `ui-bg-green-600 
                ui-text-white 
                ui-py-2 
                ui-px-4 
                ui-rounded-full`,
  openButton: `ui-p-2`,
}

export default styles
