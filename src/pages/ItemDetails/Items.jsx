import { useState } from "react"
import { Navbar } from "../../components/Navbar/Navbar"
import { LoginModal } from "../../components/modal/LoginModel"
import { SellItemModal } from "../../components/Modal/SellItemsModal"
import { itemsContext } from "../../context/ItemsContext"
import { useLocation } from "react-router-dom"

function ItemDetails() {

    let [openModal, setModal] = useState(false)
    let [openModalSell, setModalSell] = useState(false)
    let itemContext = itemsContext()

    let toggleModal = () => {
        setModal(!openModal)
    }

    let toggleModalSell = () => {
        setModalSell(!openModalSell)
    }

    let location = useLocation()

    return (
        <div>
            <Navbar toggleModalSell={toggleModalSell} toggleModal={toggleModal} />
            <LoginModal toggleModal={toggleModal} status={openModal} />

            <div className="grid gap-0 sm:gap-5 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 p-10 px-5 sm:px-15 md:px-30 lg:px-40">
                <div className="border-2 w-full rounded-lg flex justify-center overflow-hidden h-96">
                    <img className="object-cover" src={location.state.item.imageUrl} alt="" />
                </div>
                <div className="flex flex-col relative w-full">
                    <p className="p-1 pl-0 text-2xl font-bold">₹ {location.state.item.price}</p>
                    <p className="p-1 pl-0 text-base">{location.state.item.category}</p>
                    <p className="p-1 pl-0 text-xl font-bold">{location.state.item.title}</p>
                    <p className="p-1 pl-0 sm:pb-0 break-words text-ellipsis overflow-hidden w-full">
                        {location.state.item.description.length > 100
                            ? location.state.item.description.slice(0, 100) + '...'
                            : location.state.item.description}</p>
                    <div className="w-full relative sm:relative md:absolute bottom-0 flex justify-between">
                        <p className="p-1 pl-0 font-bold">{location.state.item.userName}</p>
                        <p className="p-1 pl-0 text-sm">{location.state.item.createdAt}</p>
                    </div>
                </div>
            </div>

            <SellItemModal setItems={itemContext.setItems} toggleModal={toggleModalSell} status={openModalSell} />
        </div>
    )
}

export default ItemDetails
