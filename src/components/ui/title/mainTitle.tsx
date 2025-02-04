export default function MainTitle({ title }: { title: string }) {
    return (
        <div className='w-full bg-deepGray lg:h-64 h-40 relative overflow-hidden rounded-md'>
            <img alt='' src='/head.png' className='w-full h-full object-cover'></img>
            <div className='absolute lg:top-24 top-16 w-full flex-colo'>
                <h1 className='text-2xl lg:text-h1 text-white text-center font-bold'>{title}</h1>
            </div>
        </div>
    )
}