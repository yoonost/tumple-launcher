import { Component } from 'react'
import BackgroundImage from '../images/backgrounds/launch.png'

class LaunchContainer extends Component {
    render() {
        return (
            <div className='absolute w-full h-full bg-cover bg-repeat rounded-3xl overflow-hidden drag-region select-none flex flex-col space-y-3 items-center justify-center' style={{backgroundImage: `url('${BackgroundImage}'`}}>
                <div className='text-gray-200 text-lg font-bold tracking-wide'>Загрузка лаунчера</div>
                <div className='text-gray-200 text-sm font-normal py-3 px-5 bg-black/50 rounded-lg'>Ожидайте, происходит загрузка информации</div>
            </div>
        )
    }
}

export default LaunchContainer