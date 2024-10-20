// MODAl

    const modal = document.querySelector('.modal')
    const modalTrigger = document.querySelector('#btn-get')
    const closeItem = document.querySelector('.modal_close')

    const openModal = () => {
        modal.style.display = 'block'
        document.body.style.overflow = 'hidden'
    }

    const closeModal = () => {
        modal.style.display = 'none'
        document.body.style.overflow = ''
    }

    modalTrigger.onclick = () => openModal()
    closeItem.onclick = () => closeModal()
    modal.onclick = (event) => {
        if (event.target === modal) {
            closeModal()
        }
    }

    const userScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetWidth) {
            openModal()
            window.removeEventListener('scroll', userScroll)
        }
    }
    setTimeout(openModal, 10000)

    window.addEventListener('scroll', userScroll)


