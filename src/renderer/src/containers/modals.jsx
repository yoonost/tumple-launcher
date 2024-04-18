import { Component } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'

class ModalsContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            status: '',
            title: '',
            text: ''
        }
    }
    componentDidMount = () => {
        window.electron.ipcRenderer.on('modal-show', (_, data, callback) => {
            this.setState({
                modal: true,
                status: data.status,
                title: data.title,
                text: data.text
            })
        })
    }
    closeModal = () => {
        if (this.state.status === 'error') {
            window.electron.ipcRenderer.send('app-quit')
        }
        else this.setState({ modal: false })
    }
    render() {
        return (
            <Transition appear show={this.state.modal}>
                <Dialog as="div" className="relative z-10" onClose={() => this.closeModal()}>
                    <Transition.Child
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/30 no-drag-region rounded-3xl" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-0 text-center sm:items-center">
                            <Transition.Child
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[#19182c] text-left transition-all sm:my-8 sm:w-full sm:max-w-lg drag-region select-none">
                                    <div className="p-5">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#201f38] sm:mx-0 sm:h-10 sm:w-10">
                                                {(this.state.status === "success") ? (
                                                    <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                                ) : (
                                                    <ExclamationTriangleIcon className="h-6 w-6 text-rose-600" aria-hidden="true" />
                                                )}
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-200">{this.state.title}</Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-300">{this.state.text}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-5 pb-5 flex flex-row-reverse">
                                        <button type="button" className="inline-flex w-full sm:w-auto justify-center rounded-md bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-900 outline-none hover:bg-gray-300 transition no-drag-region" onClick={() => this.closeModal()}>Закрыть окно</button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        )
    }
}

export default ModalsContainer