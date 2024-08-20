import Footer from "../../footer/footer"
import Header from "../../header/header"

const userLayout = ({ children }: { children: JSX.Element }) => {
    return (
        <div className='bg-main text-white'>
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default userLayout