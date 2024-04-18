import { Component } from 'react'
import classNames from 'classnames'
import { DataContext } from '../context'

import BackgroundImage from '../images/backgrounds/settings.png'
import LogotypeImage from '../images/logotype.png'

import {
    FolderIcon, MinusIcon, XMarkIcon, ArrowLeftIcon
} from "@heroicons/react/24/outline"
import { Switch } from '@headlessui/react'


class SettingsContainer extends Component {
    static contextType = DataContext

    constructor (props) {
        super(props)
        this.state = {
            isSelectOpen: false,
        }
    }

    render() {
        return (
            <div className='absolute w-full h-full bg-cover bg-repeat rounded-3xl overflow-hidden drag-region select-none	' style={{backgroundImage: `url('${BackgroundImage}'`}}>

                <div className='flex absolute w-full h-20 top-0 items-center justify-between px-5'>
                    <img srcSet={LogotypeImage} className='w-32 h-auto' alt="TUMPLE ROLEPLAY" />
                    <div className='flex space-x-7 items-center'>
                        <div className='flex flex-row space-x-2'>
                            <button className='flex group items-center bg-black/30 hover:bg-gray-200 custom-shadow rounded-full p-2 transition outline-none no-drag-region'>
                                <MinusIcon class="h-6 w-6 text-gray-200 group-hover:text-gray-800" />
                            </button>
                            <button className='flex group items-center bg-black/30 hover:bg-gray-200 custom-shadow rounded-full p-2 transition outline-none no-drag-region'>
                                <XMarkIcon class="h-6 w-6 text-gray-200 group-hover:text-gray-800" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className='absolute w-[525px] h-[63px] left-[265px] top-[102px] flex flex-col space-y-3'>
                    <span className='text-gray-200 font-bold text-2xl'>Настройки лаунчера</span>
                    <div className='flex flex-col w-full'>

                        <div className='mb-6'>
                            <span className='text-gray-400 text-sm'>Путь до папки с игрой:</span>
                            <div className='flex mt-1'>
                                <div className='flex w-[40%] h-8 bg-black/30 rounded-s-lg border border-gray-900 px-2 items-center truncate text-gray-300 text-sm'>
                                    <span className='truncate'>./bin</span>
                                </div>
                                <button className='flex w-[7%] h-8 bg-blue-600 hover:bg-blue-700 transition rounded-e-lg justify-center items-center truncate text-gray-300 no-drag-region'>
                                    <FolderIcon class="h-5 w-5 text-gray-200" />
                                </button>
                            </div>
                        </div>

                        <div className='flex items-center mb-6'>
                            <Switch checked={this.state.isSelectOpen} onChange={(status) => this.setState({ isSelectOpen: status })} className={classNames('no-drag-region relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors outline-none', this.state.isSelectOpen ? 'bg-blue-600' : 'bg-black/30')}>
                                <span aria-hidden="true" className={classNames('pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out', this.state.isSelectOpen ? 'translate-x-4' : 'translate-x-0')} />
                            </Switch>
                            <span className='text-gray-300 text-sm ml-2'>Свернуть лаунчер в трей после запуска игры</span>
                        </div>
                    </div>                
                </div>

                <div className='absolute w-full h-24 bottom-0 flex items-center px-5'>
                    <button className='inline-flex items-center hover:translate-x-1 transition no-drag-region'>
                        <ArrowLeftIcon class="h-5 w-5 text-gray-200 mr-1 stroke-2" />
                        <span className='text-gray-200 text-md font-medium uppercase'>Вернутся назад</span>
                    </button>
                </div>

            </div>
        )
    }
}

export default SettingsContainer