import google from '../../assets/google.png';
import guitar from '../../assets/guita.png';
import love from '../../assets/love.png';
import avatar from '../../assets/avatar.png';
import close from '../../assets/close.svg';
import { Modal, ModalBody, Carousel } from "flowbite-react";
import { auth, provider } from "../../firebase/firebase";
import { signInWithPopup } from 'firebase/auth';

export const LoginModal = ({ toggleModal, status }) => {
    let handleSignIn = async () => {
        try {
            await signInWithPopup(auth, provider);
            toggleModal();
        } catch (error) {
            console.log(error);
            alert(error);
        }
    };

    return (
        <div>
            <Modal
                theme={{
                    content: {
                        base: "relative w-full h-screen p-4 md:h-auto",
                        inner: "relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700",
                    },
                }}
                className="bg-black rounded-none cursor-pointer"
                position={'center'}
                show={status}
                size="md"
                popup={true}
            >
                <div
                    onClick={(event) => event.stopPropagation()}
                    className="flex flex-col items-center justify-center h-full p-6 pl-4 pr-4 bg-white relative"
                >
                    <img
                        onClick={toggleModal}
                        className="w-6 absolute top-4 right-4 cursor-pointer"
                        src={close}
                        alt="Close"
                    />

                    <Carousel
                        slide={false}
                        theme={{
                            indicators: {
                                active: { off: "bg-gray-300", on: "bg-teal-300" },
                                base: "h-2 w-2 rounded-full",
                                wrapper: "absolute bottom-2 left-1/2 flex -translate-x-1/2 space-x-3",
                            },
                            scrollContainer: {
                                base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth",
                                snap: "snap-x",
                            },
                            control: {
                                base: "inline-flex items-center justify-center bg-transparent",
                                icon: "w-8 text-white dark:text-black",
                            },
                        }}
                        onClick={(event) => event.stopPropagation()}
                        className="w-full h-[250px] sm:h-[350px] lg:h-[400px] pb-5 rounded-none"
                    >
                        <div className="flex flex-col items-center justify-center">
                            <img className="w-24 sm:w-32 md:w-40 pb-5" src={guitar} alt="Image 1" />
                            <p className="text-center w-60 sm:w-72 text-[#002f34] font-semibold pb-5">
                                Help us become one of the safest places to buy and sell.
                            </p>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <img className="w-24 sm:w-32 md:w-40 pb-5" src={love} alt="Image 2" />
                            <p className="text-center w-60 sm:w-72 text-[#002f34] font-semibold pb-5">
                                Close deals from the comfort of your home.
                            </p>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <img className="w-24 sm:w-32 md:w-40 pb-5" src={avatar} alt="Image 3" />
                            <p className="text-center w-60 sm:w-72 text-[#002f34] font-semibold pb-5">
                                Keep all your favorites in one place.
                            </p>
                        </div>
                    </Carousel>
                </div>

                <ModalBody
                    className="bg-white p-0 rounded-none h-auto"
                    onClick={(event) => event.stopPropagation()}
                >
                    <div className="p-6 pt-0">
                        <div
                            onClick={handleSignIn}
                            className="flex items-center justify-center max-w-[300px] w-full mx-auto border-2 border-solid border-gray-300 p-5 mb-4 cursor-pointer active:bg-teal-100 rounded-md transition-all duration-300 ease-in-out transform hover:bg-teal-500 hover:text-white hover:scale-105"
                        >
                            <img className="w-7 mr-2" src={google} alt="Google" />
                            <p className="text-sm text-gray-500 hover:text-white">Continue with Google</p>
                        </div>

                        <div className="pt-10 sm:pt-20 flex flex-col items-center justify-center">
                            <p className="text-xs">All your personal details are safe with us.</p>
                            <p className="text-xs pt-5 text-center">
                                If you continue, you are accepting{' '}
                                <span className="text-blue-600">
                                    OLX Terms and Conditions and Privacy Policy
                                </span>
                            </p>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    );
};
