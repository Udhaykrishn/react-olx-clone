import './Navbar.css'
import { useEffect, useState } from "react"
import symbol from '../../assets/symbol.png'
import searchIcon from '../../assets/search1.svg'
import searchIcon1 from '../../assets/search.svg'
import arrow from '../../assets/arrow-down.svg'
import {Location} from "../Location/Location"
import sellBtn from '../../assets/addButton.png'
import { userAuth } from "../../context/AuthContext"
import { useNavigate } from 'react-router-dom'

export const Navbar = ({ toggleModal, toggleModalSell }) => {

    let [rotate, setRotate] = useState (false)
    const navigate = useNavigate();

    let [style, setStyle] = useState({
        transform: 'rotate(0deg)',
        transition: '1s'
    })

    let handleRotate = () => {
        setRotate(!rotate)
    }

    useEffect(() => {
        if (rotate)
            setStyle({
                transform: 'rotate(180deg)',
                transition: '.3s'
            })
        else
            setStyle({
                transform: 'rotate(0deg)',
                transition: '.3s'
            })
    }, [rotate])


    let [input, setInput] = useState('')

    let auth = userAuth()

    return (
        <>

            <nav className="fixed z-50 w-full overflow-auto p-2 pl-3 pr-3 shadow-md bg-slate-100 border-b-4 border-solid border-b-white">
                <img className='w-12 ' src={symbol} alt="" />
                <div className='relative location-search  ml-5'>
                    <img className='absolute top-4 left-2 w-5' src={searchIcon} alt="" />
                    <input value={input} onChange={(event) => { setInput(event.target.value) }} placeholder='Search city, area, or locality...' className='w-[50px] sm:w-[150px] md:w-[250] lg:w-[270px] p-3 pl-8 pr-8 border-black border-solid border-2 rounded-md placeholder:text-ellipsis focus:outline-none focus:border-teal-300' type="text" />
                    <img onClick={handleRotate} style={style} className='absolute top-4 right-3 w-5 cursor-pointer' src={arrow} alt="" />
                </div>

                <div className="ml-5 mr-2 relative w-full main-search">
                    <input placeholder='Find Cars, Mobile Phones, and More...' className='w-full p-3 border-black border-solid border-2 rounded-md placeholder:text-ellipsis focus:outline-none focus:border-teal-300' type="text" />
                    <div style={{ backgroundColor: '#002f34' }} className="flex justify-center items-center absolute top-0 right-0 h-full rounded-e-md w-12">
                        <img className='w-5' src={searchIcon1} alt="" />
                    </div>
                </div>

                <div className="mx-1 sm:ml-5 sm:mr-5 relative lang">
                    <p style={{ color: '#002f34' }} className="font-bold mr-3" >English</p>
                    <img className='w-5 cursor-pointer' src={arrow} alt="" />
                </div>

                {!auth?.user && <p onClick={()=>navigate("/login")} style={{ color: '#002f34' }} className="font-bold underline ml-5 cursor-pointer">Login</p>}

                {auth?.user && <p onClick={auth.logout} style={{ color: '#002f34' }} className="font-bold ml-5 cursor-pointer">{auth.user.displayName?.split(' ')[0]}</p>}

                <img onClick={auth?.user ? toggleModalSell : toggleModal} className="w-24 mx-1 sm:ml-5 sm:mr-5 shadow-xl rounded-full cursor-pointer" src={sellBtn} alt="" />
            </nav>

            {rotate && <div className='locations fixed z-50 top-16 left-20 pt-4 pb-4 rounded-md bg-white shadow-xl h-[315px] w-[270px] overflow-x-hidden overflow-auto'>
                <p className='text-xs text-gray-500 uppercase p-4 pb-0 pt-2'>Popular locations</p>
                <div className='list-none p-0 pb-0'>
                    <Location setInput={setInput} text="Kerala" />
                    <Location setInput={setInput} text="Mumbai" />
                    <Location setInput={setInput} text="Chennai" />
                    <Location setInput={setInput} text="Karnataka" />
                    <Location setInput={setInput} text="Goa" />
                </div>
            </div>}

            <div className="w-full relative z-0 flex shadow-md p-2 pt-20 pl-10 pr-10 sm:pl-44 md:pr-44 sub-lists">

                <ul className="list-none flex items-center justify-between w-full">
                    <div className="flex flex-shrink-0">
                        <p className="font-semibold uppercase all-cats">All categories</p>
                        <img className="w-4 ml-2" src={arrow} alt="" />
                    </div>
                    <li>Cars</li>
                    <li>Motorcycles</li>
                    <li>Mobile Phones</li>
                    <li>For sale : Houses & Apartments</li>
                    <li>Scooter</li>
                    <li>Commercial & Other Vehicles</li>
                    <li>For rent : Houses & Apartments</li>
                </ul>
            </div>

        </>
    )
}
