import { Link } from "react-router-dom"

const Links = [
    {
        title: 'Company',
        links: [
            {
                name: 'Home',
                link: '/'
            },
            {
                name: 'About Us',
                link: '/about-us'
            },
            {
                name: 'Contact Us',
                link: '/contact-us'
            },
            {
                name: 'Movies',
                link: '/movies'
            }
        ]
    },
    {
        title: 'Top Categories',
        links: [
            {
                name: 'Action',
                link: '/'
            },
            {
                name: 'Romantic',
                link: '/'
            },
            {
                name: 'Drama',
                link: '/'
            },
            {
                name: 'Historical',
                link: '/'
            }
        ]
    },
    {
        title: 'My Account',
        links: [
            {
                name: 'Dashboard',
                link: '/'
            },
            {
                name: 'My favorites',
                link: '/'
            },
            {
                name: 'Profile',
                link: '/'
            },
            {
                name: 'Change Password',
                link: '/'
            }
        ]
    }
]

const Footer = () => {
    return (
        <div className='bg-dry py-4 border-2 border-black'>
            <div className='container mx-auto px-2'>
                <div className='grid grid-cols-2 md:grid-cols-7 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 py-10 justify-between'>

                    {
                        Links.map((link, index) => (
                            <div className='col-span-1 md:col-span-2 lg:col-span-3 pb-3.5 sm:pb-0' key={index}>
                                <h3 className='text-md lg:leading-7 font-medium mb-4 sm:mb-5 lg:mb-6 pb-0.5'>{link.title}</h3>
                                <ul className='text-sm flex flex-col space-y-3'>
                                    {
                                        link.links.map((item, id) => (
                                            <li className='flex items-baseline' key={id}>
                                                <Link to={item.link} className='text-border inline-block w-max hover:text-subMain'>{item.name}</Link>
                                            </li>
                                        ))
                                    }

                                </ul>
                            </div>
                        ))
                    }


                    <div className='pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3'>
                        <Link to='/'>
                            <img alt='logo' src='/logo.png' className='w-2/4 object-contain h-12'></img>
                        </Link>
                        <p className='leading-7 text-sm text-border mt-3'>
                            <span>Lorem 196 Andrew Road, Suite 200,</span> <br />
                            <span>New York, NY 10007</span> <br />
                            <span>Tell: +255 754 661 423</span> <br />
                            <span>Email: info@zpunet.com</span>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Footer