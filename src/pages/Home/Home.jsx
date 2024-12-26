import { Navbar } from "../../components/Navbar/Navbar"
import { useEffect, useState } from "react"
import { SellItemModal } from "../../components/Modal/SellItemsModal"
import { fetchItemsFromFireStore } from "../../firebase/firebase"
import { itemsContext } from "../../context/ItemsContext"
import { Card } from "../../components/Card/Card"
import { LoginModal } from "../../components/modal/LoginModel"

function Home() {

    let [openModal, setModal] = useState(false)
    let [openModalSell, setModalSell] = useState(false)
    let itemContext = itemsContext()

    let toggleModal = () => {
        setModal(!openModal)
    }

    let toggleModalSell = () => {
        setModalSell(!openModalSell)
    }

    useEffect(() => {
        let getItems = async () => {
            const datas = await fetchItemsFromFireStore()
            itemContext?.setItems(datas)
        }
        getItems()
    }, [itemContext?.items])

    return (
        <div>
            <Navbar toggleModalSell={toggleModalSell} toggleModal={toggleModal} />
            <Card items={itemContext.items} />
            <LoginModal toggleModal={toggleModal} status={openModal} />
            <SellItemModal setItems={itemContext.setItems} toggleModal={toggleModalSell} status={openModalSell} />
        </div>
    )
}

export default Home
