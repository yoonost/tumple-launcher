import { Component } from 'react'
import classNames from 'classnames'
import { DataContext } from '../context'

import BackgroundImage from '../images/backgrounds/main.png'
import LogotypeImage from '../images/logotype.png'

import {
    Cog6ToothIcon, MinusIcon, XMarkIcon, GlobeAltIcon, ChatBubbleLeftRightIcon, ShoppingCartIcon, ListBulletIcon
} from "@heroicons/react/24/outline"

class MainContainer extends Component {
    static contextType = DataContext

    constructor (props) {
        super(props)
        this.state = {
            isOpenServers: false
        }
    }

    onClickNavigate (event) {
        event.preventDefault();
        const keyValue = event.target.getAttribute('key');
        console.log('Нажата кнопка с ключом:', keyValue);
    }

    render() {
        return (
            <div className='absolute w-full h-full bg-cover bg-repeat rounded-3xl overflow-hidden drag-region select-none' style={{backgroundImage: `url('${BackgroundImage}'`}}>

                <div className='flex absolute w-full h-20 top-0 items-center justify-between px-5'>
                    <img srcSet={LogotypeImage} className='w-32 h-auto' alt="TUMPLE ROLEPLAY" />
                    <div className='flex space-x-7 items-center'>
                        <input className='px-2 py-3 text-sm font-medium text-center hover:text-gray-200 focus:text-gray-200 text-gray-200/50 outline-none bg-black/30 border border-gray-700 rounded-lg no-drag-region transition' placeholder='Имя_Фамилия' />
                        <div className='flex flex-row space-x-2'>
                            <button className='flex group items-center bg-black/30 hover:bg-gray-200 custom-shadow rounded-full p-2 transition outline-none no-drag-region'>
                                <Cog6ToothIcon class="h-6 w-6 text-gray-200 group-hover:text-gray-800" />
                            </button>
                            <button className='flex group items-center bg-black/30 hover:bg-gray-200 custom-shadow rounded-full p-2 transition outline-none no-drag-region'>
                                <MinusIcon class="h-6 w-6 text-gray-200 group-hover:text-gray-800" />
                            </button>
                            <button className='flex group items-center bg-black/30 hover:bg-gray-200 custom-shadow rounded-full p-2 transition outline-none no-drag-region'>
                                <XMarkIcon class="h-6 w-6 text-gray-200 group-hover:text-gray-800" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className='absolute w-[525px] h-[63px] left-[265px] top-[102px]'>
                    <span className='text-gray-400 font-bold uppercase text-sm'>Навигация</span>
                    <form className='flex gap-4 flex-row items-center w-full mt-1.5' onSubmit={this.onClickNavigate}>
                        <button id={1} type='submit' className='w-full flex bg-blue-600 hover:bg-blue-700 text-gray-200 px-2 py-1.5 justify-center items-center rounded-md no-drag-region transition outline-none'>
                            <GlobeAltIcon class="h-5 w-5 text-gray-200 mr-1" />
                            <span className='text-sm font-medium'>Сайт</span>
                        </button>
                        <button id={2} type='submit' className='w-full flex bg-indigo-600 hover:bg-indigo-700 text-gray-200 px-2 py-1.5 justify-center items-center rounded-md no-drag-region transition outline-none'>
                            <ChatBubbleLeftRightIcon class="h-5 w-5 text-gray-200 mr-1" />
                            <span className='text-sm font-medium'>Форум</span>
                        </button>
                        <button id={3} type='submit' className='w-full flex bg-[#4C75A3] hover:bg-[#395d86] text-gray-200 px-2 py-1.5 justify-center items-center rounded-md no-drag-region transition outline-none'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" class='mr-1 fill-gray-200'>
                                <path class="st0" d="M13.162 18.994c.609 0 .858-.406.851-.915-.031-1.917.714-2.949 2.059-1.604 1.488 1.488 1.796 2.519 3.603 2.519h3.2c.808 0 1.126-.26 1.126-.668 0-.863-1.421-2.386-2.625-3.504-1.686-1.565-1.765-1.602-.313-3.486 1.801-2.339 4.157-5.336 2.073-5.336h-3.981c-.772 0-.828.435-1.103 1.083-.995 2.347-2.886 5.387-3.604 4.922-.751-.485-.407-2.406-.35-5.261.015-.754.011-1.271-1.141-1.539-.629-.145-1.241-.205-1.809-.205-2.273 0-3.841.953-2.95 1.119 1.571.293 1.42 3.692 1.054 5.16-.638 2.556-3.036-2.024-4.035-4.305-.241-.548-.315-.974-1.175-.974h-3.255c-.492 0-.787.16-.787.516 0 .602 2.96 6.72 5.786 9.77 2.756 2.975 5.48 2.708 7.376 2.708z"/>
                            </svg>
                            <span className='text-sm font-medium'>ВКонтакте</span>
                        </button>
                        <button id={4} type='submit' className='w-full flex bg-green-600 hover:bg-green-700 text-gray-200 px-2 py-1.5 justify-center items-center rounded-md no-drag-region transition outline-none'>
                            <ShoppingCartIcon class="h-5 w-5 text-gray-200 mr-1" />
                            <span className='text-sm font-medium'>Магазин</span>
                        </button>
                    </form>
                </div>

                <div className='absolute w-[525px] h-[216px] left-[265px] top-[177.4px]'>
                    <span className='text-gray-400 font-bold uppercase text-sm'>Новости</span>
                    <div class="w-full h-[86%] grid grid-cols-3 gap-3 mt-1.5">
                        {this.context.data.content.news.map((item, index) => (
                            <div className={classNames("relative group flex justify-center items-center bg-center bg-cover bg-repeat rounded-md overflow-hidden no-drag-region bg-blue-600", (index == 0) ? "row-span-2 col-span-2" : "row-span-1 col-span-1")} style={{backgroundImage: `url('http://cdn.tumple-rp.su/images/${item.image}.jpg')`}}>
                                <div className='absolute bottom-0 w-full h-1/2 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-2'>
                                    <p className={classNames("text-gray-200 font-medium truncate", (index == 0) ? "text-md" : "text-[12px]")}>{item.title}</p>
                                    {(index === 0) && (
                                        <p className='text-gray-400 text-[12px] font-light h-9 overflow-hidden'>{item.description}</p>
                                    )}
                                </div>
                                <div className='absolute opacity-0 flex w-full h-full bg-black/50 justify-center items-center group-hover:opacity-100 transition'>
                                    <button className={classNames("text-gray-200 font-medium outline-none", (index === 0) ? "text-sm" : "text-[12px]")}>📖 Читать подробней</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='absolute w-[525px] h-[66px] left-[265px] top-[406px]'>
                    <span className='text-gray-400 font-bold uppercase text-sm'>События</span>
                    <div className='inline-flex items-center w-full space-x-4 mt-1.5 overflow-hidden'>
                        {this.context.data.content.events.map((item, index) => (
                            <div className='flex items-center space-x-2'>
                                <div className='py-[5px] px-[6px] border rounded-lg' style={{ background: `rgb(${item.color},0.5)`, borderColor: `rgb(${item.color})` }}>{item.emoji}</div>
                                <span className='text-gray-200 text-sm font-medium'>{item.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className='absolute w-full h-24 bottom-0 flex justify-between gap-4 p-5'>
                    <div className='w-[45%] h-full rounded-md bg-gray-700/30 p-3 flex space-x-2 items-center'>
                        <div className='py-[5px] px-[6px] bg-blue-600 rounded-md'>👍</div>
                        <div className='flex flex-col w-[87%] h-full items-center space-y-1'>
                            <div className='flex w-full items-center'>
                                <div className='w-[90%] text-gray-200 text-sm truncate'>text1 </div>
                                <div className='w-[10%] text-gray-400 text-sm text-right'>0%</div>
                            </div>
                            <div className='w-full h-1 rounded-md bg-gray-800 overflow-hidden'>
                                <div className='h-full w-1/2 bg-blue-600' />
                            </div>
                        </div>
                    </div>
                    <div className='w-[30%] h-full flex items-center rounded-md bg-gray-700/30 justify-between p-3'>
                        <div className='flex items-center space-x-2'>
                            <div className='text-lg'>😂</div>
                            <div className='flex flex-col'>
                                <span className='text-gray-200 text-sm font-medium'>ServerName</span>
                                <span className='text-gray-400 text-[12px] font-medium'>Онлайн 0 из 1000</span>
                            </div>
                        </div>
                        <button className='no-drag-region' onClick={() => this.setState({isOpenServers: !this.state.isOpenServers})}>
                            <ListBulletIcon class="h-6 w-6 text-gray-400 mr-1" />
                        </button>
                    </div>
                    <button className='flex w-[25%] h-full rounded-md bg-blue-600 items-center justify-center no-drag-region'>
                        <span className='text-gray-200 uppercase text-lg font-bold tracking-wide'>Играть</span>
                    </button>
                </div>
            </div>
        )
    }
}

export default MainContainer